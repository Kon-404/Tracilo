import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function ProductsPage() {
  return (
    <>
      <Section spacing="sm" variant="secondary">
        <Container>
          <Breadcrumb />
        </Container>
      </Section>
      
      <Section spacing="lg">
        <Container>
          <h1 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
            Our Products
          </h1>
          <p className="text-body-lg text-[--color-neutral-600]">
            Discover Kryohm's innovative IoT solutions for smart energy management and automation.
          </p>
        </Container>
      </Section>
    </>
  )
}

export const metadata = {
  title: 'Products - Kryohm IoT Solutions',
  description: 'Explore Kryohm\'s comprehensive range of IoT products including sensors, prepaid metering, and shower control systems.',
}
