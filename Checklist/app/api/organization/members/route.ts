import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/db';

/**
 * GET /api/organization/members
 * Get all members of the user's organization
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
    // Get user's organization
    const userMembership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
    });

    if (!userMembership) {
      return NextResponse.json({ error: 'No organization found' }, { status: 404 });
    }

    // Get all members of the organization
    const members = await prisma.organizationMember.findMany({
      where: { organizationId: userMembership.organizationId },
      include: {
        user: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const formattedMembers = members.map((m) => ({
      id: m.id,
      userId: m.userId,
      role: m.role,
      customPermissions: m.customPermissions,
      email: m.user.email,
      fullName: m.user.fullName,
      createdAt: m.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/organization/members
 * Invite a new member to the organization
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
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json(
        { error: 'Email and role are required' },
        { status: 400 }
      );
    }

    // Check if user is admin or owner
    const userMembership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
    });

    if (!userMembership) {
      return NextResponse.json({ error: 'No organization found' }, { status: 404 });
    }

    if (userMembership.role !== 'admin' && userMembership.role !== 'owner') {
      return NextResponse.json(
        { error: 'Only admins and owners can invite members' },
        { status: 403 }
      );
    }

    // Check if user with email exists
    let invitedUser = await prisma.userProfile.findUnique({
      where: { email },
    });

    if (!invitedUser) {
      // For now, return error if user doesn't exist
      // In production, you would send an email invitation
      return NextResponse.json(
        { error: 'User with this email does not exist. They need to sign up first.' },
        { status: 404 }
      );
    }

    // Check if already a member
    const existingMembership = await prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId: userMembership.organizationId,
          userId: invitedUser.id,
        },
      },
    });

    if (existingMembership) {
      return NextResponse.json(
        { error: 'User is already a member of this organization' },
        { status: 400 }
      );
    }

    // Add member to organization
    const newMember = await prisma.organizationMember.create({
      data: {
        organizationId: userMembership.organizationId,
        userId: invitedUser.id,
        role,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({
      id: newMember.id,
      userId: newMember.userId,
      role: newMember.role,
      customPermissions: newMember.customPermissions,
      email: newMember.user.email,
      fullName: newMember.user.fullName,
      createdAt: newMember.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('Error inviting member:', error);
    return NextResponse.json(
      { error: 'Failed to invite member' },
      { status: 500 }
    );
  }
}
