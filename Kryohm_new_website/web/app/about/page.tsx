import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function AboutPage() {
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
            About Kryohm
          </h1>
          <p className="text-body-lg text-[--color-neutral-600]">
            Learn about our mission to transform energy management through innovative IoT solutions.
          </p>
        </Container>
      </Section>
    </>
  )
}

export const metadata = {
  title: 'About - Kryohm IoT Solutions',
  description: 'Learn about Kryohm\'s mission to transform energy management through innovative IoT solutions and automation technology.',
}
