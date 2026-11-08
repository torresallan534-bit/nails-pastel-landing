'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { SiteConfig, ThemeBrandingData } from '@/types';
import { siteConfig as defaultSiteConfig, defaultThemeBranding } from '@/data/initialData';

interface MobileFloatingBarProps {
  siteSettings?: SiteConfig;
  theme?: ThemeBrandingData;
}

export default function MobileFloatingBar({
  siteSettings = defaultSiteConfig,
  theme = defaultThemeBranding,
}: MobileFloatingBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating bar once user scrolls past hero section (~250px)
      if (window.scrollY > 220) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAgenda = () => {
    const agendaElem = document.getElementById('agenda');
    if (agendaElem) {
      agendaElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Acciones rápidas móviles" className="fixed bottom-3 inset-x-3 z-40 md:hidden animate-in slide-in-from-bottom-5 duration-300">
      <div className="glass-panel rounded-2xl p-2 border border-white/80 shadow-float flex items-center gap-2 backdrop-blur-xl bg-white/90">
        {/* Quick WhatsApp Chat Button */}
        <a
          href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hola%20${encodeURIComponent(
            theme.businessName || 'Nails Pastel'
          )}!%20Quisiera%20consultar%20por%20turnos%20disponibles.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          className="w-12 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-sm transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Main CTA: Book Appointment */}
        <button
          type="button"
          onClick={scrollToAgenda}
          className="flex-1 h-12 px-4 rounded-xl bg-brand-dark hover:bg-black active:scale-[0.98] text-white flex items-center justify-between shadow-md transition-all"
        >
          <div className="flex items-center gap-2 text-left">
            <span className="w-2 h-2 rounded-full bg-pastel-pink animate-pulse" />
            <div>
              <span className="font-extrabold text-xs block leading-tight">
                Agendar Turno (2h)
              </span>
              <span className="text-[10px] text-pastel-pink block font-medium">
                Anticipo ${siteSettings.depositAmount.toLocaleString('es-CO')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg text-[11px] font-bold text-pastel-soft">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ver Horas</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
