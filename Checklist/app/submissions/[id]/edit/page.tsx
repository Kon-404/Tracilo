/**
 * Edit Submission Page
 *
 * Allows editing of an existing submission.
 * Pre-populates form with existing data.
 *
 * Route: /submissions/[id]/edit
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormTemplate, FormAnswer, FormSubmission } from '@/types';
import FormField from '@/components/FormField';

interface EditSubmissionPageProps {
  params: {
    id: string;
  };
}

export default function EditSubmissionPage({ params }: EditSubmissionPageProps) {
  const router = useRouter();
  const [template, setTemplate] = useState<FormTemplate | null>(null);
  const [submission, setSubmission] = useState<FormSubmission | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load submission and template on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch submission
        const submissionResponse = await fetch(`/api/submissions/${params.id}`);
        if (!submissionResponse.ok) {
          console.error('Submission not found');
          setIsLoading(false);
          return;
        }

        const submissionData = await submissionResponse.json();
        const loadedSubmission: FormSubmission = {
          ...submissionData,
          submittedAt: new Date(submissionData.submittedAt),
        };
        setSubmission(loadedSubmission);

        // Fetch template
        const templateResponse = await fetch(`/api/templates/${loadedSubmission.templateId}`);
        if (templateResponse.ok) {
          const templateData = await templateResponse.json();
          const loadedTemplate: FormTemplate = {
            ...templateData,
            createdAt: new Date(templateData.createdAt),
            updatedAt: new Date(templateData.updatedAt),
          };
          setTemplate(loadedTemplate);

          // Pre-populate form data from submission
          const initialData: Record<string, any> = {};
          loadedSubmission.answers.forEach((answer) => {
            initialData[answer.fieldId] = answer.value;
          });
          setFormData(initialData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  /**
   * Handle field value change
   */
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error for this field
    if (errors[fieldId]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldId];
        return updated;
      });
    }
  };

  /**
   * Validate form before submission
   */
  const validateForm = (): boolean => {
    if (!template) return false;

    const newErrors: Record<string, string> = {};

    template.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required) {
          const value = formData[field.id];

          if (value === undefined || value === null || value === '') {
            newErrors[field.id] = 'This field is required';
          }

          if (field.type === 'checkbox' && !value) {
            newErrors[field.id] = 'This field must be checked';
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!template || !submission) return;

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Build answers array
      const answers: FormAnswer[] = [];

      template.sections.forEach((section) => {
        section.fields.forEach((field) => {
          const value = formData[field.id];

          answers.push({
            fieldId: field.id,
            fieldLabel: field.label,
            fieldType: field.type,
            sectionTitle: section.title,
            value: value !== undefined && value !== null ? value : null,
          });
        });
      });

      // Create updated submission object
      const updatedSubmission: FormSubmission = {
        ...submission,
        answers,
      };

      // Update via API
      const response = await fetch(`/api/submissions/${submission.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSubmission),
      });

      if (response.ok) {
        // Navigate back to submission view
        router.push(`/submissions/${submission.id}`);
      } else {
        alert('Error updating submission. Please try again.');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Calculate completion progress
   */
  const calculateProgress = (): number => {
    if (!template) return 0;

    const totalFields = template.sections.reduce(
      (sum, section) => sum + section.fields.length,
      0
    );

    if (totalFields === 0) return 0;

    const completedFields = Object.keys(formData).filter((key) => {
      const value = formData[key];
      return value !== undefined && value !== null && value !== '';
    }).length;

    return Math.round((completedFields / totalFields) * 100);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container-mobile">
        <div className="card text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  // Not found state
  if (!template || !submission) {
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

  const progress = calculateProgress();
  const errorCount = Object.keys(errors).length;

  return (
    <div className="container-mobile">
      {/* Header */}
      <div className="mb-6">
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
          Cancel
        </button>

        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
            {template.icon || '📋'}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Edit: {template.name}
            </h1>
            <p className="text-gray-600 text-sm mt-1">Update your submission</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Error summary */}
      {errorCount > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800">
                Please fix {errorCount} error{errorCount !== 1 ? 's' : ''} before
                saving
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {template.sections.map((section, sectionIndex) => (
          <div key={section.id} className="card">
            {/* Section header */}
            <div className="mb-5 pb-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {sectionIndex + 1}. {section.title}
              </h2>
              {section.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {section.description}
                </p>
              )}
            </div>

            {/* Section fields */}
            <div className="space-y-1">
              {section.fields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formData[field.id]}
                  onChange={(value) => handleFieldChange(field.id, value)}
                  error={errors[field.id]}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Submit buttons */}
        <div className="sticky bottom-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
