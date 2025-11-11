/**
 * Core type definitions for the Checklist application
 *
 * This file contains all TypeScript interfaces and types used throughout the app.
 * Designed to be extensible and support future features without breaking changes.
 */

/**
 * Supported field types for form fields
 * Can be extended to include signature, GPS, file upload, etc.
 */
export type FieldType =
  | 'text'           // Single-line text input
  | 'textarea'       // Multi-line text input
  | 'number'         // Numeric input with optional min/max
  | 'dropdown'       // Select from predefined options
  | 'checkbox'       // Boolean yes/no
  | 'date'           // Date picker
  | 'time'           // Time picker
  | 'photo'          // Photo upload (stubbed in MVP)
  | 'signature';     // Signature capture (stubbed in MVP)

/**
 * Category types for templates
 * Extensible to support new categories without code changes
 */
export type TemplateCategory =
  | 'vehicle'
  | 'solar'
  | 'gas'
  | string; // Allow custom categories

/**
 * Status of a form submission
 */
export type SubmissionStatus = 'draft' | 'completed';

/**
 * Type-specific configuration for different field types
 */
export interface FieldConfig {
  // For dropdown fields
  options?: string[];

  // For number fields
  min?: number;
  max?: number;
  step?: number;
  unit?: string; // e.g., "km", "V", "PSI"

  // For text/textarea fields
  maxLength?: number;
  pattern?: string;

  // For photo fields
  maxFiles?: number;
  acceptedFormats?: string[];

  // Future: validation rules, conditional logic, etc.
  [key: string]: any;
}

/**
 * Individual form field definition
 * Represents a single input in a form section
 */
export interface FormField {
  id: string;
  sectionId: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;      // Additional guidance for the user
  required: boolean;
  order: number;          // Display order within section
  config?: FieldConfig;   // Type-specific configuration
}

/**
 * Logical section within a template
 * Groups related fields together (e.g., "Safety Checks", "Equipment Inspection")
 */
export interface FormSection {
  id: string;
  templateId: string;
  title: string;
  description?: string;
  order: number;          // Display order within template
  fields: FormField[];
}

/**
 * Complete form template definition
 * Represents a reusable checklist or inspection form
 */
export interface FormTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  icon?: string;          // Icon identifier for UI (e.g., "🚗", "☀️", "🔥")
  sections: FormSection[];
  createdAt: Date;
  updatedAt: Date;
  version?: number;       // Future: template versioning
}

/**
 * Individual field answer in a submission
 * Stores the user's response to a form field
 */
export interface FormAnswer {
  fieldId: string;
  fieldLabel: string;     // Denormalized for easier PDF generation
  fieldType: FieldType;
  sectionTitle: string;   // Denormalized for easier display
  value: string | string[] | boolean | number | null;
  photoUrls?: string[];   // Future: uploaded photo URLs
}

/**
 * Complete form submission
 * Represents a filled-out instance of a template
 */
export interface FormSubmission {
  id: string;
  templateId: string;
  templateName: string;   // Denormalized for display
  category: TemplateCategory;
  submittedAt: Date;
  submittedBy?: string;   // Future: user ID or name
  status: SubmissionStatus;
  answers: FormAnswer[];
  metadata?: {            // Future: GPS, weather, device info, etc.
    location?: string;
    deviceInfo?: string;
    [key: string]: any;
  };
}

/**
 * Template summary for list views
 * Lightweight version without full section/field details
 */
export interface TemplateSummary {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  icon?: string;
  fieldCount: number;
  sectionCount: number;
}

/**
 * Submission summary for list views
 */
export interface SubmissionSummary {
  id: string;
  templateId: string;
  templateName: string;
  category: TemplateCategory;
  submittedAt: Date;
  status: SubmissionStatus;
  completionPercentage: number;
}
