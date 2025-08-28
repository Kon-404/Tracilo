'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
// import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export interface SearchResult {
  id: string
  title: string
  description: string
  type: 'product' | 'feature' | 'specification'
  href: string
  icon?: string
  relevance: number
}

export interface ProductSearchProps {
  className?: string
}

// Searchable content database
const searchContent: SearchResult[] = [
  // Products
  {
    id: 'sensors',
    title: 'IoT Sensors',
    description: 'Real-time environmental monitoring and data collection systems',
    type: 'product',
    href: '/products/sensors',
    icon: '📡',
    relevance: 100
  },
  {
    id: 'prepaid-metering',
    title: 'Prepaid Metering',
    description: 'Smart utility billing and consumption management systems',
    type: 'product',
    href: '/products/prepaid-metering',
    icon: '⚡',
    relevance: 100
  },
  {
    id: 'shower-control',
    title: 'Shower Control',
    description: 'Water management and conservation systems for properties',
    type: 'product',
    href: '/products/shower-control',
    icon: '🚿',
    relevance: 100
  },
  
  // Features
  {
    id: 'lorawan',
    title: 'LoRaWAN Connectivity',
    description: 'Long-range wireless communication for IoT sensors',
    type: 'feature',
    href: '/products/sensors',
    relevance: 90
  },
  {
    id: 'temperature-monitoring',
    title: 'Temperature Monitoring',
    description: 'Precision temperature and humidity sensing',
    type: 'feature',
    href: '/products/sensors',
    relevance: 85
  },
  {
    id: 'water-conservation',
    title: 'Water Conservation',
    description: 'Smart water usage optimization and leak detection',
    type: 'feature',
    href: '/products/shower-control',
    relevance: 88
  },
  {
    id: 'billing-automation',
    title: 'Automated Billing',
    description: 'Prepaid billing systems with real-time consumption tracking',
    type: 'feature',
    href: '/products/prepaid-metering',
    relevance: 92
  },
  {
    id: 'flow-control',
    title: 'Flow Control',
    description: 'Precision water flow management and regulation',
    type: 'feature',
    href: '/products/shower-control',
    relevance: 80
  },
  
  // Specifications
  {
    id: 'ip67-rating',
    title: 'IP67 Weather Protection',
    description: 'Industrial-grade weather and dust protection',
    type: 'specification',
    href: '/products/sensors',
    relevance: 75
  },
  {
    id: 'class-1-accuracy',
    title: 'Class 1 Accuracy',
    description: 'High-precision measurement and billing accuracy',
    type: 'specification',
    href: '/products/prepaid-metering',
    relevance: 70
  },
  {
    id: 'wifi-connectivity',
    title: 'WiFi Connectivity',
    description: 'Wireless network connectivity for smart systems',
    type: 'specification',
    href: '/products/shower-control',
    relevance: 72
  }
]

export const ProductSearch = ({ className }: ProductSearchProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsSearching(true)
    
    // Simulate search delay
    const searchTimeout = setTimeout(() => {
      const searchResults = searchContent
        .filter(item => {
          const searchText = `${item.title} ${item.description}`.toLowerCase()
          return searchText.includes(query.toLowerCase())
        })
        .sort((a, b) => {
          // Sort by relevance and type priority
          const typeWeight = { product: 3, feature: 2, specification: 1 }
          const aScore = a.relevance * typeWeight[a.type]
          const bScore = b.relevance * typeWeight[b.type]
          return bScore - aScore
        })
        .slice(0, 6) // Limit to 6 results

      setResults(searchResults)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  return (
    <div className={className}>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products, features, or specifications..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-[--color-neutral-300] rounded-lg text-body-md focus:outline-none focus:ring-2 focus:ring-[--color-brand-primary] focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-[--color-neutral-400]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Search Results */}
        {(query.length >= 2) && (
          <div className="absolute top-full left-0 right-0 z-10 mt-2">
            <Card variant="elevated" className="max-h-96 overflow-y-auto">
              <CardContent className="p-0">
                {isSearching ? (
                  <div className="p-4 text-center text-[--color-neutral-600]">
                    <div className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Searching...
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="divide-y divide-[--color-neutral-200]">
                    {results.map((result) => (
                      <Link key={result.id} href={result.href} className="block">
                        <div className="p-4 hover:bg-[--color-neutral-50] transition-colors duration-200">
                          <div className="flex items-start gap-3">
                            {result.icon && (
                              <span className="text-2xl">{result.icon}</span>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-body-md font-semibold text-[--color-neutral-900]">
                                  {result.title}
                                </h3>
                                <span
                                  className={`text-body-xs px-2 py-1 rounded-full ${
                                    result.type === 'product'
                                      ? 'bg-[--color-brand-primary-50] text-[--color-brand-primary-700]'
                                      : result.type === 'feature'
                                      ? 'bg-[--color-brand-accent-50] text-[--color-brand-accent-700]'
                                      : 'bg-[--color-neutral-100] text-[--color-neutral-600]'
                                  }`}
                                >
                                  {result.type}
                                </span>
                              </div>
                              <p className="text-body-sm text-[--color-neutral-600] line-clamp-2">
                                {result.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-[--color-neutral-600]">
                    <p>No results found for "{query}"</p>
                    <p className="text-body-sm mt-2">
                      Try searching for "sensors", "metering", "water control", or specific features.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductSearch
