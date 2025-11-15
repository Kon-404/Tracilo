import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Manage your account settings, organization memberships, and preferences.',
  robots: {
    index: false, // Don't index profile pages
    follow: false,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
