/**
 * Home Page
 *
 * Displays all available form templates as clickable cards.
 * Mobile-first design with responsive grid layout.
 */

import { Metadata } from 'next';
import { getAllTemplates } from '@/lib/db';
import TemplateCard from '@/components/TemplateCard';

export const metadata: Metadata = {
  title: 'Home - Select a Checklist',
  description: 'Choose from professional inspection templates for vehicle, solar, and gas installations. Start your compliance check in seconds.',
  openGraph: {
    title: 'Checklist Templates - Start Your Inspection',
    description: 'Choose from professional inspection templates for vehicle, solar, and gas installations.',
  },
};

// Enable static generation with revalidation
export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const allTemplates = await getAllTemplates();
  return (
    <div className="container-mobile">
      {/* Page header */}
      <div className="page-header">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Select a Checklist
        </h1>
        <p className="text-gray-600">
          Choose a template to start your inspection or compliance check
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {allTemplates.length}
          </div>
          <div className="text-xs text-gray-600 mt-1">Templates</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {allTemplates.reduce((sum, t) => sum + t.sections.length, 0)}
          </div>
          <div className="text-xs text-gray-600 mt-1">Sections</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">
            {allTemplates.reduce(
              (sum, t) =>
                sum +
                t.sections.reduce((s, sec) => s + sec.fields.length, 0),
              0
            )}
          </div>
          <div className="text-xs text-gray-600 mt-1">Fields</div>
        </div>
      </div>

      {/* Templates grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {/* Empty state (for future when templates might be filtered) */}
      {allTemplates.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No templates available
          </h3>
          <p className="text-gray-600">
            Check back later or contact your administrator
          </p>
        </div>
      )}

      {/* Help section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          How it works
        </h4>
        <ol className="text-sm text-blue-800 space-y-1 ml-7 list-decimal">
          <li>Select a checklist template from the cards above</li>
          <li>Fill in all required fields and complete each section</li>
          <li>Submit the form to save your inspection</li>
          <li>View and download your submissions as PDFs</li>
        </ol>
      </div>
    </div>
  );
}
