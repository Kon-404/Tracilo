import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RelatedProducts } from '@/components/content'
import Link from 'next/link'
import type { Metadata } from 'next'

// Control system types and specifications
const controlSystems = [
  {
    name: 'Digital Flow Control',
    description: 'Precision water flow management systems',
    specifications: ['0.5-15 GPM flow range', 'Pressure: 20-80 PSI', 'Temperature: 5-70°C', 'IP65 rated'],
    connectivity: ['WiFi', 'Zigbee', 'Modbus', 'RS485'],
    features: ['Flow rate limiting', 'Temperature control', 'Timer functions', 'Usage monitoring']
  },
  {
    name: 'Smart Valve Systems',
    description: 'Automated water shut-off and control',
    specifications: ['1/2" to 2" pipe sizes', 'Ball valve design', 'Manual override', 'Battery backup'],
    connectivity: ['LoRaWAN', 'WiFi', 'Cellular', 'RF Mesh'],
    features: ['Remote control', 'Automatic shutoff', 'Leak detection', 'Emergency override']
  },
  {
    name: 'IoT Monitoring Units',
    description: 'Real-time water usage analytics',
    specifications: ['Ultrasonic sensors', '±2% accuracy', '10-year battery', 'Wireless transmission'],
    connectivity: ['NB-IoT', 'LoRaWAN', 'WiFi', 'Bluetooth'],
    features: ['Usage analytics', 'Occupancy detection', 'Water quality monitoring', 'Predictive maintenance']
  }
]

// Use cases by property type
const useCases = [
  {
    propertyType: 'Property Management',
    applications: [
      'Apartment complex water management',
      'Student housing utility control',
      'Senior living facility monitoring',
      'Affordable housing cost management'
    ],
    benefits: ['40% water savings', 'Reduced maintenance calls', 'Fair cost allocation'],
    icon: '🏠',
    stats: { improvement: '40%', metric: 'water cost reduction' }
  },
  {
    propertyType: 'Hotels & Hospitality',
    applications: [
      'Guest room water management',
      'Spa and wellness center control',
      'Pool and recreation facility monitoring',
      'Kitchen and laundry optimization'
    ],
    benefits: ['Enhanced guest experience', 'Operational cost savings', 'Sustainability goals'],
    icon: '🏨',
    stats: { improvement: '25%', metric: 'utility cost savings' }
  },
  {
    propertyType: 'Institutional Facilities',
    applications: [
      'School and university dormitories',
      'Hospital and healthcare facilities',
      'Gymnasium and sports complexes',
      'Correctional facility management'
    ],
    benefits: ['Budget control', 'Maintenance reduction', 'Health compliance'],
    icon: '🏛️',
    stats: { improvement: '35%', metric: 'maintenance reduction' }
  }
]

// Water savings calculator data
const savingsFactors = [
  { factor: 'Flow rate optimization', savings: '30%', description: 'Intelligent flow control reduces consumption without affecting user experience' },
  { factor: 'Usage time management', savings: '25%', description: 'Automated timers prevent excessive shower duration' },
  { factor: 'Leak prevention', savings: '15%', description: 'Early leak detection prevents water waste and damage' },
  { factor: 'Temperature optimization', savings: '20%', description: 'Efficient heating reduces energy costs for hot water' }
]

// Integration systems
const integrationSystems = [
  {
    category: 'Building Management',
    systems: ['BACnet Systems', 'Johnson Controls', 'Schneider Electric', 'Honeywell'],
    capabilities: ['HVAC integration', 'Energy management', 'Facility monitoring', 'Maintenance scheduling']
  },
  {
    category: 'Smart Building Platforms',
    systems: ['Google Nest', 'Amazon Alexa', 'Samsung SmartThings', 'Apple HomeKit'],
    capabilities: ['Voice control', 'Mobile app integration', 'Automation rules', 'Remote monitoring']
  },
  {
    category: 'Property Management',
    systems: ['Yardi Voyager', 'RealPage', 'AppFolio', 'Buildium'],
    capabilities: ['Tenant billing', 'Maintenance workflows', 'Cost allocation', 'Reporting dashboards']
  }
]

