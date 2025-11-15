import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submissions',
  description: 'View and manage your form submissions. Download PDFs, edit responses, and track completion status.',
  openGraph: {
    title: 'Form Submissions',
    description: 'View and manage your inspection form submissions.',
  },
};

export default function SubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
