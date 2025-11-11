/**
 * Submissions API Route
 * GET /api/submissions - Get all submissions
 * POST /api/submissions - Create new submission
 */

import { NextResponse } from 'next/server';
import { getAllSubmissions, createSubmission } from '@/lib/db';
import { FormSubmission } from '@/types';

export async function GET() {
  try {
    const submissions = await getAllSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Convert date strings back to Date objects
    const submission: FormSubmission = {
      ...body,
      submittedAt: new Date(body.submittedAt),
    };

    const created = await createSubmission(submission);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}
