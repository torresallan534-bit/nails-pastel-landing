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
import { siteConfig } from '@/data/initialData';

export default function DepositPolicies() {
  const [copied, setCopied] = useState(false);

  const copyNumber = () => {
    navigator.clipboard.writeText('3052829795');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="politicas" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-pastel-purple/25 via-pastel-soft/30 to-pastel-pink/20 rounded-4xl p-6 sm:p-10 md:p-14 border border-pastel-purple/40 shadow-card relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-pastel-pink/30 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 text-brand-dark border border-white/60 mb-3 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Transparencia & Compromiso Mutuo
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
              Políticas de Reserva y Anticipo
            </h2>
            <p className="mt-2 text-sm sm:text-base text-brand-muted max-w-2xl mx-auto">
              Trabajamos con citas programadas para brindarte un servicio exclusivo, higiénico y sin
              retrasos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Policy 1: Deposit */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pastel-pink/40 flex items-center justify-center text-brand-dark mb-4">
                  <Smartphone className="w-6 h-6 text-brand-dark" />
                </div>
                <h3 className="font-extrabold text-base text-brand-dark mb-2">
                  Anticipo de $15.000 COP
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Para apartar tu turno en la agenda se requiere el abono de $15.000 COP a través de
                  Nequi o Daviplata. Este valor se deduce automáticamente del monto total el día de
                  tu servicio.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-canvas-border flex items-center justify-between">
                <span className="text-[11px] font-bold text-brand-dark">305 282 9795</span>
                <button
                  type="button"
                  onClick={copyNumber}
                  className="px-2.5 py-1 rounded-lg bg-pastel-soft text-brand-dark text-[11px] font-bold hover:bg-pastel-pink transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Policy 2: Late tolerance */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-pastel-purple/50 flex items-center justify-center text-brand-dark mb-4">
                <Clock className="w-6 h-6 text-brand-dark" />
              </div>
              <h3 className="font-extrabold text-base text-brand-dark mb-2">
                Tolerancia de 10 Minutos
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Tolerancia máxima de retraso: 10 minutos. Pasado ese tiempo, el turno podría ser
                reajustado en diseño o cancelado para respetar el tiempo de la siguiente clienta.
              </p>
              <div className="mt-4 pt-3 border-t border-canvas-border">
                <span className="text-[11px] font-semibold text-pastel-pinkDark">
                  Puntualidad es respeto mutuo
                </span>
              </div>
            </div>

            {/* Policy 3: Rescheduling */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-pastel-soft/60 flex items-center justify-center text-brand-dark mb-4">
                <CalendarCheck className="w-6 h-6 text-brand-dark" />
              </div>
              <h3 className="font-extrabold text-base text-brand-dark mb-2">
                Reprogramaciones (24h)
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Puedes reprogramar tu fecha u hora con al menos 24 horas de anticipación sin perder
                tu abono. Las cancelaciones de último momento no son reembolsables.
              </p>
              <div className="mt-4 pt-3 border-t border-canvas-border">
                <span className="text-[11px] font-semibold text-emerald-700">
                  Aviso previo protege tu cupo
                </span>
              </div>
            </div>
          </div>

          {/* Bottom callout note */}
          <div className="bg-white/70 rounded-2xl p-4 sm:p-5 border border-white text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <Sparkles className="w-5 h-5 text-pastel-pinkDark shrink-0" />
              <p className="text-xs text-brand-dark">
                Al confirmar tu cita por WhatsApp, te enviaremos la ubicación exacta y el mapa del
                estudio en Bogotá.
              </p>
            </div>

            <a
              href="#agenda"
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-brand-dark text-white font-bold text-xs tracking-wider uppercase hover:bg-black transition-all shrink-0 shadow-sm"
            >
              Ir a la agenda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
