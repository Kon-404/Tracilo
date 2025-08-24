import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { CustomerTestimonial } from '@/lib/data/testimonials'

interface TestimonialCardProps {
  testimonial: CustomerTestimonial
  variant?: 'default' | 'featured' | 'compact'
  showProject?: boolean
  className?: string
}

export function TestimonialCard({ 
  testimonial, 
  variant = 'default', 
  showProject = true, 
  className 
}: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        ★
      </span>
    ))
  }

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'Agriculture': return '🌾'
      case 'Utilities': return '⚡'
      case 'Property Management': return '🏢'
      case 'Industrial': return '🏭'
      case 'Healthcare': return '🏥'
      case 'Education': return '🎓'
      default: return '🏢'
    }
  }

  if (variant === 'compact') {
    return (
      <Card variant="outlined" className={`h-full ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            {renderStars(testimonial.testimonial.rating)}
            {testimonial.verified && (
              <span className="ml-2 text-green-600 text-sm">✓ Verified</span>
            )}
          </div>
          <blockquote className="text-body-md italic text-[--color-neutral-700] mb-4 line-clamp-3">
            "{testimonial.testimonial.quote}"
          </blockquote>
          <div className="text-sm">
            <div className="font-semibold text-[--color-neutral-900]">
              {testimonial.customer.name}
            </div>
            <div className="text-[--color-neutral-600]">
              {testimonial.customer.title}
            </div>
            <div className="text-[--color-neutral-600]">
              {testimonial.customer.company}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'featured') {
    return (
      <Card variant="elevated" className={`h-full ${className}`}>
        <CardHeader className="text-center pb-4">
          <div className="text-4xl mb-4">{getIndustryIcon(testimonial.customer.industry)}</div>
          <div className="flex justify-center mb-4">
            {renderStars(testimonial.testimonial.rating)}
          </div>
          {testimonial.verified && (
            <div className="flex items-center justify-center mb-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                ✓ Verified Customer
              </span>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="pt-0">
          <blockquote className="text-body-lg italic text-[--color-neutral-800] text-center mb-6 leading-relaxed">
            "{testimonial.testimonial.quote}"
          </blockquote>
          
          {/* Outcome Highlight */}
          <div className="bg-[--color-brand-primary-50] rounded-lg p-4 mb-6">
            <div className="text-center">
              <div className="text-sm font-medium text-[--color-brand-primary-700] mb-1">
                Key Results
              </div>
              <div className="text-sm font-semibold text-[--color-brand-primary]">
                {testimonial.testimonial.outcome}
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="text-center border-t border-[--color-neutral-200] pt-4">
            <div className="font-semibold text-[--color-neutral-900] mb-1">
              {testimonial.customer.name}
            </div>
            <div className="text-sm text-[--color-neutral-600] mb-1">
              {testimonial.customer.title}
            </div>
            <div className="text-sm text-[--color-neutral-600] mb-2">
              {testimonial.customer.company}
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-[--color-neutral-500]">
              <span>{getIndustryIcon(testimonial.customer.industry)}</span>
              <span>{testimonial.customer.industry}</span>
              <span>•</span>
              <span>{testimonial.customer.location}</span>
            </div>
          </div>

          {/* Video or Project Link */}
          {showProject && (testimonial.media?.videoUrl || testimonial.project) && (
            <div className="mt-6 space-y-2">
              {testimonial.media?.videoUrl && (
                <Button variant="secondary" size="sm" className="w-full">
                  Watch Video Testimonial
                </Button>
              )}
              {testimonial.project && (
                <Button variant="ghost" size="sm" asChild className="w-full">
                  <Link href={`/projects/${testimonial.project.slug}`}>
                    View Full Case Study
                  </Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card variant="outlined" className={`h-full ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getIndustryIcon(testimonial.customer.industry)}</span>
            <span className="text-sm font-medium text-[--color-brand-primary]">
              {testimonial.customer.industry}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {renderStars(testimonial.testimonial.rating)}
            {testimonial.verified && (
              <span className="text-green-600 text-xs">✓</span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <blockquote className="text-body-md italic text-[--color-neutral-700] mb-4">
          "{testimonial.testimonial.quote}"
        </blockquote>
        
        <div className="bg-[--color-neutral-50] rounded-lg p-3 mb-4">
          <div className="text-xs font-medium text-[--color-neutral-600] mb-1">
            Results Achieved
          </div>
          <div className="text-sm font-semibold text-[--color-neutral-800]">
            {testimonial.testimonial.outcome}
          </div>
        </div>

        <div className="border-t border-[--color-neutral-200] pt-4">
          <div className="font-medium text-[--color-neutral-900]">
            {testimonial.customer.name}
          </div>
          <div className="text-sm text-[--color-neutral-600]">
            {testimonial.customer.title}
          </div>
          <div className="text-sm text-[--color-neutral-600]">
            {testimonial.customer.company}
          </div>
        </div>

        {showProject && testimonial.project && (
          <div className="mt-4">
            <Button variant="ghost" size="sm" asChild className="w-full">
              <Link href={`/projects/${testimonial.project.slug}`}>
                View Case Study →
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
