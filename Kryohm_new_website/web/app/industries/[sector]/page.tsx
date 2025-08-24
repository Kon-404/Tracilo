import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getIndustryData, getAllIndustries } from '@/lib/data/industries'
import { getProjectsByIndustry } from '@/lib/data/projects'
import type { IndustryData } from '@/lib/data/industries'

interface PageProps {
  params: Promise<{
    sector: string
  }>
}

interface IndustryPageProps {
  industry: IndustryData
}

function IndustryHero({ industry }: IndustryPageProps) {
  return (
    <Section spacing="lg" className="bg-gradient-to-br from-[--color-brand-primary-50] to-[--color-brand-accent-50]">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">{industry.icon}</div>
          <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-6">
            {industry.heroTitle}
          </h1>
          <p className="text-body-lg text-[--color-neutral-700] mb-8">
            {industry.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={`/contact?type=demo&industry=${industry.name}&source=industry_page`}>
                {industry.cta.primary}
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="#resources">
                {industry.cta.secondary}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function IndustryChallenges({ industry }: IndustryPageProps) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
              {industry.name} Industry Challenges
            </h2>
            <p className="text-body-lg text-[--color-neutral-600]">
              Understanding the unique challenges facing {industry.name.toLowerCase()} operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.challenges.map((challenge, index) => (
              <Card key={index} variant="outlined" className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-[--color-brand-primary-100] rounded-lg flex items-center justify-center mb-4">
                    <div className="text-2xl text-[--color-brand-primary]">⚠️</div>
                  </div>
                  <CardTitle className="text-heading-sm">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{challenge.description}</CardDescription>
                  <div className="bg-[--color-state-error-50] text-[--color-state-error-700] p-3 rounded-md text-sm font-medium">
                    Impact: {challenge.impact}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function IndustrySolutions({ industry }: IndustryPageProps) {
  const getProductIcon = (product: string) => {
    switch (product) {
      case 'Sensors': return '📡'
      case 'Prepaid Metering': return '⚡'
      case 'Shower Control': return '🚿'
      case 'Platform': return '🔧'
      default: return '🔧'
    }
  }

  return (
    <Section spacing="lg" variant="secondary">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
              How Kryohm Solves {industry.name} Challenges
            </h2>
            <p className="text-body-lg text-[--color-neutral-600]">
              Targeted solutions that address your industry's specific needs
            </p>
          </div>
          
          <div className="space-y-8">
            {industry.solutions.map((solution, index) => (
              <Card key={index} variant="elevated" padding="lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div>
                    <h3 className="text-heading-sm font-bold text-[--color-neutral-900] mb-2">
                      Challenge
                    </h3>
                    <p className="text-body-md text-[--color-neutral-700] mb-4">
                      {solution.challenge}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-heading-sm font-bold text-[--color-brand-primary] mb-2">
                      Our Solution
                    </h3>
                    <p className="text-body-md text-[--color-neutral-700] mb-4">
                      {solution.solution}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {solution.products.map((product, pIndex) => (
                        <span 
                          key={pIndex}
                          className="inline-flex items-center space-x-1 bg-[--color-brand-primary-100] text-[--color-brand-primary-700] px-2 py-1 rounded-md text-sm font-medium"
                        >
                          <span>{getProductIcon(product)}</span>
                          <span>{product}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-heading-sm font-bold text-[--color-state-success-700] mb-2">
                      Results
                    </h3>
                    <p className="text-body-md text-[--color-neutral-700]">
                      {solution.benefit}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function RecommendedProducts({ industry }: IndustryPageProps) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
            Recommended Solutions for {industry.name}
          </h2>
          <p className="text-body-lg text-[--color-neutral-600] mb-8">
            {industry.recommendedProducts.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">
                  {industry.recommendedProducts.primary === 'Sensors' ? '📡' :
                   industry.recommendedProducts.primary === 'Prepaid Metering' ? '⚡' :
                   industry.recommendedProducts.primary === 'Shower Control' ? '🚿' : '🔧'}
                </div>
                <CardTitle>Primary Solution</CardTitle>
                <CardDescription>{industry.recommendedProducts.primary}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/products/${industry.recommendedProducts.primary.toLowerCase().replace(' ', '-')}`}>
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card variant="outlined" className="text-center">
              <CardHeader>
                <div className="text-2xl mb-4">🔗</div>
                <CardTitle>Complementary Solutions</CardTitle>
                <CardDescription>
                  {industry.recommendedProducts.secondary.join(', ')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" asChild className="w-full">
                  <Link href="/products">
                    View All Products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function IndustryCaseStudies({ industry }: IndustryPageProps) {
  const caseStudies = getProjectsByIndustry(industry.name)
  
  if (caseStudies.length === 0) {
    return null
  }

  return (
    <Section spacing="lg" variant="secondary">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
              {industry.name} Success Stories
            </h2>
            <p className="text-body-lg text-[--color-neutral-600]">
              Real results from {industry.name.toLowerCase()} implementations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {caseStudies.slice(0, 3).map((caseStudy) => (
              <Card key={caseStudy.id} variant="elevated" className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[--color-brand-primary]">
                      {caseStudy.productType}
                    </span>
                    {caseStudy.featured && (
                      <span className="bg-[--color-brand-primary] text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {caseStudy.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-[--color-neutral-50] rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[--color-brand-primary] mb-1">
                        {caseStudy.keyOutcome.value}
                      </div>
                      <div className="text-sm text-[--color-neutral-600]">
                        {caseStudy.keyOutcome.metric}
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" asChild className="w-full">
                    <Link href={`/projects/${caseStudy.slug}`}>
                      Read Case Study
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild>
              <Link href={`/projects?industry=${industry.name}`}>
                View All {industry.name} Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ComplianceSection({ industry }: IndustryPageProps) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
              Compliance & Standards
            </h2>
            <p className="text-body-lg text-[--color-neutral-600]">
              Meeting {industry.name.toLowerCase()} industry requirements and regulations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <CardHeader>
                <div className="text-2xl mb-2">📋</div>
                <CardTitle className="text-heading-sm">Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {industry.compliance.standards.map((standard, index) => (
                    <li key={index} className="text-sm text-[--color-neutral-700] flex items-start">
                      <span className="text-[--color-state-success-500] mr-2">✓</span>
                      {standard}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardHeader>
                <div className="text-2xl mb-2">🏆</div>
                <CardTitle className="text-heading-sm">Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {industry.compliance.certifications.map((cert, index) => (
                    <li key={index} className="text-sm text-[--color-neutral-700] flex items-start">
                      <span className="text-[--color-state-success-500] mr-2">✓</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardHeader>
                <div className="text-2xl mb-2">⚖️</div>
                <CardTitle className="text-heading-sm">Regulations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {industry.compliance.regulations.map((reg, index) => (
                    <li key={index} className="text-sm text-[--color-neutral-700] flex items-start">
                      <span className="text-[--color-state-success-500] mr-2">✓</span>
                      {reg}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ResourcesSection({ industry }: IndustryPageProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'calculator': return '📊'
      case 'guide': return '📖'
      case 'whitepaper': return '📄'
      default: return '📄'
    }
  }

  return (
    <Section spacing="lg" variant="secondary" id="resources">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
              {industry.name} Resources
            </h2>
            <p className="text-body-lg text-[--color-neutral-600]">
              Download industry-specific guides, calculators, and whitepapers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.resources.map((resource, index) => (
              <Card key={index} variant="elevated" className="h-full">
                <CardHeader>
                  <div className="text-3xl mb-4">{getResourceIcon(resource.type)}</div>
                  <CardTitle className="text-heading-sm">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={resource.downloadUrl} target="_blank">
                      Download {resource.type === 'calculator' ? 'Calculator' : 
                               resource.type === 'guide' ? 'Guide' : 'Whitepaper'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default async function IndustryPage({ params }: PageProps) {
  const { sector } = await params
  const industry = getIndustryData(sector)

  if (!industry) {
    notFound()
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Section spacing="sm" variant="secondary">
        <Container>
          <Breadcrumb />
        </Container>
      </Section>

      {/* Industry Hero */}
      <IndustryHero industry={industry} />

      {/* Industry Challenges */}
      <IndustryChallenges industry={industry} />

      {/* Kryohm Solutions */}
      <IndustrySolutions industry={industry} />

      {/* Recommended Products */}
      <RecommendedProducts industry={industry} />

      {/* Case Studies */}
      <IndustryCaseStudies industry={industry} />

      {/* Compliance & Standards */}
      <ComplianceSection industry={industry} />

      {/* Resources */}
      <ResourcesSection industry={industry} />

      {/* Final CTA */}
      <Section spacing="lg" variant="dark">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-lg font-bold text-white mb-6">
              Ready to Transform Your {industry.name} Operations?
            </h2>
            <p className="text-body-lg text-neutral-300 mb-8">
              Let's discuss how Kryohm can deliver measurable improvements for your {industry.name.toLowerCase()} business. 
              Our experts understand your industry's unique challenges and requirements.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={`/contact?type=${industry.cta.formType}&industry=${industry.name}&source=industry_cta`}>
                  {industry.cta.primary}
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">
                  Speak with Expert
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export async function generateStaticParams() {
  return getAllIndustries().map((industry) => ({
    sector: industry.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sector } = await params
  const industry = getIndustryData(sector)

  if (!industry) {
    return {
      title: 'Industry Not Found - Kryohm',
      description: 'The requested industry page could not be found.'
    }
  }

  return {
    title: `${industry.heroTitle} | Kryohm IoT Solutions`,
    description: industry.heroDescription,
    keywords: industry.seoKeywords.join(', '),
    openGraph: {
      title: `${industry.heroTitle} | Kryohm IoT Solutions`,
      description: industry.heroDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.heroTitle} | Kryohm IoT Solutions`,
      description: industry.heroDescription,
    },
  }
}
