/**
 * Database utilities using Prisma
 *
 * Replaces localStorage with PostgreSQL database operations.
 */

import { PrismaClient } from '@prisma/client';
import { FormTemplate, FormSubmission } from '@/types';

// Singleton pattern for Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * TEMPLATES
 */

/**
 * Get all templates from database
 */
export async function getAllTemplates(): Promise<FormTemplate[]> {
  const templates = await prisma.formTemplate.findMany({
    include: {
      sections: {
        include: {
          fields: true,
        },
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return templates.map(convertPrismaTemplateToAppTemplate);
}

/**
 * Get template by ID
 */
export async function getTemplateById(id: string): Promise<FormTemplate | null> {
  const template = await prisma.formTemplate.findUnique({
    where: { id },
    include: {
      sections: {
        include: {
          fields: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!template) return null;
  return convertPrismaTemplateToAppTemplate(template);
}

/**
 * Get templates by category
 */
export async function getTemplatesByCategory(category: string): Promise<FormTemplate[]> {
  const templates = await prisma.formTemplate.findMany({
    where: { category },
    include: {
      sections: {
        include: {
          fields: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  return templates.map(convertPrismaTemplateToAppTemplate);
}

/**
 * SUBMISSIONS
 */

/**
 * Get all submissions
 */
export async function getAllSubmissions(): Promise<FormSubmission[]> {
  const submissions = await prisma.formSubmission.findMany({
    include: {
      answers: true,
    },
    orderBy: { submittedAt: 'desc' },
  });

  return submissions.map(convertPrismaSubmissionToAppSubmission);
}

/**
 * Get submission by ID
 */
export async function getSubmissionById(id: string): Promise<FormSubmission | null> {
  const submission = await prisma.formSubmission.findUnique({
    where: { id },
    include: {
      answers: true,
    },
  });

  if (!submission) return null;
  return convertPrismaSubmissionToAppSubmission(submission);
}

/**
 * Get submissions by template ID
 */
export async function getSubmissionsByTemplate(templateId: string): Promise<FormSubmission[]> {
  const submissions = await prisma.formSubmission.findMany({
    where: { templateId },
    include: {
      answers: true,
    },
    orderBy: { submittedAt: 'desc' },
  });

  return submissions.map(convertPrismaSubmissionToAppSubmission);
}

/**
 * Create new submission
 */
export async function createSubmission(submission: FormSubmission): Promise<FormSubmission> {
  const created = await prisma.formSubmission.create({
    data: {
      id: submission.id,
      templateId: submission.templateId,
      templateName: submission.templateName,
      category: submission.category,
      submittedAt: submission.submittedAt,
      submittedBy: submission.submittedBy,
      status: submission.status,
      metadata: submission.metadata as any,
      answers: {
        create: submission.answers.map((answer) => ({
          fieldId: answer.fieldId,
          fieldLabel: answer.fieldLabel,
          fieldType: answer.fieldType,
          sectionTitle: answer.sectionTitle,
          value: answer.value as any,
          photoUrls: answer.photoUrls || [],
        })),
      },
    },
    include: {
      answers: true,
    },
  });

  return convertPrismaSubmissionToAppSubmission(created);
}

/**
 * Update submission
 */
export async function updateSubmission(
  id: string,
  submission: FormSubmission
): Promise<FormSubmission | null> {
  try {
    // Delete existing answers
    await prisma.formAnswer.deleteMany({
      where: { submissionId: id },
    });

    // Update submission with new answers
    const updated = await prisma.formSubmission.update({
      where: { id },
      data: {
        templateId: submission.templateId,
        templateName: submission.templateName,
        category: submission.category,
        submittedBy: submission.submittedBy,
        status: submission.status,
        metadata: submission.metadata as any,
        answers: {
          create: submission.answers.map((answer) => ({
            fieldId: answer.fieldId,
            fieldLabel: answer.fieldLabel,
            fieldType: answer.fieldType,
            sectionTitle: answer.sectionTitle,
            value: answer.value as any,
            photoUrls: answer.photoUrls || [],
          })),
        },
      },
      include: {
        answers: true,
      },
    });

    return convertPrismaSubmissionToAppSubmission(updated);
  } catch (error) {
    console.error('Error updating submission:', error);
    return null;
  }
}

/**
 * Delete submission
 */
export async function deleteSubmission(id: string): Promise<boolean> {
  try {
    await prisma.formSubmission.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error('Error deleting submission:', error);
    return false;
  }
}

/**
 * HELPER FUNCTIONS
 */

/**
 * Convert Prisma template to app FormTemplate type
 */
function convertPrismaTemplateToAppTemplate(prismaTemplate: any): FormTemplate {
  return {
    id: prismaTemplate.id,
    name: prismaTemplate.name,
    category: prismaTemplate.category,
    description: prismaTemplate.description,
    icon: prismaTemplate.icon,
    createdAt: prismaTemplate.createdAt,
    updatedAt: prismaTemplate.updatedAt,
    sections: prismaTemplate.sections.map((section: any) => ({
      id: section.id,
      templateId: section.templateId,
      title: section.title,
      description: section.description,
      order: section.order,
      fields: section.fields
        .sort((a: any, b: any) => a.order - b.order)
        .map((field: any) => ({
          id: field.id,
          sectionId: field.sectionId,
          type: field.type,
          label: field.label,
          placeholder: field.placeholder,
          helpText: field.helpText,
          required: field.required,
          order: field.order,
          config: field.config,
        })),
    })),
  };
}

/**
 * Convert Prisma submission to app FormSubmission type
 */
function convertPrismaSubmissionToAppSubmission(prismaSubmission: any): FormSubmission {
  return {
    id: prismaSubmission.id,
    templateId: prismaSubmission.templateId,
    templateName: prismaSubmission.templateName,
    category: prismaSubmission.category,
    submittedAt: prismaSubmission.submittedAt,
    submittedBy: prismaSubmission.submittedBy,
    status: prismaSubmission.status,
    metadata: prismaSubmission.metadata,
    answers: prismaSubmission.answers.map((answer: any) => ({
      fieldId: answer.fieldId,
      fieldLabel: answer.fieldLabel,
      fieldType: answer.fieldType,
      sectionTitle: answer.sectionTitle,
      value: answer.value,
      photoUrls: answer.photoUrls,
    })),
  };
}
