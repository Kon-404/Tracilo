import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { getFeaturedLogos, getLogosByIndustry } from '@/lib/data/testimonials'
import type { CustomerLogo } from '@/lib/data/testimonials'

interface CustomerLogosProps {
  industry?: string
  variant?: 'featured' | 'industry' | 'all'
  title?: string
  description?: string
  showTitle?: boolean
  className?: string
}

export function CustomerLogos({
  industry,
  variant = 'featured',
  title,
  description,
  showTitle = true,
  className
}: CustomerLogosProps) {
  // Determine which logos to show
  let logos: CustomerLogo[] = []
  
  if (variant === 'industry' && industry) {
    logos = getLogosByIndustry(industry)
  } else {
    logos = getFeaturedLogos()
  }

  if (logos.length === 0) {
    return null
  }

  const sectionTitle = title || (
    variant === 'industry' ? `Trusted by ${industry} Leaders` :
    'Trusted by Industry Leaders'
  )

  const sectionDescription = description || (
    variant === 'industry' ? 
      `Leading ${industry?.toLowerCase()} organizations trust Kryohm to deliver results` :
      'Organizations across industries trust Kryohm to deliver measurable IoT solutions'
  )

  return (
    <Section spacing="md" variant="secondary" className={className}>
      <Container>
        <div className="max-w-6xl mx-auto">
          {showTitle && (
            <div className="text-center mb-8">
              <h2 className="text-heading-md font-bold text-[--color-neutral-900] mb-3">
                {sectionTitle}
              </h2>
              <p className="text-body-md text-[--color-neutral-600]">
                {sectionDescription}
              </p>
            </div>
          )}

          {/* Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {logos.map((logo) => (
              <div 
                key={logo.id}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Placeholder for logo - In production, this would be an actual image */}
                <div className="w-full h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-600 mb-1">
                      {logo.company}
                    </div>
                    <div className="text-xs text-gray-500">
                      {logo.industry}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="mt-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-[--color-brand-primary] mb-1">
                  {logos.length}+
                </div>
                <div className="text-sm text-[--color-neutral-600]">
                  Trusted Partners
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[--color-brand-primary] mb-1">
                  250+
                </div>
                <div className="text-sm text-[--color-neutral-600]">
                  Successful Deployments
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[--color-brand-primary] mb-1">
                  96%
                </div>
                <div className="text-sm text-[--color-neutral-600]">
                  Customer Retention
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
