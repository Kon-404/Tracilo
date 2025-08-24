import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from './Input'

describe('Input Component', () => {
  it('renders with label', () => {
    render(<Input label="Email" />)
    const label = screen.getByLabelText('Email')
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('INPUT')
  })

  it('displays error message', () => {
    render(<Input label="Email" error="Email is required" />)
    const errorMessage = screen.getByRole('alert')
    expect(errorMessage).toHaveTextContent('Email is required')
    expect(errorMessage).toHaveClass('text-[--color-state-error]')
  })

  it('displays help text when no error', () => {
    render(<Input label="Email" helpText="We'll never share your email" />)
    const helpText = screen.getByText("We'll never share your email")
    expect(helpText).toBeInTheDocument()
    expect(helpText).toHaveClass('text-[--color-neutral-600]')
  })

  it('shows error state styling', () => {
    render(<Input label="Email" error="Invalid email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveClass('border-[--color-state-error]')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('can be disabled', () => {
    render(<Input label="Email" disabled />)
    const input = screen.getByLabelText('Email')
    expect(input).toBeDisabled()
  })

  it('applies fullWidth class', () => {
    render(<Input label="Email" fullWidth />)
    const container = screen.getByLabelText('Email').closest('div')
    expect(container).toHaveClass('w-full')
  })
})
