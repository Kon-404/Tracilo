'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
// import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/form/Input'
import { Select } from '@/components/form/Select'
import { sampleProjects, getUniqueIndustries, getUniqueProductTypes } from '@/lib/data/projects'
import { analytics } from '@/lib/analytics'
import type { ProjectCaseStudy } from '@/lib/types'
// import type { IndustryType, ProductType } from '@/lib/types'

interface ProjectFilters {
  search: string
  industry: string
  productType: string
}

interface ProjectCardProps {
  project: ProjectCaseStudy
  onCardClick: (projectId: string) => void
}

function ProjectCard({ project, onCardClick }: ProjectCardProps) {
  const handleClick = () => {
    onCardClick(project.id)
    analytics.ctaClick('project_card', 'projects_gallery')
  }

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
    <Card 
      variant="elevated" 
      className="group h-full hover:shadow-strong transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Project Thumbnail */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <div className="w-full h-full bg-gradient-to-br from-[--color-brand-primary-100] to-[--color-brand-accent-100] flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">{getProductIcon(project.productType)}</div>
            <div className="text-sm font-medium text-[--color-brand-primary-700]">
              {project.productType}
            </div>
          </div>
        </div>
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-[--color-brand-primary] text-white text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        {/* Industry and Location */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getIndustryIcon(project.industry)}</span>
            <span className="text-sm font-medium text-[--color-neutral-600]">
              {project.industry}
            </span>
          </div>
          <span className="text-xs text-[--color-neutral-500]">
            {project.customer.location}
          </span>
        </div>

        <CardTitle className="text-heading-sm leading-tight group-hover:text-[--color-brand-primary] transition-colors">
          {project.title}
        </CardTitle>
        
        <CardDescription className="text-body-sm line-clamp-2">
          {project.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Key Outcome Metric */}
        <div className="bg-[--color-neutral-50] rounded-lg p-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[--color-brand-primary] mb-1">
              {project.keyOutcome.value}
            </div>
            <div className="text-sm font-semibold text-[--color-neutral-800] mb-1">
              {project.keyOutcome.metric}
            </div>
            <div className="text-xs text-[--color-neutral-600]">
              {project.keyOutcome.description}
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-4">
          <div className="text-sm font-medium text-[--color-neutral-800]">
            {project.customer.name}
          </div>
          <div className="text-xs text-[--color-neutral-600]">
            {project.customer.size}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-[--color-brand-primary-50] text-[--color-brand-primary-700] rounded-md"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2 py-1 bg-[--color-neutral-100] text-[--color-neutral-600] rounded-md">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          variant="secondary" 
          className="w-full group-hover:bg-[--color-brand-primary] group-hover:text-white transition-colors"
        >
          Read Case Study →
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFilters>({
    search: '',
    industry: '',
    productType: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = sampleProjects

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase()
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.excerpt.toLowerCase().includes(query) ||
        project.industry.toLowerCase().includes(query) ||
        project.productType.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query)) ||
        project.customer.name.toLowerCase().includes(query)
      )
    }

    // Industry filter
    if (filters.industry) {
      filtered = filtered.filter(project => project.industry === filters.industry)
    }

    // Product type filter  
    if (filters.productType) {
      filtered = filtered.filter(project => project.productType === filters.productType)
    }

    return filtered
  }, [filters])

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  )

  const handleFilterChange = (key: keyof ProjectFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1) // Reset to first page when filters change
    
    // Analytics tracking
    // analytics.trackFormEvent('filter_used', 'projects_gallery', { 
    //   filter_type: key, 
    //   filter_value: value 
    // })
  }

  const handleProjectCardClick = (projectId: string) => {
    const project = sampleProjects.find(p => p.id === projectId)
    if (project) {
      // analytics.trackFormEvent('project_viewed', 'projects_gallery', { project_id: projectId })
      window.location.href = `/projects/${project.slug}`
    }
  }

  const handleSeeResults = () => {
    analytics.ctaClick('see_results', 'projects_gallery')
  }

  const handleDiscussProject = () => {
    analytics.ctaClick('discuss_project', 'projects_gallery')
  }

  // Industry and product type options for filters
  const industryOptions = [
    { value: '', label: 'All Industries' },
    ...getUniqueIndustries().map(industry => ({ value: industry, label: industry }))
  ]

  const productTypeOptions = [
    { value: '', label: 'All Products' },
    ...getUniqueProductTypes().map(product => ({ value: product, label: product }))
  ]

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
              Project Case Studies
            </h1>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Explore successful Kryohm implementations across different industries. See how our IoT solutions 
              deliver measurable results and transform operations for our clients.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={handleSeeResults}>
                See Similar Results
              </Button>
              <Button variant="secondary" size="lg" onClick={handleDiscussProject}>
                Discuss Your Project
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Filters and Search */}
      <Section spacing="md" variant="secondary">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-md font-bold text-[--color-neutral-900] mb-6 text-center">
              Find Relevant Case Studies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Search */}
              <Input
                label="Search Projects"
                placeholder="Search by keyword, industry, or challenge..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                fullWidth
              />

              {/* Industry Filter */}
              <Select
                label="Industry"
                options={industryOptions}
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                fullWidth
              />

              {/* Product Type Filter */}
              <Select
                label="Product Type"
                options={productTypeOptions}
                value={filters.productType}
                onChange={(e) => handleFilterChange('productType', e.target.value)}
                fullWidth
              />
            </div>

            {/* Results Summary */}
            <div className="text-center mb-6">
              <p className="text-body-md text-[--color-neutral-600]">
                Showing {filteredProjects.length} case studies
                {filters.search && ` for "${filters.search}"`}
                {filters.industry && ` in ${filters.industry}`}
                {filters.productType && ` using ${filters.productType}`}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section spacing="lg">
        <Container>
          {paginatedProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onCardClick={handleProjectCardClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <Button
                    variant="secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "primary" : "ghost"}
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* No Results */
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-heading-sm font-bold text-[--color-neutral-900] mb-2">
                No Projects Found
              </h3>
              <p className="text-body-md text-[--color-neutral-600] mb-6">
                Try adjusting your search criteria or browse all projects.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setFilters({ search: '', industry: '', productType: '' })
                  setCurrentPage(1)
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" variant="dark">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-heading-lg font-bold text-white mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-body-lg text-neutral-300 mb-8">
              Let's discuss how Kryohm can deliver measurable improvements for your organization. 
              Our experts will help you identify opportunities and create a custom implementation plan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=demo">Book a Demo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Discuss Your Project</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

