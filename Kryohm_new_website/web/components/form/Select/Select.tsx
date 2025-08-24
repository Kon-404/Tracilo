import { forwardRef, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helpText?: string
  variant?: 'default' | 'error' | 'success'
  fullWidth?: boolean
  options: SelectOption[]
  placeholder?: string
}

const selectVariants = {
  variant: {
    default: 'border-[--color-neutral-300] focus:border-[--color-brand-primary] focus:ring-[--color-brand-primary]',
    error: 'border-[--color-state-error] focus:border-[--color-state-error] focus:ring-[--color-state-error]',
    success: 'border-[--color-state-success] focus:border-[--color-state-success] focus:ring-[--color-state-success]',
  },
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    error, 
    helpText, 
    variant = 'default', 
    fullWidth = false,
    options,
    placeholder,
    className, 
    id,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const finalVariant = error ? 'error' : variant

    const baseClasses = [
      'block rounded-md border-0 py-2.5 px-3 pr-10',
      'text-[--color-neutral-900]',
      'ring-1 ring-inset',
      'focus:ring-2 focus:ring-inset',
      'transition-all duration-200',
      'disabled:bg-[--color-neutral-100] disabled:text-[--color-neutral-500] disabled:cursor-not-allowed',
      'text-sm leading-6',
      'bg-white',
      'appearance-none',
      'cursor-pointer',
    ].join(' ')

    const variantClasses = selectVariants.variant[finalVariant]
    const widthClasses = fullWidth ? 'w-full' : ''

    const selectClasses = cn(
      baseClasses,
      variantClasses,
      widthClasses,
      className
    )

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label 
            htmlFor={selectId} 
            className="block text-sm font-medium leading-6 text-[--color-neutral-900] mb-2"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${selectId}-error` : 
              helpText ? `${selectId}-help` : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg 
              className="h-5 w-5 text-[--color-neutral-400]" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
        
        {error && (
          <p 
            id={`${selectId}-error`} 
            className="mt-2 text-sm text-[--color-state-error]"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helpText && !error && (
          <p 
            id={`${selectId}-help`} 
            className="mt-2 text-sm text-[--color-neutral-600]"
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
