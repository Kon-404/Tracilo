import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/db';

/**
 * DELETE /api/organizations/[id]
 * Delete an organization (owner only)
 */
export async function DELETE(
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
    const organizationId = params.id;

    // Verify user is the owner of this organization
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: session.user.id,
        organizationId: organizationId,
        role: 'owner',
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'Only the organization owner can delete the organization' },
        { status: 403 }
      );
    }

    // Check if this is the user's active organization
    const profile = await prisma.userProfile.findUnique({
      where: { id: session.user.id },
    });

    const isActiveOrg = profile?.activeOrganizationId === organizationId;

    // Delete the organization (cascade will remove members, submissions, etc.)
    await prisma.organization.delete({
      where: { id: organizationId },
    });

    // If this was the active org, switch to another one or set to null
    if (isActiveOrg) {
      const remainingMemberships = await prisma.organizationMember.findMany({
        where: { userId: session.user.id },
        include: { organization: true },
        take: 1,
      });

      const newActiveOrgId = remainingMemberships[0]?.organization.id || null;

      await prisma.userProfile.update({
        where: { id: session.user.id },
        data: { activeOrganizationId: newActiveOrgId },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Organization deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting organization:', error);
    return NextResponse.json(
      { error: 'Failed to delete organization' },
      { status: 500 }
    );
  }
}
