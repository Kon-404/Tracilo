'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
  organizationId?: string;
  createdBy?: string;
  isPublic: boolean;
  version: number;
  organization?: {
    id: string;
    name: string;
  };
  creator?: {
    id: string;
    fullName?: string;
    email: string;
  };
  sections: any[];
}

export default function TemplatesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'system' | 'organization'>('all');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTemplates(templates.filter((t) => t.id !== templateId));
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete template');
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      alert('Failed to delete template');
    }
  };

  const filteredTemplates = templates.filter((template) => {
    if (filter === 'system') return !template.organizationId;
    if (filter === 'organization') return !!template.organizationId;
    return true;
  });

  const groupedTemplates = filteredTemplates.reduce((acc, template) => {
    const category = template.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Templates</h1>

        {/* Header Actions */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              All Templates
            </button>
            <button
              onClick={() => setFilter('system')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'system'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              System
            </button>
            <button
              onClick={() => setFilter('organization')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'organization'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Organization
            </button>
          </div>

          <button
            onClick={() => router.push('/templates/builder')}
            className="w-full sm:w-auto px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            + Create Template
          </button>
        </div>

        {/* Templates Grid */}
        {Object.keys(groupedTemplates).length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">No templates found</p>
            <button
              onClick={() => router.push('/templates/builder')}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Create Your First Template
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
              <div key={category}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {template.icon && (
                            <span className="text-3xl">{template.icon}</span>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {template.name}
                            </h3>
                            {template.organization && (
                              <p className="text-xs text-gray-500">
                                {template.organization.name}
                              </p>
                            )}
                          </div>
                        </div>
                        {!template.organizationId && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            System
                          </span>
                        )}
                        {template.isPublic && template.organizationId && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            Public
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {template.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{template.sections.length} sections</span>
                        <span>v{template.version}</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/form/${template.id}`)}
                          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                        >
                          Use Template
                        </button>
                        {template.organizationId && (
                          <>
                            <button
                              onClick={() =>
                                router.push(`/templates/builder?id=${template.id}`)
                              }
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(template.id)}
                              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
