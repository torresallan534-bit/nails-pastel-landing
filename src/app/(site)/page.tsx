import React from 'react';
import LandingView from '@/components/LandingView';
import {
  getThemeBranding,
  getHeroContent,
  getSectionsContent,
  getBookingContent,
  getPoliciesContent,
  getSiteSettings,
  getFooterContent,
  getServices,
  getCategories,
  getGallery,
} from '@/lib/payloadClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [
    theme,
    hero,
    sections,
    bookingContent,
    policies,
    siteSettings,
    footer,
    services,
    categories,
    gallery,
  ] = await Promise.all([
    getThemeBranding(),
    getHeroContent(),
    getSectionsContent(),
    getBookingContent(),
    getPoliciesContent(),
    getSiteSettings(),
    getFooterContent(),
    getServices(),
    getCategories(),
    getGallery(),
  ]);

  return (
    <LandingView
      theme={theme}
      hero={hero}
      sections={sections}
      bookingContent={bookingContent}
      policies={policies}
      siteSettings={siteSettings}
      footer={footer}
      services={services}
      categories={categories}
      gallery={gallery}
    />
  );
}
