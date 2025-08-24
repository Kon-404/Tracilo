'use client'

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
          <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-6">
            Project Case Studies
          </h1>
          <p className="text-body-lg text-[--color-neutral-600]">
            Projects gallery coming soon...
          </p>
        </Container>
      </Section>
    </>
  )
}


