/**
 * Database seeding script
 *
 * This script populates the database with the initial form templates.
 * Run with: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import { allTemplates } from '../data/templates';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data (optional - comment out if you want to preserve existing data)
  console.log('Clearing existing templates...');
  await prisma.formAnswer.deleteMany({});
  await prisma.formSubmission.deleteMany({});
  await prisma.formField.deleteMany({});
  await prisma.formSection.deleteMany({});
  await prisma.formTemplate.deleteMany({});

  // Seed templates
  console.log(`Seeding ${allTemplates.length} templates...`);

  for (const template of allTemplates) {
    console.log(`  - Creating template: ${template.name}`);

    await prisma.formTemplate.create({
      data: {
        id: template.id,
        name: template.name,
        category: template.category,
        description: template.description,
        icon: template.icon || null,
        version: 1,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
        sections: {
          create: template.sections.map((section) => ({
            id: section.id,
            title: section.title,
            description: section.description || null,
            order: section.order,
            fields: {
              create: section.fields.map((field) => ({
                id: field.id,
                type: field.type,
                label: field.label,
                placeholder: field.placeholder || null,
                helpText: field.helpText || null,
                required: field.required,
                order: field.order,
                config: field.config ? (field.config as any) : undefined,
              })),
            },
          })),
        },
      },
    });
  }

  console.log('Seed completed successfully!');

  // Display summary
  const templateCount = await prisma.formTemplate.count();
  const sectionCount = await prisma.formSection.count();
  const fieldCount = await prisma.formField.count();

  console.log('\nDatabase summary:');
  console.log(`  Templates: ${templateCount}`);
  console.log(`  Sections: ${sectionCount}`);
  console.log(`  Fields: ${fieldCount}`);
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
