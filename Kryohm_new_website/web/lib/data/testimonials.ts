export interface CustomerTestimonial {
  id: string
  customer: {
    name: string
    title: string
    company: string
    industry: string
    location: string
    companySize: 'small' | 'medium' | 'large' | 'enterprise'
  }
  testimonial: {
    quote: string
    rating: number // 1-5 stars
    outcome: string
    dateProvided: string
  }
  project?: {
    id: string
    slug: string
    productType: string
  }
  media?: {
    videoUrl?: string
    photoUrl?: string
  }
  featured: boolean
  verified: boolean
}

export interface CustomerLogo {
  id: string
  company: string
  industry: string
  logoUrl: string
  companySize: 'small' | 'medium' | 'large' | 'enterprise'
  hasPermission: boolean
  featured: boolean
}

export interface SuccessMetric {
  label: string
  value: string
  description: string
  icon: string
}

export interface ThirdPartyValidation {
  type: 'certification' | 'award' | 'partnership'
  name: string
  issuer: string
  year: string
  description: string
  logoUrl: string
}

export const customerTestimonials: CustomerTestimonial[] = [
  {
    id: 'test-001',
    customer: {
      name: 'Mark van der Merwe',
      title: 'Farm Operations Manager',
      company: 'Sunnydale Citrus Estate',
      industry: 'Agriculture',
      location: 'Western Cape, South Africa',
      companySize: 'large'
    },
    testimonial: {
      quote: "The IoT sensor system has completely transformed our irrigation efficiency. We're saving thousands of liters of water daily while maintaining optimal crop conditions. Kryohm's team provided excellent support throughout the implementation.",
      rating: 5,
      outcome: "35% water savings, 24% yield improvement",
      dateProvided: '2024-02-15'
    },
    project: {
      id: 'agri-001',
      slug: 'smart-irrigation-citrus-farm',
      productType: 'Sensors'
    },
    media: {
      photoUrl: '/images/testimonials/mark-van-der-merwe.jpg'
    },
    featured: true,
    verified: true
  },
  {
    id: 'test-002',
    customer: {
      name: 'Sarah Johannsen',
      title: 'Municipal Utility Director',
      company: 'Stellenbosch Municipality',
      industry: 'Utilities',
      location: 'Western Cape, South Africa',
      companySize: 'enterprise'
    },
    testimonial: {
      quote: "The prepaid metering system has revolutionized our revenue collection. We've seen a 42% improvement in payment compliance and significantly reduced our operational costs. The ROI exceeded our expectations.",
      rating: 5,
      outcome: "42% revenue collection improvement, R8.5M annual savings",
      dateProvided: '2024-03-20'
    },
    project: {
      id: 'util-001',
      slug: 'municipal-prepaid-electricity',
      productType: 'Prepaid Metering'
    },
    media: {
      videoUrl: 'https://youtube.com/embed/sample-video-1'
    },
    featured: true,
    verified: true
  },
  {
    id: 'test-003',
    customer: {
      name: 'Dr. James Mitchell',
      title: 'Residence Manager',
      company: 'UCT Student Housing',
      industry: 'Property Management',
      location: 'Cape Town, South Africa',
      companySize: 'large'
    },
    testimonial: {
      quote: "The shower control system has significantly reduced our water costs while providing valuable usage insights. Students appreciate the fair billing system, and we've seen a dramatic reduction in waste.",
      rating: 5,
      outcome: "28% water consumption reduction, improved student satisfaction",
      dateProvided: '2024-04-10'
    },
    project: {
      id: 'prop-001',
      slug: 'student-housing-water-management',
      productType: 'Shower Control'
    },
    featured: true,
    verified: true
  },
  {
    id: 'test-004',
    customer: {
      name: 'Michael Steyn',
      title: 'Operations Director',
      company: 'Steelway Manufacturing',
      industry: 'Industrial',
      location: 'Gauteng, South Africa',
      companySize: 'enterprise'
    },
    testimonial: {
      quote: "Kryohm's energy monitoring system identified efficiency opportunities we never knew existed. The detailed analytics helped us optimize our production schedules and reduce energy costs significantly.",
      rating: 5,
      outcome: "22% energy efficiency improvement, R1.2M annual savings",
      dateProvided: '2024-05-18'
    },
    project: {
      id: 'ind-001',
      slug: 'manufacturing-energy-monitoring',
      productType: 'Sensors'
    },
    featured: false,
    verified: true
  },
  {
    id: 'test-005',
    customer: {
      name: 'Dr. Linda Botha',
      title: 'Facility Manager',
      company: 'Groote Schuur Hospital',
      industry: 'Healthcare',
      location: 'Cape Town, South Africa',
      companySize: 'enterprise'
    },
    testimonial: {
      quote: "The facility monitoring system ensures optimal conditions for patient care while reducing operational costs. The predictive maintenance alerts have prevented several potential equipment failures.",
      rating: 5,
      outcome: "18% operational cost reduction, 45% reduction in equipment downtime",
      dateProvided: '2024-06-12'
    },
    project: {
      id: 'health-001',
      slug: 'hospital-facility-monitoring',
      productType: 'Sensors'
    },
    featured: false,
    verified: true
  },
  {
    id: 'test-006',
    customer: {
      name: 'Prof. David Wilson',
      title: 'Campus Operations Manager',
      company: 'University of Witwatersrand',
      industry: 'Education',
      location: 'Johannesburg, South Africa',
      companySize: 'enterprise'
    },
    testimonial: {
      quote: "The campus energy management solution has delivered exceptional results. We've achieved significant cost savings while improving our sustainability metrics across all campus buildings.",
      rating: 4,
      outcome: "31% energy cost reduction, improved sustainability metrics",
      dateProvided: '2024-07-22'
    },
    project: {
      id: 'edu-001',
      slug: 'campus-energy-management',
      productType: 'Prepaid Metering'
    },
    featured: false,
    verified: true
  }
]

