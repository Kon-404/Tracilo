'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
// import { CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export interface ComparisonFeature {
  feature: string
  sensors: string
  metering: string
  shower: string
}

export interface ProductComparisonProps {
  className?: string
}

// Comparison data
const comparisonFeatures: ComparisonFeature[] = [
  {
    feature: 'Primary Application',
    sensors: 'Environmental Monitoring',
    metering: 'Utility Billing',
    shower: 'Water Management'
  },
  {
    feature: 'Installation Type',
    sensors: 'Wireless/Cellular',
    metering: 'Meter Integration',
    shower: 'Plumbing Integration'
  },
  {
    feature: 'Target Industry',
    sensors: 'Agriculture/Industrial',
    metering: 'Utilities/Property',
    shower: 'Property/Hospitality'
  },
  {
    feature: 'Key Benefit',
    sensors: 'Data Insights',
    metering: 'Cash Flow',
    shower: 'Water Savings'
  },
  {
    feature: 'Typical ROI',
    sensors: '25% cost reduction',
    metering: '40% billing efficiency',
    shower: '40% water savings'
  },
  {
    feature: 'Implementation Time',
    sensors: '1-2 weeks',
    metering: '2-4 weeks',
    shower: '1-3 days'
  },
  {
    feature: 'Connectivity',
    sensors: 'LoRaWAN, WiFi, Cellular',
    metering: 'DLMS, Modbus, M-Bus',
    shower: 'WiFi, Zigbee, RS485'
  },
  {
    feature: 'Monitoring',
    sensors: '24/7 Real-time',
    metering: '24/7 Real-time',
    shower: '24/7 Real-time'
  }
]

const productInfo = {
  sensors: {
    title: 'IoT Sensors',
    icon: '📡',
    description: 'Real-time monitoring and data collection',
    href: '/products/sensors'
  },
  metering: {
    title: 'Prepaid Metering',
    icon: '⚡',
    description: 'Smart billing and utility management',
    href: '/products/prepaid-metering'
  },
  shower: {
    title: 'Shower Control',
    icon: '🚿',
    description: 'Water usage optimization',
    href: '/products/shower-control'
  }
}

export const ProductComparison = ({ className }: ProductComparisonProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['sensors', 'metering'])

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      }
      if (prev.length < 3) {
        return [...prev, productId]
      }
      return prev
    })
  }

  return (
    <section className={className}>
      <div className="text-center mb-8">
        <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
          Product Comparison
        </h2>
        <p className="text-body-md text-[--color-neutral-600] max-w-2xl mx-auto mb-6">
          Compare our IoT solutions side-by-side to find the perfect fit for your business needs.
        </p>
        
        {/* Product Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(productInfo).map(([id, product]) => (
            <button
              key={id}
              onClick={() => toggleProduct(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedProducts.includes(id)
                  ? 'bg-[--color-brand-primary] text-white border-[--color-brand-primary]'
                  : 'bg-white text-[--color-neutral-700] border-[--color-neutral-300] hover:border-[--color-brand-primary]'
              }`}
            >
              <span>{product.icon}</span>
              <span className="text-body-sm font-medium">{product.title}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedProducts.length === 0 ? (
        <Card variant="outlined" className="text-center py-12">
          <CardContent>
            <p className="text-body-lg text-[--color-neutral-600]">
              Select products above to compare their features and specifications.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[--color-neutral-200] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[--color-neutral-50]">
                <th className="border border-[--color-neutral-200] p-4 text-left text-heading-xs font-semibold text-[--color-neutral-800] min-w-[200px]">
                  Feature
                </th>
                {selectedProducts.map(productId => {
                  const product = productInfo[productId as keyof typeof productInfo]
                  return (
                    <th 
                      key={productId}
                      className="border border-[--color-neutral-200] p-4 text-center text-heading-xs font-semibold text-[--color-neutral-800] min-w-[150px]"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl">{product.icon}</span>
                        <span>{product.title}</span>
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[--color-neutral-50]'}>
                  <td className="border border-[--color-neutral-200] p-4 font-medium text-[--color-neutral-800]">
                    {row.feature}
                  </td>
                  {selectedProducts.map(productId => (
                    <td 
                      key={`${index}-${productId}`}
                      className="border border-[--color-neutral-200] p-4 text-center text-[--color-neutral-600]"
                    >
                      {row[productId as keyof typeof row]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProducts.length > 0 && (
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {selectedProducts.map(productId => {
              const product = productInfo[productId as keyof typeof productInfo]
              return (
                <Link key={productId} href={product.href}>
                  <Button variant="secondary">
                    Learn More About {product.title}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductComparison
