import type { ProjectCaseStudy } from '@/lib/types'

export const sampleProjects: ProjectCaseStudy[] = [
  {
    id: 'agri-001',
    title: 'Smart Irrigation Optimization for Citrus Farm',
    slug: 'smart-irrigation-citrus-farm',
    industry: 'Agriculture',
    productType: 'Sensors',
    thumbnail: '/images/projects/citrus-farm-sensors.jpg',
    excerpt: 'Advanced soil moisture and weather monitoring system delivers 35% water savings for 500-hectare citrus operation.',
    keyOutcome: {
      metric: 'Water Savings',
      value: '35%',
      description: 'Annual water consumption reduction'
    },
    challenge: 'Inefficient irrigation scheduling led to water waste and inconsistent crop yields across the large citrus farm.',
    solution: 'Deployed 150 IoT soil moisture sensors with weather station integration and automated irrigation control.',
    results: {
      costSavings: 'R2.4M annually',
      efficiencyGain: '35% water reduction',
      roi: '280% over 3 years',
      implementationTime: '6 weeks'
    },
    tags: ['irrigation', 'precision agriculture', 'water management', 'sustainability'],
    customer: {
      name: 'Sunnydale Citrus Estate',
      location: 'Western Cape, South Africa',
      size: '500 hectares'
    },
    publishedAt: '2024-01-15',
    featured: true
  },
  {
    id: 'util-001',
    title: 'Municipal Prepaid Electricity Implementation',
    slug: 'municipal-prepaid-electricity',
    industry: 'Utilities',
    productType: 'Prepaid Metering',
    thumbnail: '/images/projects/municipal-meters.jpg',
    excerpt: 'City-wide prepaid electricity system improves revenue collection by 42% while reducing operational costs.',
    keyOutcome: {
      metric: 'Revenue Collection',
      value: '42%',
      description: 'Improvement in utility bill collections'
    },
    challenge: 'High levels of unpaid electricity bills and manual meter reading inefficiencies plagued the municipal utility.',
    solution: 'Installed 15,000 smart prepaid meters with mobile payment integration and real-time monitoring.',
    results: {
      costSavings: 'R8.5M annually',
      efficiencyGain: '65% reduction in manual readings',
      roi: '320% over 4 years',
      implementationTime: '8 months'
    },
    tags: ['prepaid metering', 'municipal utilities', 'revenue management', 'smart grid'],
    customer: {
      name: 'Stellenbosch Municipality',
      location: 'Western Cape, South Africa',
      size: '15,000 households'
    },
    publishedAt: '2024-02-20',
    featured: true
  },
  {
    id: 'prop-001',
    title: 'Student Housing Water Management System',
    slug: 'student-housing-water-management',
    industry: 'Property Management',
    productType: 'Shower Control',
    thumbnail: '/images/projects/student-housing-water.jpg',
    excerpt: 'Intelligent shower control system reduces water consumption by 28% across university residence complex.',
    keyOutcome: {
      metric: 'Water Usage Reduction',
      value: '28%',
      description: 'Decrease in daily water consumption'
    },
    challenge: 'Excessive water usage and high utility costs in student accommodation with limited individual accountability.',
    solution: 'Deployed smart shower timers and flow controllers with individual usage tracking and billing integration.',
    results: {
      costSavings: 'R420K annually',
      efficiencyGain: '28% water reduction',
      roi: '245% over 3 years',
      implementationTime: '4 weeks'
    },
    tags: ['water management', 'student housing', 'usage tracking', 'cost control'],
    customer: {
      name: 'UCT Student Housing',
      location: 'Cape Town, South Africa',
      size: '850 student units'
    },
    publishedAt: '2024-03-10',
    featured: false
  },
  {
    id: 'ind-001',
    title: 'Manufacturing Energy Monitoring Platform',
    slug: 'manufacturing-energy-monitoring',
    industry: 'Industrial',
    productType: 'Sensors',
    thumbnail: '/images/projects/manufacturing-energy.jpg',
    excerpt: 'Comprehensive energy monitoring system identifies efficiency opportunities worth R1.2M in annual savings.',
    keyOutcome: {
      metric: 'Energy Efficiency',
      value: '22%',
      description: 'Improvement in overall energy efficiency'
    },
    challenge: 'Lack of granular energy monitoring made it impossible to identify inefficiencies and optimize production schedules.',
    solution: 'Installed 200+ energy monitoring sensors across production lines with real-time analytics dashboard.',
    results: {
      costSavings: 'R1.2M annually',
      efficiencyGain: '22% energy efficiency',
      roi: '195% over 3 years',
      implementationTime: '10 weeks'
    },
    tags: ['energy monitoring', 'manufacturing', 'efficiency optimization', 'industrial IoT'],
    customer: {
      name: 'Steelway Manufacturing',
      location: 'Gauteng, South Africa',
      size: '25,000 sqm facility'
    },
    publishedAt: '2024-04-05',
    featured: false
  },
  {
    id: 'health-001',
    title: 'Hospital Facility Monitoring System',
    slug: 'hospital-facility-monitoring',
    industry: 'Healthcare',
    productType: 'Sensors',
    thumbnail: '/images/projects/hospital-monitoring.jpg',
    excerpt: 'Critical facility monitoring ensures optimal conditions for patient care while reducing operational costs by 18%.',
    keyOutcome: {
      metric: 'Operational Cost Reduction',
      value: '18%',
      description: 'Annual facility management savings'
    },
    challenge: 'Manual monitoring of critical facility parameters risked patient safety and led to reactive maintenance.',
    solution: 'Implemented comprehensive environmental monitoring with predictive maintenance alerts and compliance tracking.',
    results: {
      costSavings: 'R650K annually',
      efficiencyGain: '45% reduction in equipment downtime',
      roi: '210% over 4 years',
      implementationTime: '12 weeks'
    },
    tags: ['healthcare', 'facility monitoring', 'predictive maintenance', 'compliance'],
    customer: {
      name: 'Groote Schuur Hospital',
      location: 'Cape Town, South Africa',
      size: '450-bed facility'
    },
    publishedAt: '2024-05-15',
    featured: false
  },
  {
    id: 'edu-001',
    title: 'Campus Energy Management Solution',
    slug: 'campus-energy-management',
    industry: 'Education',
    productType: 'Prepaid Metering',
    thumbnail: '/images/projects/campus-energy.jpg',
    excerpt: 'University campus energy management system delivers 31% reduction in electricity costs across 12 buildings.',
    keyOutcome: {
      metric: 'Energy Cost Reduction',
      value: '31%',
      description: 'Annual electricity cost savings'
    },
    challenge: 'Uncontrolled energy usage across campus buildings led to budget overruns and sustainability concerns.',
    solution: 'Deployed building-level energy monitoring with departmental usage allocation and automated load management.',
    results: {
      costSavings: 'R1.8M annually',
      efficiencyGain: '31% cost reduction',
      roi: '265% over 4 years',
      implementationTime: '14 weeks'
    },
    tags: ['education', 'campus management', 'energy efficiency', 'sustainability'],
    customer: {
      name: 'University of Witwatersrand',
      location: 'Johannesburg, South Africa',
      size: '12 campus buildings'
    },
    publishedAt: '2024-06-20',
    featured: true
  },
  {
    id: 'agri-002',
    title: 'Greenhouse Climate Control Automation',
    slug: 'greenhouse-climate-control',
    industry: 'Agriculture',
    productType: 'Sensors',
    thumbnail: '/images/projects/greenhouse-climate.jpg',
    excerpt: 'Automated climate control system increases crop yields by 24% while reducing energy consumption.',
    keyOutcome: {
      metric: 'Crop Yield Increase',
      value: '24%',
      description: 'Improvement in annual harvest volume'
    },
    challenge: 'Inconsistent climate control in greenhouse operations led to variable crop quality and energy waste.',
    solution: 'Installed environmental sensors with automated ventilation, heating, and humidity control systems.',
    results: {
      costSavings: 'R380K annually',
      efficiencyGain: '24% yield increase',
      roi: '190% over 3 years',
      implementationTime: '5 weeks'
    },
    tags: ['greenhouse', 'climate control', 'crop optimization', 'automation'],
    customer: {
      name: 'Highveld Hydroponics',
      location: 'Gauteng, South Africa',
      size: '5,000 sqm greenhouse'
    },
    publishedAt: '2024-07-10',
    featured: false
  },
  {
    id: 'util-002',
    title: 'Water Utility Smart Metering Network',
    slug: 'water-utility-smart-metering',
    industry: 'Utilities',
    productType: 'Prepaid Metering',
    thumbnail: '/images/projects/water-smart-meters.jpg',
    excerpt: 'Advanced water metering network reduces non-revenue water by 38% through real-time leak detection.',
    keyOutcome: {
      metric: 'Non-Revenue Water Reduction',
      value: '38%',
      description: 'Decrease in water losses and theft'
    },
    challenge: 'Significant water losses due to leaks and theft were impacting utility sustainability and revenue.',
    solution: 'Deployed smart water meters with tamper detection and real-time consumption monitoring across the network.',
    results: {
      costSavings: 'R12.5M annually',
      efficiencyGain: '38% reduction in water losses',
      roi: '385% over 5 years',
      implementationTime: '18 months'
    },
    tags: ['water utility', 'leak detection', 'revenue protection', 'smart metering'],
    customer: {
      name: 'Rand Water Services',
      location: 'Gauteng Province, South Africa',
      size: '45,000 connections'
    },
    publishedAt: '2024-08-15',
    featured: true
  }
]

// Helper functions for filtering and searching
export function getUniqueIndustries(): string[] {
  return Array.from(new Set(sampleProjects.map(p => p.industry))).sort()
}

export function getUniqueProductTypes(): string[] {
  return Array.from(new Set(sampleProjects.map(p => p.productType))).sort()
}

export function getFeaturedProjects(): ProjectCaseStudy[] {
  return sampleProjects.filter(p => p.featured)
}

export function getProjectsByIndustry(industry: string): ProjectCaseStudy[] {
  return sampleProjects.filter(p => p.industry === industry)
}

export function getProjectsByProductType(productType: string): ProjectCaseStudy[] {
  return sampleProjects.filter(p => p.productType === productType)
}

export function searchProjects(query: string): ProjectCaseStudy[] {
  const lowercaseQuery = query.toLowerCase()
  return sampleProjects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.excerpt.toLowerCase().includes(lowercaseQuery) ||
    project.industry.toLowerCase().includes(lowercaseQuery) ||
    project.productType.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    project.challenge.toLowerCase().includes(lowercaseQuery) ||
    project.solution.toLowerCase().includes(lowercaseQuery)
  )
}
