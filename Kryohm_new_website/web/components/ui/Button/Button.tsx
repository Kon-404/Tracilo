import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
  asChild?: boolean
}

const buttonVariants = {
  variant: {
    primary: 'bg-[--color-brand-primary] hover:bg-[--color-brand-primary-dark] text-white shadow-sm focus:ring-[--color-brand-primary] border-transparent',
    secondary: 'border-[--color-brand-primary] text-[--color-brand-primary] hover:bg-[--color-brand-primary-50] focus:ring-[--color-brand-primary]',
    ghost: 'text-[--color-neutral-700] hover:bg-[--color-neutral-100] focus:ring-[--color-neutral-300] border-transparent',
    destructive: 'bg-[--color-state-error] hover:bg-red-700 text-white shadow-sm focus:ring-[--color-state-error] border-transparent',
  },
  size: {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  },
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  isLoading,
  asChild,
  ...props
}: ButtonProps) => {
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium rounded-lg border',
    'transition-all duration-250 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'active:scale-95',
  ].join(' ')

  const variantClasses = buttonVariants.variant[variant]
  const sizeClasses = buttonVariants.size[size]

  const buttonClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    className
  )

  if (asChild) {
    return (
      <span className={buttonClasses} {...props}>
        {children}
      </span>
    )
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
