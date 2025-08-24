# Kryohm Design System Components

This document serves as the component library documentation for the Kryohm website.

## Design Tokens

### Colors
- **Primary Brand**: `--color-brand-primary` (#0F9BAA) - Teal
- **Accent Brand**: `--color-brand-accent` (#2DA4F2) - Azure
- **Neutrals**: `--color-neutral-50` to `--color-neutral-950`
- **States**: Success, Warning, Error, Info with light variants

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Scale**: heading-xl, heading-lg, heading-md, heading-sm, heading-xs, body-lg, body-md, body-sm, caption
- **Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## Components

### UI Components

#### Button
**Location**: `components/ui/Button/Button.tsx`

**Variants**:
- `primary` - Teal background, white text (CTA)
- `secondary` - Teal outline, teal text
- `ghost` - Transparent, neutral text
- `destructive` - Red background, white text

**Sizes**: `sm`, `md`, `lg`

**Props**:
- `variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'`
- `size?: 'sm' | 'md' | 'lg'`
- `isLoading?: boolean`
- `asChild?: boolean` - Renders as span for Link composition

**Usage**:
```tsx
import { Button } from '@/components/ui/Button'

<Button variant="primary" size="md">
  Book Demo
</Button>

<Button variant="secondary" asChild>
  <Link href="/pricing">Request Pricing</Link>
</Button>
```

#### Card
**Location**: `components/ui/Card/Card.tsx`

**Variants**:
- `default` - White background, subtle border
- `outlined` - Transparent background, prominent border
- `elevated` - White background with shadow

**Padding**: `none`, `sm`, `md`, `lg`

**Sub-components**: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

**Usage**:
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>IoT Sensors</CardTitle>
  </CardHeader>
  <CardContent>
    Monitor environmental conditions in real-time.
  </CardContent>
</Card>
```

#### Container
**Location**: `components/ui/Container/Container.tsx`

**Sizes**:
- `sm` - 768px max-width
- `md` - 896px max-width  
- `lg` - 1152px max-width
- `xl` - 1200px max-width (default)
- `full` - Full width

**Padding**: `none`, `sm`, `md`, `lg`

**Usage**:
```tsx
import { Container } from '@/components/ui/Container'

<Container size="xl" padding="md">
  <h1>Page Content</h1>
</Container>
```

#### Section
**Location**: `components/ui/Section/Section.tsx`

**Variants**:
- `default` - White background
- `primary` - Brand primary light background
- `secondary` - Neutral light background
- `dark` - Dark background, white text

**Spacing**: `none`, `sm`, `md`, `lg`, `xl`

**Usage**:
```tsx
import { Section } from '@/components/ui/Section'

<Section variant="primary" spacing="lg">
  <Container>
    <h2>Section Content</h2>
  </Container>
</Section>
```

### Layout Components

#### Header
**Location**: `components/layout/Header/Header.tsx`

**Features**:
- Responsive navigation with mobile hamburger menu
- Products dropdown with sub-navigation
- Active page highlighting
- CTA buttons (Request Pricing, Book Demo)
- Keyboard navigation support
- ARIA accessibility attributes

**Usage**:
```tsx
import { Header } from '@/components/layout/Header'

<Header />
```

#### Footer
**Location**: `components/layout/Footer/Footer.tsx`

**Features**:
- Four-column layout on desktop
- Company info with contact details
- Navigation links organized by category
- Social media links
- Copyright and legal links

**Usage**:
```tsx
import { Footer } from '@/components/layout/Footer'

<Footer />
```

### Form Components

#### Input
**Location**: `components/form/Input/Input.tsx`

**Features**:
- React Hook Form compatible (forwardRef)
- Label, error, and help text support
- WCAG accessibility compliance
- Error state styling

**Usage**:
```tsx
import { Input } from '@/components/form/Input'

<Input
  label="Email Address"
  type="email"
  placeholder="you@company.com"
  error={errors.email?.message}
  fullWidth
/>
```

#### TextArea
**Location**: `components/form/TextArea/TextArea.tsx`

**Features**:
- React Hook Form compatible
- Configurable resize behavior
- Minimum height constraints

**Usage**:
```tsx
import { TextArea } from '@/components/form/TextArea'

<TextArea
  label="Message"
  rows={6}
  placeholder="Tell us about your project..."
  error={errors.message?.message}
  fullWidth
/>
```

#### Select
**Location**: `components/form/Select/Select.tsx`

**Features**:
- Custom styled dropdown
- Options array support
- Placeholder support
- Disabled options

**Usage**:
```tsx
import { Select } from '@/components/form/Select'

const industryOptions = [
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'retail', label: 'Retail' }
]

<Select
  label="Industry"
  options={industryOptions}
  placeholder="Select your industry"
  error={errors.industry?.message}
  fullWidth
/>
```

## Accessibility Features

All components follow WCAG AA guidelines:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: All color combinations meet 4.5:1 contrast ratio minimum
- **Focus Management**: Visible focus indicators and logical tab order
- **Error Handling**: Errors announced to screen readers with role="alert"

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Tree-shakeable exports
- Minimal runtime overhead
- CSS-in-JS avoided in favor of Tailwind classes
- Optimized for Core Web Vitals
