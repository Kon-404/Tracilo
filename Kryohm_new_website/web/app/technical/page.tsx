import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ThirdPartyValidation } from '@/components/content/ThirdPartyValidation'
import { TestimonialsSection } from '@/components/content/TestimonialsSection'
import type { Metadata } from 'next'

// Technical team expertise
const technicalTeam = [
  {
    name: 'Mark Thompson',
    title: 'Chief Technology Officer',
    expertise: ['IoT Architecture', 'Cloud Platforms', 'Security Systems'],
    experience: '12+ years',
    certifications: ['AWS Solutions Architect', 'Azure IoT Developer', 'Certified Security Professional'],
    specialization: 'Enterprise IoT platform design and scalable system architecture'
  },
  {
    name: 'Dr. Priya Sharma',
    title: 'Lead Hardware Engineer',
    expertise: ['Embedded Systems', 'Sensor Technology', 'RF Communications'],
    experience: '10+ years',
    certifications: ['IEEE Senior Member', 'Certified Electronics Engineer', 'RF Design Specialist'],
    specialization: 'Industrial-grade sensor development and wireless communication protocols'
  },
  {
    name: 'David Chen',
    title: 'Lead Software Engineer',
    expertise: ['Full-Stack Development', 'API Design', 'System Integration'],
    experience: '8+ years',
    certifications: ['Microsoft Azure Developer', 'Google Cloud Professional', 'Certified Kubernetes Administrator'],
    specialization: 'Real-time data processing and IoT platform development'
  },
  {
    name: 'Alex Mthembu',
    title: 'Senior DevOps Engineer',
    expertise: ['Infrastructure', 'CI/CD', 'Monitoring'],
    experience: '9+ years',
    certifications: ['AWS DevOps Professional', 'Docker Certified Associate', 'Terraform Associate'],
    specialization: 'Scalable IoT infrastructure and automated deployment systems'
  }
]

// Technology partnerships
const technologyPartners = [
  {
    category: 'Cloud Platforms',
    partners: [
      { name: 'Microsoft Azure', type: 'IoT Partner', description: 'Azure IoT Suite integration and certification' },
      { name: 'Amazon Web Services', type: 'Technology Partner', description: 'AWS IoT Core and Lambda integration' },
      { name: 'Google Cloud', type: 'IoT Partner', description: 'Google Cloud IoT platform integration' }
    ]
  },
  {
    category: 'Hardware Vendors',
    partners: [
      { name: 'Arm', type: 'Mbed Partner', description: 'Embedded device development and security' },
      { name: 'Espressif', type: 'Technology Partner', description: 'ESP32/ESP8266 development partnership' },
      { name: 'STMicroelectronics', type: 'Partner Program', description: 'Industrial sensor and microcontroller solutions' }
    ]
  },
  {
    category: 'Integration Partners',
    partners: [
      { name: 'Siemens', type: 'Solution Partner', description: 'Industrial automation and SCADA integration' },
      { name: 'Schneider Electric', type: 'Alliance Partner', description: 'Energy management system integration' },
      { name: 'Honeywell', type: 'Technology Partner', description: 'Building automation and control systems' }
    ]
  }
]

// Quality assurance standards
const qualityStandards = [
  {
    category: 'Testing Protocols',
    items: [
      'Automated unit and integration testing',
      'Hardware stress testing and burn-in procedures',
      'Environmental testing (temperature, humidity, vibration)',
      'EMC/EMI compliance testing',
      'Cybersecurity penetration testing'
    ]
  },
  {
    category: 'Reliability Standards',
    items: [
      'ISO 9001:2015 Quality Management',
      'IEC 61508 Functional Safety',
      'IP65/IP67 ingress protection ratings',
      'MTBF (Mean Time Between Failures) > 5 years',
      '99.9% uptime SLA guarantee'
    ]
  },
  {
    category: 'Warranty & Support',
    items: [
      '2-year comprehensive hardware warranty',
      '5-year extended warranty options available',
      'Lifetime software updates and security patches',
      'Remote diagnostics and predictive maintenance',
      'On-site support within 48 hours (major cities)'
    ]
  }
]

