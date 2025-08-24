import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getAllIndustries } from '@/lib/data/industries'

export default function IndustriesPage() {
  const industries = getAllIndustries()

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
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-6">
              Industry Solutions
            </h1>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Discover how Kryohm IoT solutions address the unique challenges and requirements 
              of different industries. From agriculture to manufacturing, we deliver tailored 
              solutions that drive measurable results.
            </p>
          </div>
        </Container>
      </Section>

      {/* Industries Grid */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industries.map((industry) => (
                <Card key={industry.slug} variant="elevated" className="h-full group hover:shadow-strong transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4">{industry.icon}</div>
                    <CardTitle className="text-heading-md group-hover:text-[--color-brand-primary] transition-colors">
                      {industry.name}
                    </CardTitle>
                    <CardDescription className="text-body-md">
                      {industry.heroDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Key Solutions Preview */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-[--color-neutral-800] mb-3">
                        Key Solutions:
                      </h3>
                      <div className="space-y-2">
                        {industry.solutions.slice(0, 3).map((solution, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-[--color-state-success-500] text-sm mt-1">✓</span>
                            <span className="text-sm text-[--color-neutral-700]">
                              {solution.benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Primary Product */}
                    <div className="mb-6">
                      <div className="bg-[--color-brand-primary-50] rounded-lg p-3 text-center">
                        <div className="text-sm font-medium text-[--color-brand-primary-700]">
                          Primary Solution
                        </div>
                        <div className="font-semibold text-[--color-brand-primary]">
                          {industry.recommendedProducts.primary}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3">
                      <Button asChild className="w-full">
                        <Link href={`/industries/${industry.slug}`}>
                          Explore {industry.name} Solutions
                        </Link>
                      </Button>
                      <Button variant="secondary" size="sm" asChild className="w-full">
                        <Link href={`/contact?type=${industry.cta.formType}&industry=${industry.name}&source=industries_overview`}>
                          {industry.cta.primary}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Cross-Industry Benefits */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Cross-Industry Benefits
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              While each industry has unique requirements, Kryohm solutions deliver consistent value across all sectors
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[--color-brand-primary-100] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-heading-sm font-bold mb-2">Cost Reduction</h3>
                <p className="text-body-sm text-[--color-neutral-600]">
                  Average 20-40% reduction in operational costs across all industries
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[--color-brand-primary-100] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-heading-sm font-bold mb-2">Efficiency Gains</h3>
                <p className="text-body-sm text-[--color-neutral-600]">
                  Measurable improvements in resource utilization and process efficiency
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[--color-brand-primary-100] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-heading-sm font-bold mb-2">Real-time Insights</h3>
                <p className="text-body-sm text-[--color-neutral-600]">
                  Data-driven decision making with comprehensive monitoring and analytics
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="lg" variant="dark">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-lg font-bold text-white mb-6">
              Don't See Your Industry?
            </h2>
            <p className="text-body-lg text-neutral-300 mb-8">
              Kryohm solutions are adaptable to many industries beyond those featured here. 
              Let's discuss how we can address your specific industry challenges and requirements.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=consultation&source=industries_custom">
                  Discuss Custom Solutions
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/projects">
                  View All Case Studies
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export const metadata = {
  title: 'Industry Solutions | Kryohm IoT Solutions',
  description: 'Discover industry-specific IoT solutions for agriculture, utilities, property management, and manufacturing. Tailored solutions that drive measurable results.',
  keywords: 'industry IoT solutions, agriculture automation, utility management, property management, industrial IoT, smart solutions',
  openGraph: {
    title: 'Industry Solutions | Kryohm IoT Solutions',
    description: 'Discover industry-specific IoT solutions tailored to your sector\'s unique challenges and requirements.',
    type: 'website',
  },
}
