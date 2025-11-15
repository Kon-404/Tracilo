/**
 * Clear all user data from database
 * Keeps form templates for testing
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearUserData() {
  console.log('Clearing all user data...');

  try {
    // Delete in order to respect foreign key constraints
    console.log('Deleting form answers...');
    await prisma.formAnswer.deleteMany();

    console.log('Deleting form submissions...');
    await prisma.formSubmission.deleteMany();

    console.log('Deleting pending invites...');
    await prisma.pendingInvite.deleteMany();

    console.log('Deleting organization members...');
    await prisma.organizationMember.deleteMany();

    console.log('Deleting organizations...');
    await prisma.organization.deleteMany();

    console.log('Deleting user profiles...');
    await prisma.userProfile.deleteMany();

    console.log('✅ All user data cleared successfully!');
    console.log('Form templates have been preserved.');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

clearUserData();
