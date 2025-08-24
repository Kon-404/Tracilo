import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-[--color-brand-primary]') // Primary variant
    expect(button).toHaveClass('h-11') // Medium size
  })

  it('renders different variants', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border-[--color-brand-primary]')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(button).toHaveClass('text-[--color-neutral-700]')

    rerender(<Button variant="destructive">Delete</Button>)
    expect(button).toHaveClass('bg-[--color-state-error]')
  })

  it('renders different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-9')

    rerender(<Button size="lg">Large</Button>)
    expect(button).toHaveClass('h-14')
  })

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.querySelector('svg')).toBeInTheDocument() // Loading spinner
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('renders as span when asChild is true', () => {
    render(<Button asChild>Link Button</Button>)
    const span = screen.getByText('Link Button')
    expect(span.tagName).toBe('SPAN')
  })
})
