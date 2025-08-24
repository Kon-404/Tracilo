import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kryohm - IoT Solutions for Smart Energy Management",
  description: "Innovative IoT solutions for smart energy management and automation. Transform how your business monitors and controls operations with Kryohm's sensors, prepaid metering, and shower control systems.",
};

function ConsentBanner() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-[--color-neutral-200] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-black/60 p-4">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center gap-3 justify-between text-sm">
        <p>
          We use analytics cookies to improve experience. Read our privacy policy.
        </p>
        <div className="flex gap-2">
          <button id="consent-reject" className="px-3 py-1.5 border rounded-md">Reject</button>
          <button id="consent-accept" className="px-3 py-1.5 bg-[--color-brand-primary_teal] text-white rounded-md">Accept</button>
        </div>
      </div>
      <Script id="consent-banner-script" strategy="afterInteractive">
        {`
          (function(){
            const key = 'consent_analytics_v1';
            const accepted = typeof window !== 'undefined' && localStorage.getItem(key) === 'accepted';
            if (accepted) return;
            const root = document.currentScript?.parentElement;
            if (!root) return;
            const onAccept = () => { localStorage.setItem(key, 'accepted'); root.remove(); window.dispatchEvent(new Event('consent-accepted')); };
            const onReject = () => { localStorage.setItem(key, 'rejected'); root.remove(); };
            root.querySelector('#consent-accept')?.addEventListener('click', onAccept);
            root.querySelector('#consent-reject')?.addEventListener('click', onReject);
          })();
        `}
      </Script>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Site Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Site Footer */}
        <Footer />
        
        {/* Consent banner */}
        <ConsentBanner />
        
        {/* Load GA4 only after consent */}
        {GA4_ID ? (
          <>
            <Script id="ga4-loader" strategy="afterInteractive">
              {`
                (function(){
                  const key='consent_analytics_v1';
                  function loadGA(){
                    const s1=document.createElement('script');
                    s1.async=true; s1.src='https://www.googletagmanager.com/gtag/js?id=${GA4_ID}';
                    document.head.appendChild(s1);
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA4_ID}');
                  }
                  const v=localStorage.getItem(key);
                  if (v==='accepted') loadGA();
                  else window.addEventListener('consent-accepted', loadGA, { once: true });
                })();
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
