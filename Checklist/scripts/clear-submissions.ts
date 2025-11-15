/**
 * Clear all existing submissions
 * Run this after adding multi-tenancy to start fresh
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearSubmissions() {
  try {
    console.log('🗑️  Clearing all submissions...');

    // Delete all form answers first (due to foreign key constraints)
    const answersDeleted = await prisma.formAnswer.deleteMany({});
    console.log(`✓ Deleted ${answersDeleted.count} form answers`);

    // Delete all form submissions
    const submissionsDeleted = await prisma.formSubmission.deleteMany({});
    console.log(`✓ Deleted ${submissionsDeleted.count} form submissions`);

    console.log('\n✅ All submissions cleared successfully!');
    console.log('You can now test the authentication flow with fresh data.');
  } catch (error) {
    console.error('❌ Error clearing submissions:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

clearSubmissions();
