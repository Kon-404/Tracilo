import { notFound } from 'next/navigation'
import { sampleProjects } from '@/lib/data/projects'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = sampleProjects.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <Section spacing="lg">
      <Container>
        <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-6">
          {project.title}
        </h1>
        <p className="text-body-lg text-[--color-neutral-600]">
          {project.excerpt}
        </p>
      </Container>
    </Section>
  )
}
