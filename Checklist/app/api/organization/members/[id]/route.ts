import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/db';

/**
 * PUT /api/organization/members/[id]
 * Update a member's role
 */
export async function PUT(
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
    const body = await req.json();
    const { role, customPermissions } = body;

    // Check if user is admin or owner
    const userMembership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
    });

    if (!userMembership) {
      return NextResponse.json({ error: 'No organization found' }, { status: 404 });
    }

    if (userMembership.role !== 'admin' && userMembership.role !== 'owner') {
      return NextResponse.json(
        { error: 'Only admins and owners can update roles' },
        { status: 403 }
      );
    }

    // Get the member to update
    const memberToUpdate = await prisma.organizationMember.findUnique({
      where: { id: params.id },
    });

    if (!memberToUpdate) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Ensure they're in the same organization
    if (memberToUpdate.organizationId !== userMembership.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update the role and/or custom permissions
    const updateData: any = {};
    if (role) updateData.role = role;
    if (customPermissions !== undefined) updateData.customPermissions = customPermissions;

    const updatedMember = await prisma.organizationMember.update({
      where: { id: params.id },
      data: updateData,
      include: { user: true },
    });

    return NextResponse.json({
      id: updatedMember.id,
      userId: updatedMember.userId,
      role: updatedMember.role,
      customPermissions: updatedMember.customPermissions,
      email: updatedMember.user.email,
      fullName: updatedMember.user.fullName,
      createdAt: updatedMember.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('Error updating member role:', error);
    return NextResponse.json(
      { error: 'Failed to update member role' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/organization/members/[id]
 * Remove a member from the organization
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
    // Check if user is admin or owner
    const userMembership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
    });

    if (!userMembership) {
      return NextResponse.json({ error: 'No organization found' }, { status: 404 });
    }

    if (userMembership.role !== 'admin' && userMembership.role !== 'owner') {
      return NextResponse.json(
        { error: 'Only admins and owners can remove members' },
        { status: 403 }
      );
    }

    // Get the member to remove
    const memberToRemove = await prisma.organizationMember.findUnique({
      where: { id: params.id },
    });

    if (!memberToRemove) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Ensure they're in the same organization
    if (memberToRemove.organizationId !== userMembership.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Cannot remove yourself
    if (memberToRemove.userId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot remove yourself from the organization' },
        { status: 400 }
      );
    }

    // Remove the member
    await prisma.organizationMember.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing member:', error);
    return NextResponse.json(
      { error: 'Failed to remove member' },
      { status: 500 }
    );
  }
}
