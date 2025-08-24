"use client";
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContactForm } from '@/components/form/ContactForm';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  
  const getFormType = (): 'contact' | 'demo' | 'pricing' => {
    if (type === 'demo') return 'demo';
    if (type === 'pricing') return 'pricing';
    return 'contact';
  };

  return (
    <>
      <Section spacing="sm" variant="secondary">
        <Container>
          <Breadcrumb />
        </Container>
      </Section>
      
      <Section spacing="lg">
        <Container size="md">
          <ContactForm formType={getFormType()} />
        </Container>
      </Section>
    </>
  );
}


