/**
 * PDF Styling Constants
 *
 * React-PDF uses a subset of CSS with specific syntax.
 * Styles are defined as JavaScript objects.
 */

import { StyleSheet } from '@react-pdf/renderer';

/**
 * Main stylesheet for PDF documents
 */
export const styles = StyleSheet.create({
  // Document and page styles
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },

  // Header section
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#0ea5e9',
    borderBottomStyle: 'solid',
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },

  branding: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
    backgroundColor: '#0ea5e9',
    borderRadius: 6,
  },

  brandText: {
    flexDirection: 'column',
  },

  appName: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
  },

  tagline: {
    fontSize: 8,
    color: '#6b7280',
    marginTop: 2,
  },

  // Template info
  templateName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
    marginBottom: 5,
  },

  templateDescription: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 10,
  },

  // Metadata grid
  metadataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  metadataItem: {
    flex: 1,
  },

  metadataLabel: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 3,
  },

  metadataValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
  },

  // Badge styles
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },

  badgeVehicle: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },

  badgeSolar: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },

  badgeGas: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },

  badgeSuccess: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },

  // Section styles
  section: {
    marginTop: 20,
    marginBottom: 15,
  },

  sectionHeader: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },

  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
  },

  sectionDescription: {
    fontSize: 9,
    color: '#6b7280',
    marginTop: 3,
  },

  // Field/Answer styles
  field: {
    marginBottom: 12,
    paddingLeft: 10,
  },

  fieldLabel: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 3,
  },

  fieldValue: {
    fontSize: 10,
    color: '#1f2937',
    lineHeight: 1.4,
  },

  fieldValueBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
  },

  fieldValueEmpty: {
    fontSize: 10,
    color: '#9ca3af',
    fontStyle: 'italic',
  },

  // Checkbox specific
  checkboxValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxIcon: {
    width: 12,
    height: 12,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxIconChecked: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },

  checkboxText: {
    fontSize: 10,
    color: '#1f2937',
  },

  // Footer styles
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 8,
    color: '#6b7280',
  },

  pageNumber: {
    fontSize: 8,
    color: '#6b7280',
  },

  // Utility styles
  divider: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
  },

  spacer: {
    height: 10,
  },
});

/**
 * Color mapping for categories
 */
export const categoryColors: Record<string, { bg: string; text: string }> = {
  vehicle: { bg: '#dbeafe', text: '#1e40af' },
  solar: { bg: '#fef3c7', text: '#92400e' },
  gas: { bg: '#fee2e2', text: '#991b1b' },
  default: { bg: '#f3f4f6', text: '#374151' },
};

/**
 * Get badge style for category
 */
export function getCategoryBadgeStyle(category: string) {
  const styleMap: Record<string, any> = {
    vehicle: styles.badgeVehicle,
    solar: styles.badgeSolar,
    gas: styles.badgeGas,
  };

  return [styles.badge, styleMap[category] || styles.badge];
}
