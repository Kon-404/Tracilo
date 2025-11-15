import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/db';

/**
 * POST /api/invitations/[id]/accept
 * Accept a pending invitation to join an organization
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inviteId = params.id;

    // Get the invitation
    const invite = await prisma.pendingInvite.findUnique({
      where: { id: inviteId },
      include: { organization: true },
    });

    if (!invite) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      );
    }

    // Verify invitation is for current user
    if (invite.email.toLowerCase() !== session.user.email!.toLowerCase()) {
      return NextResponse.json(
        { error: 'This invitation is not for your account' },
        { status: 403 }
      );
    }

    // Check if invitation has expired
    if (invite.expiresAt < new Date()) {
      await prisma.pendingInvite.delete({ where: { id: inviteId } });
      return NextResponse.json(
        { error: 'This invitation has expired' },
        { status: 400 }
      );
    }

    // Check if user is already a member
    const existingMembership = await prisma.organizationMember.findFirst({
      where: {
        userId: session.user.id,
        organizationId: invite.organizationId,
      },
    });

    if (existingMembership) {
      // Delete the invite since they're already a member
      await prisma.pendingInvite.delete({ where: { id: inviteId } });
      return NextResponse.json(
        { error: 'You are already a member of this organization' },
        { status: 400 }
      );
    }

    // Check if user has reached the 3-org limit
    const membershipCount = await prisma.organizationMember.count({
      where: { userId: session.user.id },
    });

    if (membershipCount >= 3) {
      return NextResponse.json(
        { error: 'Maximum of 3 organizations allowed per user' },
        { status: 400 }
      );
    }

    // Get or create user profile
    const profile = await prisma.userProfile.findUnique({
      where: { id: session.user.id },
    });

    // Create organization membership and delete invite in a transaction
    await prisma.$transaction([
      prisma.organizationMember.create({
        data: {
          userId: session.user.id,
          organizationId: invite.organizationId,
          role: invite.role,
        },
      }),
      prisma.pendingInvite.delete({
        where: { id: inviteId },
      }),
    ]);

    // If user has no active organization, set this as active
    if (!profile?.activeOrganizationId) {
      await prisma.userProfile.update({
        where: { id: session.user.id },
        data: { activeOrganizationId: invite.organizationId },
      });
    }

    return NextResponse.json({
      success: true,
      organization: {
        id: invite.organization.id,
        name: invite.organization.name,
        slug: invite.organization.slug,
        role: invite.role,
      },
    });
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return NextResponse.json(
      { error: 'Failed to accept invitation' },
      { status: 500 }
    );
  }
}
