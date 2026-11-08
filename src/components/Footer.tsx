import React from 'react';
import Image from 'next/image';
import { MessageCircle, Mail, Clock, MapPin, Heart, Instagram } from 'lucide-react';
import { FooterContentData, ThemeBrandingData, SiteConfig } from '@/types';
import {
  defaultFooterContent,
  defaultThemeBranding,
  siteConfig as defaultSiteConfig,
} from '@/data/initialData';

interface FooterProps {
  footer?: FooterContentData;
  theme?: ThemeBrandingData;
  siteSettings?: SiteConfig;
}

export default function Footer({
  footer = defaultFooterContent,
  theme = defaultThemeBranding,
  siteSettings = defaultSiteConfig,
}: FooterProps) {
  return (
    <footer className="border-t border-canvas-border bg-white/70 backdrop-blur-md pt-12 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-10 md:pb-12 border-b border-canvas-border">
        {/* Col 1: Brand Info (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-pastel-pink/40 bg-white p-1 shadow-xs">
              <Image
                src={theme.logoUrl || '/images/logo/logo.png'}
                alt={theme.businessName || 'Nails Pastel'}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-brand-dark block">
                {theme.businessName || 'Nails Pastel'}
              </span>
              <span className="text-xs text-pastel-pinkDark font-semibold uppercase tracking-wider">
                {theme.tagline || 'Luxury Nail Studio'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-brand-muted max-w-sm leading-relaxed">
            {footer.aboutText}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-xl bg-canvas border border-canvas-border hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center text-brand-dark transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={footer.instagramUrl || 'https://instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-canvas border border-canvas-border hover:border-pastel-pink hover:text-pastel-pinkDark flex items-center justify-center text-brand-dark transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${siteSettings.notificationEmail}`}
              aria-label="Correo"
              className="w-10 h-10 rounded-xl bg-canvas border border-canvas-border hover:border-pastel-purple hover:text-brand-dark flex items-center justify-center text-brand-dark transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Col 2: Horarios y Turnos (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-brand-dark">
            Horarios Operativos
          </h4>
          <ul className="text-xs text-brand-muted space-y-2.5">
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-pastel-pinkDark shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-dark block">Atención:</strong>
                <span>{footer.scheduleLine1 || 'Lunes a Sábado: 7:00 AM – 6:00 PM'}</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-pastel-purple shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-dark block">Bloques:</strong>
                <span>{footer.scheduleLine2 || 'Turnos de 2 horas continuas'}</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-dark block">Almuerzo:</strong>
                <span>{footer.scheduleLine3 || '1:00 PM – 2:00 PM (No agendable)'}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Col 3: Contacto & Reserva (4 cols) */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-brand-dark">
            Ubicación y Reservas
          </h4>
          <ul className="text-xs text-brand-muted space-y-2.5">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-pastel-pinkDark shrink-0 mt-0.5" />
              <span>{footer.addressText || siteSettings.locationAddress}</span>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                WhatsApp:{' '}
                <a
                  href={`https://wa.me/${siteSettings.whatsappNumber}`}
                  className="font-bold text-brand-dark hover:underline"
                >
                  +{siteSettings.whatsappNumber}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-brand-dark shrink-0 mt-0.5" />
              <span>
                Citas Google Calendar:{' '}
                <a
                  href={siteSettings.googleCalendarScheduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-dark hover:underline"
                >
                  Abrir calendario oficial
                </a>
              </span>
            </li>
          </ul>

          <div className="pt-2">
            <div className="p-3 rounded-xl bg-canvas border border-canvas-border text-[11px] text-brand-muted">
              ⚠️ <strong>Recuerda:</strong> Anticipo de ${siteSettings.depositAmount.toLocaleString('es-CO')} COP requerido para apartar tu cupo (Nequi o Daviplata).
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
        <p>{footer.copyrightText || `© ${new Date().getFullYear()} ${theme.businessName || 'Nails Pastel'}. Todos los derechos reservados.`}</p>
        <p className="flex items-center gap-1">
          {footer.creditsText || 'Hecho con amor por Panda Haus.'}
        </p>
      </div>
    </footer>
  );
}
