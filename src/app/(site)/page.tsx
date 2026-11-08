import React from 'react';
import LandingView from '@/components/LandingView';
import {
  getThemeBranding,
  getHeroContent,
  getSectionsContent,
  getPoliciesContent,
  getSiteSettings,
  getFooterContent,
  getServices,
  getGallery,
} from '@/lib/payloadClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [
    theme,
    hero,
    sections,
    policies,
    siteSettings,
    footer,
    services,
    gallery,
  ] = await Promise.all([
    getThemeBranding(),
    getHeroContent(),
    getSectionsContent(),
    getPoliciesContent(),
    getSiteSettings(),
    getFooterContent(),
    getServices(),
    getGallery(),
  ]);

  return (
    <LandingView
      theme={theme}
      hero={hero}
      sections={sections}
      policies={policies}
      siteSettings={siteSettings}
      footer={footer}
      services={services}
      gallery={gallery}
    />
  );
}
