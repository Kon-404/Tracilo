import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Browse and manage checklist templates. Create custom templates or use system templates for your inspections.',
  openGraph: {
    title: 'Checklist Templates',
    description: 'Browse and manage checklist templates for your team.',
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
