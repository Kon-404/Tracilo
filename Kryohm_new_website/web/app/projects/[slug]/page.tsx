'use client'

import { useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/form/ContactForm'
import { sampleProjects, getProjectsByIndustry, getProjectsByProductType } from '@/lib/data/projects'
import { analytics } from '@/lib/analytics'
import type { ProjectCaseStudy } from '@/lib/types'

interface PageProps {
  params: {
    slug: string
  }
}

interface CaseStudyDetailProps {
  project: ProjectCaseStudy
}

function ProjectStats({ project }: CaseStudyDetailProps) {
  const stats = [
    { label: 'Cost Savings', value: project.results.costSavings || 'N/A' },
    { label: 'Efficiency Gain', value: project.results.efficiencyGain || 'N/A' },
    { label: 'ROI', value: project.results.roi || 'N/A' },
    { label: 'Implementation Time', value: project.results.implementationTime || 'N/A' }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-[--color-brand-primary] mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-[--color-neutral-600] font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function TechnicalDetails({ project }: CaseStudyDetailProps) {
  const technicalSpecs = [
    { label: 'Industry', value: project.industry },
    { label: 'Product Type', value: project.productType },
    { label: 'Company Size', value: project.customer.size },
    { label: 'Location', value: project.customer.location },
    { label: 'Implementation', value: project.results.implementationTime || 'Custom timeline' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {technicalSpecs.map((spec, index) => (
        <div key={index} className="flex justify-between py-3 border-b border-[--color-neutral-200]">
          <span className="font-medium text-[--color-neutral-800]">{spec.label}:</span>
          <span className="text-[--color-neutral-600]">{spec.value}</span>
        </div>
      ))}
    </div>
  )
}

function CustomerTestimonial({ project }: CaseStudyDetailProps) {
  // Generate a realistic testimonial based on the project
  const testimonials = {
    'agri-001': {
      quote: "The IoT sensor system has transformed our irrigation efficiency. We're saving thousands of liters of water daily while maintaining optimal crop conditions.",
      author: "Mark van der Merwe",
      title: "Farm Operations Manager",
      company: project.customer.name
    },
    'util-001': {
      quote: "The prepaid metering system has revolutionized our revenue collection. We've seen a dramatic improvement in payment compliance and operational efficiency.",
      author: "Sarah Johannsen", 
      title: "Municipal Utility Director",
      company: project.customer.name
    },
    'prop-001': {
      quote: "The shower control system has significantly reduced our water costs while providing valuable usage insights for better resource management.",
      author: "Dr. James Mitchell",
      title: "Residence Manager",
      company: project.customer.name
    }
  }

  const defaultTestimonial = {
    quote: "Working with Kryohm has delivered exceptional results for our organization. Their technical expertise and implementation approach exceeded our expectations.",
    author: "Project Manager",
    title: "Operations Director", 
    company: project.customer.name
  }

  const testimonial = testimonials[project.id as keyof typeof testimonials] || defaultTestimonial

  return (
    <div className="bg-[--color-neutral-50] rounded-lg p-8">
      <div className="text-center">
        <div className="text-4xl text-[--color-brand-primary] mb-4">"</div>
        <blockquote className="text-body-lg italic text-[--color-neutral-800] mb-6">
          {testimonial.quote}
        </blockquote>
        <div className="border-t border-[--color-neutral-200] pt-4">
          <div className="font-semibold text-[--color-neutral-900]">{testimonial.author}</div>
          <div className="text-sm text-[--color-neutral-600]">{testimonial.title}</div>
          <div className="text-sm text-[--color-neutral-600]">{testimonial.company}</div>
        </div>
      </div>
    </div>
  )
}

function RelatedProjects({ project }: CaseStudyDetailProps) {
  // Get related projects by industry and product type
  const industryProjects = getProjectsByIndustry(project.industry)
    .filter(p => p.id !== project.id)
    .slice(0, 2)
  
  const productProjects = getProjectsByProductType(project.productType)
    .filter(p => p.id !== project.id && !industryProjects.find(ip => ip.id === p.id))
    .slice(0, 1)

  const relatedProjects = [...industryProjects, ...productProjects].slice(0, 3)

  if (relatedProjects.length === 0) return null

  return (
    <div>
      <h3 className="text-heading-md font-bold text-[--color-neutral-900] mb-6">
        Related Case Studies
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects.map((relatedProject) => (
          <Card key={relatedProject.id} variant="outlined" className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[--color-brand-primary]">
                  {relatedProject.industry}
                </span>
                <span className="text-xs text-[--color-neutral-500]">
                  {relatedProject.productType}
                </span>
              </div>
              <CardTitle className="text-lg">{relatedProject.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {relatedProject.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-lg font-bold text-[--color-brand-primary]">
                  {relatedProject.keyOutcome.value}
                </div>
                <div className="text-sm text-[--color-neutral-600]">
                  {relatedProject.keyOutcome.metric}
                </div>
              </div>
              <Button variant="secondary" size="sm" asChild className="w-full">
                <Link href={`/projects/${relatedProject.slug}`}>
                  Read Case Study
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SocialShare({ project }: CaseStudyDetailProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out this ${project.industry} IoT case study: ${project.title}`

  const shareLinks = [
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      icon: '💼'
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      icon: '🐦'
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`I thought you might find this case study interesting: ${currentUrl}`)}`,
      icon: '📧'
    }
  ]

  const handleShare = (platform: string) => {
    analytics.ctaClick(`share_${platform.toLowerCase()}`, 'case_study_detail')
  }

  const handlePrint = () => {
    window.print()
    analytics.ctaClick('print_case_study', 'case_study_detail')
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm font-medium text-[--color-neutral-800]">Share this case study:</span>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="sm"
          onClick={() => {
            handleShare(link.name)
            window.open(link.url, '_blank', 'noopener,noreferrer')
          }}
          className="flex items-center space-x-2"
        >
          <span>{link.icon}</span>
          <span>{link.name}</span>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrint}
        className="flex items-center space-x-2"
      >
        <span>🖨️</span>
        <span>Print</span>
      </Button>
    </div>
  )
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const project = sampleProjects.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  // Track page view
  useEffect(() => {
    analytics.trackFormEvent('case_study_viewed', 'case_study_detail', { 
      project_id: project.id,
      project_slug: project.slug,
      industry: project.industry,
      product_type: project.productType
    })
  }, [project.id, project.slug, project.industry, project.productType])

  const getProductIcon = (productType: string) => {
    switch (productType) {
      case 'Sensors': return '📡'
      case 'Prepaid Metering': return '⚡'
      case 'Shower Control': return '🚿'
      default: return '🔧'
    }
  }

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'Agriculture': return '🌾'
      case 'Utilities': return '⚡'
      case 'Property Management': return '🏢'
      case 'Industrial': return '🏭'
      case 'Healthcare': return '🏥'
      case 'Education': return '🎓'
      default: return '🏢'
    }
  }

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
          <div className="max-w-4xl mx-auto">
            {/* Project Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-3xl">{getIndustryIcon(project.industry)}</span>
                <span className="text-2xl">{getProductIcon(project.productType)}</span>
              </div>
              
              <div className="flex items-center justify-center space-x-6 mb-4 text-sm">
                <span className="bg-[--color-brand-primary-100] text-[--color-brand-primary-700] px-3 py-1 rounded-full font-medium">
                  {project.industry}
                </span>
                <span className="bg-[--color-brand-accent-100] text-[--color-brand-accent-700] px-3 py-1 rounded-full font-medium">
                  {project.productType}
                </span>
                {project.featured && (
                  <span className="bg-[--color-brand-primary] text-white px-3 py-1 rounded-full font-medium text-xs">
                    Featured Project
                  </span>
                )}
              </div>

              <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-4">
                {project.title}
              </h1>
              
              <p className="text-body-lg text-[--color-neutral-600] mb-8">
                {project.excerpt}
              </p>

              {/* Key Outcome Highlight */}
              <div className="bg-gradient-to-r from-[--color-brand-primary-50] to-[--color-brand-accent-50] rounded-xl p-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[--color-brand-primary] mb-2">
                    {project.keyOutcome.value}
                  </div>
                  <div className="text-lg font-semibold text-[--color-neutral-800] mb-2">
                    {project.keyOutcome.metric}
                  </div>
                  <div className="text-body-md text-[--color-neutral-600]">
                    {project.keyOutcome.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Project Details */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-8 text-center">
              Project Overview
            </h2>
            <TechnicalDetails project={project} />
          </div>
        </Container>
      </Section>

      {/* Challenge, Solution, Implementation */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Challenge */}
            <div>
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
                🎯 The Challenge
              </h2>
              <div className="bg-[--color-neutral-50] rounded-lg p-8">
                <p className="text-body-lg text-[--color-neutral-800] leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
                💡 Our Solution
              </h2>
              <div className="bg-[--color-brand-primary-50] rounded-lg p-8">
                <p className="text-body-lg text-[--color-neutral-800] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Implementation Approach */}
            <div>
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
                🔧 Implementation Approach
              </h2>
              <Card variant="outlined" padding="lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-3">📋</div>
                    <h3 className="text-lg font-semibold mb-2">Planning & Assessment</h3>
                    <p className="text-sm text-[--color-neutral-600]">
                      Comprehensive site analysis and requirements gathering
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">⚙️</div>
                    <h3 className="text-lg font-semibold mb-2">Deployment & Integration</h3>
                    <p className="text-sm text-[--color-neutral-600]">
                      Professional installation and system integration
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="text-lg font-semibold mb-2">Testing & Optimization</h3>
                    <p className="text-sm text-[--color-neutral-600]">
                      Performance validation and continuous optimization
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Results & Benefits */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-8 text-center">
              📈 Measurable Results
            </h2>
            <Card variant="elevated" padding="lg" className="mb-8">
              <ProjectStats project={project} />
            </Card>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.tags.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-[--color-neutral-200]">
                  <div className="text-2xl">✅</div>
                  <span className="font-medium text-[--color-neutral-800] capitalize">
                    {benefit.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Customer Testimonial */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-8 text-center">
              💬 Customer Testimonial
            </h2>
            <CustomerTestimonial project={project} />
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              🛠️ Products Used in This Project
            </h2>
            <p className="text-body-md text-[--color-neutral-600] mb-8">
              Learn more about the {project.productType} solutions that delivered these results
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={`/products/${project.productType.toLowerCase().replace(' ', '-')}`}>
                  Learn About {project.productType}
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/products">
                  View All Products
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Case Studies */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-6xl mx-auto">
            <RelatedProjects project={project} />
          </div>
        </Container>
      </Section>

      {/* Social Sharing */}
      <Section spacing="md" variant="secondary">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-[--color-neutral-200]">
              <SocialShare project={project} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Lead Capture CTA */}
      <Section spacing="lg" variant="dark">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-lg font-bold text-white mb-4">
              Interested in Similar Results?
            </h2>
            <p className="text-body-lg text-neutral-300 mb-8">
              Let's discuss how Kryohm can deliver comparable improvements for your {project.industry.toLowerCase()} operations. 
              Our experts will analyze your specific requirements and create a custom implementation plan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <Link href={`/contact?type=demo&industry=${project.industry}&product=${project.productType}`}>
                  Book a Demo
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href={`/contact?type=pricing&project=${project.slug}`}>
                  Discuss Similar Project
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            font-size: 12pt;
            line-height: 1.4;
          }
          
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
          }
          
          .page-break {
            page-break-before: always;
          }
          
          .avoid-break {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </>
  )
}

export async function generateStaticParams() {
  return sampleProjects.map((project) => ({
    slug: project.slug,
  }))
}
