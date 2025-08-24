import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('Header Component', () => {
  it('renders the Kryohm logo', () => {
    render(<Header />)
    const logo = screen.getByLabelText('Kryohm home')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveTextContent('Kryohm')
  })

  it('renders main navigation items', () => {
    render(<Header />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Platform')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Header />)
    
    expect(screen.getByText('Request Pricing')).toBeInTheDocument()
    expect(screen.getByText('Book Demo')).toBeInTheDocument()
  })

  it('has accessible navigation', () => {
    render(<Header />)
    
    const nav = screen.getByLabelText('Main navigation')
    expect(nav).toBeInTheDocument()
    
    const mobileMenuButton = screen.getByLabelText('Toggle navigation menu')
    expect(mobileMenuButton).toBeInTheDocument()
  })
})
