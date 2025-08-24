import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RelatedProducts } from '@/components/content'
import Link from 'next/link'
import type { Metadata } from 'next'

// Sensor types and specifications
const sensorTypes = [
  {
    name: 'Temperature & Humidity',
    description: 'Precision environmental monitoring',
    accuracy: '±0.3°C, ±2% RH',
    range: '-40°C to +85°C, 0-100% RH',
    connectivity: 'LoRaWAN, WiFi, Cellular'
  },
  {
    name: 'Soil Moisture',
    description: 'Agricultural monitoring solutions',
    accuracy: '±3% volumetric water content',
    range: '0-100% moisture content',
    connectivity: 'LoRaWAN, ZigBee'
  },
  {
    name: 'Pressure & Flow',
    description: 'Industrial process monitoring',
    accuracy: '±0.1% full scale',
    range: '0-1000 PSI, 0-500 L/min',
    connectivity: 'Modbus, 4-20mA, WiFi'
  },
  {
    name: 'Air Quality',
    description: 'Environmental health monitoring',
    accuracy: '±5% reading',
    range: 'PM2.5, CO2, VOCs, NOx',
    connectivity: 'WiFi, Cellular, LoRaWAN'
  }
]

// Use cases by industry
const useCases = [
  {
    industry: 'Agriculture',
    applications: [
      'Crop monitoring and irrigation optimization',
      'Greenhouse environmental control',
      'Livestock health and comfort monitoring',
      'Soil condition analysis'
    ],
    benefits: ['30% water savings', 'Increased crop yields', 'Reduced labor costs'],
    icon: '🌱'
  },
  {
    industry: 'Utilities',
    applications: [
      'Water quality monitoring',
      'Pipeline pressure monitoring',
      'Environmental compliance tracking',
      'Asset condition monitoring'
    ],
    benefits: ['Regulatory compliance', 'Preventive maintenance', 'Leak detection'],
    icon: '⚡'
  },
  {
    industry: 'Industrial',
    applications: [
      'Equipment condition monitoring',
      'Process optimization',
      'Safety and environmental monitoring',
      'Energy management'
    ],
    benefits: ['Reduced downtime', 'Energy savings', 'Safety improvements'],
    icon: '🏭'
  }
]

export default function SensorsPage() {
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
                Advanced IoT Sensors for Real-Time Monitoring
          </h1>
              <p className="text-body-lg text-[--color-neutral-600] mb-8">
                Transform your operations with precision sensor technology. Monitor environmental conditions, 
                track operational parameters, and gain actionable insights across agriculture, utilities, 
                and industrial applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Request Sensor Demo
                </Button>
                <Button variant="secondary" size="lg">
                  Get Pricing
                </Button>
                <Button variant="ghost" size="lg">
                  Talk to Specialist
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">📡</div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">99.9%</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Uptime</div>
                </div>
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">±0.1%</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Accuracy</div>
                </div>
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">10+ Years</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Battery Life</div>
                </div>
                <div className="bg-[--color-brand-primary-50] p-4 rounded-lg">
                  <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">IP67</div>
                  <div className="text-body-sm text-[--color-neutral-600]">Weather Proof</div>
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
            Technical Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sensorTypes.map((sensor, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <CardTitle>{sensor.name}</CardTitle>
                  <CardDescription>{sensor.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-body-sm font-semibold text-[--color-neutral-800]">Accuracy: </span>
                      <span className="text-body-sm text-[--color-neutral-600]">{sensor.accuracy}</span>
                    </div>
                    <div>
                      <span className="text-body-sm font-semibold text-[--color-neutral-800]">Range: </span>
                      <span className="text-body-sm text-[--color-neutral-600]">{sensor.range}</span>
                    </div>
                    <div>
                      <span className="text-body-sm font-semibold text-[--color-neutral-800]">Connectivity: </span>
                      <span className="text-body-sm text-[--color-neutral-600]">{sensor.connectivity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Use Cases by Industry */}
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
                  <CardTitle>{useCase.industry}</CardTitle>
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
              Why Choose Kryohm Sensors?
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Our sensor solutions deliver measurable ROI through operational efficiency, 
              cost reduction, and data-driven decision making.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Data Insights
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Transform raw sensor data into actionable insights with advanced analytics and reporting.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Cost Reduction
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Reduce operational costs by up to 25% through automated monitoring and optimization.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Real-Time Monitoring
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Monitor conditions 24/7 with instant alerts and automated response capabilities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Scalable Solutions
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Scale from pilot projects to enterprise deployments with flexible architecture.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <RelatedProducts currentProduct="sensors" />
        </Container>
      </Section>

      {/* Call to Action Section */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Ready to Deploy Smart Sensors?
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Join hundreds of organizations already benefiting from Kryohm's sensor solutions. 
              Get started with a custom demonstration and implementation plan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg">
                Request Sensor Demo
              </Button>
              <Button variant="secondary" size="lg">
                Get Pricing
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
  title: 'IoT Sensors - Real-Time Monitoring Solutions | Kryohm',
  description: 'Advanced IoT sensors for agriculture, utilities, and industrial applications. Real-time monitoring, wireless connectivity, and data analytics. Request a demo today.',
  keywords: 'IoT sensors, environmental monitoring, agricultural sensors, industrial monitoring, wireless sensors, real-time data, sensor technology',
  openGraph: {
    title: 'IoT Sensors - Real-Time Monitoring Solutions | Kryohm',
    description: 'Transform your operations with precision IoT sensors. Monitor environmental conditions and operational parameters in real-time.',
    type: 'website',
  },
}
