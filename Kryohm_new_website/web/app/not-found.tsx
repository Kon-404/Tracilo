import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function NotFound() {
  return (
    <Section spacing="xl">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Hero */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-[--color-primary-500] mb-4">
              404
            </div>
            <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-4">
              Page Not Found
            </h1>
            <p className="text-body-lg text-[--color-neutral-600]">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔍 Search Our Site</CardTitle>
                <CardDescription>
                  Find what you're looking for with our search functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/search">Search Kryohm</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🏠 Back to Home</CardTitle>
                <CardDescription>
                  Return to our homepage to explore our IoT solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Go to Homepage</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Popular Pages */}
          <div className="space-y-6">
            <h2 className="text-heading-md font-semibold text-[--color-neutral-900]">
              Popular Pages
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-[--color-neutral-900]">Products</h3>
                <div className="space-y-2">
                  <Link 
                    href="/products/sensors" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    IoT Sensors
                  </Link>
                  <Link 
                    href="/products/prepaid-metering" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Prepaid Metering
                  </Link>
                  <Link 
                    href="/products/shower-control" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Shower Control
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-[--color-neutral-900]">Industries</h3>
                <div className="space-y-2">
                  <Link 
                    href="/industries/agriculture" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Agriculture
                  </Link>
                  <Link 
                    href="/industries/utilities" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Utilities
                  </Link>
                  <Link 
                    href="/industries/property-management" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Property Management
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-[--color-neutral-900]">Company</h3>
                <div className="space-y-2">
                  <Link 
                    href="/about" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    About Us
                  </Link>
                  <Link 
                    href="/technical" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Technical Expertise
                  </Link>
                  <Link 
                    href="/projects" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Case Studies
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-[--color-neutral-900]">Resources</h3>
                <div className="space-y-2">
                  <Link 
                    href="/platform" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Platform Overview
                  </Link>
                  <Link 
                    href="/docs" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Documentation
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block text-sm text-[--color-neutral-600] hover:text-[--color-primary-600] transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-6 bg-[--color-neutral-50] rounded-lg">
            <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-2">
              Need Help Finding Something?
            </h3>
            <p className="text-body-base text-[--color-neutral-600] mb-4">
              Our team is here to help you find the right IoT solution for your needs.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild>
                <Link href="/contact">Contact Our Team</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact?type=demo">Book a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
