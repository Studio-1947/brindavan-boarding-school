import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileCta } from '@/components/MobileCta';
import { ProspectusProvider } from '@/components/Prospectus';
import './globals.css';

export const metadata: Metadata = {
  icons: { icon: { url: '/assets/logo.png', type: 'image/png' } },
  twitter: { card: 'summary' },
};

const FONTS =
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Inter:wght@600&family=Manrope:wght@400;500;600;650;700;750;800&display=swap';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <ProspectusProvider>
          <Header />
          {children}
          <Footer />
          <MobileCta />
        </ProspectusProvider>
      </body>
    </html>
  );
}
