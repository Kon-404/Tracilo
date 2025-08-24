import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  variant?: 'default' | 'error' | 'success'
  fullWidth?: boolean
}

const inputVariants = {
  variant: {
    default: 'border-[--color-neutral-300] focus:border-[--color-brand-primary] focus:ring-[--color-brand-primary]',
    error: 'border-[--color-state-error] focus:border-[--color-state-error] focus:ring-[--color-state-error]',
    success: 'border-[--color-state-success] focus:border-[--color-state-success] focus:ring-[--color-state-success]',
  },
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helpText, 
    variant = 'default', 
    fullWidth = false,
    className, 
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const finalVariant = error ? 'error' : variant

    const baseClasses = [
      'block rounded-md border-0 py-2.5 px-3',
      'text-[--color-neutral-900] placeholder:text-[--color-neutral-500]',
      'ring-1 ring-inset',
      'focus:ring-2 focus:ring-inset',
      'transition-all duration-200',
      'disabled:bg-[--color-neutral-100] disabled:text-[--color-neutral-500] disabled:cursor-not-allowed',
      'text-sm leading-6',
    ].join(' ')

    const variantClasses = inputVariants.variant[finalVariant]
    const widthClasses = fullWidth ? 'w-full' : ''

    const inputClasses = cn(
      baseClasses,
      variantClasses,
      widthClasses,
      className
    )

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium leading-6 text-[--color-neutral-900] mb-2"
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : 
            helpText ? `${inputId}-help` : undefined
          }
          {...props}
        />
        
        {error && (
          <p 
            id={`${inputId}-error`} 
            className="mt-2 text-sm text-[--color-state-error]"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helpText && !error && (
          <p 
            id={`${inputId}-help`} 
            className="mt-2 text-sm text-[--color-neutral-600]"
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
