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
  projectScope?: string;
  budget?: string;
  createdAt: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  slug: string;
  industry: 'Agriculture' | 'Utilities' | 'Property Management' | 'Industrial' | 'Healthcare' | 'Education';
  productType: 'Sensors' | 'Prepaid Metering' | 'Shower Control' | 'Platform';
  thumbnail: string;
  excerpt: string;
  keyOutcome: {
    metric: string;
    value: string;
    description: string;
  };
  challenge: string;
  solution: string;
  results: {
    costSavings?: string;
    efficiencyGain?: string;
    roi?: string;
    implementationTime?: string;
  };
  tags: string[];
  customer: {
    name: string;
    location: string;
    size: string;
  };
  publishedAt: string;
  featured: boolean;
}

export type IndustryType = ProjectCaseStudy['industry'];
export type ProductType = ProjectCaseStudy['productType'];


