import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section spacing="xl" variant="primary">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-6">
              Transform Your Energy Management with Smart IoT Solutions
            </h1>
            <p className="text-body-lg text-[--color-neutral-700] mb-8 max-w-2xl mx-auto">
              Kryohm delivers innovative IoT technologies that help businesses monitor, control, and optimize their energy consumption through intelligent sensors, prepaid metering, and automated control systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=demo">Book a Demo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Request Pricing</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Product Showcase */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
              Our IoT Product Portfolio
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-2xl mx-auto">
              Discover our comprehensive range of IoT solutions designed to revolutionize how you manage energy and operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sensors Product Card */}
            <Card variant="elevated" className="group hover:shadow-strong transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[--color-brand-primary-100] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[--color-brand-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <CardTitle>IoT Sensors</CardTitle>
                <CardDescription>
                  Advanced environmental monitoring sensors that track temperature, humidity, air quality, and operational parameters in real-time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-[--color-neutral-600] mb-6 space-y-2">
                  <li>• Real-time environmental monitoring</li>
                  <li>• Wireless connectivity and remote access</li>
                  <li>• Customizable alert thresholds</li>
                  <li>• Long-lasting battery life</li>
                </ul>
                <Button variant="secondary" className="w-full group-hover:bg-[--color-brand-primary] group-hover:text-white transition-colors" asChild>
                  <Link href="/products/sensors">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Prepaid Metering Card */}
            <Card variant="elevated" className="group hover:shadow-strong transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[--color-brand-accent-100] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[--color-brand-accent]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle>Prepaid Metering</CardTitle>
                <CardDescription>
                  Smart energy metering solutions that enable prepaid consumption control, reducing waste and improving budget management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-[--color-neutral-600] mb-6 space-y-2">
                  <li>• Prepaid energy management system</li>
                  <li>• Real-time consumption tracking</li>
                  <li>• Mobile app integration</li>
                  <li>• Automatic cutoff and reconnection</li>
                </ul>
                <Button variant="secondary" className="w-full group-hover:bg-[--color-brand-primary] group-hover:text-white transition-colors" asChild>
                  <Link href="/products/prepaid-metering">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Shower Control Card */}
            <Card variant="elevated" className="group hover:shadow-strong transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[--color-brand-primary-100] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[--color-brand-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <CardTitle>Shower Control</CardTitle>
                <CardDescription>
                  Automated shower management systems that optimize water usage, enhance user experience, and reduce operational costs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-[--color-neutral-600] mb-6 space-y-2">
                  <li>• Automated water flow control</li>
                  <li>• Temperature regulation</li>
                  <li>• Usage analytics and reporting</li>
                  <li>• Water conservation features</li>
                </ul>
                <Button variant="secondary" className="w-full group-hover:bg-[--color-brand-primary] group-hover:text-white transition-colors" asChild>
                  <Link href="/products/shower-control">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Product CTA Section */}
          <div className="text-center mt-12">
            <p className="text-body-md text-[--color-neutral-600] mb-6">
              Ready to see our products in action?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact?type=demo">Schedule Product Demo</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/products">View All Products →</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Indicators */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-md font-bold text-[--color-neutral-900] mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-body-lg text-[--color-neutral-600]">
              Join companies worldwide who rely on Kryohm's IoT solutions for their energy management needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[--color-brand-primary]">50+</div>
              <div className="text-sm font-medium text-[--color-neutral-900]">Active Installations</div>
              <div className="text-sm text-[--color-neutral-600]">Across multiple industries</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[--color-brand-primary]">30%</div>
              <div className="text-sm font-medium text-[--color-neutral-900]">Average Energy Savings</div>
              <div className="text-sm text-[--color-neutral-600]">Achieved by our clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[--color-brand-primary]">24/7</div>
              <div className="text-sm font-medium text-[--color-neutral-900]">Monitoring & Support</div>
              <div className="text-sm text-[--color-neutral-600]">Real-time system oversight</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Company Overview */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
                Engineering the Future of Energy Management
              </h2>
              <p className="text-body-lg text-[--color-neutral-700] mb-6">
                Kryohm combines cutting-edge IoT technology with deep industry expertise to deliver energy management solutions that drive efficiency, reduce costs, and support sustainability goals.
              </p>
              <p className="text-body-md text-[--color-neutral-600] mb-8">
                Our team of engineers and energy specialists work closely with clients to understand their unique challenges and deliver custom IoT solutions that provide immediate value and long-term benefits.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">Technical Excellence</h3>
                  <p className="text-sm text-[--color-neutral-600]">Advanced IoT protocols, cloud integration, and real-time analytics</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[--color-neutral-900] mb-2">Industry Focus</h3>
                  <p className="text-sm text-[--color-neutral-600]">Specialized solutions for utilities, property management, and industrial sectors</p>
                </div>
              </div>
              
              <Button asChild>
                <Link href="/about">Learn About Our Company</Link>
              </Button>
            </div>
            
            <div className="bg-[--color-neutral-100] rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-[--color-brand-primary] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-heading-xs font-bold text-[--color-neutral-900] mb-4">Innovation Driven</h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Continuously advancing IoT technology to solve tomorrow's energy challenges today.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact CTA Section */}
      <Section spacing="lg" variant="dark">
        <Container>
          <div className="text-center">
            <h2 className="text-heading-lg font-bold text-white mb-4">
              Ready to Transform Your Energy Management?
            </h2>
            <p className="text-body-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Get in touch with our IoT specialists to discuss your specific requirements and learn how Kryohm can help optimize your energy systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[--color-brand-primary] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Email Us</h3>
                <p className="text-sm text-neutral-300">info@kryohm.com</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[--color-brand-primary] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Call Us</h3>
                <p className="text-sm text-neutral-300">+27 (12) 345-6789</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[--color-brand-primary] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Visit Us</h3>
                <p className="text-sm text-neutral-300">Johannesburg, South Africa</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=demo">Book a Demo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export const metadata = {
  title: 'Kryohm - IoT Solutions for Smart Energy Management',
  description: 'Transform your energy management with Kryohm\'s innovative IoT solutions. Advanced sensors, prepaid metering, and automated control systems for businesses.',
  keywords: ['IoT solutions', 'energy management', 'smart sensors', 'prepaid metering', 'shower control', 'automation'],
  openGraph: {
    title: 'Kryohm - IoT Solutions for Smart Energy Management',
    description: 'Transform your energy management with Kryohm\'s innovative IoT solutions. Advanced sensors, prepaid metering, and automated control systems for businesses.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kryohm - IoT Solutions for Smart Energy Management',
    description: 'Transform your energy management with Kryohm\'s innovative IoT solutions.',
  },
}
