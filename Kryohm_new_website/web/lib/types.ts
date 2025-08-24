export interface LeadSubmission {
  id: string;
  formType: 'contact' | 'demo' | 'pricing';
  name: string;
  email: string;
  company: string;
  phone?: string;
  productInterest: 'Sensors' | 'Prepaid Metering' | 'Shower Control' | 'Platform';
  message?: string;
  industry?: string;
  companySize?: string;
  timeline?: string;
  createdAt: string;
}


