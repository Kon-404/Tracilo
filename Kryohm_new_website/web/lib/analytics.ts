// Analytics tracking utilities

// interface AnalyticsEvent {
//   event: string
//   [key: string]: any
// }

// Track form events
export function trackFormEvent(event: string, formType: string, additionalData?: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  // GA4 tracking
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', event, {
      form_type: formType,
      ...additionalData,
    })
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', {
      event,
      form_type: formType,
      ...additionalData,
    })
  }
}

// Specific form event trackers
export const analytics = {
  // Form interaction events
  formView: (formType: string) => {
    trackFormEvent('form_view', formType)
  },
  
  formStart: (formType: string) => {
    trackFormEvent('form_start', formType)
  },
  
  formFieldComplete: (formType: string, fieldName: string) => {
    trackFormEvent('form_field_complete', formType, { field_name: fieldName })
  },
  
  formSubmit: (formType: string) => {
    trackFormEvent('form_submit', formType)
  },
  
  formSuccess: (formType: string, submissionId?: string) => {
    trackFormEvent('form_success', formType, { submission_id: submissionId })
  },
  
  formError: (formType: string, error: string) => {
    trackFormEvent('form_error', formType, { error_message: error })
  },

  // Lead qualification events
  leadGenerated: (formType: string, productInterest: string) => {
    trackFormEvent('lead_generated', formType, { product_interest: productInterest })
  },

  // CTA interactions
  ctaClick: (ctaType: string, location: string) => {
    trackFormEvent('cta_click', 'general', { cta_type: ctaType, location })
  },
}

// Type declaration for gtag
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void
  }
}