// Implementation methodology
const implementationPhases = [
  {
    phase: 'Discovery & Assessment',
    duration: '1-2 weeks',
    activities: [
      'Site survey and requirements analysis',
      'Infrastructure assessment',
      'Security evaluation',
      'Technical architecture design'
    ]
  },
  {
    phase: 'Design & Development',
    duration: '2-4 weeks',
    activities: [
      'Custom solution design',
      'Hardware configuration',
      'Software development',
      'Integration testing'
    ]
  },
  {
    phase: 'Deployment & Testing',
    duration: '1-3 weeks',
    activities: [
      'Hardware installation',
      'Network configuration',
      'System integration',
      'User acceptance testing'
    ]
  },
  {
    phase: 'Training & Handover',
    duration: '1 week',
    activities: [
      'User training sessions',
      'Documentation handover',
      'Support team introduction',
      'Performance optimization'
    ]
  }
]

// Support capabilities
const supportCapabilities = [
  {
    level: 'Standard Support',
    hours: 'Business Hours (8 AM - 6 PM)',
    response: '4-hour response time',
    channels: ['Email', 'Phone', 'Web Portal'],
    included: ['Technical support', 'Software updates', 'Remote diagnostics']
  },
  {
    level: 'Premium Support',
    hours: 'Extended Hours (7 AM - 10 PM)',
    response: '2-hour response time',
    channels: ['Email', 'Phone', 'Web Portal', 'Live Chat'],
    included: ['Priority support', 'Dedicated account manager', 'Quarterly reviews']
  },
  {
    level: 'Enterprise Support',
    hours: '24/7/365 Coverage',
    response: '1-hour response time',
    channels: ['All channels', 'Direct engineer access'],
    included: ['On-site support', 'Custom SLA', 'Proactive monitoring']
  }
]

// Technical documentation
const technicalDocs = [
  {
    category: 'API Documentation',
    items: [
      { name: 'REST API Reference', url: '/docs/api/rest' },
      { name: 'WebSocket API Guide', url: '/docs/api/websocket' },
      { name: 'Authentication & Security', url: '/docs/api/auth' },
      { name: 'Rate Limiting & Best Practices', url: '/docs/api/best-practices' }
    ]
  },
  {
    category: 'Integration Guides',
    items: [
      { name: 'Azure IoT Hub Integration', url: '/docs/integrations/azure' },
      { name: 'AWS IoT Core Setup', url: '/docs/integrations/aws' },
      { name: 'MQTT Broker Configuration', url: '/docs/integrations/mqtt' },
      { name: 'Database Integration Guide', url: '/docs/integrations/database' }
    ]
  },
  {
    category: 'Hardware Documentation',
    items: [
      { name: 'Sensor Installation Guide', url: '/docs/hardware/sensors' },
      { name: 'Device Configuration Manual', url: '/docs/hardware/config' },
      { name: 'Troubleshooting Guide', url: '/docs/hardware/troubleshooting' },
      { name: 'Maintenance Procedures', url: '/docs/hardware/maintenance' }
    ]
  }
]

