/**
 * Root layout component
 *
 * Wraps all pages with common structure, metadata, and styles.
 * Uses Next.js 14 App Router conventions.
 */

import type { Metadata, Viewport } from 'next';
import './globals.css';

/**
 * App metadata for SEO and PWA
 */
export const metadata: Metadata = {
  title: 'Checklist App - Mobile Inspection Forms',
  description: 'Professional mobile-first checklists for vehicle, solar, and gas installations',
  keywords: ['checklist', 'inspection', 'forms', 'mobile', 'compliance'],
  authors: [{ name: 'Checklist App Team' }],
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
        {/* Main app container with mobile-optimized spacing */}
        <div className="min-h-screen flex flex-col safe-area-top safe-area-bottom">
          {/* Header navigation */}
          <header className="bg-white shadow-sm sticky top-0 z-10 no-print">
            <div className="container-mobile py-4">
              <div className="flex items-center justify-between">
                <a href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Checklist App
                  </h1>
                </a>

                {/* Navigation links */}
                <nav className="flex items-center space-x-2">
                  <a
                    href="/"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors tap-target"
                  >
                    Templates
                  </a>
                  <a
                    href="/submissions"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors tap-target"
                  >
                    Submissions
                  </a>
                </nav>
              </div>
            </div>
          </header>

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
      </body>
    </html>
  );
}
