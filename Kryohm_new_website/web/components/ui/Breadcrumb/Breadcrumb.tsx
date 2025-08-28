'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { Fragment } from 'react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface BreadcrumbProps {
  className?: string
  separator?: string
  customItems?: BreadcrumbItem[]
}

// Route mapping for generating breadcrumbs
const routeMapping: Record<string, string> = {
  'products': 'Products',
  'sensors': 'IoT Sensors',
  'prepaid-metering': 'Prepaid Metering',
  'shower-control': 'Shower Control',
  'platform': 'Platform',
  'projects': 'Projects',
  'about': 'About',
  'contact': 'Contact',
  'support': 'Support',
  'docs': 'Documentation',
  'case-studies': 'Case Studies',
  'industries': 'Industries',
  'agriculture': 'Agriculture',
  'utilities': 'Utilities',
  'property-management': 'Property Management',
  'industrial': 'Industrial',
}

const Breadcrumb = ({ 
  className, 
  separator = '/', 
  customItems 
}: BreadcrumbProps) => {
  const pathname = usePathname()

  // If custom items are provided, use them
  if (customItems) {
    return (
      <nav 
        aria-label="Breadcrumb" 
        className={cn('flex items-center space-x-2 text-sm', className)}
      >
        <ol className="flex items-center space-x-2">
          {customItems.map((item, index) => (
            <li key={item.href} className="flex items-center space-x-2">
              {index > 0 && (
                <span 
                  className="text-[--color-neutral-400]" 
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
              {index === customItems.length - 1 ? (
                <span className="text-[--color-neutral-900] font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[--color-neutral-600] hover:text-[--color-brand-primary] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  }

  // Generate breadcrumbs from current pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  
  // Don't show breadcrumbs on home page or single-level pages
  if (pathSegments.length <= 1) {
    return null
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ]

  // Build breadcrumb items from path segments
  let currentPath = ''
  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    const label = routeMapping[segment] || segment.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    
    breadcrumbItems.push({
      label,
      href: currentPath
    })
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn('flex items-center space-x-2 text-sm', className)}
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            {index > 0 && (
              <span 
                className="text-[--color-neutral-400]" 
                aria-hidden="true"
              >
                {separator}
              </span>
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span 
                className="text-[--color-neutral-900] font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-[--color-neutral-600] hover:text-[--color-brand-primary] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
