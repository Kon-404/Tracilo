import type { IndustryType, ProductType } from '@/lib/types'

export interface IndustryChallenge {
  title: string
  description: string
  impact: string
}

export interface IndustrySolution {
  challenge: string
  solution: string
  benefit: string
  products: ProductType[]
}

export interface IndustryData {
  slug: string
  name: IndustryType
  icon: string
  heroTitle: string
  heroDescription: string
  challenges: IndustryChallenge[]
  solutions: IndustrySolution[]
  recommendedProducts: {
    primary: ProductType
    secondary: ProductType[]
    description: string
  }
  compliance: {
    standards: string[]
    certifications: string[]
    regulations: string[]
  }
  cta: {
    primary: string
    secondary: string
    formType: 'demo' | 'assessment' | 'consultation' | 'evaluation'
  }
  resources: {
    title: string
    type: 'whitepaper' | 'calculator' | 'guide'
    description: string
    downloadUrl: string
  }[]
  seoKeywords: string[]
}

export const industriesData: IndustryData[] = [
  {
    slug: 'agriculture',
    name: 'Agriculture',
    icon: '🌾',
    heroTitle: 'Smart Agriculture Solutions',
    heroDescription: 'Transform your farming operations with precision IoT monitoring, automated irrigation, and data-driven insights that optimize yields while conserving resources.',
    challenges: [
      {
        title: 'Water Management Inefficiency',
        description: 'Traditional irrigation methods waste water and lead to inconsistent crop yields',
        impact: 'Up to 40% water waste and 20% yield reduction'
      },
      {
        title: 'Environmental Monitoring',
        description: 'Manual monitoring of soil, weather, and crop conditions is labor-intensive and imprecise',
        impact: 'Delayed responses to critical growing conditions'
      },
      {
        title: 'Resource Optimization',
        description: 'Difficulty balancing fertilizer, pesticide, and energy usage for optimal ROI',
        impact: 'Increased operational costs and environmental impact'
      }
    ],
    solutions: [
      {
        challenge: 'Inefficient water usage',
        solution: 'Smart irrigation with soil moisture sensors and weather integration',
        benefit: '35% water savings and improved crop consistency',
        products: ['Sensors']
      },
      {
        challenge: 'Poor crop monitoring',
        solution: 'Real-time environmental sensing with automated alerts',
        benefit: 'Early detection of issues and 24% yield improvement',
        products: ['Sensors', 'Platform']
      },
      {
        challenge: 'High operational costs',
        solution: 'Integrated automation and resource optimization',
        benefit: 'Reduced labor costs and improved resource efficiency',
        products: ['Sensors', 'Platform']
      }
    ],
    recommendedProducts: {
      primary: 'Sensors',
      secondary: ['Platform'],
      description: 'Our agricultural sensor network provides comprehensive field monitoring with weather station integration, soil analysis, and automated irrigation control.'
    },
    compliance: {
      standards: ['ISO 14001 Environmental Management', 'GAP (Good Agricultural Practices)'],
      certifications: ['SABS Certification', 'CE Marking'],
      regulations: ['Environmental Protection Act', 'Water Use License Requirements']
    },
    cta: {
      primary: 'Book Agricultural Demo',
      secondary: 'Calculate Farm ROI',
      formType: 'demo'
    },
    resources: [
      {
        title: 'Smart Agriculture ROI Calculator',
        type: 'calculator',
        description: 'Calculate potential water savings and yield improvements for your farm',
        downloadUrl: '/resources/agriculture-roi-calculator.pdf'
      },
      {
        title: 'Precision Agriculture Implementation Guide',
        type: 'guide',
        description: 'Step-by-step guide to implementing IoT solutions on your farm',
        downloadUrl: '/resources/agriculture-implementation-guide.pdf'
      },
      {
        title: 'Water Management Whitepaper',
        type: 'whitepaper',
        description: 'Best practices for agricultural water conservation and efficiency',
        downloadUrl: '/resources/agriculture-water-management.pdf'
      }
    ],
    seoKeywords: ['smart farming', 'precision agriculture', 'irrigation automation', 'crop monitoring', 'agricultural IoT', 'farm efficiency']
  },
  {
    slug: 'utilities',
    name: 'Utilities',
    icon: '⚡',
    heroTitle: 'Utility Management Solutions',
    heroDescription: 'Modernize utility operations with smart metering, real-time monitoring, and automated billing systems that improve revenue collection and operational efficiency.',
    challenges: [
      {
        title: 'Revenue Collection Issues',
        description: 'High levels of unpaid bills and revenue losses from manual meter reading',
        impact: 'Up to 30% revenue collection inefficiency'
      },
      {
        title: 'Operational Inefficiencies',
        description: 'Manual meter reading and maintenance processes are time-consuming and error-prone',
        impact: 'High operational costs and service disruptions'
      },
      {
        title: 'Infrastructure Monitoring',
        description: 'Lack of real-time monitoring leads to reactive maintenance and outages',
        impact: 'Increased downtime and customer dissatisfaction'
      }
    ],
    solutions: [
      {
        challenge: 'Poor revenue collection',
        solution: 'Prepaid smart metering with mobile payment integration',
        benefit: '42% improvement in revenue collection',
        products: ['Prepaid Metering']
      },
      {
        challenge: 'Manual meter reading',
        solution: 'Automated meter reading with real-time consumption data',
        benefit: '65% reduction in manual reading costs',
        products: ['Prepaid Metering', 'Platform']
      },
      {
        challenge: 'Infrastructure failures',
        solution: 'Predictive monitoring with automated alert systems',
        benefit: 'Proactive maintenance and reduced downtime',
        products: ['Sensors', 'Platform']
      }
    ],
    recommendedProducts: {
      primary: 'Prepaid Metering',
      secondary: ['Sensors', 'Platform'],
      description: 'Our utility solutions provide end-to-end smart metering with prepaid billing, consumption monitoring, and infrastructure management.'
    },
    compliance: {
      standards: ['IEC 62052/62053 Metering Standards', 'SANS 1524 Utility Standards'],
      certifications: ['MID Certification', 'SABS Approved'],
      regulations: ['National Energy Regulator Compliance', 'Municipal Finance Management Act']
    },
    cta: {
      primary: 'Request Utility Assessment',
      secondary: 'View Implementation Guide',
      formType: 'assessment'
    },
    resources: [
      {
        title: 'Utility Revenue Recovery Calculator',
        type: 'calculator',
        description: 'Estimate revenue improvements with smart metering implementation',
        downloadUrl: '/resources/utility-revenue-calculator.pdf'
      },
      {
        title: 'Smart Metering Implementation Guide',
        type: 'guide',
        description: 'Complete guide to deploying smart metering infrastructure',
        downloadUrl: '/resources/utility-implementation-guide.pdf'
      },
      {
        title: 'Prepaid Metering Best Practices',
        type: 'whitepaper',
        description: 'Strategies for successful prepaid utility deployments',
        downloadUrl: '/resources/utility-prepaid-best-practices.pdf'
      }
    ],
    seoKeywords: ['smart metering', 'prepaid electricity', 'utility automation', 'revenue collection', 'utility IoT', 'municipal utilities']
  },
  {
    slug: 'property-management',
    name: 'Property Management',
    icon: '🏢',
    heroTitle: 'Property Management Solutions',
    heroDescription: 'Optimize building operations with smart monitoring, automated systems, and usage tracking that reduce costs while improving tenant satisfaction.',
    challenges: [
      {
        title: 'High Utility Costs',
        description: 'Uncontrolled utility usage leads to excessive operational expenses',
        impact: 'Up to 25% overspend on utilities and maintenance'
      },
      {
        title: 'Tenant Usage Monitoring',
        description: 'Difficulty tracking individual tenant consumption for accurate billing',
        impact: 'Revenue losses and tenant disputes'
      },
      {
        title: 'Building Maintenance',
        description: 'Reactive maintenance approach leads to unexpected failures and costs',
        impact: 'Higher maintenance costs and tenant dissatisfaction'
      }
    ],
    solutions: [
      {
        challenge: 'Excessive water usage',
        solution: 'Smart shower controls with individual usage tracking',
        benefit: '28% water consumption reduction',
        products: ['Shower Control']
      },
      {
        challenge: 'Utility cost management',
        solution: 'Individual metering with automated billing integration',
        benefit: 'Accurate tenant billing and cost recovery',
        products: ['Prepaid Metering', 'Platform']
      },
      {
        challenge: 'Building monitoring',
        solution: 'Comprehensive facility monitoring with predictive alerts',
        benefit: 'Proactive maintenance and reduced operating costs',
        products: ['Sensors', 'Platform']
      }
    ],
    recommendedProducts: {
      primary: 'Shower Control',
      secondary: ['Prepaid Metering', 'Sensors'],
      description: 'Our property management solutions provide individual utility tracking, usage control, and comprehensive building monitoring for optimal operations.'
    },
    compliance: {
      standards: ['SANS 10400 Building Standards', 'Green Building Council Standards'],
      certifications: ['SABS Approved', 'Energy Efficiency Certification'],
      regulations: ['Municipal Building Regulations', 'Rental Housing Tribunal Standards']
    },
    cta: {
      primary: 'Schedule Property Consultation',
      secondary: 'Calculate Savings',
      formType: 'consultation'
    },
    resources: [
      {
        title: 'Property Utility Savings Calculator',
        type: 'calculator',
        description: 'Calculate potential savings with smart building management',
        downloadUrl: '/resources/property-savings-calculator.pdf'
      },
      {
        title: 'Smart Building Implementation Guide',
        type: 'guide',
        description: 'Complete guide to smart property management systems',
        downloadUrl: '/resources/property-implementation-guide.pdf'
      },
      {
        title: 'Student Housing Efficiency Whitepaper',
        type: 'whitepaper',
        description: 'Best practices for utility management in student accommodation',
        downloadUrl: '/resources/property-student-housing.pdf'
      }
    ],
    seoKeywords: ['property management', 'building automation', 'utility tracking', 'student housing', 'smart buildings', 'facility management']
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    icon: '🏭',
    heroTitle: 'Industrial Automation Solutions',
    heroDescription: 'Enhance manufacturing efficiency with real-time monitoring, predictive maintenance, and automated systems that optimize production while reducing operational costs.',
    challenges: [
      {
        title: 'Energy Inefficiency',
        description: 'Lack of granular energy monitoring makes it difficult to identify optimization opportunities',
        impact: 'Up to 20% energy waste and high operational costs'
      },
      {
        title: 'Equipment Downtime',
        description: 'Reactive maintenance approach leads to unexpected equipment failures',
        impact: 'Production losses and emergency repair costs'
      },
      {
        title: 'Process Optimization',
        description: 'Manual monitoring limits ability to optimize production schedules and resource usage',
        impact: 'Suboptimal efficiency and resource waste'
      }
    ],
    solutions: [
      {
        challenge: 'High energy costs',
        solution: 'Comprehensive energy monitoring with usage analytics',
        benefit: '22% energy efficiency improvement',
        products: ['Sensors']
      },
      {
        challenge: 'Equipment failures',
        solution: 'Predictive maintenance with condition monitoring',
        benefit: '45% reduction in unplanned downtime',
        products: ['Sensors', 'Platform']
      },
      {
        challenge: 'Production inefficiency',
        solution: 'Real-time process monitoring and optimization',
        benefit: 'Improved OEE and resource utilization',
        products: ['Sensors', 'Platform']
      }
    ],
    recommendedProducts: {
      primary: 'Sensors',
      secondary: ['Platform'],
      description: 'Our industrial solutions provide comprehensive facility monitoring, energy management, and predictive maintenance for optimal manufacturing operations.'
    },
    compliance: {
      standards: ['ISO 50001 Energy Management', 'ISO 9001 Quality Management', 'OHSAS 18001 Safety'],
      certifications: ['SABS Certification', 'IEC Standards Compliance'],
      regulations: ['Occupational Health and Safety Act', 'Environmental Impact Regulations']
    },
    cta: {
      primary: 'Request Industrial Evaluation',
      secondary: 'Download Energy Guide',
      formType: 'evaluation'
    },
    resources: [
      {
        title: 'Industrial Energy Efficiency Calculator',
        type: 'calculator',
        description: 'Calculate potential energy savings for your manufacturing facility',
        downloadUrl: '/resources/industrial-energy-calculator.pdf'
      },
      {
        title: 'Predictive Maintenance Implementation Guide',
        type: 'guide',
        description: 'Step-by-step guide to implementing predictive maintenance',
        downloadUrl: '/resources/industrial-predictive-maintenance.pdf'
      },
      {
        title: 'Manufacturing IoT Whitepaper',
        type: 'whitepaper',
        description: 'Industry 4.0 transformation with IoT and automation',
        downloadUrl: '/resources/industrial-iot-transformation.pdf'
      }
    ],
    seoKeywords: ['industrial automation', 'manufacturing IoT', 'predictive maintenance', 'energy monitoring', 'process optimization', 'Industry 4.0']
  }
]

export function getIndustryData(slug: string): IndustryData | undefined {
  return industriesData.find(industry => industry.slug === slug)
}

export function getAllIndustries(): IndustryData[] {
  return industriesData
}
