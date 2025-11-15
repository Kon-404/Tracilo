import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByTemplate,
  saveSubmission,
  deleteSubmission,
  clearAllSubmissions,
  generateId,
} from '../storage';
import { FormSubmission } from '@/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Setup global mocks
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('getAllSubmissions', () => {
    it('returns empty array when no submissions exist', () => {
      const submissions = getAllSubmissions();
      expect(submissions).toEqual([]);
    });

    it('returns all submissions from localStorage', () => {
      const mockSubmissions: FormSubmission[] = [
        {
          id: 'sub_1',
          templateId: 'tpl_1',
          submitterName: 'John Doe',
          submittedAt: new Date('2025-01-01'),
          data: {},
          status: 'completed',
        },
        {
          id: 'sub_2',
          templateId: 'tpl_1',
          submitterName: 'Jane Doe',
          submittedAt: new Date('2025-01-02'),
          data: {},
          status: 'pending',
        },
      ];

      localStorageMock.setItem('checklist_submissions', JSON.stringify(mockSubmissions));

      const submissions = getAllSubmissions();
      expect(submissions).toHaveLength(2);
      expect(submissions[0].id).toBe('sub_1');
      expect(submissions[0].submittedAt).toBeInstanceOf(Date);
    });

    it('handles corrupted data gracefully', () => {
      localStorageMock.setItem('checklist_submissions', 'invalid json');
      const submissions = getAllSubmissions();
      expect(submissions).toEqual([]);
    });
  });

  describe('getSubmissionById', () => {
    it('returns undefined when submission not found', () => {
      const submission = getSubmissionById('non_existent');
      expect(submission).toBeUndefined();
    });

    it('returns the correct submission by ID', () => {
      const mockSubmissions: FormSubmission[] = [
        {
          id: 'sub_1',
          templateId: 'tpl_1',
          submitterName: 'John Doe',
          submittedAt: new Date('2025-01-01'),
          data: {},
          status: 'completed',
        },
        {
          id: 'sub_2',
          templateId: 'tpl_1',
          submitterName: 'Jane Doe',
          submittedAt: new Date('2025-01-02'),
          data: {},
          status: 'pending',
        },
      ];

      localStorageMock.setItem('checklist_submissions', JSON.stringify(mockSubmissions));

      const submission = getSubmissionById('sub_2');
      expect(submission).toBeDefined();
      expect(submission?.id).toBe('sub_2');
      expect(submission?.submitterName).toBe('Jane Doe');
    });
  });

  describe('getSubmissionsByTemplate', () => {
    it('returns empty array when no submissions match template', () => {
      const submissions = getSubmissionsByTemplate('non_existent');
      expect(submissions).toEqual([]);
    });

    it('returns only submissions for the specified template', () => {
      const mockSubmissions: FormSubmission[] = [
        {
          id: 'sub_1',
          templateId: 'tpl_1',
          submitterName: 'John Doe',
          submittedAt: new Date('2025-01-01'),
          data: {},
          status: 'completed',
        },
        {
          id: 'sub_2',
          templateId: 'tpl_2',
          submitterName: 'Jane Doe',
          submittedAt: new Date('2025-01-02'),
          data: {},
          status: 'pending',
        },
        {
          id: 'sub_3',
          templateId: 'tpl_1',
          submitterName: 'Bob Smith',
          submittedAt: new Date('2025-01-03'),
          data: {},
          status: 'completed',
        },
      ];

      localStorageMock.setItem('checklist_submissions', JSON.stringify(mockSubmissions));

      const submissions = getSubmissionsByTemplate('tpl_1');
      expect(submissions).toHaveLength(2);
      expect(submissions.every(sub => sub.templateId === 'tpl_1')).toBe(true);
    });
  });

  describe('saveSubmission', () => {
    it('saves a new submission to localStorage', () => {
      const newSubmission: FormSubmission = {
        id: 'sub_1',
        templateId: 'tpl_1',
        submitterName: 'John Doe',
        submittedAt: new Date('2025-01-01'),
        data: { field1: 'value1' },
        status: 'completed',
      };

      const result = saveSubmission(newSubmission);
      expect(result).toBe(true);

      const submissions = getAllSubmissions();
      expect(submissions).toHaveLength(1);
      expect(submissions[0].id).toBe('sub_1');
    });

    it('updates an existing submission', () => {
      const initialSubmission: FormSubmission = {
        id: 'sub_1',
        templateId: 'tpl_1',
        submitterName: 'John Doe',
        submittedAt: new Date('2025-01-01'),
        data: { field1: 'old_value' },
        status: 'pending',
      };

      saveSubmission(initialSubmission);

      const updatedSubmission: FormSubmission = {
        ...initialSubmission,
        data: { field1: 'new_value' },
        status: 'completed',
      };

      const result = saveSubmission(updatedSubmission);
      expect(result).toBe(true);

      const submissions = getAllSubmissions();
      expect(submissions).toHaveLength(1);
      expect(submissions[0].data.field1).toBe('new_value');
      expect(submissions[0].status).toBe('completed');
    });

    it('appends new submissions to existing ones', () => {
      const submission1: FormSubmission = {
        id: 'sub_1',
        templateId: 'tpl_1',
        submitterName: 'John Doe',
        submittedAt: new Date('2025-01-01'),
        data: {},
        status: 'completed',
      };

      const submission2: FormSubmission = {
        id: 'sub_2',
        templateId: 'tpl_1',
        submitterName: 'Jane Doe',
        submittedAt: new Date('2025-01-02'),
        data: {},
        status: 'pending',
      };

      saveSubmission(submission1);
      saveSubmission(submission2);

      const submissions = getAllSubmissions();
      expect(submissions).toHaveLength(2);
    });
  });

  describe('deleteSubmission', () => {
    it('removes a submission by ID', () => {
      const mockSubmissions: FormSubmission[] = [
        {
          id: 'sub_1',
          templateId: 'tpl_1',
          submitterName: 'John Doe',
          submittedAt: new Date('2025-01-01'),
          data: {},
          status: 'completed',
        },
        {
          id: 'sub_2',
          templateId: 'tpl_1',
          submitterName: 'Jane Doe',
          submittedAt: new Date('2025-01-02'),
          data: {},
          status: 'pending',
        },
      ];

      localStorageMock.setItem('checklist_submissions', JSON.stringify(mockSubmissions));

      const result = deleteSubmission('sub_1');
      expect(result).toBe(true);

      const submissions = getAllSubmissions();
      expect(submissions).toHaveLength(1);
      expect(submissions[0].id).toBe('sub_2');
    });

    it('returns true even if submission does not exist', () => {
      const result = deleteSubmission('non_existent');
      expect(result).toBe(true);
    });
  });

  describe('clearAllSubmissions', () => {
    it('removes all submissions from localStorage', () => {
      const mockSubmissions: FormSubmission[] = [
        {
          id: 'sub_1',
          templateId: 'tpl_1',
          submitterName: 'John Doe',
          submittedAt: new Date('2025-01-01'),
          data: {},
          status: 'completed',
        },
      ];

      localStorageMock.setItem('checklist_submissions', JSON.stringify(mockSubmissions));

      const result = clearAllSubmissions();
      expect(result).toBe(true);

      const submissions = getAllSubmissions();
      expect(submissions).toEqual([]);
    });
  });

  describe('generateId', () => {
    it('generates a unique ID with correct format', () => {
      const id = generateId();
      expect(id).toMatch(/^sub_\d+_[a-z0-9]+$/);
    });

    it('generates different IDs on successive calls', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('generates IDs that start with "sub_"', () => {
      const id = generateId();
      expect(id.startsWith('sub_')).toBe(true);
    });
  });
});
