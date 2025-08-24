'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Input } from '@/components/form/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { sampleProjects } from '@/lib/data/projects'
// import { industriesData } from '@/lib/data/industries'

// Searchable content structure
interface SearchResult {
  id: string
  title: string
  description: string
  category: 'Product' | 'Project' | 'Industry' | 'Page'
  url: string
  tags?: string[]
}

// All searchable content
const searchableContent: SearchResult[] = [
  // Products
  {
    id: 'sensors',
    title: 'IoT Sensors & Environmental Monitoring',
    description: 'Advanced sensor networks for real-time environmental monitoring across agriculture, utilities, and industrial applications.',
    category: 'Product',
    url: '/products/sensors',
    tags: ['sensors', 'monitoring', 'environmental', 'agriculture', 'industrial', 'iot']
  },
  {
    id: 'prepaid-metering',
    title: 'Prepaid Metering Solutions',
    description: 'Smart prepaid utility metering systems with remote monitoring and automated billing management.',
    category: 'Product',
    url: '/products/prepaid-metering',
    tags: ['prepaid', 'metering', 'utilities', 'billing', 'smart meters', 'water', 'electricity']
  },
  {
    id: 'shower-control',
    title: 'Smart Shower Control Systems',
    description: 'Intelligent shower control systems for water conservation and user experience optimization.',
    category: 'Product',
    url: '/products/shower-control',
    tags: ['shower', 'control', 'water', 'conservation', 'property management', 'hospitality']
  },
  // Projects
  ...sampleProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.excerpt,
    category: 'Project' as const,
    url: `/projects/${project.slug}`,
    tags: [project.industry.toLowerCase(), project.productType.toLowerCase()]
  })),
  // Industries (static for now)
  {
    id: 'agriculture',
    title: 'Agriculture',
    description: 'Smart agriculture solutions for precision farming and automated irrigation.',
    category: 'Industry' as const,
    url: '/industries/agriculture',
    tags: ['agriculture', 'farming', 'irrigation', 'industry', 'solutions']
  },
  {
    id: 'utilities',
    title: 'Utilities',
    description: 'Smart utility monitoring and management solutions for water and energy.',
    category: 'Industry' as const,
    url: '/industries/utilities',
    tags: ['utilities', 'water', 'energy', 'industry', 'solutions']
  },
  {
    id: 'property-management',
    title: 'Property Management',
    description: 'Intelligent property management systems for hotels and residential buildings.',
    category: 'Industry' as const,
    url: '/industries/property-management',
    tags: ['property', 'management', 'hotels', 'residential', 'industry', 'solutions']
  },
  // Pages
  {
    id: 'platform',
    title: 'Platform & Integration Overview',
    description: 'Comprehensive IoT platform architecture with cloud integration capabilities and scalable infrastructure.',
    category: 'Page',
    url: '/platform',
    tags: ['platform', 'integration', 'architecture', 'cloud', 'api']
  },
  {
    id: 'technical',
    title: 'Technical Credibility & Certifications',
    description: 'Technical expertise, certifications, partnerships, and quality assurance standards.',
    category: 'Page',
    url: '/technical',
    tags: ['technical', 'certifications', 'expertise', 'quality', 'standards']
  },
  {
    id: 'about',
    title: 'About Kryohm - Company & Team',
    description: 'Learn about Kryohm team, company history, mission, values, and technical leadership.',
    category: 'Page',
    url: '/about',
    tags: ['about', 'company', 'team', 'history', 'mission', 'values']
  },
  {
    id: 'docs',
    title: 'Technical Documentation Portal',
    description: 'Comprehensive API documentation, integration guides, and technical resources.',
    category: 'Page',
    url: '/docs',
    tags: ['documentation', 'api', 'integration', 'guides', 'technical', 'resources']
  }
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return []

    const term = searchTerm.toLowerCase()
    return searchableContent.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(term)
      const descriptionMatch = item.description.toLowerCase().includes(term)
      const tagMatch = item.tags?.some(tag => tag.includes(term))
      const categoryMatch = item.category.toLowerCase().includes(term)
      
      return titleMatch || descriptionMatch || tagMatch || categoryMatch
    }).slice(0, 20) // Limit to 20 results
  }, [searchTerm])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Product': return '📦'
      case 'Project': return '🚀'
      case 'Industry': return '🏭'
      case 'Page': return '📄'
      default: return '🔍'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Product': return 'bg-blue-100 text-blue-800'
      case 'Project': return 'bg-green-100 text-green-800'
      case 'Industry': return 'bg-purple-100 text-purple-800'
      case 'Page': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
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

      {/* Search Page Content */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-4">
                Search Kryohm
              </h1>
              <p className="text-body-lg text-[--color-neutral-600]">
                Find products, case studies, technical resources, and company information
              </p>
            </div>

            {/* Search Input */}
            <div className="mb-8">
              <Input
                type="text"
                placeholder="Search for products, projects, industries, or technical information..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg py-4"
                autoFocus
              />
            </div>

            {/* Search Results */}
            {searchTerm.trim() && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-heading-lg font-semibold text-[--color-neutral-900]">
                    Search Results
                  </h2>
                  <span className="text-body-sm text-[--color-neutral-600]">
                    {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
                  </span>
                </div>

                {searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((result) => (
                      <Card key={result.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(result.category)}`}>
                                  {getCategoryIcon(result.category)} {result.category}
                                </span>
                              </div>
                              <CardTitle className="text-lg">
                                <Link 
                                  href={result.url}
                                  className="hover:text-[--color-primary-600] transition-colors"
                                >
                                  {result.title}
                                </Link>
                              </CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-[--color-neutral-600] mb-3">
                            {result.description}
                          </CardDescription>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[--color-neutral-500]">
                              {result.url}
                            </span>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={result.url}>
                                Visit Page →
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-heading-md font-semibold text-[--color-neutral-900] mb-2">
                      No results found
                    </h3>
                    <p className="text-body-base text-[--color-neutral-600] mb-6">
                      Try adjusting your search terms or browse our main sections
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/products">Products</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/projects">Projects</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/industries">Industries</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/technical">Technical</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Popular Searches */}
            {!searchTerm.trim() && (
              <div className="space-y-6">
                <h2 className="text-heading-md font-semibold text-[--color-neutral-900]">
                  Popular Searches
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Products & Solutions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setSearchTerm('sensors')}>
                          IoT Sensors
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setSearchTerm('prepaid metering')}>
                          Prepaid Metering
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setSearchTerm('shower control')}>
                          Shower Control
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Industries & Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setSearchTerm('agriculture')}>
                          Agriculture
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setSearchTerm('utilities')}>
                          Utilities
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setSearchTerm('property management')}>
                          Property Management
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  )
}
