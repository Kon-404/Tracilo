/**
 * Root layout component
 *
 * Wraps all pages with common structure, metadata, and styles.
 * Uses Next.js 14 App Router conventions.
 */

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { OrganizationProvider } from '@/contexts/OrganizationContext';
import Header from '@/components/Header';
import AnalyticsProvider from '@/components/AnalyticsProvider';

/**
 * App metadata for SEO and PWA
 */
export const metadata: Metadata = {
  title: {
    default: 'Checklist App - Mobile Inspection Forms',
    template: '%s | Checklist App',
  },
  description: 'Professional mobile-first checklists for vehicle, solar, and gas installations. Create, manage, and share inspection forms with your team.',
  keywords: ['checklist', 'inspection', 'forms', 'mobile', 'compliance', 'vehicle inspection', 'solar installation', 'gas inspection'],
  authors: [{ name: 'Checklist App Team' }],
  creator: 'Checklist App',
  publisher: 'Checklist App',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Checklist App - Mobile Inspection Forms',
    description: 'Professional mobile-first checklists for vehicle, solar, and gas installations',
    siteName: 'Checklist App',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Checklist App - Mobile Inspection Forms',
    description: 'Professional mobile-first checklists for vehicle, solar, and gas installations',
    creator: '@checklistapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // PWA configuration (future enhancement)
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Checklist App',
  },
};

/**
 * Viewport configuration for mobile-first design
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility
  userScalable: true,
  themeColor: '#0ea5e9', // Primary color
};

/**
 * Root layout component
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <OrganizationProvider>
            <AnalyticsProvider>
              {/* Main app container with mobile-optimized spacing */}
              <div className="min-h-screen flex flex-col safe-area-top safe-area-bottom">
                {/* Header navigation */}
                <Header />

                {/* Main content area */}
                <main className="flex-1 py-6">
                  {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-100 border-t border-gray-200 mt-auto no-print">
                  <div className="container-mobile py-6">
                    <div className="text-center text-sm text-gray-600">
                      <p>
                        Checklist App &copy; {new Date().getFullYear()}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Mobile-first inspection and compliance forms
                      </p>
                    </div>
                  </div>
                </footer>
              </div>
            </AnalyticsProvider>
          </OrganizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
