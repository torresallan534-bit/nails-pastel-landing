import React from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Calendar,
  ShieldCheck,
  Heart,
  Clock,
  ArrowRight,
  Star,
  CheckCircle2,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-pastel-purple/30 via-pastel-soft/30 to-pastel-pink/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs font-bold text-brand-dark shadow-xs border border-pastel-purple/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Estudio Privado • Agenda Abierta Hoy</span>
            <span className="text-pastel-pinkDark">•</span>
            <span className="text-brand-muted">Turnos de 2 Horas</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-brand-dark leading-[1.1]">
            Tus uñas en manos expertas con la{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-dark underline decoration-pastel-pink decoration-wavy decoration-2">
                estética pastel
              </span>
            </span>{' '}
            que mereces.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Especialistas en manicura rusa combinada, nivelación con base rubber, extensiones
            esculpidas y micro nail art. En Nails Pastel trabajamos con bloques dedicados de 2
            horas para garantizar un acabado impecable, duradero y sin maltratar tu uña natural.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#agenda"
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-pastel-pink hover:bg-pastel-pinkHover active:scale-[0.98] text-brand-dark font-extrabold text-base tracking-wide shadow-glow-pink flex items-center justify-center gap-2.5 transition-all duration-200"
            >
              <Calendar className="w-5 h-5 text-brand-dark" />
              <span>Ver turnos disponibles</span>
              <ArrowRight className="w-4 h-4 text-brand-dark" />
            </a>

            <a
              href="#servicios"
              className="w-full sm:w-auto min-h-[52px] px-7 py-3.5 rounded-2xl bg-white hover:bg-canvas border border-canvas-border hover:border-pastel-purple text-brand-dark font-bold text-sm tracking-wide shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Explorar servicios y tarifas</span>
            </a>
          </div>

          {/* Trust Badges Bar */}
          <div className="pt-6 border-t border-canvas-border/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pastel-purple/40 flex items-center justify-center text-brand-dark shrink-0">
                <Heart className="w-4 h-4 text-brand-dark" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-dark block">
                  Atención Personalizada
                </span>
                <span className="text-[11px] text-brand-muted">Solo tú y la manicurista</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pastel-soft/60 flex items-center justify-center text-brand-dark shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-dark block">
                  Espacio Propio y Bioseguro
                </span>
                <span className="text-[11px] text-brand-muted">Instrumental esterilizado</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
              <div className="w-8 h-8 rounded-xl bg-pastel-pink/40 flex items-center justify-center text-brand-dark shrink-0">
                <Clock className="w-4 h-4 text-brand-dark" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-dark block">
                  Cero Esperas
                </span>
                <span className="text-[11px] text-brand-muted">Turnos de 2h exactas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Card with Brand Logo & Photography (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pastel-purple via-pastel-soft to-pastel-pink rounded-4xl -rotate-2 scale-102 opacity-80 blur-lg" />

            {/* Main Visual Glass Container */}
            <div className="relative rounded-4xl bg-white/90 p-4 sm:p-6 shadow-float border border-white backdrop-blur-md">
              {/* Top Banner with Official Logo */}
              <div className="bg-canvas/70 rounded-3xl p-5 border border-canvas-border flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-2xl bg-white p-1.5 shadow-sm border border-pastel-pink/40 shrink-0">
                  <Image
                    src="/images/logo/logo.png"
                    alt="Logo oficial Nails Pastel"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base text-brand-dark">Nails Pastel</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />
                  </div>
                  <p className="text-xs text-brand-muted">Estudio Profesional por Nelmarian</p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>5.0 (Calificación de clientas)</span>
                  </div>
                </div>
              </div>

              {/* Showcase Image */}
              <div className="relative h-72 sm:h-80 rounded-3xl overflow-hidden border border-canvas-border shadow-inner">
                <Image
                  src="/images/gallery/work-1.jpg"
                  alt="Manicura estética Nails Pastel"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Floating pill over image */}
                <div className="absolute bottom-4 inset-x-4 glass-pill p-3 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-pastel-pinkDark block">
                      Técnica Estrella
                    </span>
                    <span className="text-xs font-bold text-brand-dark">
                      Semipermanente Rusa + Nivelación
                    </span>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-brand-dark text-white">
                    28 días intactas
                  </span>
                </div>
              </div>

              {/* Bottom Quick Features */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-brand-muted px-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-pastel-pinkDark" /> Materiales de alta gama
                </span>
                <span>•</span>
                <span>Nequi / Daviplata</span>
                <span>•</span>
                <span>Bogotá</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