export default function TechnicalPage() {
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
              Technical Excellence & Credentials
            </h1>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Discover Kryohm's technical capabilities, industry certifications, and proven expertise 
              in delivering enterprise-grade IoT solutions. Our technical team combines deep industry 
              knowledge with cutting-edge technology to solve complex challenges.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=technical&source=technical_page">
                  Schedule Technical Review
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact?type=demo&source=technical_page">
                  Speak with Engineer
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Technical Team Expertise */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Technical Team Expertise
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Our experienced technical team brings decades of combined expertise in IoT, 
                cloud platforms, and enterprise system integration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technicalTeam.map((member, index) => (
                <Card key={index} variant="elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <span className="text-sm text-[--color-brand-primary] font-medium">
                        {member.experience}
                      </span>
                    </div>
                    <CardDescription className="text-[--color-brand-primary-700] font-medium">
                      {member.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[--color-neutral-800] mb-2">
                          Technical Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-2 py-1 bg-[--color-brand-primary-50] text-[--color-brand-primary-700] rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[--color-neutral-800] mb-2">
                          Certifications
                        </h4>
                        <ul className="space-y-1">
                          {member.certifications.map((cert, idx) => (
                            <li key={idx} className="text-xs text-[--color-neutral-600] flex items-start">
                              <span className="text-[--color-state-success-500] mr-1 mt-1">✓</span>
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[--color-neutral-800] mb-2">
                          Specialization
                        </h4>
                        <p className="text-xs text-[--color-neutral-600]">
                          {member.specialization}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Technology Partnerships */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Technology Partnerships
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Strategic partnerships with leading technology companies ensure we deliver 
                cutting-edge solutions with enterprise-grade reliability and support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technologyPartners.map((category, index) => (
                <Card key={index} variant="outlined" className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-center">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.partners.map((partner, idx) => (
                        <div key={idx} className="border-b border-[--color-neutral-200] pb-3 last:border-b-0">
                          <div className="font-medium text-[--color-neutral-900] mb-1">
                            {partner.name}
                          </div>
                          <div className="text-xs text-[--color-brand-primary] mb-2">
                            {partner.type}
                          </div>
                          <div className="text-xs text-[--color-neutral-600]">
                            {partner.description}
                          </div>
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

      {/* Third-Party Validation */}
      <ThirdPartyValidation variant="grid" />

      {/* Quality Assurance */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Quality Assurance & Standards
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Rigorous testing protocols and industry-leading reliability standards 
                ensure our solutions perform consistently in demanding environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {qualityStandards.map((standard, index) => (
                <Card key={index} variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-lg">{standard.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {standard.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-[--color-neutral-600] flex items-start">
                          <span className="text-[--color-state-success-500] mr-2 mt-1">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Implementation Methodology */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Implementation Methodology
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Our proven methodology ensures successful project delivery with 
                minimal disruption to your operations and maximum system reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {implementationPhases.map((phase, index) => (
                <Card key={index} variant="outlined" className="h-full">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-[--color-brand-primary] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    <CardDescription className="text-[--color-brand-primary] font-medium">
                      {phase.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.activities.map((activity, idx) => (
                        <li key={idx} className="text-sm text-[--color-neutral-600] flex items-start">
                          <span className="text-[--color-brand-primary] mr-2 mt-1">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Support Capabilities */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Technical Support Capabilities
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Comprehensive support options with guaranteed response times and 
                escalation procedures to ensure your systems operate at peak performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportCapabilities.map((support, index) => (
                <Card key={index} variant={index === 2 ? "elevated" : "outlined"} className="h-full">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{support.level}</CardTitle>
                    <div className="text-2xl font-bold text-[--color-brand-primary] my-2">
                      {support.response}
                    </div>
                    <CardDescription>{support.hours}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[--color-neutral-800] mb-2">
                          Channels
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {support.channels.map((channel, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-2 py-1 bg-[--color-neutral-100] text-[--color-neutral-700] rounded"
                            >
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[--color-neutral-800] mb-2">
                          Included Services
                        </h4>
                        <ul className="space-y-1">
                          {support.included.map((service, idx) => (
                            <li key={idx} className="text-xs text-[--color-neutral-600] flex items-start">
                              <span className="text-[--color-state-success-500] mr-1 mt-1">✓</span>
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Technical Documentation */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Technical Documentation & Resources
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Comprehensive documentation, guides, and resources to support 
                successful integration and ongoing system management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technicalDocs.map((docCategory, index) => (
                <Card key={index} variant="outlined">
                  <CardHeader>
                    <CardTitle className="text-lg">{docCategory.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {docCategory.items.map((doc, idx) => (
                        <Link 
                          key={idx}
                          href={doc.url}
                          className="block p-3 rounded-lg border border-[--color-neutral-200] hover:border-[--color-brand-primary] hover:bg-[--color-brand-primary-50] transition-colors"
                        >
                          <div className="text-sm font-medium text-[--color-neutral-900] mb-1">
                            {doc.name}
                          </div>
                          <div className="text-xs text-[--color-brand-primary]">
                            View Documentation →
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/docs">
                  Access Complete Documentation Portal
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Security & Compliance */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Security & Compliance
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                Enterprise-grade security protocols and comprehensive compliance with 
                industry regulations ensure your data and systems remain protected.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🔒</div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">
                    Data Protection
                  </h3>
                  <p className="text-sm text-[--color-neutral-600]">
                    End-to-end encryption, secure key management, and GDPR compliance
                  </p>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">
                    Cybersecurity
                  </h3>
                  <p className="text-sm text-[--color-neutral-600]">
                    Regular security audits, penetration testing, and threat monitoring
                  </p>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">📋</div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">
                    Compliance
                  </h3>
                  <p className="text-sm text-[--color-neutral-600]">
                    Industry-specific compliance including POPIA, ISO 27001, and sector regulations
                  </p>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🔍</div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">
                    Audit Trail
                  </h3>
                  <p className="text-sm text-[--color-neutral-600]">
                    Comprehensive logging, monitoring, and forensic capabilities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Innovation & R&D */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Innovation & Future Technology
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Continuous investment in research and development ensures our solutions 
              stay ahead of emerging technologies and industry trends.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🧪</div>
                <h3 className="text-lg font-semibold text-[--color-neutral-900] mb-2">
                  R&D Investment
                </h3>
                <div className="text-2xl font-bold text-[--color-brand-primary] mb-2">15%</div>
                <p className="text-sm text-[--color-neutral-600]">
                  Annual revenue invested in research and development
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-semibold text-[--color-neutral-900] mb-2">
                  Emerging Tech
                </h3>
                <div className="text-2xl font-bold text-[--color-brand-primary] mb-2">AI/ML</div>
                <p className="text-sm text-[--color-neutral-600]">
                  Edge AI and machine learning integration
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-lg font-semibold text-[--color-neutral-900] mb-2">
                  Future Ready
                </h3>
                <div className="text-2xl font-bold text-[--color-brand-primary] mb-2">5G</div>
                <p className="text-sm text-[--color-neutral-600]">
                  5G and next-generation connectivity preparation
                </p>
              </div>
            </div>

            <Button asChild>
              <Link href="/contact?type=innovation&source=technical_page">
                Discuss Future Technology Roadmap
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Technical Testimonials */}
      <TestimonialsSection 
        variant="featured" 
        limit={2}
        title="What Technical Teams Say"
        description="Feedback from engineers and technical decision-makers who have implemented Kryohm solutions"
      />

      {/* Technical CTA */}
      <Section spacing="lg" variant="dark">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-lg font-bold text-white mb-6">
              Ready for Technical Deep Dive?
            </h2>
            <p className="text-body-lg text-neutral-300 mb-8">
              Connect with our technical team for detailed architecture discussions, 
              proof-of-concept development, or custom solution design.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=technical&source=technical_cta">
                  Schedule Technical Review
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact?type=demo&source=technical_cta">
                  Request Technical Demo
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
  title: 'Technical Excellence & Credentials | Kryohm IoT Solutions',
  description: 'Discover Kryohm\'s technical capabilities, industry certifications, and proven expertise in delivering enterprise-grade IoT solutions with comprehensive support.',
  keywords: 'IoT technical expertise, enterprise IoT solutions, technical certifications, IoT implementation methodology, technical support, system integration, IoT security, compliance',
  openGraph: {
    title: 'Technical Excellence & Credentials | Kryohm IoT Solutions',
    description: 'Technical capabilities, certifications, and expertise in enterprise-grade IoT solutions.',
    type: 'website',
  },
}
