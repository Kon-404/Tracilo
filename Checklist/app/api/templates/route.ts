/**
 * Templates API Route
 * GET /api/templates - Get all templates (system + organization-specific)
 * POST /api/templates - Create a new template
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/db';
import { getUserActiveOrganization } from '@/lib/auth-helpers';

/**
 * GET /api/templates
 * Returns system templates + user's organization templates
 */
export async function GET(req: NextRequest) {
  try {
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

    // Get user's active organization
    const activeOrg = user ? await getUserActiveOrganization(user.id) : null;
    const activeOrgId = activeOrg?.id || null;

    // Get system templates (organizationId is null) + organization templates + public templates
    const templates = await prisma.formTemplate.findMany({
      where: {
        OR: [
          { organizationId: null }, // System templates
          { organizationId: activeOrgId }, // User's org templates
          { isPublic: true }, // Public templates from other orgs
        ],
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
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
        creator: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/templates
 * Create a new template for the user's organization
 */
export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const { name, category, description, icon, sections, isPublic } = body;

    // Validate required fields
    if (!name || !category || !description) {
      return NextResponse.json(
        { error: 'Name, category, and description are required' },
        { status: 400 }
      );
    }

    // Get user's active organization
    const activeOrg = await getUserActiveOrganization(user.id);
    if (!activeOrg) {
      return NextResponse.json(
        { error: 'No active organization' },
        { status: 400 }
      );
    }
    const activeOrgId = activeOrg.id;

    // Verify user has permission to create templates (admin or owner)
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: user.id,
        organizationId: activeOrgId,
        role: { in: ['owner', 'admin'] },
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'Only owners and admins can create templates' },
        { status: 403 }
      );
    }

    // Create template with sections and fields in a transaction
    const template = await prisma.formTemplate.create({
      data: {
        name,
        category,
        description,
        icon: icon || null,
        organizationId: activeOrgId,
        createdBy: user.id,
        isPublic: isPublic || false,
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

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}
