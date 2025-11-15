import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/db';

/**
 * POST /api/organization/transfer-ownership
 * Transfer organization ownership to another member
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
    const { newOwnerId, confirmText } = body;

    // Validate confirmation text
    if (confirmText !== 'TRANSFER') {
      return NextResponse.json(
        { error: 'Invalid confirmation text. Please type TRANSFER' },
        { status: 400 }
      );
    }

    if (!newOwnerId) {
      return NextResponse.json(
        { error: 'New owner ID is required' },
        { status: 400 }
      );
    }

    // Check if current user is the owner
    const currentUserMembership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
    });

    if (!currentUserMembership) {
      return NextResponse.json(
        { error: 'No organization found' },
        { status: 404 }
      );
    }

    if (currentUserMembership.role !== 'owner') {
      return NextResponse.json(
        { error: 'Only the owner can transfer ownership' },
        { status: 403 }
      );
    }

    // Get the new owner membership
    const newOwnerMembership = await prisma.organizationMember.findUnique({
      where: { id: newOwnerId },
      include: { user: true },
    });

    if (!newOwnerMembership) {
      return NextResponse.json(
        { error: 'New owner not found' },
        { status: 404 }
      );
    }

    // Ensure they're in the same organization
    if (newOwnerMembership.organizationId !== currentUserMembership.organizationId) {
      return NextResponse.json(
        { error: 'New owner must be in the same organization' },
        { status: 400 }
      );
    }

    // Cannot transfer to yourself
    if (newOwnerMembership.userId === session.user.id) {
      return NextResponse.json(
        { error: 'You are already the owner' },
        { status: 400 }
      );
    }

    // Perform the transfer using a transaction
    await prisma.$transaction([
      // Demote current owner to admin
      prisma.organizationMember.update({
        where: { id: currentUserMembership.id },
        data: { role: 'admin' },
      }),
      // Promote new owner
      prisma.organizationMember.update({
        where: { id: newOwnerId },
        data: { role: 'owner' },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Ownership transferred to ${newOwnerMembership.user.fullName || newOwnerMembership.user.email}`,
    });
  } catch (error) {
    console.error('Error transferring ownership:', error);
    return NextResponse.json(
      { error: 'Failed to transfer ownership' },
      { status: 500 }
    );
  }
}
