import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProductComparison, ProductSearch } from '@/components/content'
import Link from 'next/link'
import type { Metadata } from 'next'

// Product data structure
const products = [
  {
    id: 'sensors',
    title: 'IoT Sensors',
    description: 'Advanced sensor solutions for real-time monitoring and data collection across agriculture, utilities, and industrial applications.',
    benefits: [
      'Real-time environmental monitoring',
      'Wireless connectivity options', 
      'Data insights and analytics',
      'Scalable deployment'
    ],
    useCases: ['Agriculture monitoring', 'Utility management', 'Industrial automation'],
    slug: '/products/sensors',
    ctaPrimary: 'Request Sensor Demo',
    ctaSecondary: 'Learn More',
    icon: '📡'
  },
  {
    id: 'prepaid-metering',
    title: 'Prepaid Metering',
    description: 'Smart prepaid metering solutions that improve billing efficiency and cash flow management for utilities and property management.',
    benefits: [
      'Automated billing and payments',
      'Reduced manual meter readings',
      'Improved cash flow management',
      'Real-time usage monitoring'
    ],
    useCases: ['Utility companies', 'Residential complexes', 'Commercial properties'],
    slug: '/products/prepaid-metering',
    ctaPrimary: 'Request Metering Demo',
    ctaSecondary: 'Learn More',
    icon: '⚡'
  },
  {
    id: 'shower-control',
    title: 'Shower Control Systems',
    description: 'Intelligent water management systems that reduce costs and improve resource efficiency for property managers and facilities.',
    benefits: [
      'Water usage optimization',
      'Cost reduction solutions',
      'Tenant satisfaction improvement',
      'Smart building integration'
    ],
    useCases: ['Property management', 'Hotels & hospitality', 'Institutional facilities'],
    slug: '/products/shower-control',
    ctaPrimary: 'Request Water Demo',
    ctaSecondary: 'Learn More', 
    icon: '🚿'
  }
]

// Comparison matrix data
const comparisonFeatures = [
  {
    feature: 'Primary Application',
    sensors: 'Environmental Monitoring',
    metering: 'Utility Billing',
    shower: 'Water Management'
  },
  {
    feature: 'Installation Type',
    sensors: 'Wireless/Cellular',
    metering: 'Meter Integration',
    shower: 'Plumbing Integration'
  },
  {
    feature: 'Target Industry',
    sensors: 'Agriculture/Industrial',
    metering: 'Utilities/Property',
    shower: 'Property/Hospitality'
  },
  {
    feature: 'Key Benefit',
    sensors: 'Data Insights',
    metering: 'Cash Flow',
    shower: 'Water Savings'
  }
]

export default function ProductsPage() {
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
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-6">
              IoT Solutions for Smart Operations
            </h1>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Discover Kryohm's comprehensive range of IoT products designed to optimize your operations, 
              reduce costs, and provide actionable insights through intelligent automation.
            </p>
            
            {/* Product Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <ProductSearch />
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg">
                Book a Demo
              </Button>
              <Button variant="secondary" size="lg">
                Request Pricing
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Product Categories */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-12 text-center">
            Our Product Lines
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product) => (
              <Card key={product.id} variant="elevated" className="h-full hover:shadow-large transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-4">{product.icon}</div>
                  <CardTitle className="text-heading-sm mb-2">{product.title}</CardTitle>
                  <CardDescription className="text-body-md">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="text-body-sm text-[--color-neutral-600] flex items-start">
                          <span className="text-[--color-brand-primary] mr-2 mt-1">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-3">
                      Use Cases
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.useCases.map((useCase, index) => (
                        <span 
                          key={index}
                          className="text-body-xs px-3 py-1 bg-[--color-brand-primary-50] text-[--color-brand-primary-700] rounded-full"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-3">
                  <Link href={product.slug} className="w-full">
                    <Button variant="primary" className="w-full">
                      {product.ctaPrimary}
                    </Button>
                  </Link>
                  <Link href={product.slug} className="w-full">
                    <Button variant="secondary" className="w-full">
                      {product.ctaSecondary}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Interactive Product Comparison */}
      <Section spacing="lg">
        <Container>
          <ProductComparison />
        </Container>
      </Section>

      {/* Call to Action Section */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Get started with Kryohm's IoT solutions today. Our experts will help you choose the right products 
              and create a customized implementation plan for your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg">
                Book a Demo
              </Button>
              <Button variant="secondary" size="lg">
                Request Pricing
              </Button>
              <Button variant="ghost" size="lg">
                Talk to Specialist
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export const metadata: Metadata = {
  title: 'IoT Products & Solutions - Kryohm',
  description: 'Explore Kryohm\'s comprehensive IoT product portfolio: Sensors for monitoring, Prepaid Metering for utilities, and Shower Control systems for water management.',
  keywords: 'IoT products, sensors, prepaid metering, shower control, smart monitoring, utility management, water efficiency',
  openGraph: {
    title: 'IoT Products & Solutions - Kryohm',
    description: 'Discover advanced IoT solutions for sensors, prepaid metering, and shower control systems.',
    type: 'website',
  },
}
