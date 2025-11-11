/**
 * Local storage utilities for form submissions
 *
 * In MVP, we use browser localStorage for persistence.
 * This will be replaced with database calls in production.
 *
 * Storage keys:
 * - 'checklist_submissions': Array of FormSubmission objects
 */

import { FormSubmission } from '@/types';

const SUBMISSIONS_KEY = 'checklist_submissions';

/**
 * Check if localStorage is available
 * Handles SSR and privacy mode scenarios
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all submissions from localStorage
 * @returns Array of submissions, or empty array if none exist
 */
export function getAllSubmissions(): FormSubmission[] {
  if (!isLocalStorageAvailable()) return [];

  try {
    const data = window.localStorage.getItem(SUBMISSIONS_KEY);
    if (!data) return [];

    const submissions = JSON.parse(data);

    // Parse date strings back to Date objects
    return submissions.map((sub: any) => ({
      ...sub,
      submittedAt: new Date(sub.submittedAt),
    }));
  } catch (error) {
    console.error('Error reading submissions from localStorage:', error);
    return [];
  }
}

/**
 * Get a single submission by ID
 * @param id - Submission ID
 * @returns Submission or undefined if not found
 */
export function getSubmissionById(id: string): FormSubmission | undefined {
  const submissions = getAllSubmissions();
  return submissions.find((sub) => sub.id === id);
}

/**
 * Get submissions for a specific template
 * @param templateId - Template ID to filter by
 * @returns Array of matching submissions
 */
export function getSubmissionsByTemplate(templateId: string): FormSubmission[] {
  const submissions = getAllSubmissions();
  return submissions.filter((sub) => sub.templateId === templateId);
}

/**
 * Save a new submission
 * @param submission - Submission to save
 * @returns true if successful, false otherwise
 */
export function saveSubmission(submission: FormSubmission): boolean {
  if (!isLocalStorageAvailable()) {
    console.error('localStorage not available');
    return false;
  }

  try {
    const submissions = getAllSubmissions();

    // Check if submission already exists (update scenario)
    const existingIndex = submissions.findIndex((sub) => sub.id === submission.id);

    if (existingIndex >= 0) {
      submissions[existingIndex] = submission;
    } else {
      submissions.push(submission);
    }

    window.localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    return true;
  } catch (error) {
    console.error('Error saving submission:', error);
    return false;
  }
}

/**
 * Delete a submission by ID
 * @param id - Submission ID to delete
 * @returns true if successful, false otherwise
 */
export function deleteSubmission(id: string): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    const submissions = getAllSubmissions();
    const filtered = submissions.filter((sub) => sub.id !== id);

    window.localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting submission:', error);
    return false;
  }
}

/**
 * Clear all submissions (for testing/debugging)
 * Use with caution!
 */
export function clearAllSubmissions(): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    window.localStorage.removeItem(SUBMISSIONS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing submissions:', error);
    return false;
  }
}

/**
 * Generate a unique ID for submissions
 * Simple implementation for MVP; use UUID library in production
 */
export function generateId(): string {
  return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
