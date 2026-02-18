import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Wawaw — Le cinéma africain, sans limites',
    template: '%s | Wawaw',
  },
  description: 'Films, séries et animés africains en streaming illimité. Découvrez le meilleur du cinéma africain sur Wawaw.',
  keywords: ['streaming africain', 'films africains', 'séries africaines', 'cinéma africain', 'wawaw'],
  authors: [{ name: 'Wawaw' }],
  creator: 'Wawaw',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://wawaw.app',
    siteName: 'Wawaw',
    title: 'Wawaw — Le cinéma africain, sans limites',
    description: 'Films, séries et animés africains en streaming illimité.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Wawaw' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wawaw — Le cinéma africain, sans limites',
    description: 'Films, séries et animés africains en streaming illimité.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} font-sans bg-[#050505] text-white antialiased`}>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
