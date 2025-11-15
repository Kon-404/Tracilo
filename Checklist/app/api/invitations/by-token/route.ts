import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/invitations/by-token
 * Find invitation by token (for email acceptance flow)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Find the invitation by token
    const invite = await prisma.pendingInvite.findUnique({
      where: { token },
      include: {
        organization: true,
        inviter: true,
      },
    });

    if (!invite) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      );
    }

    // Check if invitation has expired
    if (invite.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'This invitation has expired' },
        { status: 410 }
      );
    }

    return NextResponse.json({
      invite: {
        id: invite.id,
        email: invite.email,
        role: invite.role,
        organizationId: invite.organizationId,
        organizationName: invite.organization.name,
        invitedBy: invite.inviter.fullName || invite.inviter.email,
        expiresAt: invite.expiresAt,
      },
    });
  } catch (error) {
    console.error('Error finding invitation by token:', error);
    return NextResponse.json(
      { error: 'Failed to find invitation' },
      { status: 500 }
    );
  }
}
