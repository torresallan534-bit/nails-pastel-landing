'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesMenu from '@/components/ServicesMenu';
import BentoGallery from '@/components/BentoGallery';
import BookingCalendar from '@/components/BookingCalendar';
import DepositPolicies from '@/components/DepositPolicies';
import Footer from '@/components/Footer';
import { initialServices, initialGallery, siteConfig } from '@/data/initialData';
import { ServiceItem, GalleryItem, SiteConfig } from '@/types';

export default function HomePage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [config, setConfig] = useState<SiteConfig>(siteConfig);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServices[0].id);

  // Sync from admin localStorage if changes were saved
  useEffect(() => {
    try {
      const savedServices = localStorage.getItem('nails_pastel_services');
      if (savedServices) {
        const parsed = JSON.parse(savedServices);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setServices(parsed);
          setSelectedServiceId(parsed[0].id);
        }
      }

      const savedGallery = localStorage.getItem('nails_pastel_gallery');
      if (savedGallery) {
        const parsed = JSON.parse(savedGallery);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setGallery(parsed);
        }
      }

      const savedConfig = localStorage.getItem('nails_pastel_config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        if (parsed?.whatsappNumber) {
          setConfig(parsed);
        }
      }
    } catch (e) {
      console.warn('Using default initial data:', e);
    }
  }, []);

  return (
    <main className="min-h-screen bg-canvas text-brand-dark flex flex-col selection:bg-pastel-pink selection:text-brand-dark">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Menu Section */}
      <ServicesMenu
        services={services}
        onSelectService={(serviceId) => setSelectedServiceId(serviceId)}
      />

      {/* Instagram-style Bento Gallery Section */}
      <BentoGallery items={gallery} />

      {/* Booking Calendar & Slot Selector Section */}
      <BookingCalendar
        services={services}
        selectedServiceId={selectedServiceId}
        onServiceChange={(id) => setSelectedServiceId(id)}
      />

      {/* Deposit & Reservation Policies */}
      <DepositPolicies />

      {/* Footer */}
      <Footer />
    </main>
  );
}
