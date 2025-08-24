import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function ShowerControlPage() {
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
            Shower Control
          </h1>
          <p className="text-body-lg text-[--color-neutral-600]">
            Automated shower control systems for water conservation and user experience optimization.
          </p>
        </Container>
      </Section>
    </>
  )
}

export const metadata = {
  title: 'Shower Control - Kryohm Products',
  description: 'Automated shower control systems for water conservation and user experience optimization.',
}
