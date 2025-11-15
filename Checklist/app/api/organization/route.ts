import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/db';

/**
 * GET /api/organization
 * Get current user's active organization
 * Note: This endpoint returns the single active organization.
 * Use /api/organizations for listing all organizations.
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
    // Get user's profile to check active organization
    const profile = await prisma.userProfile.findUnique({
      where: { id: session.user.id },
    });

    if (!profile?.activeOrganizationId) {
      // No active organization set
      return NextResponse.json(
        { error: 'No active organization. Please create one or accept an invitation.' },
        { status: 404 }
      );
    }

    // Get the active organization membership
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: session.user.id,
        organizationId: profile.activeOrganizationId,
      },
      include: {
        organization: true,
      },
    });

    if (!membership) {
      // Active organization ID is invalid (user is no longer a member)
      // Clear the active organization
      await prisma.userProfile.update({
        where: { id: session.user.id },
        data: { activeOrganizationId: null },
      });

      return NextResponse.json(
        { error: 'Active organization not found. Please select an organization.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: membership.organization.id,
      name: membership.organization.name,
      slug: membership.organization.slug,
      role: membership.role,
    });
  } catch (error) {
    console.error('Error fetching organization:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization' },
      { status: 500 }
    );
  }
}
