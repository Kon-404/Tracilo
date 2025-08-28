import { MetadataRoute } from 'next'
import { sampleProjects } from '@/lib/data/projects'
import { industriesData } from '@/lib/data/industries'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kryohm.com' // Replace with actual domain

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/platform`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technical`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Product pages
  const productRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/sensors`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/prepaid-metering`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/shower-control`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  // Project/case study pages
  const projectRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...sampleProjects.map(project => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date('2024-01-01'), // Use a default date since completionDate doesn't exist
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  // Industry pages
  const industryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...industriesData.map(industry => ({
      url: `${baseUrl}/industries/${industry.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return [
    ...staticRoutes,
    ...productRoutes,
    ...projectRoutes,
    ...industryRoutes,
  ]
}
