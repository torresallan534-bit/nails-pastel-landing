'use client';

import React, { useState, useEffect } from 'react';
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

  // Close menu on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-canvas-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden border border-pastel-purple/50 bg-white p-1 shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Image
                src={theme.logoUrl || '/images/logo/logo.png'}
                alt={theme.businessName || 'Logo'}
                fill
                className="object-contain p-0.5 sm:p-1"
                priority
              />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight text-brand-dark block leading-none">
                {theme.businessName || 'Nails Pastel'}
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-pastel-pinkDark block mt-0.5">
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

          {/* CTA Button Desktop */}
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
            className="md:hidden w-11 h-11 rounded-xl flex items-center justify-center text-brand-dark hover:bg-white/80 active:bg-white border border-canvas-border transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu with Backdrop Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-10 bg-white/95 backdrop-blur-xl border-b border-canvas-border px-6 pt-5 pb-8 space-y-5 shadow-2xl animate-in slide-in-from-top-6 duration-200">
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between pb-3 border-b border-canvas-border">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-pastel-pink/40 bg-white p-1">
                  <Image
                    src={theme.logoUrl || '/images/logo/logo.png'}
                    alt={theme.businessName || 'Logo'}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-extrabold text-base text-brand-dark">
                  {theme.businessName || 'Nails Pastel'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="w-10 h-10 rounded-xl bg-canvas border border-canvas-border flex items-center justify-center text-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col space-y-2 text-base font-bold text-brand-dark">
              <a
                href="#servicios"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] px-3.5 rounded-xl hover:bg-canvas active:bg-pastel-pink/30 flex items-center transition-colors"
              >
                Servicios & Precios
              </a>
              <a
                href="#galeria"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] px-3.5 rounded-xl hover:bg-canvas active:bg-pastel-pink/30 flex items-center transition-colors"
              >
                Galería de Trabajos
              </a>
              <a
                href="#politicas"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] px-3.5 rounded-xl hover:bg-canvas active:bg-pastel-pink/30 flex items-center transition-colors"
              >
                Anticipo & Políticas
              </a>
              <a
                href={`https://wa.me/${siteSettings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] px-3.5 rounded-xl hover:bg-canvas active:bg-pastel-pink/30 flex items-center gap-2.5 text-emerald-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp (+{siteSettings.whatsappNumber})</span>
              </a>
            </nav>

            {/* CTA in Drawer */}
            <div className="pt-2">
              <a
                href="#agenda"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[50px] px-6 rounded-2xl bg-pastel-pink text-brand-dark font-extrabold text-sm shadow-glow-pink flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ver Turnos Disponibles</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
