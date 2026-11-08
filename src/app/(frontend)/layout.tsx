import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '../globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffa0d3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://nailspastel.com'),
  title: 'Nails Pastel | Estudio de Manicura & Nail Art Profesional',
  description:
    'Estudio exclusivo de uñas en Bogotá. Especialistas en manicura rusa, nivelación con base rubber, esculpido en acrílico, soft gel y micro-nail art personalizado. Agenda tu turno online.',
  keywords: [
    'uñas acrilicas',
    'manicura rusa bogota',
    'semipermanente',
    'nail art bogota',
    'estudio de uñas',
    'nails pastel',
    'soft gel',
  ],
  authors: [{ name: 'Nails Pastel - Nelmarian' }],
  openGraph: {
    title: 'Nails Pastel | Estudio de Manicura & Nail Art Profesional',
    description:
      'Tu espacio seguro y estético para consentir tus manos. Agenda tu cita en bloques de 2 horas con atención 100% personalizada.',
    url: 'https://nailspastel.com',
    siteName: 'Nails Pastel',
    images: [
      {
        url: '/images/gallery/work-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Nails Pastel Estudio de Uñas',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  icons: {
    icon: '/images/logo/logo.png',
    apple: '/images/logo/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jakarta.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#fcf5f2] text-[#010101] selection:bg-pastel-pink selection:text-black">
        {children}
      </body>
    </html>
  );
}
