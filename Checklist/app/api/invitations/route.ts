import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/db';
import { randomBytes } from 'crypto';
import { sendInvitationEmail } from '@/lib/email';

/**
 * POST /api/invitations
 * Send an invitation to join an organization
 */
export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const { email, role = 'member' } = body;

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Get user's active organization
    const profile = await prisma.userProfile.findUnique({
      where: { id: session.user.id },
    });

    if (!profile?.activeOrganizationId) {
      return NextResponse.json(
        { error: 'No active organization' },
        { status: 400 }
      );
    }

    // Verify user has permission to invite (admin or owner)
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: session.user.id,
        organizationId: profile.activeOrganizationId,
        role: { in: ['owner', 'admin'] },
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'Only owners and admins can send invitations' },
        { status: 403 }
      );
    }

    // Check if user is already a member
    const existingMemberByEmail = await prisma.userProfile.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingMemberByEmail) {
      const existingMembership = await prisma.organizationMember.findFirst({
        where: {
          userId: existingMemberByEmail.id,
          organizationId: profile.activeOrganizationId,
        },
      });

      if (existingMembership) {
        return NextResponse.json(
          { error: 'User is already a member of this organization' },
          { status: 400 }
        );
      }
    }

    // Check if there's already a pending invite
    const existingInvite = await prisma.pendingInvite.findFirst({
      where: {
        email: normalizedEmail,
        organizationId: profile.activeOrganizationId,
        expiresAt: { gt: new Date() },
      },
    });

    if (existingInvite) {
      return NextResponse.json(
        { error: 'An invitation has already been sent to this email' },
        { status: 400 }
      );
    }

    // Generate unique token
    const token = randomBytes(32).toString('hex');

    // Set expiration to 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Create pending invite
    const invite = await prisma.pendingInvite.create({
      data: {
        organizationId: profile.activeOrganizationId,
        email: normalizedEmail,
        role,
        invitedBy: session.user.id,
        token,
        expiresAt,
      },
      include: {
        organization: true,
        inviter: true,
      },
    });

    // Send invitation email
    const inviterName = invite.inviter.fullName || invite.inviter.email;
    const emailResult = await sendInvitationEmail({
      to: normalizedEmail,
      organizationName: invite.organization.name,
      invitedBy: inviterName,
      inviteToken: token,
      role,
      expiresAt,
    });

    if (!emailResult.success) {
      console.error('Failed to send invitation email:', emailResult.error);
      // Still return success since the invitation was created
      // The user can still see it in-app
    }

    return NextResponse.json({
      success: true,
      invite: {
        id: invite.id,
        email: invite.email,
        role: invite.role,
        organizationName: invite.organization.name,
        expiresAt: invite.expiresAt,
      },
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json(
      { error: 'Failed to create invitation' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/invitations
 * Get pending invitations for the current user
 */
export async function GET(req: NextRequest) {
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
    // Get all pending invites for user's email that haven't expired
    const invites = await prisma.pendingInvite.findMany({
      where: {
        email: session.user.email!.toLowerCase(),
        expiresAt: { gt: new Date() },
      },
      include: {
        organization: true,
        inviter: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedInvites = invites.map((invite) => ({
      id: invite.id,
      organizationId: invite.organizationId,
      organizationName: invite.organization.name,
      role: invite.role,
      invitedBy: invite.inviter.fullName || invite.inviter.email,
      createdAt: invite.createdAt,
      expiresAt: invite.expiresAt,
    }));

    return NextResponse.json({ invites: formattedInvites });
  } catch (error) {
    console.error('Error fetching invitations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invitations' },
      { status: 500 }
    );
  }
}
