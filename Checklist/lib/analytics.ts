/**
 * Analytics tracking utilities
 *
 * Privacy-friendly analytics abstraction that can integrate with
 * various analytics providers (Google Analytics, Plausible, PostHog, etc.)
 *
 * Environment variables:
 * - NEXT_PUBLIC_ANALYTICS_ENABLED: Enable/disable analytics (default: false)
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID: Google Analytics measurement ID (optional)
 * - NEXT_PUBLIC_PLAUSIBLE_DOMAIN: Plausible domain (optional)
 */

export type AnalyticsEvent =
  // Page events
  | 'page_view'
  | 'page_leave'
  // Form events
  | 'form_started'
  | 'form_completed'
  | 'form_abandoned'
  | 'form_pdf_downloaded'
  // Template events
  | 'template_viewed'
  | 'template_created'
  | 'template_edited'
  // Submission events
  | 'submission_created'
  | 'submission_edited'
  | 'submission_deleted'
  | 'submission_pdf_generated'
  // User events
  | 'user_signed_in'
  | 'user_signed_out'
  | 'user_registered'
  // Organization events
  | 'organization_created'
  | 'member_invited'
  // Error events
  | 'error_occurred';

export interface AnalyticsEventData {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Check if analytics is enabled
 */
function isAnalyticsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  eventData?: AnalyticsEventData
): void {
  if (!isAnalyticsEnabled()) return;

  try {
    // Google Analytics (gtag.js)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventData);
    }

    // Plausible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(eventName, { props: eventData });
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, eventData);
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

/**
 * Track a page view
 */
export function trackPageView(path: string, title?: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: title || document.title,
  });
}

/**
 * Track form events
 */
export const formAnalytics = {
  started: (templateId: string, templateName: string) => {
    trackEvent('form_started', {
      template_id: templateId,
      template_name: templateName,
    });
  },

  completed: (templateId: string, templateName: string, duration?: number) => {
    trackEvent('form_completed', {
      template_id: templateId,
      template_name: templateName,
      duration_seconds: duration,
    });
  },

  abandoned: (templateId: string, progress: number) => {
    trackEvent('form_abandoned', {
      template_id: templateId,
      progress_percent: progress,
    });
  },

  pdfDownloaded: (submissionId: string, templateName: string) => {
    trackEvent('form_pdf_downloaded', {
      submission_id: submissionId,
      template_name: templateName,
    });
  },
};

/**
 * Track submission events
 */
export const submissionAnalytics = {
  created: (templateId: string, status: string) => {
    trackEvent('submission_created', {
      template_id: templateId,
      status,
    });
  },

  edited: (submissionId: string) => {
    trackEvent('submission_edited', {
      submission_id: submissionId,
    });
  },

  deleted: (submissionId: string) => {
    trackEvent('submission_deleted', {
      submission_id: submissionId,
    });
  },

  pdfGenerated: (submissionId: string) => {
    trackEvent('submission_pdf_generated', {
      submission_id: submissionId,
    });
  },
};

/**
 * Track template events
 */
export const templateAnalytics = {
  viewed: (templateId: string, templateName: string) => {
    trackEvent('template_viewed', {
      template_id: templateId,
      template_name: templateName,
    });
  },

  created: (templateName: string, fieldCount: number) => {
    trackEvent('template_created', {
      template_name: templateName,
      field_count: fieldCount,
    });
  },

  edited: (templateId: string) => {
    trackEvent('template_edited', {
      template_id: templateId,
    });
  },
};

/**
 * Track user events
 */
export const userAnalytics = {
  signedIn: (method: string) => {
    trackEvent('user_signed_in', {
      method,
    });
  },

  signedOut: () => {
    trackEvent('user_signed_out', {});
  },

  registered: (method: string) => {
    trackEvent('user_registered', {
      method,
    });
  },
};

/**
 * Track organization events
 */
export const organizationAnalytics = {
  created: (organizationName: string) => {
    trackEvent('organization_created', {
      organization_name: organizationName,
    });
  },

  memberInvited: (role: string) => {
    trackEvent('member_invited', {
      role,
    });
  },
};

/**
 * Track errors
 */
export function trackError(
  errorMessage: string,
  errorLocation?: string,
  additionalData?: AnalyticsEventData
): void {
  trackEvent('error_occurred', {
    error_message: errorMessage,
    error_location: errorLocation,
    ...additionalData,
  });
}

/**
 * Initialize analytics (call this in app initialization)
 */
export function initializeAnalytics(): void {
  if (!isAnalyticsEnabled()) {
    console.log('[Analytics] Disabled');
    return;
  }

  console.log('[Analytics] Initialized');

  // Track initial page view
  if (typeof window !== 'undefined') {
    trackPageView(window.location.pathname, document.title);
  }
}
