'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesMenu from '@/components/ServicesMenu';
import BentoGallery from '@/components/BentoGallery';
import BookingCalendar from '@/components/BookingCalendar';
import DepositPolicies from '@/components/DepositPolicies';
import Footer from '@/components/Footer';
import {
  ThemeBrandingData,
  HeroContentData,
  SectionsContentData,
  PoliciesContentData,
  SiteConfig,
  FooterContentData,
  ServiceItem,
  GalleryItem,
} from '@/types';

interface LandingViewProps {
  theme: ThemeBrandingData;
  hero: HeroContentData;
  sections: SectionsContentData;
  policies: PoliciesContentData;
  siteSettings: SiteConfig;
  footer: FooterContentData;
  services: ServiceItem[];
  gallery: GalleryItem[];
}

export default function LandingView({
  theme,
  hero,
  sections,
  policies,
  siteSettings,
  footer,
  services,
  gallery,
}: LandingViewProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    services[0]?.id || ''
  );

  return (
    <>
      {/* Inyectar variables CSS de Tema personalizables en vivo desde Payload CMS */}
      <style>{`
        :root {
          --bg-canvas: ${theme.backgroundColor || '#fcf5f2'};
          --accent-purple: ${theme.accentPurple || '#f7bbfd'};
          --accent-soft: ${theme.accentSoft || '#f0cdef'};
          --accent-pink: ${theme.primaryColor || '#ffa0d3'};
          --text-main: ${theme.textColor || '#010101'};
        }
      `}</style>

      <main className="min-h-screen bg-canvas text-brand-dark flex flex-col selection:bg-pastel-pink selection:text-brand-dark">
        {/* 1. Barra de Navegación Superior */}
        <Navbar theme={theme} siteSettings={siteSettings} />

        {/* 2. Cabecera Hero 100% editable */}
        <Hero hero={hero} theme={theme} siteSettings={siteSettings} />

        {/* 3. Menú de Servicios dinámico desde Colección Services */}
        <ServicesMenu
          services={services}
          sections={sections}
          siteSettings={siteSettings}
          onSelectService={(serviceId) => setSelectedServiceId(serviceId)}
        />

        {/* 4. Galería Bento estilo Instagram desde Colección Gallery */}
        <BentoGallery items={gallery} sections={sections} />

        {/* 5. Selector y Agendador de Citas (Google Calendar + WhatsApp) */}
        <BookingCalendar
          services={services}
          selectedServiceId={selectedServiceId}
          onServiceChange={(id) => setSelectedServiceId(id)}
          sections={sections}
          siteSettings={siteSettings}
        />

        {/* 6. Políticas de Reserva y Anticipo 100% editable */}
        <DepositPolicies policies={policies} siteSettings={siteSettings} />

        {/* 7. Pie de Página (Footer) */}
        <Footer footer={footer} theme={theme} siteSettings={siteSettings} />
      </main>
    </>
  );
}
