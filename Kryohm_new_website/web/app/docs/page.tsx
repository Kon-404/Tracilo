import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

// Documentation categories
const documentationCategories = [
  {
    title: 'API Documentation',
    description: 'Comprehensive REST and WebSocket API references with authentication and best practices',
    icon: '📡',
    items: [
      { name: 'REST API Reference', description: 'Complete REST API documentation with examples', href: '/docs/api/rest', status: 'available' },
      { name: 'WebSocket API', description: 'Real-time data streaming and bidirectional communication', href: '/docs/api/websocket', status: 'available' },
      { name: 'Authentication & Security', description: 'API keys, OAuth, and security implementation', href: '/docs/api/auth', status: 'available' },
      { name: 'Rate Limiting', description: 'Request limits, quotas, and best practices', href: '/docs/api/rate-limiting', status: 'available' }
    ]
  },
  {
    title: 'Integration Guides',
    description: 'Step-by-step guides for integrating with major cloud platforms and systems',
    icon: '🔗',
    items: [
      { name: 'Azure IoT Hub', description: 'Complete Azure IoT Hub integration setup', href: '/docs/integrations/azure', status: 'available' },
      { name: 'AWS IoT Core', description: 'Amazon Web Services IoT platform integration', href: '/docs/integrations/aws', status: 'available' },
      { name: 'Google Cloud IoT', description: 'Google Cloud Platform IoT Core integration', href: '/docs/integrations/google', status: 'available' },
      { name: 'MQTT Brokers', description: 'Custom MQTT broker configuration and setup', href: '/docs/integrations/mqtt', status: 'available' }
    ]
  },
  {
    title: 'Hardware Documentation',
    description: 'Installation guides, configuration manuals, and troubleshooting for all devices',
    icon: '🔧',
    items: [
      { name: 'Sensor Installation', description: 'Physical installation and positioning guidelines', href: '/docs/hardware/sensors', status: 'available' },
      { name: 'Device Configuration', description: 'Network setup and initial configuration', href: '/docs/hardware/config', status: 'available' },
      { name: 'Troubleshooting Guide', description: 'Common issues and resolution procedures', href: '/docs/hardware/troubleshooting', status: 'available' },
      { name: 'Maintenance Procedures', description: 'Regular maintenance and calibration schedules', href: '/docs/hardware/maintenance', status: 'available' }
    ]
  },
  {
    title: 'SDKs & Libraries',
    description: 'Software development kits and libraries for various programming languages',
    icon: '💻',
    items: [
      { name: 'JavaScript/Node.js SDK', description: 'NPM package for web and server applications', href: '/docs/sdks/javascript', status: 'available' },
      { name: 'Python SDK', description: 'PyPI package for Python applications and data science', href: '/docs/sdks/python', status: 'available' },
      { name: 'C# .NET SDK', description: 'NuGet package for .NET applications', href: '/docs/sdks/dotnet', status: 'available' },
      { name: 'Mobile SDKs', description: 'React Native and Flutter integration libraries', href: '/docs/sdks/mobile', status: 'coming-soon' }
    ]
  },
  {
    title: 'Data Analytics',
    description: 'Data processing, analytics, and visualization integration guides',
    icon: '📊',
    items: [
      { name: 'Data Export Formats', description: 'CSV, JSON, and database export options', href: '/docs/analytics/export', status: 'available' },
      { name: 'Dashboard Integration', description: 'Grafana, Power BI, and Tableau connections', href: '/docs/analytics/dashboards', status: 'available' },
      { name: 'Machine Learning', description: 'Data preparation for ML and AI applications', href: '/docs/analytics/ml', status: 'available' },
      { name: 'Custom Reports', description: 'Building custom reports and automated insights', href: '/docs/analytics/reports', status: 'available' }
    ]
  },
  {
    title: 'Security & Compliance',
    description: 'Security protocols, compliance requirements, and data protection guidelines',
    icon: '🔒',
    items: [
      { name: 'Security Overview', description: 'Comprehensive security architecture and protocols', href: '/docs/security/overview', status: 'available' },
      { name: 'Data Protection', description: 'GDPR, POPIA, and data privacy compliance', href: '/docs/security/data-protection', status: 'available' },
      { name: 'Industry Compliance', description: 'Sector-specific regulatory requirements', href: '/docs/security/compliance', status: 'available' },
      { name: 'Audit Procedures', description: 'Security auditing and compliance verification', href: '/docs/security/audits', status: 'available' }
    ]
  }
]

