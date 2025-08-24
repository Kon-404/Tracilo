import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { thirdPartyValidations } from '@/lib/data/testimonials'

interface ThirdPartyValidationProps {
  variant?: 'default' | 'compact' | 'grid'
  title?: string
  description?: string
  showTitle?: boolean
  className?: string
}

export function ThirdPartyValidation({
  variant = 'default',
  title,
  description,
  showTitle = true,
  className
}: ThirdPartyValidationProps) {
  const sectionTitle = title || 'Certifications & Recognition'
  const sectionDescription = description || 'Industry-recognized certifications, awards, and partnerships that validate our expertise and quality standards'

  const getValidationIcon = (type: string) => {
    switch (type) {
      case 'certification': return '🏆'
      case 'award': return '🥇'
      case 'partnership': return '🤝'
      default: return '✅'
    }
  }

  const getValidationTypeLabel = (type: string) => {
    switch (type) {
      case 'certification': return 'Certification'
      case 'award': return 'Industry Award'
      case 'partnership': return 'Technology Partnership'
      default: return 'Recognition'
    }
  }

  if (variant === 'compact') {
    return (
      <div className={`py-8 ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {thirdPartyValidations.map((validation, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-lg border border-[--color-neutral-200]">
              <div className="text-2xl mb-2">{getValidationIcon(validation.type)}</div>
              <div className="text-xs font-semibold text-[--color-neutral-900] mb-1 line-clamp-2">
                {validation.name}
              </div>
              <div className="text-xs text-[--color-neutral-600]">
                {validation.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <Section spacing="lg" className={className}>
        <Container>
          <div className="max-w-6xl mx-auto">
            {showTitle && (
              <div className="text-center mb-12">
                <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                  {sectionTitle}
                </h2>
                <p className="text-body-lg text-[--color-neutral-600]">
                  {sectionDescription}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {thirdPartyValidations.map((validation, index) => (
                <Card key={index} variant="outlined" className="h-full">
                  <CardHeader className="text-center">
                    <div className="text-3xl mb-3">{getValidationIcon(validation.type)}</div>
                    <div className="text-xs font-medium text-[--color-brand-primary] mb-2">
                      {getValidationTypeLabel(validation.type)}
                    </div>
                    <CardTitle className="text-lg">{validation.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-sm font-medium text-[--color-neutral-800] mb-2">
                        {validation.issuer}
                      </div>
                      <div className="text-sm text-[--color-neutral-600] mb-3">
                        {validation.description}
                      </div>
                      <div className="text-xs text-[--color-neutral-500]">
                        {validation.year}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  // Default variant - organized by type
  const certifications = thirdPartyValidations.filter(v => v.type === 'certification')
  const awards = thirdPartyValidations.filter(v => v.type === 'award')
  const partnerships = thirdPartyValidations.filter(v => v.type === 'partnership')

  return (
    <Section spacing="lg" variant="secondary" className={className}>
      <Container>
        <div className="max-w-6xl mx-auto">
          {showTitle && (
            <div className="text-center mb-12">
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                {sectionTitle}
              </h2>
              <p className="text-body-lg text-[--color-neutral-600]">
                {sectionDescription}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Certifications */}
            <div>
              <h3 className="text-heading-sm font-bold text-[--color-neutral-900] mb-6 text-center">
                🏆 Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-[--color-neutral-200] text-center">
                    <div className="font-semibold text-[--color-neutral-900] mb-1">
                      {cert.name}
                    </div>
                    <div className="text-sm text-[--color-neutral-600] mb-2">
                      {cert.issuer}
                    </div>
                    <div className="text-xs text-[--color-neutral-500]">
                      {cert.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h3 className="text-heading-sm font-bold text-[--color-neutral-900] mb-6 text-center">
                🥇 Awards
              </h3>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-[--color-neutral-200] text-center">
                    <div className="font-semibold text-[--color-neutral-900] mb-1">
                      {award.name}
                    </div>
                    <div className="text-sm text-[--color-neutral-600] mb-2">
                      {award.issuer}
                    </div>
                    <div className="text-xs text-[--color-neutral-500]">
                      {award.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnerships */}
            <div>
              <h3 className="text-heading-sm font-bold text-[--color-neutral-900] mb-6 text-center">
                🤝 Partnerships
              </h3>
              <div className="space-y-4">
                {partnerships.map((partnership, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-[--color-neutral-200] text-center">
                    <div className="font-semibold text-[--color-neutral-900] mb-1">
                      {partnership.name}
                    </div>
                    <div className="text-sm text-[--color-neutral-600] mb-2">
                      {partnership.issuer}
                    </div>
                    <div className="text-xs text-[--color-neutral-500]">
                      {partnership.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
