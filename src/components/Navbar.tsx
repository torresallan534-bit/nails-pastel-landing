'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Menu, X, MessageCircle, Sparkles } from 'lucide-react';
import { ThemeBrandingData, SiteConfig } from '@/types';
import { defaultThemeBranding, siteConfig as defaultSiteConfig } from '@/data/initialData';

interface NavbarProps {
  theme?: ThemeBrandingData;
  siteSettings?: SiteConfig;
}

export default function Navbar({
  theme = defaultThemeBranding,
  siteSettings = defaultSiteConfig,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-canvas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-pastel-purple/50 bg-white p-1 shadow-xs group-hover:scale-105 transition-transform duration-200">
            <Image
              src={theme.logoUrl || '/images/logo/logo.png'}
              alt={theme.businessName || 'Logo'}
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-brand-dark block leading-none">
              {theme.businessName || 'Nails Pastel'}
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-pastel-pinkDark">
              {theme.tagline || 'Luxury Nail Studio'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-dark">
          <a
            href="#servicios"
            className="hover:text-pastel-pinkDark transition-colors relative py-1"
          >
            Servicios & Tarifas
          </a>
          <a
            href="#galeria"
            className="hover:text-pastel-pinkDark transition-colors relative py-1"
          >
            Galería Real
          </a>
          <a
            href="#politicas"
            className="hover:text-pastel-pinkDark transition-colors relative py-1"
          >
            Anticipo & Políticas
          </a>
          <a
            href={`https://wa.me/${siteSettings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-dark transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Chat Directo</span>
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#agenda"
            className="min-h-[44px] px-5 py-2.5 rounded-full bg-brand-dark text-white hover:bg-black font-bold text-xs tracking-wide shadow-md hover:scale-102 transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-pastel-pink" />
            <span>Agendar Cita (2h)</span>
          </a>
        </div>

        {/* Mobile Hamburger Button (min 48px tap area) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="md:hidden w-12 h-12 rounded-2xl flex items-center justify-center text-brand-dark hover:bg-white/60 border border-canvas-border transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-canvas-border px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-bold text-brand-dark">
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-canvas transition-colors"
            >
              Servicios & Precios
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-canvas transition-colors"
            >
              Galería de Trabajos
            </a>
            <a
              href="#politicas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-canvas transition-colors"
            >
              Anticipo & Políticas
            </a>
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-canvas transition-colors flex items-center gap-2 text-emerald-700"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Directo (+{siteSettings.whatsappNumber})</span>
            </a>
          </nav>

          <div className="pt-2">
            <a
              href="#agenda"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-pastel-pink text-brand-dark font-extrabold text-sm shadow-glow-pink flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ver Turnos Disponibles</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