export const customerLogos: CustomerLogo[] = [
  {
    id: 'logo-001',
    company: 'Sunnydale Citrus Estate',
    industry: 'Agriculture',
    logoUrl: '/images/logos/sunnydale-citrus.png',
    companySize: 'large',
    hasPermission: true,
    featured: true
  },
  {
    id: 'logo-002',
    company: 'Stellenbosch Municipality',
    industry: 'Utilities',
    logoUrl: '/images/logos/stellenbosch-municipality.png',
    companySize: 'enterprise',
    hasPermission: true,
    featured: true
  },
  {
    id: 'logo-003',
    company: 'UCT Student Housing',
    industry: 'Property Management',
    logoUrl: '/images/logos/uct-housing.png',
    companySize: 'large',
    hasPermission: true,
    featured: true
  },
  {
    id: 'logo-004',
    company: 'Steelway Manufacturing',
    industry: 'Industrial',
    logoUrl: '/images/logos/steelway-manufacturing.png',
    companySize: 'enterprise',
    hasPermission: true,
    featured: false
  },
  {
    id: 'logo-005',
    company: 'Groote Schuur Hospital',
    industry: 'Healthcare',
    logoUrl: '/images/logos/groote-schuur-hospital.png',
    companySize: 'enterprise',
    hasPermission: true,
    featured: true
  },
  {
    id: 'logo-006',
    company: 'University of Witwatersrand',
    industry: 'Education',
    logoUrl: '/images/logos/wits-university.png',
    companySize: 'enterprise',
    hasPermission: true,
    featured: true
  },
  {
    id: 'logo-007',
    company: 'Cape Town Water',
    industry: 'Utilities',
    logoUrl: '/images/logos/cape-town-water.png',
    companySize: 'enterprise',
    hasPermission: true,
    featured: false
  },
  {
    id: 'logo-008',
    company: 'Agri-Tech Solutions',
    industry: 'Agriculture',
    logoUrl: '/images/logos/agri-tech-solutions.png',
    companySize: 'medium',
    hasPermission: true,
    featured: false
  }
]

export const successMetrics: SuccessMetric[] = [
  {
    label: 'Customer Retention Rate',
    value: '96%',
    description: 'of customers continue partnerships beyond initial deployment',
    icon: '🤝'
  },
  {
    label: 'Average Implementation Time',
    value: '8 weeks',
    description: 'from project start to full deployment',
    icon: '⚡'
  },
  {
    label: 'Support Satisfaction',
    value: '4.8/5',
    description: 'average customer support rating',
    icon: '⭐'
  },
  {
    label: 'Total Installations',
    value: '250+',
    description: 'successful IoT deployments across Africa',
    icon: '📡'
  },
  {
    label: 'Years in Business',
    value: '8+',
    description: 'years of IoT and automation expertise',
    icon: '📅'
  },
  {
    label: 'Geographic Coverage',
    value: '12 countries',
    description: 'across Sub-Saharan Africa',
    icon: '🌍'
  }
]

export const thirdPartyValidations: ThirdPartyValidation[] = [
  {
    type: 'certification',
    name: 'ISO 9001:2015',
    issuer: 'International Organization for Standardization',
    year: '2023',
    description: 'Quality Management Systems certification',
    logoUrl: '/images/certifications/iso-9001.png'
  },
  {
    type: 'certification',
    name: 'SABS Approved',
    issuer: 'South African Bureau of Standards',
    year: '2023',
    description: 'Product quality and safety certification',
    logoUrl: '/images/certifications/sabs.png'
  },
  {
    type: 'award',
    name: 'Innovation Award',
    issuer: 'African IoT & AI Challenge',
    year: '2023',
    description: 'Recognition for innovative IoT solutions',
    logoUrl: '/images/awards/iot-innovation-award.png'
  },
  {
    type: 'partnership',
    name: 'Technology Partner',
    issuer: 'Microsoft for Startups',
    year: '2022',
    description: 'Azure IoT technology partnership',
    logoUrl: '/images/partnerships/microsoft-partner.png'
  },
  {
    type: 'certification',
    name: 'CE Marking',
    issuer: 'European Conformity',
    year: '2023',
    description: 'European product compliance certification',
    logoUrl: '/images/certifications/ce-marking.png'
  }
]

// Helper functions
export function getFeaturedTestimonials(): CustomerTestimonial[] {
  return customerTestimonials.filter(t => t.featured)
}

export function getTestimonialsByIndustry(industry: string): CustomerTestimonial[] {
  return customerTestimonials.filter(t => t.customer.industry === industry)
}

export function getTestimonialsByProductType(productType: string): CustomerTestimonial[] {
  return customerTestimonials.filter(t => t.project?.productType === productType)
}

export function getFeaturedLogos(): CustomerLogo[] {
  return customerLogos.filter(l => l.featured && l.hasPermission)
}

export function getLogosByIndustry(industry: string): CustomerLogo[] {
  return customerLogos.filter(l => l.industry === industry && l.hasPermission)
}
