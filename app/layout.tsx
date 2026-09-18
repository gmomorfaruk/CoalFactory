import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/context';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileQuickBar from '@/components/layout/MobileQuickBar';

export const metadata: Metadata = {
  title: 'Hasib Enterprises | Wood Charcoal Manufacturer & Supplier Bangladesh',
  description: 'A Bangladesh-based wood charcoal manufacturing and supply business serving restaurants, BBQ businesses, commercial buyers, wholesalers, and distributors with direct-from-factory charcoal.',
  keywords: [
    'wood charcoal bangladesh',
    'hasib enterprises',
    'charcoal factory bangladesh',
    'bbq charcoal dhaka',
    'lump charcoal supplier',
    'কাঠের কয়লা',
    'কয়লা কারখানা',
    'বারবিকিউ কয়লা'
  ],
  openGraph: {
    title: 'Hasib Enterprises - Premium Wood Charcoal Supply',
    description: 'Direct factory supplier of hardwood charcoal for restaurants, BBQs, and industrial operations in Bangladesh.',
    type: 'website',
    locale: 'bn_BD',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="dark">
      <body className="min-h-screen flex flex-col bg-charcoal-950 text-charcoal-200 antialiased selection:bg-ember-600 selection:text-white">
        <LanguageProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <MobileQuickBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
