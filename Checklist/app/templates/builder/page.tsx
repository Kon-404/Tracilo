'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FieldType } from '@/types';

interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  order: number;
  config?: any;
}

interface Section {
  id: string;
  title: string;
  description?: string;
  order: number;
  fields: Field[];
}

export default function TemplateBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('id');
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [templateId]);

  const loadTemplate = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/templates/${id}`);
      if (response.ok) {
        const template = await response.json();
        setName(template.name);
        setCategory(template.category);
        setDescription(template.description);
        setIcon(template.icon || '');
        setIsPublic(template.isPublic);
        setSections(template.sections || []);
      }
    } catch (error) {
      console.error('Error loading template:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    const newSection: Section = {
      id: `temp-${Date.now()}`,
      title: 'New Section',
      description: '',
      order: sections.length,
      fields: [],
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const addField = (sectionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const newField: Field = {
            id: `temp-field-${Date.now()}`,
            type: 'text',
            label: 'New Field',
            required: false,
            order: section.fields.length,
          };
          return {
            ...section,
            fields: [...section.fields, newField],
          };
        }
        return section;
      })
    );
  };

  const updateField = (
    sectionId: string,
    fieldId: string,
    updates: Partial<Field>
  ) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.map((field) =>
              field.id === fieldId ? { ...field, ...updates } : field
            ),
          };
        }
        return section;
      })
    );
  };

  const deleteField = (sectionId: string, fieldId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.filter((field) => field.id !== fieldId),
          };
        }
        return section;
      })
    );
  };

  const moveFieldUp = (sectionId: string, fieldIndex: number) => {
    if (fieldIndex === 0) return;

    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const newFields = [...section.fields];
          [newFields[fieldIndex - 1], newFields[fieldIndex]] = [
            newFields[fieldIndex],
            newFields[fieldIndex - 1],
          ];
          return { ...section, fields: newFields };
        }
        return section;
      })
    );
  };

  const moveFieldDown = (sectionId: string, fieldIndex: number) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          if (fieldIndex >= section.fields.length - 1) return section;
          const newFields = [...section.fields];
          [newFields[fieldIndex], newFields[fieldIndex + 1]] = [
            newFields[fieldIndex + 1],
            newFields[fieldIndex],
          ];
          return { ...section, fields: newFields };
        }
        return section;
      })
    );
  };

  const handleSave = async () => {
    if (!name || !category || !description) {
      alert('Please fill in all required fields (name, category, description)');
      return;
    }

    if (sections.length === 0) {
      alert('Please add at least one section');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name,
        category,
        description,
        icon,
        isPublic,
        sections: sections.map((section, idx) => ({
          title: section.title,
          description: section.description,
          order: idx,
          fields: section.fields.map((field, fieldIdx) => ({
            type: field.type,
            label: field.label,
            placeholder: field.placeholder,
            helpText: field.helpText,
            required: field.required,
            order: fieldIdx,
            config: field.config,
          })),
        })),
      };

      const url = templateId
        ? `/api/templates/${templateId}`
        : '/api/templates';
      const method = templateId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(templateId ? 'Template updated successfully!' : 'Template created successfully!');
        router.push('/templates');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const fieldTypes: FieldType[] = [
    'text',
    'textarea',
    'number',
    'dropdown',
    'checkbox',
    'date',
    'time',
    'photo',
    'signature',
  ];

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
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Title with Back Button */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => router.push('/templates')}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {templateId ? 'Edit Template' : 'Create Template'}
          </h1>
        </div>
        {/* Template Basic Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Template Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Electrical Installation Checklist"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., electrical, plumbing, HVAC"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (Emoji)
              </label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="⚡"
                maxLength={2}
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Make this template public (visible to other organizations)
                </span>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe what this template is used for..."
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4 mb-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    updateSection(section.id, { title: e.target.value })
                  }
                  className="text-lg font-semibold text-gray-900 border-0 border-b-2 border-transparent hover:border-gray-300 focus:border-primary-500 focus:ring-0 px-0"
                  placeholder="Section Title"
                />
                <button
                  onClick={() => deleteSection(section.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Delete Section
                </button>
              </div>

              <input
                type="text"
                value={section.description || ''}
                onChange={(e) =>
                  updateSection(section.id, { description: e.target.value })
                }
                className="w-full text-sm text-gray-600 border-0 border-b border-transparent hover:border-gray-200 focus:border-primary-500 focus:ring-0 px-0 mb-4"
                placeholder="Section description (optional)"
              />

              {/* Fields */}
              <div className="space-y-3 mb-4">
                {section.fields.map((field, fieldIndex) => (
                  <div
                    key={field.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => moveFieldUp(section.id, fieldIndex)}
                            disabled={fieldIndex === 0}
                            className="text-gray-600 hover:text-primary-600 disabled:text-gray-300 disabled:cursor-not-allowed p-1"
                            title="Move up"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => moveFieldDown(section.id, fieldIndex)}
                            disabled={fieldIndex === section.fields.length - 1}
                            className="text-gray-600 hover:text-primary-600 disabled:text-gray-300 disabled:cursor-not-allowed p-1"
                            title="Move down"
                          >
                            ▼
                          </button>
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                          Field #{fieldIndex + 1}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteField(section.id, field.id)}
                        className="text-red-600 hover:text-red-700 text-xs font-medium"
                      >
                        Delete Field
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Field Label
                        </label>
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) =>
                            updateField(section.id, field.id, {
                              label: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                          placeholder="Field name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Field Type
                        </label>
                        <select
                          value={field.type}
                          onChange={(e) =>
                            updateField(section.id, field.id, {
                              type: e.target.value as FieldType,
                            })
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                        >
                          {fieldTypes.map((type) => (
                            <option key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-end gap-2">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) =>
                              updateField(section.id, field.id, {
                                required: e.target.checked,
                              })
                            }
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-xs text-gray-700">
                            Required
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Placeholder
                        </label>
                        <input
                          type="text"
                          value={field.placeholder || ''}
                          onChange={(e) =>
                            updateField(section.id, field.id, {
                              placeholder: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                          placeholder="Hint text..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Help Text
                        </label>
                        <input
                          type="text"
                          value={field.helpText || ''}
                          onChange={(e) =>
                            updateField(section.id, field.id, {
                              helpText: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                          placeholder="Additional guidance..."
                        />
                      </div>
                    </div>

                    {/* Field-specific config */}
                    {field.type === 'dropdown' && (
                      <div className="mt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Options (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={field.config?.options?.join(', ') || ''}
                          onChange={(e) =>
                            updateField(section.id, field.id, {
                              config: {
                                options: e.target.value
                                  .split(',')
                                  .map((o) => o.trim())
                                  .filter((o) => o),
                              },
                            })
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                          placeholder="Option 1, Option 2, Option 3"
                        />
                      </div>
                    )}

                    {field.type === 'number' && (
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Min
                          </label>
                          <input
                            type="number"
                            value={field.config?.min || ''}
                            onChange={(e) =>
                              updateField(section.id, field.id, {
                                config: {
                                  ...field.config,
                                  min: e.target.value ? Number(e.target.value) : undefined,
                                },
                              })
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Max
                          </label>
                          <input
                            type="number"
                            value={field.config?.max || ''}
                            onChange={(e) =>
                              updateField(section.id, field.id, {
                                config: {
                                  ...field.config,
                                  max: e.target.value ? Number(e.target.value) : undefined,
                                },
                              })
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Unit
                          </label>
                          <input
                            type="text"
                            value={field.config?.unit || ''}
                            onChange={(e) =>
                              updateField(section.id, field.id, {
                                config: { ...field.config, unit: e.target.value },
                              })
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                            placeholder="e.g., V, A, mm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => addField(section.id)}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                + Add Field
              </button>
            </div>
          ))}
        </div>

        {/* Add Section Button */}
        <button
          onClick={addSection}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors font-medium mb-6"
        >
          + Add Section
        </button>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/templates')}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
          >
            {saving ? 'Saving...' : templateId ? 'Update Template' : 'Create Template'}
          </button>
        </div>
      </div>
    </div>
  );
}