export default function DocumentationPage() {
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
              Technical Documentation
            </h1>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Comprehensive documentation, guides, and resources for developers, system integrators, 
              and technical teams implementing Kryohm IoT solutions. Everything you need for 
              successful integration and ongoing system management.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/docs/api/rest">
                  Get Started with API
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact?type=technical&source=docs">
                  Contact Technical Support
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick Start */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Quick Start Guide
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Get up and running with Kryohm APIs and services in minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">1️⃣</div>
                  <h3 className="text-lg font-semibold text-[--color-neutral-900] mb-2">
                    Get API Credentials
                  </h3>
                  <p className="text-sm text-[--color-neutral-600] mb-4">
                    Register for developer access and obtain your API keys
                  </p>
                  <Button size="sm" asChild>
                    <Link href="/contact?type=api&source=docs">Get API Key</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">2️⃣</div>
                  <h3 className="text-lg font-semibold text-[--color-neutral-900] mb-2">
                    Make First API Call
                  </h3>
                  <p className="text-sm text-[--color-neutral-600] mb-4">
                    Test authentication and retrieve device data
                  </p>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/docs/api/rest#authentication">View Example</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">3️⃣</div>
                  <h3 className="text-lg font-semibold text-[--color-neutral-900] mb-2">
                    Integrate Your App
                  </h3>
                  <p className="text-sm text-[--color-neutral-600] mb-4">
                    Use our SDKs or direct API calls in your application
                  </p>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/docs/sdks/javascript">Choose SDK</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Documentation Categories */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Documentation Categories
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Browse comprehensive documentation organized by topic and use case
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {documentationCategories.map((category, index) => (
                <Card key={index} variant="outlined" className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-2xl">{category.icon}</div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="border-b border-[--color-neutral-200] pb-3 last:border-b-0">
                          <div className="flex items-center justify-between mb-1">
                            <Link 
                              href={item.href}
                              className="font-medium text-[--color-neutral-900] hover:text-[--color-brand-primary] transition-colors"
                            >
                              {item.name}
                            </Link>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.status === 'available' 
                                ? 'bg-[--color-state-success-100] text-[--color-state-success-700]'
                                : 'bg-[--color-neutral-100] text-[--color-neutral-600]'
                            }`}>
                              {item.status === 'available' ? 'Available' : 'Coming Soon'}
                            </span>
                          </div>
                          <p className="text-sm text-[--color-neutral-600]">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Developer Resources */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Developer Resources
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Additional tools and resources to accelerate your development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">
                    Postman Collection
                  </h3>
                  <p className="text-sm text-[--color-neutral-600] mb-4">
                    Ready-to-use API collection for testing
                  </p>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/downloads/postman-collection.json">Download</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🎮</div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">
                    API Playground
                  </h3>
                  <p className="text-sm text-[--color-neutral-600] mb-4">
                    Interactive API testing interface
                  </p>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/docs/playground">Try Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">📱</div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">
                    Sample Apps
                  </h3>
                  <p className="text-sm text-[--color-neutral-600] mb-4">
                    Example applications and code snippets
                  </p>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/docs/examples">Browse Examples</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">💬</div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">
                    Developer Forum
                  </h3>
                  <p className="text-sm text-[--color-neutral-600] mb-4">
                    Community support and discussions
                  </p>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/community">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Support CTA */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Need Technical Support?
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Our technical team is available to help with integration questions, 
              troubleshooting, and custom implementation requirements.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=technical&source=docs_support">
                  Contact Technical Support
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/technical">
                  View Technical Credentials
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Technical Documentation | Kryohm IoT Solutions',
  description: 'Comprehensive technical documentation, API references, integration guides, and developer resources for Kryohm IoT solutions.',
  keywords: 'IoT API documentation, technical guides, integration tutorials, developer resources, SDK documentation, IoT development',
  openGraph: {
    title: 'Technical Documentation | Kryohm IoT Solutions',
    description: 'Comprehensive technical documentation and developer resources for IoT integration.',
    type: 'website',
  },
}
