import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function ProjectsPage() {
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
            Our Projects
          </h1>
          <p className="text-body-lg text-[--color-neutral-600]">
            Explore successful Kryohm implementations across different industries and use cases.
          </p>
        </Container>
      </Section>
    </>
  )
}

export const metadata = {
  title: 'Projects - Kryohm IoT Solutions',
  description: 'See real-world examples of Kryohm IoT implementations and case studies across various industries.',
}
