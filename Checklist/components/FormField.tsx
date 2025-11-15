/**
 * FormField Component
 *
 * Dynamically renders form fields based on field type.
 * Handles all supported field types: text, textarea, number, dropdown, checkbox, date, time, photo.
 *
 * Mobile-optimized with proper input types for native keyboard displays.
 */

'use client';

import { useState } from 'react';
import { FormField as FormFieldType } from '@/types';
import { uploadPhoto } from '@/lib/storage-client';
import SignatureCanvas from '@/components/SignatureCanvas';

interface FormFieldProps {
  field: FormFieldType;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

/**
 * Dynamic form field renderer
 */
export default function FormField({
  field,
  value,
  onChange,
  error,
}: FormFieldProps) {
  const { type, label, placeholder, helpText, required, config } = field;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /**
   * Render label with required indicator
   */
  const renderLabel = () => (
    <label
      htmlFor={field.id}
      className={required ? 'label label-required' : 'label'}
    >
      {label}
    </label>
  );

  /**
   * Render help text if provided
   */
  const renderHelpText = () =>
    helpText && <p className="help-text">{helpText}</p>;

  /**
   * Render error message if provided
   */
  const renderError = () => error && <p className="error-text">{error}</p>;

  /**
   * Render field based on type
   */
  const renderInput = () => {
    const baseClasses = error ? 'input-error' : 'input';

    switch (type) {
      case 'text':
        return (
          <input
            id={field.id}
            type="text"
            className={baseClasses}
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            maxLength={config?.maxLength}
            pattern={config?.pattern}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={field.id}
            className={`${baseClasses} min-h-[100px] resize-y`}
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            maxLength={config?.maxLength}
            rows={4}
          />
        );

      case 'number':
        return (
          <div className="relative">
            <input
              id={field.id}
              type="number"
              inputMode="numeric" // Mobile keyboard optimization
              className={baseClasses}
              placeholder={placeholder}
              value={value || ''}
              onChange={(e) =>
                onChange(e.target.value ? parseFloat(e.target.value) : null)
              }
              required={required}
              min={config?.min}
              max={config?.max}
              step={config?.step || 1}
            />
            {config?.unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                {config.unit}
              </span>
            )}
          </div>
        );

      case 'dropdown':
        return (
          <select
            id={field.id}
            className={baseClasses}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={required}
          >
            <option value="">
              {placeholder || 'Select an option...'}
            </option>
            {config?.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-start space-x-3 py-2">
            <input
              id={field.id}
              type="checkbox"
              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-500 mt-0.5 tap-target"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              required={required}
            />
            <label
              htmlFor={field.id}
              className="text-sm text-gray-700 flex-1 cursor-pointer select-none"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
              {helpText && (
                <span className="block text-gray-500 mt-1">{helpText}</span>
              )}
            </label>
          </div>
        );

      case 'date':
        return (
          <input
            id={field.id}
            type="date"
            className={baseClasses}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={required}
          />
        );

      case 'time':
        return (
          <input
            id={field.id}
            type="time"
            className={baseClasses}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={required}
          />
        );

      case 'photo': {
        const photos = Array.isArray(value) ? value : value ? [value] : [];
        const maxFiles = config?.maxFiles || 5;
        const canAddMore = photos.length < maxFiles;

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (!files || files.length === 0) return;

          setIsUploading(true);
          setUploadError(null);

          try {
            const uploadPromises = Array.from(files).map((file) => uploadPhoto(file));
            const uploadedUrls = await Promise.all(uploadPromises);

            // Filter out failed uploads
            const successfulUrls = uploadedUrls.filter((url) => url !== null) as string[];

            if (successfulUrls.length === 0) {
              setUploadError('Failed to upload photos. Please try again.');
              return;
            }

            // Add new URLs to existing photos
            const newPhotos = [...photos, ...successfulUrls].slice(0, maxFiles);
            onChange(newPhotos);
          } catch (err) {
            console.error('Upload error:', err);
            setUploadError('An error occurred during upload.');
          } finally {
            setIsUploading(false);
            // Reset file input
            e.target.value = '';
          }
        };

        const handleRemovePhoto = (index: number) => {
          const newPhotos = photos.filter((_: any, i: number) => i !== index);
          onChange(newPhotos.length > 0 ? newPhotos : null);
        };

        return (
          <div>
            {/* Photo previews */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-3">
                {photos.map((photoUrl: string, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={photoUrl}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload button */}
            {canAddMore && (
              <label
                className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors block ${
                  isUploading ? 'opacity-50 cursor-wait' : ''
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple={maxFiles > 1}
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="hidden"
                />
                {isUploading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-2"></div>
                    <p className="text-sm text-gray-600">Uploading...</p>
                  </>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {photos.length === 0 ? 'Click to upload photos' : 'Add more photos'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {photos.length} / {maxFiles} uploaded
                    </p>
                  </>
                )}
              </label>
            )}

            {/* Upload error */}
            {uploadError && (
              <p className="mt-2 text-sm text-red-600">{uploadError}</p>
            )}
          </div>
        );
      }

      case 'signature':
        return (
          <SignatureCanvas
            value={value || ''}
            onChange={onChange}
            width={config?.width || 400}
            height={config?.height || 200}
          />
        );

      default:
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            Unsupported field type: {type}
          </div>
        );
    }
  };

  // Checkbox has its own layout (label integrated)
  if (type === 'checkbox') {
    return (
      <div className="mb-5">
        {renderInput()}
        {renderError()}
      </div>
    );
  }

  // Standard field layout
  return (
    <div className="mb-5">
      {renderLabel()}
      {renderInput()}
      {renderHelpText()}
      {renderError()}
    </div>
  );
}
