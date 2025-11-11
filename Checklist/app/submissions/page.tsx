/**
 * Submissions List Page
 *
 * Displays all completed form submissions.
 * Groups by template and shows key metadata.
 *
 * Route: /submissions
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FormSubmission } from '@/types';
import { format } from 'date-fns';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  // Load submissions on mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/submissions');
        if (response.ok) {
          const data = await response.json();
          // Convert date strings to Date objects and sort
          const loadedSubmissions: FormSubmission[] = data.map((sub: any) => ({
            ...sub,
            submittedAt: new Date(sub.submittedAt),
          }));
          loadedSubmissions.sort(
            (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
          );
          setSubmissions(loadedSubmissions);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  /**
   * Get unique categories from submissions
   */
  const categories = Array.from(
    new Set(submissions.map((sub) => sub.category))
  );

  /**
   * Filter submissions by category, search, status, and date
   */
  const filteredSubmissions = submissions.filter((sub) => {
    // Category filter
    if (filter !== 'all' && sub.category !== filter) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && sub.status !== statusFilter) {
      return false;
    }

    // Search filter (template name or submitted by)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTemplate = sub.templateName.toLowerCase().includes(query);
      const matchesSubmittedBy = sub.submittedBy?.toLowerCase().includes(query);
      if (!matchesTemplate && !matchesSubmittedBy) {
        return false;
      }
    }

    // Date range filter
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      if (sub.submittedAt < fromDate) {
        return false;
      }
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      if (sub.submittedAt > toDate) {
        return false;
      }
    }

    return true;
  });

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
   * Format date for display
   */
  const formatDate = (date: Date): string => {
    try {
      return format(date, 'PPp'); // e.g., "Apr 29, 2023, 9:30 AM"
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="container-mobile">
      {/* Page header */}
      <div className="page-header">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Submissions
        </h1>
        <p className="text-gray-600">
          View and manage your completed checklists
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {submissions.length}
          </div>
          <div className="text-xs text-gray-600 mt-1">Total Submissions</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {
              submissions.filter((sub) => sub.status === 'completed').length
            }
          </div>
          <div className="text-xs text-gray-600 mt-1">Completed</div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="card mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Search & Filter</h3>

        {/* Search bar */}
        <div className="mb-4">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by template name or submitted by..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Date range */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status filter */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Clear filters button */}
        {(searchQuery || statusFilter !== 'all' || dateFrom || dateTo || filter !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setDateFrom('');
              setDateTo('');
              setFilter('all');
            }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All ({submissions.length})
            </button>
            {categories.map((category) => {
              const count = submissions.filter(
                (sub) => sub.category === category
              ).length;
              return (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results count */}
      {filteredSubmissions.length !== submissions.length && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredSubmissions.length} of {submissions.length} submissions
        </div>
      )}

      {/* Submissions list */}
      {filteredSubmissions.length > 0 ? (
        <div className="space-y-3">
          {filteredSubmissions.map((submission) => (
            <Link key={submission.id} href={`/submissions/${submission.id}`}>
              <div className="card-hover">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {submission.templateName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(submission.submittedAt)}
                    </p>
                  </div>

                  <span
                    className={`badge ${getCategoryBadgeClass(
                      submission.category
                    )}`}
                  >
                    {submission.category}
                  </span>
                </div>

                {/* Submission meta */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{submission.answers.length} responses</span>
                    <span
                      className={`badge ${
                        submission.status === 'completed'
                          ? 'badge-success'
                          : 'badge-warning'
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>

                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="card text-center py-12">
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filter === 'all'
              ? 'No submissions yet'
              : `No ${filter} submissions`}
          </h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all'
              ? 'Complete a checklist to see it here'
              : 'Try selecting a different category'}
          </p>
          {filter === 'all' && (
            <Link href="/" className="btn-primary inline-block">
              Start a Checklist
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
