'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export interface HeaderProps {
  className?: string
}

const navigation = [
  { name: 'Home', href: '/', exact: true },
  { 
    name: 'Products', 
    href: '/products',
    children: [
      { name: 'IoT Sensors', href: '/products/sensors' },
      { name: 'Prepaid Metering', href: '/products/prepaid-metering' },
      { name: 'Shower Control', href: '/products/shower-control' },
    ]
  },
  { 
    name: 'Industries',
    href: '/industries',
    children: [
      { name: 'Agriculture', href: '/industries/agriculture' },
      { name: 'Utilities', href: '/industries/utilities' },
      { name: 'Property Management', href: '/industries/property-management' },
      { name: 'Industrial', href: '/industries/industrial' },
    ]
  },
  { name: 'Platform', href: '/platform' },
  { name: 'Projects', href: '/projects' },
  { name: 'Technical', href: '/technical' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const Header = ({ className }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setOpenDropdown(null)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const isActiveLink = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <header className={cn('sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-[--color-neutral-200]', className)}>
      <Container size="xl" padding="md">
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-[--color-brand-primary] font-bold text-xl hover:text-[--color-brand-primary-dark] transition-colors"
              aria-label="Kryohm home"
            >
              <div className="w-8 h-8 bg-[--color-brand-primary] rounded-md flex items-center justify-center text-white font-bold text-sm">
                K
              </div>
              <span>Kryohm</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={cn(
                        'flex items-center space-x-1 text-sm font-medium transition-colors hover:text-[--color-brand-primary] focus:outline-none focus:text-[--color-brand-primary]',
                        isActiveLink(item.href) 
                          ? 'text-[--color-brand-primary]' 
                          : 'text-[--color-neutral-700]'
                      )}
                      aria-expanded={openDropdown === item.name}
                      aria-haspopup="true"
                    >
                      <span>{item.name}</span>
                      <svg 
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          openDropdown === item.name ? 'rotate-180' : ''
                        )} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-medium border border-[--color-neutral-200] py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2 text-sm transition-colors hover:bg-[--color-brand-primary-50] hover:text-[--color-brand-primary]',
                              isActiveLink(child.href)
                                ? 'text-[--color-brand-primary] bg-[--color-brand-primary-50]'
                                : 'text-[--color-neutral-700]'
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-[--color-brand-primary]',
                      isActiveLink(item.href, item.exact) 
                        ? 'text-[--color-brand-primary]' 
                        : 'text-[--color-neutral-700]'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/search" aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/contact">Request Pricing</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/contact?type=demo">Book Demo</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[--color-neutral-700] hover:text-[--color-brand-primary] hover:bg-[--color-neutral-100] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[--color-brand-primary]"
            onClick={toggleMobileMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-[--color-neutral-200]">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        className={cn(
                          'flex items-center justify-between w-full px-3 py-2 text-base font-medium rounded-md transition-colors hover:text-[--color-brand-primary] hover:bg-[--color-neutral-100]',
                          isActiveLink(item.href) 
                            ? 'text-[--color-brand-primary] bg-[--color-brand-primary-50]' 
                            : 'text-[--color-neutral-700]'
                        )}
                        onClick={() => toggleDropdown(item.name)}
                        aria-expanded={openDropdown === item.name}
                      >
                        <span>{item.name}</span>
                        <svg 
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            openDropdown === item.name ? 'rotate-180' : ''
                          )} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === item.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                'block px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-[--color-brand-primary] hover:bg-[--color-neutral-100]',
                                isActiveLink(child.href)
                                  ? 'text-[--color-brand-primary] bg-[--color-brand-primary-50]'
                                  : 'text-[--color-neutral-600]'
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-3 py-2 text-base font-medium rounded-md transition-colors hover:text-[--color-brand-primary] hover:bg-[--color-neutral-100]',
                        isActiveLink(item.href, item.exact) 
                          ? 'text-[--color-brand-primary] bg-[--color-brand-primary-50]' 
                          : 'text-[--color-neutral-700]'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-2">
                <Button variant="secondary" size="md" className="w-full" asChild>
                  <Link href="/contact">Request Pricing</Link>
                </Button>
                <Button variant="primary" size="md" className="w-full" asChild>
                  <Link href="/contact?type=demo">Book Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
