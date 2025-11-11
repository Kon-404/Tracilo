/**
 * PDF Template Component
 *
 * React-PDF template for rendering form submissions as professional PDFs.
 * Uses Document, Page, View, Text components from @react-pdf/renderer.
 */

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import { FormSubmission, FormAnswer } from '@/types';
import { styles, getCategoryBadgeStyle } from './styles';
import { format } from 'date-fns';

interface SubmissionPDFProps {
  submission: FormSubmission;
}

/**
 * Format answer value for display in PDF
 */
function formatAnswerValue(answer: FormAnswer): string {
  const { value, fieldType } = answer;

  if (value === null || value === undefined || value === '') {
    return '—'; // Em dash for empty
  }

  if (fieldType === 'checkbox') {
    return value ? '✓ Yes' : '✗ No';
  }

  // Photos are handled separately in the component
  if (fieldType === 'photo') {
    const photos = Array.isArray(value) ? value : value ? [value] : [];
    return photos.length > 0 ? `${photos.length} photo(s)` : '—';
  }

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return String(value);
}

/**
 * Group answers by section title
 */
function groupAnswersBySection(
  answers: FormAnswer[]
): Record<string, FormAnswer[]> {
  const grouped: Record<string, FormAnswer[]> = {};

  answers.forEach((answer) => {
    const section = answer.sectionTitle;
    if (!grouped[section]) {
      grouped[section] = [];
    }
    grouped[section].push(answer);
  });

  return grouped;
}

/**
 * Header component with branding and metadata
 */
const PDFHeader: React.FC<{ submission: FormSubmission }> = ({ submission }) => {
  return (
    <View style={styles.header}>
      {/* Branding and badge */}
      <View style={styles.headerTop}>
        <View style={styles.branding}>
          {/* Logo placeholder (replace with actual logo) */}
          <View style={styles.logo} />
          <View style={styles.brandText}>
            <Text style={styles.appName}>Checklist App</Text>
            <Text style={styles.tagline}>Professional Inspection Forms</Text>
          </View>
        </View>

        {/* Category badge */}
        <View style={getCategoryBadgeStyle(submission.category)}>
          <Text>
            {submission.category.charAt(0).toUpperCase() +
              submission.category.slice(1)}
          </Text>
        </View>
      </View>

      {/* Template name and description */}
      <Text style={styles.templateName}>{submission.templateName}</Text>

      {/* Metadata grid */}
      <View style={styles.metadataGrid}>
        <View style={styles.metadataItem}>
          <Text style={styles.metadataLabel}>Submission ID</Text>
          <Text style={styles.metadataValue}>{submission.id}</Text>
        </View>

        <View style={styles.metadataItem}>
          <Text style={styles.metadataLabel}>Submitted</Text>
          <Text style={styles.metadataValue}>
            {format(new Date(submission.submittedAt), 'PPp')}
          </Text>
        </View>

        <View style={styles.metadataItem}>
          <Text style={styles.metadataLabel}>Status</Text>
          <View style={styles.badgeSuccess}>
            <Text>
              {submission.status.charAt(0).toUpperCase() +
                submission.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.metadataItem}>
          <Text style={styles.metadataLabel}>Responses</Text>
          <Text style={styles.metadataValue}>{submission.answers.length}</Text>
        </View>
      </View>
    </View>
  );
};

/**
 * Section component with fields
 */
const PDFSection: React.FC<{
  title: string;
  index: number;
  answers: FormAnswer[];
}> = ({ title, index, answers }) => {
  return (
    <View style={styles.section} wrap={false}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {index + 1}. {title}
        </Text>
      </View>

      {/* Fields/Answers */}
      {answers.map((answer, i) => {
        const photos = answer.fieldType === 'photo' && Array.isArray(answer.value)
          ? answer.value
          : answer.fieldType === 'photo' && answer.value
          ? [answer.value]
          : [];

        return (
          <View key={i} style={styles.field}>
            <Text style={styles.fieldLabel}>{answer.fieldLabel}</Text>

            {answer.fieldType === 'checkbox' ? (
              <View style={styles.checkboxValue}>
                <View
                  style={[
                    styles.checkboxIcon,
                    answer.value ? styles.checkboxIconChecked : {},
                  ]}
                >
                  {answer.value && <Text style={{ fontSize: 8 }}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>
                  {answer.value ? 'Yes' : 'No'}
                </Text>
              </View>
            ) : answer.fieldType === 'photo' && photos.length > 0 ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {photos.map((photoUrl: string, photoIndex: number) => (
                  <Image
                    key={photoIndex}
                    src={photoUrl}
                    style={{
                      width: photos.length === 1 ? 200 : 120,
                      height: photos.length === 1 ? 200 : 120,
                      objectFit: 'cover',
                      borderRadius: 4,
                      border: '1px solid #E5E7EB'
                    }}
                  />
                ))}
              </View>
            ) : (
              <Text
                style={
                  formatAnswerValue(answer) === '—'
                    ? styles.fieldValueEmpty
                    : styles.fieldValue
                }
              >
                {formatAnswerValue(answer)}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

/**
 * Footer component with page numbers and generation info
 */
const PDFFooter: React.FC = () => {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>
        Generated: {format(new Date(), 'PPp')} • Checklist App
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  );
};

/**
 * Main PDF Document component
 */
export const SubmissionPDF: React.FC<SubmissionPDFProps> = ({ submission }) => {
  const groupedAnswers = groupAnswersBySection(submission.answers);
  const sectionNames = Object.keys(groupedAnswers);

  return (
    <Document
      title={`${submission.templateName} - ${submission.id}`}
      author="Checklist App"
      subject={`Completed checklist: ${submission.templateName}`}
      creator="Checklist App"
      producer="@react-pdf/renderer"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <PDFHeader submission={submission} />

        {/* Sections */}
        {sectionNames.map((sectionName, index) => (
          <PDFSection
            key={sectionName}
            title={sectionName}
            index={index}
            answers={groupedAnswers[sectionName]}
          />
        ))}

        {/* Footer */}
        <PDFFooter />
      </Page>
    </Document>
  );
};

export default SubmissionPDF;
