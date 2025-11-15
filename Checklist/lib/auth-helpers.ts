import { prisma } from './db';

/**
 * Create or get user profile
 * Called when a user signs up or logs in
 */
export async function ensureUserProfile(userId: string, email: string, fullName?: string) {
  try {
    // Check if profile exists
    let profile = await prisma.userProfile.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      // Create new profile
      profile = await prisma.userProfile.create({
        data: {
          id: userId,
          email,
          fullName: fullName || null,
        },
      });
    }

    return profile;
  } catch (error) {
    console.error('Error ensuring user profile:', error);
    throw error;
  }
}

/**
 * Create default organization for new user
 * Called during onboarding
 */
export async function createDefaultOrganization(userId: string, orgName: string) {
  try {
    const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const organization = await prisma.organization.create({
      data: {
        name: orgName,
        slug,
        members: {
          create: {
            userId,
            role: 'owner',
          },
        },
      },
      include: {
        members: true,
      },
    });

    return organization;
  } catch (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
}

/**
 * Get user's organizations
 */
export async function getUserOrganizations(userId: string) {
  try {
    const memberships = await prisma.organizationMember.findMany({
      where: { userId },
      include: {
        organization: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return memberships.map((m) => ({
      ...m.organization,
      role: m.role,
    }));
  } catch (error) {
    console.error('Error getting user organizations:', error);
    throw error;
  }
}

/**
 * Get user's active organization
 * For now, returns the first organization they belong to
 */
export async function getUserActiveOrganization(userId: string) {
  try {
    const organizations = await getUserOrganizations(userId);
    return organizations[0] || null;
  } catch (error) {
    console.error('Error getting active organization:', error);
    throw error;
  }
}

/**
 * Check if user is member of organization
 */
export async function isOrganizationMember(userId: string, organizationId: string) {
  try {
    const member = await prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    });

    return !!member;
  } catch (error) {
    console.error('Error checking organization membership:', error);
    return false;
  }
}

/**
 * Check if user has role in organization
 */
export async function hasOrganizationRole(
  userId: string,
  organizationId: string,
  roles: string[]
) {
  try {
    const member = await prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    });

    return member ? roles.includes(member.role) : false;
  } catch (error) {
    console.error('Error checking organization role:', error);
    return false;
  }
}
