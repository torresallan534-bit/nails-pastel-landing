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
  CalendarCheck2,
} from 'lucide-react';
import { HeroContentData, ThemeBrandingData, SiteConfig } from '@/types';
import {
  defaultHeroContent,
  defaultThemeBranding,
  siteConfig as defaultSiteConfig,
} from '@/data/initialData';

interface HeroProps {
  hero?: HeroContentData;
  theme?: ThemeBrandingData;
  siteSettings?: SiteConfig;
}

export default function Hero({
  hero = defaultHeroContent,
  theme = defaultThemeBranding,
  siteSettings = defaultSiteConfig,
}: HeroProps) {
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-brand-dark" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-pastel-pinkDark" />;
      case 'Star':
        return <Star className="w-4 h-4 text-amber-500 fill-amber-400" />;
      case 'Heart':
      default:
        return <Heart className="w-4 h-4 text-brand-dark" />;
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-tr from-pastel-purple/30 via-pastel-soft/30 to-pastel-pink/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Text & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
          {/* Trust Pill */}
          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-pill text-[11px] sm:text-xs font-bold text-brand-dark shadow-xs border border-pastel-purple/60 max-w-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>{hero.badge || 'Estudio Privado • Agenda Abierta Hoy'}</span>
            <span className="text-pastel-pinkDark hidden xs:inline">•</span>
            <span className="text-brand-muted hidden xs:inline">Turnos de 2 Horas</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-dark leading-[1.12]">
            {hero.title ? (
              hero.highlightWord && hero.title.includes(hero.highlightWord) ? (
                <>
                  {hero.title.split(hero.highlightWord)[0]}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-brand-dark underline decoration-pastel-pink decoration-wavy decoration-2">
                      {hero.highlightWord}
                    </span>
                  </span>
                  {hero.title.split(hero.highlightWord)[1]}
                </>
              ) : (
                hero.title
              )
            ) : (
              'Tus uñas en manos expertas con la estética pastel que mereces.'
            )}
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
            <a
              href="#agenda"
              className="w-full sm:w-auto min-h-[50px] sm:min-h-[52px] px-6 sm:px-8 py-3.5 rounded-2xl bg-pastel-pink hover:bg-pastel-pinkHover active:scale-[0.98] text-brand-dark font-extrabold text-sm sm:text-base tracking-wide shadow-glow-pink flex items-center justify-center gap-2.5 transition-all duration-200"
            >
              <Calendar className="w-5 h-5 text-brand-dark" />
              <span>{hero.ctaPrimaryText || 'Ver turnos disponibles'}</span>
              <ArrowRight className="w-4 h-4 text-brand-dark" />
            </a>

            <a
              href={siteSettings.googleCalendarScheduleUrl || 'https://calendar.app.google/4FftVZiHKhicYrPdA'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[50px] sm:min-h-[52px] px-5 sm:px-6 py-3.5 rounded-2xl bg-white hover:bg-canvas active:scale-[0.98] border border-canvas-border hover:border-pastel-purple text-brand-dark font-bold text-xs sm:text-sm tracking-wide shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <CalendarCheck2 className="w-4 h-4 text-pastel-pinkDark" />
              <span>{hero.ctaSecondaryText || 'Google Calendar Oficial'}</span>
            </a>
          </div>

          {/* Trust Badges Bar */}
          <div className="pt-5 sm:pt-6 border-t border-canvas-border/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-left">
            {(hero.trustBadges || defaultHeroContent.trustBadges).map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center sm:items-start gap-3 sm:gap-2.5 p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-white/60 sm:bg-transparent border border-white/80 sm:border-0"
              >
                <div className="w-8 h-8 rounded-xl bg-pastel-purple/40 flex items-center justify-center text-brand-dark shrink-0">
                  {renderBadgeIcon(badge.icon)}
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-dark block">{badge.title}</span>
                  <span className="text-[11px] text-brand-muted">{badge.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Visual Card with Brand Logo & Photography (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pastel-purple via-pastel-soft to-pastel-pink rounded-3xl sm:rounded-4xl -rotate-1 sm:-rotate-2 scale-102 opacity-80 blur-md sm:blur-lg" />

            {/* Main Visual Glass Container */}
            <div className="relative rounded-3xl sm:rounded-4xl bg-white/90 p-4 sm:p-6 shadow-float border border-white backdrop-blur-md">
              {/* Top Banner with Official Logo */}
              <div className="bg-canvas/70 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-canvas-border flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white p-1 shadow-sm border border-pastel-pink/40 shrink-0">
                  <Image
                    src={theme.logoUrl || '/images/logo/logo.png'}
                    alt={`Logo oficial ${theme.businessName || 'Nails Pastel'}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm sm:text-base text-brand-dark">
                      {theme.businessName || 'Nails Pastel'}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 text-white shrink-0" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-brand-muted">{theme.tagline || 'Luxury Nail Studio'}</p>
                  <div className="flex items-center gap-1 mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-bold text-amber-500">
                    <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-amber-400" />
                    <span>{hero.ratingText || '5.0 (Calificación de clientas)'}</span>
                  </div>
                </div>
              </div>

              {/* Showcase Image */}
              <div className="relative h-60 xs:h-68 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden border border-canvas-border shadow-inner">
                <Image
                  src={hero.heroImageUrl || '/images/gallery/work-1.jpg'}
                  alt={`Diseño estético ${theme.businessName || 'Nails Pastel'}`}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Floating pill over image */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 glass-pill p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/60 shadow-lg flex items-center justify-between gap-2">
                  <div className="text-left min-w-0">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-pastel-pinkDark block truncate">
                      {hero.showcaseBadge || 'Técnica Estrella'}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-brand-dark block truncate">
                      {hero.showcaseTitle || 'Semipermanente Rusa + Nivelación'}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-1 rounded-full bg-brand-dark text-white shrink-0">
                    {hero.showcasePill || '28 días intactas'}
                  </span>
                </div>
              </div>

              {/* Bottom Quick Features */}
              <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 flex items-center justify-between text-[11px] sm:text-xs text-brand-muted px-1 sm:px-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-pastel-pinkDark" /> Alta gama
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
