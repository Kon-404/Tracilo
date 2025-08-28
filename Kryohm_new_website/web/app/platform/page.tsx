import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import type { Metadata } from 'next'

// Platform architecture components
const architectureComponents = [
  {
    layer: 'Device Layer',
    description: 'IoT sensors, meters, and control systems collecting real-time data',
    components: ['Temperature Sensors', 'Smart Meters', 'Flow Controllers', 'Environmental Monitors'],
    icon: '📡'
  },
  {
    layer: 'Connectivity Layer',
    description: 'Secure communication protocols connecting devices to the cloud',
    components: ['LoRaWAN Networks', 'WiFi Connectivity', 'Cellular (4G/5G)', 'Ethernet Integration'],
    icon: '🌐'
  },
  {
    layer: 'Data Processing Layer',
    description: 'Real-time data ingestion, processing, and analytics engine',
    components: ['Data Ingestion', 'Stream Processing', 'Analytics Engine', 'Rule Engine'],
    icon: '⚙️'
  },
  {
    layer: 'Application Layer',
    description: 'User interfaces, dashboards, and business application integration',
    components: ['Web Dashboards', 'Mobile Apps', 'API Gateway', 'Reporting Tools'],
    icon: '💻'
  }
]

// Technical specifications
const technicalSpecs = [
  {
    category: 'Data Processing',
    specifications: [
      'Real-time data ingestion: 10,000+ events/second',
      'Data retention: Configurable (1 month to 10 years)',
      'Processing latency: <100ms for critical events',
      'Batch processing: Support for historical analysis'
    ]
  },
  {
    category: 'Security & Compliance',
    specifications: [
      'End-to-end encryption (AES-256)',
      'OAuth 2.0 and SAML authentication',
      'GDPR and POPIA compliance ready',
      'SOC 2 Type II certified infrastructure'
    ]
  },
  {
    category: 'Scalability',
    specifications: [
      'Horizontal scaling: Auto-scaling based on load',
      'Multi-tenant architecture',
      'Geographic distribution support',
      '99.9% uptime SLA with redundancy'
    ]
  },
  {
    category: 'APIs & Integration',
    specifications: [
      'RESTful API with OpenAPI documentation',
      'GraphQL support for complex queries',
      'Webhook notifications for real-time events',
      'SDK support for popular programming languages'
    ]
  }
]

export default function PlatformPage() {
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
              Unified IoT Platform for Smart Operations
            </h1>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Kryohm's comprehensive IoT platform seamlessly integrates sensors, smart meters, and control 
              systems into a unified ecosystem. From data collection to actionable insights, our platform 
              transforms how you monitor, manage, and optimize your operations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact?type=demo">Platform Demo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact?type=technical">Technical Discussion</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/contact?type=technical">Integration Assessment</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Platform Architecture */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Platform Architecture
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Our four-layer architecture ensures scalable, secure, and reliable IoT solutions 
              that integrate seamlessly with your existing infrastructure.
            </p>
          </div>
          
          <div className="space-y-8">
            {architectureComponents.map((component, index) => (
              <Card key={index} variant="elevated" className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[200px]">
                    <div className="bg-[--color-brand-primary-50] p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{component.icon}</div>
                        <h3 className="text-heading-sm font-bold text-[--color-brand-primary-700]">
                          {component.layer}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                      <p className="text-body-md text-[--color-neutral-600] mb-6">
                        {component.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {component.components.map((comp, idx) => (
                          <div key={idx} className="flex items-center">
                            <span className="text-[--color-brand-primary] mr-2">•</span>
                            <span className="text-body-sm text-[--color-neutral-700]">{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Technical Specifications */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Technical Specifications
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Enterprise-grade platform capabilities designed for performance, security, and scalability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technicalSpecs.map((spec, index) => (
              <Card key={index} variant="outlined">
                <CardHeader>
                  <CardTitle>{spec.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {spec.specifications.map((item, idx) => (
                      <li key={idx} className="text-body-sm text-[--color-neutral-600] flex items-start">
                        <span className="text-[--color-brand-primary] mr-2 mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Security & Compliance */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
                Security & Compliance
              </h2>
              <p className="text-body-lg text-[--color-neutral-600] mb-8">
                Enterprise-grade security measures protect your data and ensure compliance 
                with international standards and local regulations.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[--color-brand-primary] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    🔒
                  </div>
                  <div>
                    <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-2">
                      Data Encryption
                    </h3>
                    <p className="text-body-sm text-[--color-neutral-600]">
                      End-to-end encryption with AES-256 standards for data in transit and at rest.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[--color-brand-primary] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    🛡️
                  </div>
                  <div>
                    <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-2">
                      Access Control
                    </h3>
                    <p className="text-body-sm text-[--color-neutral-600]">
                      Multi-factor authentication and role-based access controls for secure user management.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[--color-brand-primary] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    ✅
                  </div>
                  <div>
                    <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-2">
                      Compliance Ready
                    </h3>
                    <p className="text-body-sm text-[--color-neutral-600]">
                      GDPR, POPIA, and industry-specific compliance frameworks supported.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-[--color-brand-primary-50] rounded-lg">
                <div className="text-heading-lg font-bold text-[--color-brand-primary-700] mb-2">99.9%</div>
                <div className="text-body-sm text-[--color-neutral-600]">Uptime SLA</div>
              </div>
              <div className="text-center p-6 bg-[--color-brand-primary-50] rounded-lg">
                <div className="text-heading-lg font-bold text-[--color-brand-primary-700] mb-2">24/7</div>
                <div className="text-body-sm text-[--color-neutral-600]">Security Monitoring</div>
              </div>
              <div className="text-center p-6 bg-[--color-brand-primary-50] rounded-lg">
                <div className="text-heading-lg font-bold text-[--color-brand-primary-700] mb-2">SOC 2</div>
                <div className="text-body-sm text-[--color-neutral-600]">Type II Certified</div>
              </div>
              <div className="text-center p-6 bg-[--color-brand-primary-50] rounded-lg">
                <div className="text-heading-lg font-bold text-[--color-brand-primary-700] mb-2">ISO</div>
                <div className="text-body-sm text-[--color-neutral-600]">27001 Compliant</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Ready to See the Platform in Action?
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Experience how Kryohm's unified IoT platform can transform your operations. 
              Schedule a demo or technical discussion to explore integration possibilities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact?type=demo">Platform Demo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact?type=technical">Technical Discussion</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/contact">Contact Technical Team</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export const metadata: Metadata = {
  title: 'IoT Platform & Integration - Unified Smart Operations | Kryohm',
  description: 'Discover Kryohm\'s comprehensive IoT platform that integrates sensors, smart meters, and control systems. Enterprise-grade security, scalability, and seamless integration.',
  keywords: 'IoT platform, system integration, enterprise IoT, platform architecture, API integration, cloud platform, data analytics, security compliance',
  openGraph: {
    title: 'IoT Platform & Integration - Unified Smart Operations | Kryohm',
    description: 'Comprehensive IoT platform that seamlessly integrates with your existing systems for unified smart operations.',
    type: 'website',
  },
}
