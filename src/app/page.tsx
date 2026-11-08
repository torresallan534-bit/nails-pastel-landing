'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesMenu from '@/components/ServicesMenu';
import BentoGallery from '@/components/BentoGallery';
import BookingCalendar from '@/components/BookingCalendar';
import DepositPolicies from '@/components/DepositPolicies';
import Footer from '@/components/Footer';
import { initialServices, initialGallery } from '@/data/initialData';

export default function HomePage() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServices[0].id);

  return (
    <main className="min-h-screen bg-canvas text-brand-dark flex flex-col selection:bg-pastel-pink selection:text-brand-dark">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Menu Section */}
      <ServicesMenu
        services={initialServices}
        onSelectService={(serviceId) => setSelectedServiceId(serviceId)}
      />

      {/* Instagram-style Bento Gallery Section */}
      <BentoGallery items={initialGallery} />

      {/* Booking Calendar & Slot Selector Section */}
      <BookingCalendar
        services={initialServices}
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
