import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { TestimonialCard } from '@/components/content/TestimonialCard'
import { 
  getFeaturedTestimonials, 
  getTestimonialsByIndustry, 
  getTestimonialsByProductType 
} from '@/lib/data/testimonials'
import type { CustomerTestimonial } from '@/lib/data/testimonials'

interface TestimonialsSectionProps {
  variant?: 'featured' | 'industry' | 'product' | 'compact'
  industry?: string
  productType?: string
  limit?: number
  title?: string
  description?: string
  showCTA?: boolean
  className?: string
}

export function TestimonialsSection({
  variant = 'featured',
  industry,
  productType,
  limit = 3,
  title,
  description,
  showCTA = true,
  className
}: TestimonialsSectionProps) {
  // Determine which testimonials to show
  let testimonials: CustomerTestimonial[] = []
  
  if (variant === 'industry' && industry) {
    testimonials = getTestimonialsByIndustry(industry)
  } else if (variant === 'product' && productType) {
    testimonials = getTestimonialsByProductType(productType)
  } else {
    testimonials = getFeaturedTestimonials()
  }

  // Limit the results
  const displayTestimonials = testimonials.slice(0, limit)

  if (displayTestimonials.length === 0) {
    return null
  }

  // Default titles and descriptions
  const sectionTitle = title || (
    variant === 'industry' ? `What ${industry} Customers Say` :
    variant === 'product' ? `${productType} Customer Success Stories` :
    'What Our Customers Say'
  )

  const sectionDescription = description || (
    variant === 'industry' ? `Real feedback from ${industry?.toLowerCase()} organizations using Kryohm solutions` :
    variant === 'product' ? `Success stories from customers using our ${productType} solutions` :
    'Real feedback from customers who have transformed their operations with Kryohm IoT solutions'
  )

  const cardVariant = variant === 'featured' ? 'featured' : 
                     variant === 'compact' ? 'compact' : 'default'

  return (
    <Section spacing="lg" className={className}>
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
              {sectionTitle}
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              {sectionDescription}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className={`grid gap-8 mb-12 ${
            variant === 'compact' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
            displayTestimonials.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
            displayTestimonials.length === 2 ? 'grid-cols-1 lg:grid-cols-2' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {displayTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                variant={cardVariant}
                showProject={variant !== 'compact'}
              />
            ))}
          </div>

          {/* Call to Action */}
          {showCTA && (
            <div className="text-center">
              <div className="space-y-4">
                <p className="text-body-md text-[--color-neutral-600]">
                  Ready to join our growing list of satisfied customers?
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact?type=demo&source=testimonials">
                      Book a Demo
                    </Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/contact?type=reference&source=testimonials">
                      Speak with Reference Customer
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
