/**
 * Templates API Route
 * GET /api/templates - Get all templates
 */

import { NextResponse } from 'next/server';
import { getAllTemplates } from '@/lib/db';

export async function GET() {
  try {
    const templates = await getAllTemplates();
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
