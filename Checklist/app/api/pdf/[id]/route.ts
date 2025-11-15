/**
 * PDF Generation API Route
 *
 * Endpoint: GET /api/pdf/[id]
 * Generates and returns a PDF for a given submission ID.
 *
 * Example: GET /api/pdf/sub_1234567890_abc123
 * Returns: application/pdf file
 */

import React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { getSubmissionById } from '@/lib/storage';
import SubmissionPDF from '@/lib/pdf/SubmissionPDF';

/**
 * Generate filename for PDF download
 */
function generateFilename(templateName: string, submissionId: string): string {
  // Clean template name for filename (remove special chars)
  const cleanName = templateName
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

  // Extract short ID (last 8 chars)
  const shortId = submissionId.slice(-8);

  return `${cleanName}-${shortId}.pdf`;
}

/**
 * GET handler - Generate and download PDF
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // In Next.js 14.2+, params is a Promise that needs to be awaited
  const params = await context.params;

  try {
    // Get submission from storage
    const submission = getSubmissionById(params.id);

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Generate PDF using React.createElement
    // Cast to any to bypass TypeScript restrictions with React-PDF
    const pdfDocument = React.createElement(SubmissionPDF, { submission });
    const pdfStream = await renderToStream(pdfDocument as any);

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of pdfStream as any) {
      chunks.push(chunk);
    }
    const pdfBuffer = Buffer.concat(chunks);

    // Generate filename
    const filename = generateFilename(
      submission.templateName,
      submission.id
    );

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
