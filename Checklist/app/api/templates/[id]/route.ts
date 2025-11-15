/**
 * Template by ID API Route
 * GET /api/templates/[id] - Get template by ID
 * PUT /api/templates/[id] - Update template
 * DELETE /api/templates/[id] - Delete template
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getTemplateById } from '@/lib/db';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const template = await getTemplateById(params.id);

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/templates/[id]
 * Update a template (only owner/admin of the organization can update)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = await import('next/headers').then((mod) => mod.cookies());
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get existing template
    const existingTemplate = await prisma.formTemplate.findUnique({
      where: { id: params.id },
      include: { organization: true },
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Can't update system templates
    if (!existingTemplate.organizationId) {
      return NextResponse.json(
        { error: 'Cannot update system templates' },
        { status: 403 }
      );
    }

    // Verify user has permission (admin or owner of the organization)
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: user.id,
        organizationId: existingTemplate.organizationId,
        role: { in: ['owner', 'admin'] },
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'Only owners and admins can update templates' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, category, description, icon, sections, isPublic } = body;

    // Delete existing sections and create new ones (easier than complex update logic)
    await prisma.formSection.deleteMany({
      where: { templateId: params.id },
    });

    // Update template
    const template = await prisma.formTemplate.update({
      where: { id: params.id },
      data: {
        name: name || existingTemplate.name,
        category: category || existingTemplate.category,
        description: description || existingTemplate.description,
        icon: icon !== undefined ? icon : existingTemplate.icon,
        isPublic: isPublic !== undefined ? isPublic : existingTemplate.isPublic,
        version: existingTemplate.version + 1,
        sections: {
          create: (sections || []).map((section: any, sectionIndex: number) => ({
            title: section.title,
            description: section.description || null,
            order: sectionIndex,
            fields: {
              create: (section.fields || []).map((field: any, fieldIndex: number) => ({
                type: field.type,
                label: field.label,
                placeholder: field.placeholder || null,
                helpText: field.helpText || null,
                required: field.required || false,
                order: fieldIndex,
                config: field.config || null,
              })),
            },
          })),
        },
      },
      include: {
        sections: {
          include: {
            fields: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/templates/[id]
 * Delete a template (only owner/admin can delete)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = await import('next/headers').then((mod) => mod.cookies());
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get existing template
    const existingTemplate = await prisma.formTemplate.findUnique({
      where: { id: params.id },
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Can't delete system templates
    if (!existingTemplate.organizationId) {
      return NextResponse.json(
        { error: 'Cannot delete system templates' },
        { status: 403 }
      );
    }

    // Verify user has permission (admin or owner of the organization)
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: user.id,
        organizationId: existingTemplate.organizationId,
        role: { in: ['owner', 'admin'] },
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'Only owners and admins can delete templates' },
        { status: 403 }
      );
    }

    // Check if template has submissions
    const submissionCount = await prisma.formSubmission.count({
      where: { templateId: params.id },
    });

    if (submissionCount > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete template with ${submissionCount} submission(s). Archive it instead.`,
        },
        { status: 400 }
      );
    }

    // Delete template (cascades to sections and fields)
    await prisma.formTemplate.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'Template deleted' });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}
