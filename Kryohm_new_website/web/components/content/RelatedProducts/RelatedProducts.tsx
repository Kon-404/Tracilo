import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export interface RelatedProduct {
  id: string
  title: string
  description: string
  href: string
  icon: string
  complementary?: boolean
  alternative?: boolean
}

export interface RelatedProductsProps {
  currentProduct: string
  className?: string
}

// Related products mapping
const relatedProductsMap: Record<string, RelatedProduct[]> = {
  'sensors': [
    {
      id: 'prepaid-metering',
      title: 'Prepaid Metering',
      description: 'Combine sensor data with smart billing for comprehensive utility management.',
      href: '/products/prepaid-metering',
      icon: '⚡',
      complementary: true
    },
    {
      id: 'shower-control',
      title: 'Shower Control',
      description: 'Water monitoring sensors integrated with automated control systems.',
      href: '/products/shower-control',
      icon: '🚿',
      complementary: true
    }
  ],
  'prepaid-metering': [
    {
      id: 'sensors',
      title: 'IoT Sensors',
      description: 'Enhance metering with environmental monitoring and data analytics.',
      href: '/products/sensors',
      icon: '📡',
      complementary: true
    },
    {
      id: 'shower-control',
      title: 'Shower Control',
      description: 'Water usage control systems for property management applications.',
      href: '/products/shower-control',
      icon: '🚿',
      alternative: true
    }
  ],
  'shower-control': [
    {
      id: 'sensors',
      title: 'IoT Sensors',
      description: 'Monitor water quality, temperature, and usage patterns in real-time.',
      href: '/products/sensors',
      icon: '📡',
      complementary: true
    },
    {
      id: 'prepaid-metering',
      title: 'Prepaid Metering',
      description: 'Complete water management with prepaid billing and usage control.',
      href: '/products/prepaid-metering',
      icon: '⚡',
      complementary: true
    }
  ]
}

export const RelatedProducts = ({ currentProduct, className }: RelatedProductsProps) => {
  const relatedProducts = relatedProductsMap[currentProduct] || []

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className={className}>
      <div className="text-center mb-8">
        <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
          Related Solutions
        </h2>
        <p className="text-body-md text-[--color-neutral-600] max-w-2xl mx-auto">
          Explore complementary IoT solutions that work together to create comprehensive smart systems.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedProducts.map((product) => (
          <Card key={product.id} variant="outlined" className="h-full hover:shadow-medium transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4">{product.icon}</div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CardTitle className="text-heading-sm">{product.title}</CardTitle>
                {product.complementary && (
                  <span className="text-body-xs px-2 py-1 bg-[--color-brand-primary-50] text-[--color-brand-primary-700] rounded-full">
                    Complementary
                  </span>
                )}
                {product.alternative && (
                  <span className="text-body-xs px-2 py-1 bg-[--color-brand-accent-50] text-[--color-brand-accent-700] rounded-full">
                    Alternative
                  </span>
                )}
              </div>
              <CardDescription className="text-body-sm">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href={product.href}>
                <Button variant="secondary" className="w-full">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
