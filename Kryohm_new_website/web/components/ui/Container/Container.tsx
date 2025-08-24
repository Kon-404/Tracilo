import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
  as?: 'div' | 'section' | 'main' | 'article' | 'aside'
}

const containerVariants = {
  size: {
    sm: 'max-w-3xl',      // 768px
    md: 'max-w-4xl',      // 896px  
    lg: 'max-w-6xl',      // 1152px
    xl: 'max-w-container', // 1200px (custom)
    full: 'max-w-full',
  },
  padding: {
    none: 'px-0',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
  },
}

const Container = ({
  size = 'xl',
  padding = 'md',
  children,
  className,
  as: Component = 'div',
  ...props
}: ContainerProps) => {
  const baseClasses = [
    'mx-auto',
    'w-full',
  ].join(' ')

  const sizeClasses = containerVariants.size[size]
  const paddingClasses = containerVariants.padding[padding]

  const containerClasses = cn(
    baseClasses,
    sizeClasses,
    paddingClasses,
    className
  )

  return (
    <Component className={containerClasses} {...props}>
      {children}
    </Component>
  )
}

export default Container