export default function ShowerControlPage() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <Section spacing="sm" variant="secondary">
        <Container>
          <Breadcrumb />
        </Container>
      </Section>
      
      {/* Hero Section */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-6">
                Intelligent Shower Control Systems
          </h1>
              <p className="text-body-lg text-[--color-neutral-600] mb-8">
                Optimize water usage and reduce costs with smart shower control technology. Perfect for property 
                managers, hotels, and institutional facilities seeking sustainable water management solutions 
                that enhance tenant satisfaction.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Request Water Demo
                </Button>
                <Button variant="secondary" size="lg">
                  Calculate Savings
                </Button>
                <Button variant="ghost" size="lg">
                  Contact Specialist
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🚿</div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">40%</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Water Savings</div>
                </div>
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">±2%</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Flow Accuracy</div>
                </div>
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">24/7</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Monitoring</div>
                </div>
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">5 Min</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Install Time</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Technical Specifications */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-12 text-center">
            Control System Specifications
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {controlSystems.map((system, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <CardTitle>{system.name}</CardTitle>
                  <CardDescription>{system.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                        Technical Specs
                      </h4>
                      <ul className="space-y-1">
                        {system.specifications.map((spec, idx) => (
                          <li key={idx} className="text-body-sm text-[--color-neutral-600] flex items-start">
                            <span className="text-[--color-brand-primary] mr-2 mt-1">•</span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                        Connectivity
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {system.connectivity.map((conn, idx) => (
                          <span 
                            key={idx}
                            className="text-body-xs px-2 py-1 bg-[--color-brand-accent-50] text-[--color-brand-accent-700] rounded"
                          >
                            {conn}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                        Features
                      </h4>
                      <ul className="space-y-1">
                        {system.features.map((feature, idx) => (
                          <li key={idx} className="text-body-sm text-[--color-neutral-600] flex items-start">
                            <span className="text-[--color-brand-primary] mr-2 mt-1">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Use Cases by Property Type */}
      <Section spacing="lg">
        <Container>
          <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-12 text-center">
            Property Applications
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} variant="default" className="h-full">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <CardTitle>{useCase.propertyType}</CardTitle>
                  <div className="mt-4 p-3 bg-[--color-brand-primary-50] rounded-lg">
                    <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">
                      {useCase.stats.improvement}
                    </div>
                    <div className="text-body-xs text-[--color-neutral-600]">
                      {useCase.stats.metric}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                      Applications
                    </h4>
                    <ul className="space-y-2">
                      {useCase.applications.map((app, idx) => (
                        <li key={idx} className="text-body-sm text-[--color-neutral-600] flex items-start">
                          <span className="text-[--color-brand-primary] mr-2 mt-1">•</span>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                      Key Benefits
                    </h4>
                    <div className="space-y-2">
                      {useCase.benefits.map((benefit, idx) => (
                        <span 
                          key={idx}
                          className="inline-block text-body-xs px-3 py-1 bg-[--color-brand-primary-50] text-[--color-brand-primary-700] rounded-full mr-2 mb-2"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Smart Water Management Benefits
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Our shower control systems deliver measurable water and cost savings while improving 
              tenant satisfaction and property management efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Water Conservation
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Reduce water consumption by up to 40% without compromising user comfort or experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Cost Reduction
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Lower utility bills and maintenance costs through intelligent water management.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Easy Integration
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Seamless integration with existing plumbing and building management systems.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Tenant Satisfaction
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Maintain comfort while promoting sustainability and cost transparency.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Water Savings Calculator */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
                Calculate Your Water Savings
              </h2>
              <p className="text-body-lg text-[--color-neutral-600] mb-8">
                See how smart shower controls can reduce your property's water consumption and utility costs.
              </p>
              
              <div className="space-y-6">
                {savingsFactors.map((factor, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-[--color-brand-primary] text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                      {factor.savings}
                    </div>
                    <div>
                      <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-2">
                        {factor.factor}
                      </h3>
                      <p className="text-body-sm text-[--color-neutral-600]">
                        {factor.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card variant="elevated" padding="lg">
                <CardHeader className="text-center">
                  <CardTitle>Get Savings Estimate</CardTitle>
                  <CardDescription>
                    Calculate potential water and cost savings for your property
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-body-sm font-medium text-[--color-neutral-700] mb-2">
                        Facility Type
                      </label>
                      <select className="w-full border border-[--color-neutral-300] rounded-lg px-3 py-2 text-body-sm">
                        <option>Apartment complex</option>
                        <option>Hotel/hospitality</option>
                        <option>Student housing</option>
                        <option>Senior living</option>
                        <option>Institutional facility</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-body-sm font-medium text-[--color-neutral-700] mb-2">
                        Number of Units
                      </label>
                      <select className="w-full border border-[--color-neutral-300] rounded-lg px-3 py-2 text-body-sm">
                        <option>1-50 units</option>
                        <option>51-100 units</option>
                        <option>101-250 units</option>
                        <option>250+ units</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-body-sm font-medium text-[--color-neutral-700] mb-2">
                        Current Water Costs (Monthly)
                      </label>
                      <select className="w-full border border-[--color-neutral-300] rounded-lg px-3 py-2 text-body-sm">
                        <option>Under $1,000</option>
                        <option>$1,000 - $5,000</option>
                        <option>$5,000 - $15,000</option>
                        <option>Over $15,000</option>
                      </select>
                    </div>
                    
                    <Button variant="primary" className="w-full">
                      Calculate Savings
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Integration Capabilities */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-12 text-center">
            System Integration
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {integrationSystems.map((integration, index) => (
              <Card key={index} variant="outlined">
                <CardHeader>
                  <CardTitle>{integration.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                      Compatible Systems
                    </h4>
                    <ul className="space-y-2">
                      {integration.systems.map((system, idx) => (
                        <li key={idx} className="text-body-sm text-[--color-neutral-600] flex items-start">
                          <span className="text-[--color-brand-primary] mr-2 mt-1">✓</span>
                          {system}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                      Capabilities
                    </h4>
                    <div className="space-y-1">
                      {integration.capabilities.map((capability, idx) => (
                        <div key={idx} className="text-body-sm text-[--color-neutral-600]">
                          • {capability}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Implementation Process */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Quick Implementation Process
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Our streamlined installation process minimizes disruption while ensuring optimal system performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[--color-brand-primary] text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Site Assessment
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Evaluate plumbing infrastructure and tenant communication requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[--color-brand-primary] text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                System Design
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Custom solution design and integration planning with existing systems.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[--color-brand-primary] text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Quick Installation
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Professional installation with minimal tenant disruption and downtime.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[--color-brand-primary] text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Ongoing Support
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Training, monitoring, and maintenance support for optimal performance.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <RelatedProducts currentProduct="shower-control" />
        </Container>
      </Section>

      {/* Call to Action Section */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Start Saving Water and Costs Today
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Join property managers and facility operators who have reduced water costs by up to 40% 
              with Kryohm's intelligent shower control systems.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg">
                Request Water Demo
              </Button>
              <Button variant="secondary" size="lg">
                Calculate Savings
              </Button>
              <Link href="/products">
                <Button variant="ghost" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Shower Control Systems - Smart Water Management | Kryohm',
  description: 'Intelligent shower control systems for property managers, hotels, and institutions. Reduce water costs by up to 40% while improving tenant satisfaction.',
  keywords: 'shower control, water management, property management, water conservation, smart building, hotel water systems, institutional facilities',
  openGraph: {
    title: 'Shower Control Systems - Smart Water Management | Kryohm',
    description: 'Optimize water usage and reduce costs with smart shower control technology for properties and facilities.',
    type: 'website',
  },
}
