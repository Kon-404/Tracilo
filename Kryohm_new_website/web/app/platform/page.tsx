import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function PlatformPage() {
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
            Platform
          </h1>
          <p className="text-body-lg text-[--color-neutral-600]">
            Learn about Kryohm's IoT platform that powers our smart energy management solutions.
          </p>
        </Container>
      </Section>
    </>
  )
}

export const metadata = {
  title: 'Platform - Kryohm IoT Solutions',
  description: 'Discover the powerful IoT platform that drives Kryohm\'s smart energy management and automation solutions.',
}
