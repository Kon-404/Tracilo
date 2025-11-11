/**
 * Client-Side PDF Generation
 *
 * Generates PDFs in the browser using @react-pdf/renderer
 */

import { pdf } from '@react-pdf/renderer';
import SubmissionPDF from './SubmissionPDF';
import { FormSubmission } from '@/types';

/**
 * Generate and download PDF on the client side
 * @param submission - The submission to generate PDF for
 */
export async function downloadSubmissionPDF(submission: FormSubmission): Promise<void> {
  try {
    // Create PDF document
    const pdfDocument = SubmissionPDF({ submission });

    // Generate blob
    const blob = await pdf(pdfDocument).toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Generate filename
    const cleanName = submission.templateName
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const shortId = submission.id.slice(-8);
    a.download = `${cleanName}-${shortId}.pdf`;

    // Trigger download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}
