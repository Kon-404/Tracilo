import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/db';

/**
 * GET /api/organizations
 * Get all organizations user belongs to and the active one
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

    // Get all organization memberships
    const memberships = await prisma.organizationMember.findMany({
      where: { userId: session.user.id },
      include: {
        organization: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    if (memberships.length === 0) {
      // No organizations - user needs to create one or accept an invite
      return NextResponse.json({
        organizations: [],
        activeOrganization: null,
      });
    }

    const organizations = memberships.map((m) => ({
      id: m.organization.id,
      name: m.organization.name,
      slug: m.organization.slug,
      role: m.role,
    }));

    // Determine active organization
    let activeOrganization = null;

    if (profile?.activeOrganizationId) {
      // Use the active org from profile if it exists in user's orgs
      activeOrganization = organizations.find(
        (org) => org.id === profile.activeOrganizationId
      );
    }

    // If no active org set or invalid, use the first one
    if (!activeOrganization && organizations.length > 0) {
      activeOrganization = organizations[0];

      // Update profile with first org as active
      await prisma.userProfile.update({
        where: { id: session.user.id },
        data: { activeOrganizationId: activeOrganization.id },
      });
    }

    return NextResponse.json({
      organizations,
      activeOrganization,
    });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/organizations
 * Create a new organization
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
    const { name } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Organization name is required' },
        { status: 400 }
      );
    }

    // Check organization limit (max 3)
    const existingCount = await prisma.organizationMember.count({
      where: { userId: session.user.id },
    });

    if (existingCount >= 3) {
      return NextResponse.json(
        { error: 'Maximum of 3 organizations allowed per user' },
        { status: 400 }
      );
    }

    // Create URL-friendly slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if organization name already exists
    const existing = await prisma.organization.findUnique({
      where: { name },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An organization with this name already exists' },
        { status: 400 }
      );
    }

    // Create organization with user as owner
    const organization = await prisma.organization.create({
      data: {
        name,
        slug,
        members: {
          create: {
            userId: session.user.id,
            role: 'owner',
          },
        },
      },
    });

    // Set as active organization
    await prisma.userProfile.update({
      where: { id: session.user.id },
      data: { activeOrganizationId: organization.id },
    });

    return NextResponse.json({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      role: 'owner',
    });
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    );
  }
}
