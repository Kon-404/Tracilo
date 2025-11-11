/**
 * Submission Detail Page
 *
 * Displays a completed form submission with all answers.
 * Provides PDF download functionality (stubbed in MVP).
 *
 * Route: /submissions/[id]
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { downloadSubmissionPDF } from '@/lib/pdf/generatePDF';
import { FormSubmission, FormAnswer } from '@/types';
import { format } from 'date-fns';

interface SubmissionDetailPageProps {
  params: {
    id: string;
  };
}

export default function SubmissionDetailPage({
  params,
}: SubmissionDetailPageProps) {
  const router = useRouter();
  const [submission, setSubmission] = useState<FormSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load submission on mount
  useEffect(() => {
    const fetchSubmission = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/submissions/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          // Convert date string to Date object
          const submission: FormSubmission = {
            ...data,
            submittedAt: new Date(data.submittedAt),
          };
          setSubmission(submission);
        } else {
          console.error('Submission not found:', params.id);
          setSubmission(null);
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
        setSubmission(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmission();
  }, [params.id]);

  /**
   * Format date for display
   */
  const formatDate = (date: Date): string => {
    try {
      return format(date, 'PPPp'); // e.g., "April 29th, 2023 at 9:30 AM"
    } catch {
      return 'Invalid date';
    }
  };

  /**
   * Group answers by section
   */
  const groupAnswersBySection = (
    answers: FormAnswer[]
  ): Record<string, FormAnswer[]> => {
    const grouped: Record<string, FormAnswer[]> = {};

    answers.forEach((answer) => {
      const section = answer.sectionTitle;
      if (!grouped[section]) {
        grouped[section] = [];
      }
      grouped[section].push(answer);
    });

    return grouped;
  };

  /**
   * Format answer value for display
   */
  const formatAnswerValue = (answer: FormAnswer): string | JSX.Element => {
    const { value, fieldType } = answer;

    if (value === null || value === undefined || value === '') {
      return '—'; // Em dash for empty values
    }

    if (fieldType === 'checkbox') {
      return value ? '✓ Yes' : '✗ No';
    }

    // Handle photo fields
    if (fieldType === 'photo') {
      const photos = Array.isArray(value) ? value : value ? [value] : [];
      if (photos.length === 0) return '—';

      return (
        <div className="grid grid-cols-2 gap-3 mt-2">
          {photos.map((photoUrl: string, index: number) => (
            <a
              key={index}
              href={photoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={photoUrl}
                alt={`Photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
              />
            </a>
          ))}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return String(value);
  };

  /**
   * Get category badge styling
   */
  const getCategoryBadgeClass = (category: string): string => {
    const classes: Record<string, string> = {
      vehicle: 'bg-blue-100 text-blue-800',
      solar: 'bg-yellow-100 text-yellow-800',
      gas: 'bg-red-100 text-red-800',
    };
    return classes[category] || 'badge-gray';
  };

  /**
   * Handle PDF download (client-side generation)
   */
  const handleDownloadPDF = async () => {
    if (!submission) {
      console.error('No submission available');
      return;
    }

    // Find the actual button element
    const buttons = document.querySelectorAll('button');
    let button: HTMLButtonElement | null = null;
    buttons.forEach((btn) => {
      if (btn.textContent?.includes('Download PDF')) {
        button = btn;
      }
    });

    const originalText = button?.textContent || 'Download PDF';

    try {
      console.log('Starting PDF generation...');

      // Show loading state
      if (button) {
        button.disabled = true;
        button.textContent = 'Generating PDF...';
      }

      // Generate and download PDF on client side
      await downloadSubmissionPDF(submission);

      console.log('PDF generated successfully');

      // Small delay before restoring button
      setTimeout(() => {
        if (button) {
          button.disabled = false;
          button.textContent = originalText;
        }
      }, 500);
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Failed to generate PDF. Please try again.');

      // Restore button on error
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  };

  /**
   * Handle print (basic browser print for now)
   */
  const handlePrint = () => {
    window.print();
  };

  /**
   * Handle delete submission
   */
  const handleDelete = async () => {
    if (!submission) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/submissions/${submission.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Redirect to submissions list
        router.push('/submissions');
      } else {
        alert('Failed to delete submission. Please try again.');
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting. Please try again.');
      setIsDeleting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container-mobile">
        <div className="card text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Submission...
          </h2>
        </div>
      </div>
    );
  }

  // Not found state
  if (!submission) {
    return (
      <div className="container-mobile">
        <div className="card text-center py-12">
          <div className="text-4xl mb-3">❌</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Submission Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested submission could not be found.
          </p>
          <a href="/submissions" className="btn-primary inline-block">
            Back to Submissions
          </a>
        </div>
      </div>
    );
  }

  const groupedAnswers = groupAnswersBySection(submission.answers);
  const sectionNames = Object.keys(groupedAnswers);

  return (
    <div className="container-mobile">
      {/* Header */}
      <div className="mb-6 no-print">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:text-gray-900 mb-3 flex items-center tap-target"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Submissions
        </button>
      </div>

      {/* Submission header */}
      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {submission.templateName}
            </h1>
            <p className="text-sm text-gray-600">
              Submitted: {formatDate(submission.submittedAt)}
            </p>
          </div>

          <span
            className={`badge ${getCategoryBadgeClass(submission.category)}`}
          >
            {submission.category}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <div className="text-sm text-gray-600">Status</div>
            <div
              className={`mt-1 badge ${
                submission.status === 'completed'
                  ? 'badge-success'
                  : 'badge-warning'
              }`}
            >
              {submission.status}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Responses</div>
            <div className="mt-1 font-semibold text-gray-900">
              {submission.answers.length}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col space-y-3 mb-6 no-print">
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDownloadPDF();
            }}
            className="btn-primary flex-1"
          >
            <svg
              className="w-4 h-4 mr-2 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF
          </button>
          <button onClick={handlePrint} className="btn-outline">
            <svg
              className="w-4 h-4 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => router.push(`/submissions/${submission.id}/edit`)}
          className="btn-outline w-full"
        >
          <svg
            className="w-4 h-4 mr-2 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Submission
        </button>
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="btn-outline w-full text-red-600 border-red-300 hover:bg-red-50"
        >
          <svg
            className="w-4 h-4 mr-2 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete Submission
        </button>
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 no-print">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete Submission?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Are you sure you want to delete this submission? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission content */}
      <div className="space-y-6">
        {sectionNames.map((sectionName, index) => (
          <div key={sectionName} className="card">
            {/* Section header */}
            <div className="mb-5 pb-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {index + 1}. {sectionName}
              </h2>
            </div>

            {/* Section answers */}
            <div className="space-y-4">
              {groupedAnswers[sectionName].map((answer) => (
                <div key={answer.fieldId}>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {answer.fieldLabel}
                  </div>
                  <div className="text-base text-gray-900">
                    {formatAnswerValue(answer)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Print footer */}
      <div className="hidden print:block mt-8 pt-6 border-t border-gray-300 text-sm text-gray-600">
        <p>
          Generated: {format(new Date(), 'PPPp')}
        </p>
        <p className="mt-1">
          Submission ID: {submission.id}
        </p>
      </div>
    </div>
  );
}
