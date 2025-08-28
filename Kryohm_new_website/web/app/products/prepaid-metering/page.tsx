import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RelatedProducts } from '@/components/content'
import Link from 'next/link'
import type { Metadata } from 'next'

// Meter types and specifications
const meterTypes = [
  {
    name: 'Electricity Meters',
    description: 'Smart prepaid electricity metering systems',
    specifications: ['Single/Three phase', '5-100A rating', 'Class 1 accuracy', 'Tamper detection'],
    protocols: ['DLMS/COSEM', 'Modbus', 'IEC 62056', 'STS'],
    features: ['Real-time consumption', 'Credit management', 'Load limiting', 'Automatic disconnection']
  },
  {
    name: 'Water Meters',
    description: 'Advanced prepaid water management',
    specifications: ['15-50mm diameter', 'Class B accuracy', 'IP68 rating', 'Flow detection'],
    protocols: ['M-Bus', 'LoRaWAN', 'NB-IoT', 'Modbus'],
    features: ['Usage monitoring', 'Leak detection', 'Valve control', 'Credit alerts']
  },
  {
    name: 'Gas Meters',
    description: 'Smart prepaid gas monitoring systems',
    specifications: ['G1.6-G40 sizes', 'Class 1.5 accuracy', 'ATEX certified', 'Pressure monitoring'],
    protocols: ['M-Bus', 'LoRaWAN', 'GPRS/GSM', 'RF Mesh'],
    features: ['Volume correction', 'Safety shutoff', 'Pressure alerts', 'Consumption tracking']
  }
]

// Use cases by sector
const useCases = [
  {
    sector: 'Utility Companies',
    applications: [
      'Residential and commercial billing automation',
      'Prepaid energy distribution programs',
      'Demand response and load management',
      'Revenue protection and fraud prevention'
    ],
    benefits: ['Improved cash flow', 'Reduced operational costs', 'Enhanced customer satisfaction'],
    icon: '⚡',
    stats: { improvement: '40%', metric: 'billing efficiency' }
  },
  {
    sector: 'Residential Complexes',
    applications: [
      'Apartment and condominium utility management',
      'Tenant billing and payment systems',
      'Common area energy monitoring',
      'Individual unit consumption tracking'
    ],
    benefits: ['Simplified billing', 'Fair cost allocation', 'Reduced administrative burden'],
    icon: '🏢',
    stats: { improvement: '60%', metric: 'payment collection' }
  },
  {
    sector: 'Commercial Properties',
    applications: [
      'Office building tenant billing',
      'Shopping center utility management',
      'Industrial park energy distribution',
      'Multi-tenant facility cost allocation'
    ],
    benefits: ['Accurate billing', 'Energy awareness', 'Cost transparency'],
    icon: '🏪',
    stats: { improvement: '35%', metric: 'energy savings' }
  }
]

export default function PrepaidMeteringPage() {
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
                Smart Prepaid Metering Solutions
          </h1>
              <p className="text-body-lg text-[--color-neutral-600] mb-8">
                Transform utility management with intelligent prepaid metering systems. Improve billing efficiency, 
                enhance cash flow management, and provide better customer service for utilities, property managers, 
                and commercial facilities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/contact?type=demo&product=prepaid-metering">Request Metering Demo</Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/contact?type=pricing&product=prepaid-metering">Get Implementation Quote</Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link href="/contact?type=technical">Speak with Expert</Link>
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">⚡</div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">99.7%</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Accuracy</div>
                </div>
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">24/7</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Monitoring</div>
                </div>
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">40%</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Cost Reduction</div>
                </div>
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">15+ Years</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Lifespan</div>
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
            Meter Types & Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meterTypes.map((meter, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <CardTitle>{meter.name}</CardTitle>
                  <CardDescription>{meter.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                        Technical Specs
                      </h4>
                      <ul className="space-y-1">
                        {meter.specifications.map((spec, idx) => (
                          <li key={idx} className="text-body-sm text-[--color-neutral-600] flex items-start">
                            <span className="text-[--color-brand-primary] mr-2 mt-1">•</span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                        Protocols
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {meter.protocols.map((protocol, idx) => (
                          <span 
                            key={idx}
                            className="text-body-xs px-2 py-1 bg-[--color-brand-accent-50] text-[--color-brand-accent-700] rounded"
                          >
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                        Features
                      </h4>
                      <ul className="space-y-1">
                        {meter.features.map((feature, idx) => (
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

      {/* Use Cases by Sector */}
      <Section spacing="lg">
        <Container>
          <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-12 text-center">
            Industry Applications
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} variant="default" className="h-full">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <CardTitle>{useCase.sector}</CardTitle>
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
                      Benefits
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
              Transform Your Utility Management
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Our prepaid metering solutions deliver immediate ROI through reduced operational costs, 
              improved cash flow management, and enhanced customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Improved Cash Flow
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Prepaid model ensures payment before consumption, eliminating bad debt.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Automated Billing
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Eliminate manual readings and reduce billing errors with real-time data.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Reduced Operations
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Cut operational costs by up to 40% through automated processes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Better Experience
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Provide real-time usage information and flexible payment options.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <RelatedProducts currentProduct="prepaid-metering" />
        </Container>
      </Section>

      {/* Call to Action Section */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Ready to Modernize Your Metering?
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Join utilities and property managers worldwide who have transformed their operations with 
              Kryohm's prepaid metering solutions. Get started with a custom implementation plan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact?type=demo&product=prepaid-metering">Request Metering Demo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact?type=pricing&product=prepaid-metering">Get Implementation Quote</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Prepaid Metering Solutions - Smart Utility Management | Kryohm',
  description: 'Advanced prepaid metering systems for utilities, residential complexes, and commercial properties. Improve billing efficiency, cash flow, and customer satisfaction.',
  keywords: 'prepaid metering, smart meters, utility billing, energy management, water meters, electricity meters, gas meters, property management',
  openGraph: {
    title: 'Prepaid Metering Solutions - Smart Utility Management | Kryohm',
    description: 'Transform utility management with intelligent prepaid metering systems. Improve billing efficiency and cash flow management.',
    type: 'website',
  },
}
