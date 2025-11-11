/**
 * Submission by ID API Route
 * GET /api/submissions/[id] - Get submission by ID
 * PUT /api/submissions/[id] - Update submission by ID
 * DELETE /api/submissions/[id] - Delete submission by ID
 */

import { NextResponse } from 'next/server';
import { getSubmissionById, updateSubmission, deleteSubmission } from '@/lib/db';
import { FormSubmission } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const submission = await getSubmissionById(params.id);

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Convert date strings back to Date objects
    const submission: FormSubmission = {
      ...body,
      submittedAt: new Date(body.submittedAt),
    };

    const updated = await updateSubmission(params.id, submission);

    if (!updated) {
      return NextResponse.json(
        { error: 'Submission not found or could not be updated' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteSubmission(params.id);

    if (!success) {
      return NextResponse.json(
        { error: 'Submission not found or could not be deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
