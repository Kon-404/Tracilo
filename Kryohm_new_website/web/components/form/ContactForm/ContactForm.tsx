'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/form/Input'
import { TextArea } from '@/components/form/TextArea'
import { Select } from '@/components/form/Select'
import { submitLead } from '@/lib/services/forms'
import { analytics } from '@/lib/analytics'
import type { LeadSubmission } from '@/lib/types'

// Base schema for all forms
const baseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().optional(),
  productInterest: z.enum(['Sensors', 'Prepaid Metering', 'Shower Control', 'Platform']),
  message: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val, 'You must accept our privacy policy to continue'),
})

// Extended schemas for different form types
const demoSchema = baseSchema.extend({
  industry: z.string().min(1, 'Please select your industry'),
  companySize: z.string().min(1, 'Please select your company size'),
  timeline: z.string().min(1, 'Please select your timeline'),
})

const pricingSchema = baseSchema.extend({
  projectScope: z.string().min(10, 'Please provide details about your project scope'),
  budget: z.string().optional(),
  timeline: z.string().min(1, 'Please select your timeline'),
})

const technicalSchema = baseSchema.extend({
  technicalRole: z.string().min(1, 'Please select your technical role'),
  currentSystems: z.string().optional(),
  integrationRequirements: z.string().min(10, 'Please describe your integration requirements'),
  timeline: z.string().min(1, 'Please select your timeline'),
})

const referenceSchema = baseSchema.extend({
  industry: z.string().min(1, 'Please select your industry'),
  specificQuestions: z.string().min(10, 'Please describe what you would like to discuss'),
  preferredContactMethod: z.string().min(1, 'Please select your preferred contact method'),
})

export interface ContactFormProps {
  formType?: 'contact' | 'demo' | 'pricing' | 'technical' | 'reference' | 'innovation' | 'api'
  className?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

const industryOptions = [
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'property-management', label: 'Property Management' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'other', label: 'Other' },
]

const companySizeOptions = [
  { value: 'startup', label: 'Startup (1-10 employees)' },
  { value: 'small', label: 'Small (11-50 employees)' },
  { value: 'medium', label: 'Medium (51-200 employees)' },
  { value: 'large', label: 'Large (201-1000 employees)' },
  { value: 'enterprise', label: 'Enterprise (1000+ employees)' },
]

const timelineOptions = [
  { value: 'immediate', label: 'Immediate (within 1 month)' },
  { value: 'short-term', label: 'Short-term (1-3 months)' },
  { value: 'medium-term', label: 'Medium-term (3-6 months)' },
  { value: 'long-term', label: 'Long-term (6+ months)' },
  { value: 'exploring', label: 'Just exploring options' },
]

const budgetOptions = [
  { value: 'under-10k', label: 'Under $10,000' },
  { value: '10k-50k', label: '$10,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-500k', label: '$100,000 - $500,000' },
  { value: 'over-500k', label: 'Over $500,000' },
  { value: 'not-disclosed', label: 'Prefer not to disclose' },
]

const productOptions = [
  { value: 'Sensors', label: 'IoT Sensors' },
  { value: 'Prepaid Metering', label: 'Prepaid Metering' },
  { value: 'Shower Control', label: 'Shower Control' },
  { value: 'Platform', label: 'Platform Integration' },
]

