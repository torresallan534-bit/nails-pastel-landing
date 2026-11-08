'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  CalendarCheck,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { PoliciesContentData, SiteConfig } from '@/types';
import { defaultPoliciesContent, siteConfig as defaultSiteConfig } from '@/data/initialData';

interface DepositPoliciesProps {
  policies?: PoliciesContentData;
  siteSettings?: SiteConfig;
}

export default function DepositPolicies({
  policies = defaultPoliciesContent,
  siteSettings = defaultSiteConfig,
}: DepositPoliciesProps) {
  const [copied, setCopied] = useState(false);

  const accountNumberToCopy = policies.accountNumber || '3052829795';

  const copyNumber = () => {
    navigator.clipboard.writeText(accountNumberToCopy.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-brand-dark" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-brand-dark" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-6 h-6 text-brand-dark" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-brand-dark" />;
      case 'AlertCircle':
      default:
        return <AlertCircle className="w-6 h-6 text-brand-dark" />;
    }
  };

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="politicas" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-pastel-purple/25 via-pastel-soft/30 to-pastel-pink/20 rounded-3xl sm:rounded-4xl p-5 sm:p-10 md:p-14 border border-pastel-purple/40 shadow-card relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-16 -right-16 w-48 sm:w-64 h-48 sm:h-64 bg-pastel-pink/30 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-white/80 text-brand-dark border border-white/60 mb-2.5 sm:mb-3 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {policies.badge || 'Transparencia & Compromiso Mutuo'}
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              {policies.title || 'Políticas de Reserva y Anticipo'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-brand-muted max-w-2xl mx-auto">
              {policies.subtitle ||
                'Trabajamos con citas programadas para brindarte un servicio exclusivo, higiénico y sin retrasos.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {(policies.policiesList || defaultPoliciesContent.policiesList).map((policy, idx) => {
              const isFirst = idx === 0;

              return (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-brand-dark mb-3 sm:mb-4 ${
                        idx === 0
                          ? 'bg-pastel-pink/40'
                          : idx === 1
                          ? 'bg-pastel-purple/50'
                          : 'bg-pastel-soft/60'
                      }`}
                    >
                      {renderIcon(policy.icon)}
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-brand-dark mb-1.5 sm:mb-2">
                      {policy.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {policy.description}
                    </p>
                  </div>

                  {isFirst ? (
                    <div className="mt-4 pt-3 border-t border-canvas-border flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-dark">
                        {accountNumberToCopy}
                      </span>
                      <button
                        type="button"
                        onClick={copyNumber}
                        className="min-h-[38px] px-3 py-1.5 rounded-lg bg-pastel-soft text-brand-dark text-xs font-bold hover:bg-pastel-pink active:scale-95 transition-colors flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 pt-3 border-t border-canvas-border">
                      <span className="text-[11px] font-semibold text-pastel-pinkDark">
                        {policy.badgeText || 'Compromiso mutuo'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom callout note */}
          <div className="bg-white/70 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white text-center flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3 text-left">
              <Sparkles className="w-5 h-5 text-pastel-pinkDark shrink-0" />
              <p className="text-xs text-brand-dark">
                {policies.footerNotice ||
                  'Al confirmar tu cita por WhatsApp, te enviaremos la ubicación exacta y el mapa del estudio.'}
              </p>
            </div>

            <a
              href="#agenda"
              className="w-full sm:w-auto text-center min-h-[44px] px-6 py-2.5 rounded-full bg-brand-dark text-white font-bold text-xs tracking-wider uppercase hover:bg-black active:scale-95 transition-all shrink-0 shadow-sm"
            >
              Ir a la agenda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
