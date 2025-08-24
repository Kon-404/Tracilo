import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'dark'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  as?: 'section' | 'div' | 'main' | 'article' | 'aside'
}

const sectionVariants = {
  variant: {
    default: 'bg-white text-[--color-neutral-900]',
    primary: 'bg-[--color-brand-primary-50] text-[--color-neutral-900]',
    secondary: 'bg-[--color-neutral-50] text-[--color-neutral-900]',
    dark: 'bg-[--color-neutral-900] text-white',
  },
  spacing: {
    none: 'py-0',
    sm: 'py-8',
    md: 'py-12 lg:py-16',
    lg: 'py-16 lg:py-20',
    xl: 'py-20 lg:py-24',
  },
}

const Section = ({
  variant = 'default',
  spacing = 'md',
  children,
  className,
  as: Component = 'section',
  ...props
}: SectionProps) => {
  const baseClasses = [
    'relative',
    'w-full',
  ].join(' ')

  const variantClasses = sectionVariants.variant[variant]
  const spacingClasses = sectionVariants.spacing[spacing]

  const sectionClasses = cn(
    baseClasses,
    variantClasses,
    spacingClasses,
    className
  )

  return (
    <Component className={sectionClasses} {...props}>
      {children}
    </Component>
  )
}

export default Section