export default function ContactForm({ 
  formType = 'contact', 
  className,
  onSuccess,
  onError 
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hasStartedForm, setHasStartedForm] = useState(false)

  // Track form view on mount
  useEffect(() => {
    analytics.formView(formType)
  }, [formType])

  // Select schema based on form type
  const getSchema = () => {
    switch (formType) {
      case 'demo':
        return demoSchema
      case 'pricing':
        return pricingSchema
      case 'technical':
        return technicalSchema
      case 'reference':
        return referenceSchema
      default:
        return baseSchema
    }
  }

  const schema = getSchema()
  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      privacyConsent: false,
    }
  })

  const watchedProductInterest = watch('productInterest')

  // Track form start when user begins typing
  const handleFormStart = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true)
      analytics.formStart(formType)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    analytics.formSubmit(formType)

    try {
      // Remove privacyConsent from submission data and prepare lead submission
      const { privacyConsent, ...submissionData } = data
      
      const lead: LeadSubmission = {
        id: crypto.randomUUID(),
        formType,
        createdAt: new Date().toISOString(),
        ...submissionData,
      } as LeadSubmission

      await submitLead(lead)
      
      setSubmitStatus('success')
      analytics.formSuccess(formType, lead.id)
      analytics.leadGenerated(formType, lead.productInterest)
      reset()
      onSuccess?.()
    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form'
      setSubmitStatus('error')
      analytics.formError(formType, errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFormTitle = () => {
    switch (formType) {
      case 'demo':
        return 'Book a Demo'
      case 'pricing':
        return 'Request Pricing'
      case 'technical':
        return 'Technical Consultation'
      case 'reference':
        return 'Speak with Reference Customer'
      case 'innovation':
        return 'Innovation Discussion'
      case 'api':
        return 'API Access Request'
      default:
        return 'Contact Us'
    }
  }

  const getSubmitButtonText = () => {
    if (isSubmitting) return 'Sending...'
    switch (formType) {
      case 'demo':
        return 'Schedule Demo'
      case 'pricing':
        return 'Get Pricing'
      default:
        return 'Send Message'
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className={`text-center p-8 ${className}`}>
        <div className="w-16 h-16 bg-[--color-state-success] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-heading-sm font-bold text-[--color-neutral-900] mb-2">
          Thank you for your interest!
        </h3>
        <p className="text-body-md text-[--color-neutral-600] mb-6">
          {formType === 'demo' 
            ? "We've received your demo request and will contact you within 24 hours to schedule a personalized demonstration."
            : formType === 'pricing'
            ? "We've received your pricing request and will send you a detailed quote within 24 hours."
            : "We've received your message and will get back to you within 24 hours."
          }
        </p>
        <Button 
          variant="secondary" 
          onClick={() => setSubmitStatus('idle')}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-heading-md font-bold text-[--color-neutral-900] mb-2">
            {getFormTitle()}
          </h2>
          <p className="text-body-md text-[--color-neutral-600]">
            {formType === 'demo' 
              ? "Schedule a personalized demonstration of our IoT solutions."
              : formType === 'pricing'
              ? "Get a custom quote for your IoT project requirements."
              : formType === 'technical'
              ? "Connect with our technical team for detailed architecture discussions and implementation planning."
              : formType === 'reference'
              ? "We'll connect you with an existing customer to discuss their experience with Kryohm solutions."
              : formType === 'innovation'
              ? "Discuss emerging technologies, R&D initiatives, and future roadmap opportunities."
              : formType === 'api'
              ? "Request API credentials and technical documentation access for development."
              : "Get in touch with our IoT specialists for your energy management needs."
            }
          </p>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            {...register('name')}
            error={errors.name?.message}
            fullWidth
            required
            onFocus={handleFormStart}
          />
          <Input
            label="Email Address"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            fullWidth
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            {...register('company')}
            error={errors.company?.message}
            fullWidth
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
            fullWidth
            helpText="Optional"
          />
        </div>

        <Select
          label="Product Interest"
          options={productOptions}
          placeholder="Select a product"
          {...register('productInterest')}
          error={errors.productInterest?.message}
          fullWidth
          required
        />

        {/* Demo-specific fields */}
        {formType === 'demo' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Industry"
                options={industryOptions}
                placeholder="Select your industry"
                {...register('industry')}
                error={errors.industry?.message}
                fullWidth
                required
              />
              <Select
                label="Company Size"
                options={companySizeOptions}
                placeholder="Select company size"
                {...register('companySize')}
                error={errors.companySize?.message}
                fullWidth
                required
              />
            </div>
            
            <Select
              label="Timeline"
              options={timelineOptions}
              placeholder="When are you looking to implement?"
              {...register('timeline')}
              error={errors.timeline?.message}
              fullWidth
              required
            />
          </>
        )}

        {/* Pricing-specific fields */}
        {formType === 'pricing' && (
          <>
            <TextArea
              label="Project Scope"
              placeholder="Please describe your project requirements, installation scope, and any specific needs..."
              rows={4}
              {...register('projectScope')}
              error={errors.projectScope?.message}
              fullWidth
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Budget Range"
                options={budgetOptions}
                placeholder="Select budget range"
                {...register('budget')}
                error={errors.budget?.message}
                fullWidth
                helpText="Optional"
              />
              <Select
                label="Timeline"
                options={timelineOptions}
                placeholder="When do you need this implemented?"
                {...register('timeline')}
                error={errors.timeline?.message}
                fullWidth
                required
              />
            </div>
          </>
        )}

        {/* Message field for contact and demo forms */}
        {(formType === 'contact' || formType === 'demo') && (
          <TextArea
            label="Message"
            placeholder={formType === 'demo' 
              ? "Tell us about your specific use case or any questions you have..."
              : "How can we help you with your IoT and energy management needs?"
            }
            rows={4}
            {...register('message')}
            error={errors.message?.message}
            fullWidth
            helpText="Optional"
          />
        )}

        {/* Privacy Consent */}
        <div className="border-t border-[--color-neutral-200] pt-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('privacyConsent')}
              className="mt-1 h-4 w-4 text-[--color-brand-primary] border-[--color-neutral-300] rounded focus:ring-[--color-brand-primary] focus:ring-2"
            />
            <span className="text-sm text-[--color-neutral-700]">
              I agree to the{' '}
              <a 
                href="/privacy" 
                target="_blank" 
                className="text-[--color-brand-primary] hover:text-[--color-brand-primary-dark] underline"
              >
                Privacy Policy
              </a>{' '}
              and consent to Kryohm contacting me about their IoT solutions.
            </span>
          </label>
          {errors.privacyConsent && (
            <p className="mt-2 text-sm text-[--color-state-error]">
              {errors.privacyConsent.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full md:w-auto"
          >
            {getSubmitButtonText()}
          </Button>
          
          {submitStatus === 'error' && (
            <p className="mt-3 text-sm text-[--color-state-error]">
              There was an error submitting your request. Please try again or contact us directly.
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
