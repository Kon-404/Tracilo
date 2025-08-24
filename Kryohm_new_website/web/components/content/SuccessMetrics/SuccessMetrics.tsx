import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { successMetrics } from '@/lib/data/testimonials'

interface SuccessMetricsProps {
  variant?: 'default' | 'compact' | 'highlighted'
  title?: string
  description?: string
  showTitle?: boolean
  className?: string
}

export function SuccessMetrics({
  variant = 'default',
  title,
  description,
  showTitle = true,
  className
}: SuccessMetricsProps) {
  const sectionTitle = title || 'Our Track Record'
  const sectionDescription = description || 'Numbers that demonstrate our commitment to customer success and operational excellence'

  if (variant === 'compact') {
    return (
      <div className={`py-8 ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {successMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-[--color-brand-primary] mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-[--color-neutral-600] leading-tight">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'highlighted') {
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
              {successMetrics.map((metric, index) => (
                <Card key={index} variant="elevated" className="text-center">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{metric.icon}</div>
                    <div className="text-3xl font-bold text-[--color-brand-primary] mb-2">
                      {metric.value}
                    </div>
                    <div className="text-lg font-semibold text-[--color-neutral-900] mb-2">
                      {metric.label}
                    </div>
                    <div className="text-sm text-[--color-neutral-600]">
                      {metric.description}
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

  // Default variant
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-3">{metric.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-[--color-brand-primary] mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-[--color-neutral-900] mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-[--color-neutral-600] leading-tight">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
