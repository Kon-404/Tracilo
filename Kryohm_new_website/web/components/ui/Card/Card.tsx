import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

const cardVariants = {
  variant: {
    default: 'bg-white border border-[--color-neutral-200]',
    outlined: 'bg-transparent border-2 border-[--color-neutral-300]',
    elevated: 'bg-white border border-[--color-neutral-200] shadow-medium',
  },
  padding: {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
}

const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className,
  ...props
}: CardProps) => {
  const baseClasses = [
    'rounded-lg',
    'transition-all duration-250 ease-in-out',
  ].join(' ')

  const variantClasses = cardVariants.variant[variant]
  const paddingClasses = cardVariants.padding[padding]

  const cardClasses = cn(
    baseClasses,
    variantClasses,
    paddingClasses,
    className
  )

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}

// Card sub-components for better composition
const CardHeader = ({ 
  children, 
  className, 
  ...props 
}: HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn('flex flex-col space-y-1.5 p-6 pb-0', className)} 
    {...props}
  >
    {children}
  </div>
)

const CardTitle = ({ 
  children, 
  className, 
  ...props 
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 
    className={cn(
      'text-heading-xs font-semibold leading-none tracking-tight text-[--color-neutral-900]', 
      className
    )} 
    {...props}
  >
    {children}
  </h3>
)

const CardDescription = ({ 
  children, 
  className, 
  ...props 
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p 
    className={cn('text-body-sm text-[--color-neutral-600]', className)} 
    {...props}
  >
    {children}
  </p>
)

const CardContent = ({ 
  children, 
  className, 
  ...props 
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
)

const CardFooter = ({ 
  children, 
  className, 
  ...props 
}: HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn('flex items-center p-6 pt-0', className)} 
    {...props}
  >
    {children}
  </div>
)

export default Card
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
