/**
 * TemplateCard Component
 *
 * Displays a clickable card for a form template.
 * Optimized for mobile touch targets and visual hierarchy.
 */

import { FormTemplate } from '@/types';
import Link from 'next/link';

interface TemplateCardProps {
  template: FormTemplate;
}

/**
 * Calculate total field count across all sections
 */
function getFieldCount(template: FormTemplate): number {
  return template.sections.reduce((total, section) => {
    return total + section.fields.length;
  }, 0);
}

/**
 * Get category display styling
 */
function getCategoryBadgeClass(category: string): string {
  const classes: Record<string, string> = {
    vehicle: 'bg-blue-100 text-blue-800',
    solar: 'bg-yellow-100 text-yellow-800',
    gas: 'bg-red-100 text-red-800',
  };

  return classes[category] || 'badge-gray';
}

/**
 * Template card component with mobile-optimized layout
 */
export default function TemplateCard({ template }: TemplateCardProps) {
  const fieldCount = getFieldCount(template);

  return (
    <Link href={`/form/${template.id}`}>
      <div className="card-hover">
        {/* Icon and category badge row */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
            {template.icon || '📋'}
          </div>

          <span
            className={`badge ${getCategoryBadgeClass(template.category)}`}
          >
            {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
          </span>
        </div>

        {/* Template name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {template.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Metadata footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <span>{template.sections.length} sections</span>
          <span>{fieldCount} fields</span>
        </div>

        {/* Visual indicator for clickability */}
        <div className="mt-3 flex items-center text-primary-600 text-sm font-medium">
          <span>Start checklist</span>
          <svg
            className="w-4 h-4 ml-1"
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
  );
}
