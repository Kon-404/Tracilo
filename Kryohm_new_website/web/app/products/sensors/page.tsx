import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function SensorsPage() {
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
            IoT Sensors
          </h1>
          <p className="text-body-lg text-[--color-neutral-600]">
            Monitor environmental conditions and operational parameters in real-time with our advanced IoT sensor solutions.
          </p>
        </Container>
      </Section>
    </>
  )
}

export const metadata = {
  title: 'IoT Sensors - Kryohm Products',
  description: 'Advanced IoT sensors for real-time monitoring of environmental conditions and operational parameters.',
}
