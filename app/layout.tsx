import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyMobileActionBar from '@/components/StickyMobileActionBar';

export const metadata: Metadata = {

  metadataBase: new URL('https://chinamedscheck.com'),
  alternates: {
    canonical: 'https://chinamedscheck.com',
  },
  title: {
    default: 'Bringing Medication to China: Customs Rules & Legality',
    template: '%s',
  },
  description:
    'Can you bring prescription drugs to China? Instant customs legality radar for Adderall, Concerta, Xanax & Ozempic. Check GACC rules and allowances.',
  keywords: [
    'bringing medication to china',
    'can i bring adderall to china',
    'china customs prescription drugs',
    'banned medications in china',
    'china customs declaration medication',
    'methylphenidate china customs',
    'xanax china entry',
    'cbd oil china border',
  ],
  authors: [{ name: 'ChinaMedsCheck Compliance Group' }],
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chinamedscheck.com',
    siteName: 'ChinaMedsCheck',
    title: 'Bringing Medication to China: Customs Rules & Legality',
    description:
      'Can you bring prescription drugs to China? Instant customs legality radar for Adderall, Concerta, Xanax & Ozempic. Check GACC rules and allowances.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-slate-900 selection:text-white pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileActionBar />
      </body>
    </html>
  );
}


