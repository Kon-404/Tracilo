import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function PrepaidMeteringPage() {
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
            Prepaid Metering
          </h1>
          <p className="text-body-lg text-[--color-neutral-600]">
            Smart prepaid metering solutions for efficient energy management and consumption control.
          </p>
        </Container>
      </Section>
    </>
  )
}

export const metadata = {
  title: 'Prepaid Metering - Kryohm Products',
  description: 'Smart prepaid metering solutions for efficient energy management and consumption control.',
}
