import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helpText?: string
  variant?: 'default' | 'error' | 'success'
  fullWidth?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const textAreaVariants = {
  variant: {
    default: 'border-[--color-neutral-300] focus:border-[--color-brand-primary] focus:ring-[--color-brand-primary]',
    error: 'border-[--color-state-error] focus:border-[--color-state-error] focus:ring-[--color-state-error]',
    success: 'border-[--color-state-success] focus:border-[--color-state-success] focus:ring-[--color-state-success]',
  },
  resize: {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  },
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    label, 
    error, 
    helpText, 
    variant = 'default', 
    fullWidth = false,
    resize = 'vertical',
    rows = 4,
    className, 
    id,
    ...props 
  }, ref) => {
    const textAreaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const finalVariant = error ? 'error' : variant

    const baseClasses = [
      'block rounded-md border-0 py-2.5 px-3',
      'text-[--color-neutral-900] placeholder:text-[--color-neutral-500]',
      'ring-1 ring-inset',
      'focus:ring-2 focus:ring-inset',
      'transition-all duration-200',
      'disabled:bg-[--color-neutral-100] disabled:text-[--color-neutral-500] disabled:cursor-not-allowed',
      'text-sm leading-6',
      'min-h-[80px]',
    ].join(' ')

    const variantClasses = textAreaVariants.variant[finalVariant]
    const resizeClasses = textAreaVariants.resize[resize]
    const widthClasses = fullWidth ? 'w-full' : ''

    const textAreaClasses = cn(
      baseClasses,
      variantClasses,
      resizeClasses,
      widthClasses,
      className
    )

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label 
            htmlFor={textAreaId} 
            className="block text-sm font-medium leading-6 text-[--color-neutral-900] mb-2"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textAreaId}
          rows={rows}
          className={textAreaClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${textAreaId}-error` : 
            helpText ? `${textAreaId}-help` : undefined
          }
          {...props}
        />
        
        {error && (
          <p 
            id={`${textAreaId}-error`} 
            className="mt-2 text-sm text-[--color-state-error]"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helpText && !error && (
          <p 
            id={`${textAreaId}-help`} 
            className="mt-2 text-sm text-[--color-neutral-600]"
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'

export default TextArea
