'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Tag,
} from 'lucide-react';
import { ServiceItem, SectionsContentData, SiteConfig } from '@/types';
import { defaultSectionsContent, siteConfig as defaultSiteConfig } from '@/data/initialData';

interface ServicesMenuProps {
  services: ServiceItem[];
  sections?: SectionsContentData;
  siteSettings?: SiteConfig;
  onSelectService: (serviceId: string) => void;
}

export default function ServicesMenu({
  services,
  sections = defaultSectionsContent,
  siteSettings = defaultSiteConfig,
  onSelectService,
}: ServicesMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeVariants, setActiveVariants] = useState<Record<string, string[]>>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

  // Dynamically extract categories from available services
  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(services.map((s) => s.category)));
    return ['Todas', ...rawCategories];
  }, [services]);

  const filteredServices = services.filter((s) => {
    if (selectedCategory === 'Todas') return true;
    return s.category === selectedCategory;
  });

  const toggleVariant = (serviceId: string, variantId: string) => {
    setActiveVariants((prev) => {
      const current = prev[serviceId] || [];
      const updated = current.includes(variantId)
        ? current.filter((id) => id !== variantId)
        : [...current, variantId];
      return { ...prev, [serviceId]: updated };
    });
  };

  const toggleDescription = (serviceId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleChooseService = (serviceId: string) => {
    onSelectService(serviceId);
    // Smooth scroll to agenda widget
    const agendaElem = document.getElementById('agenda');
    if (agendaElem) {
      agendaElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-pastel-pink/35 text-brand-dark border border-pastel-pink/70 mb-3 sm:mb-4">
          <Tag className="w-3.5 h-3.5 text-brand-dark" />
          {sections.servicesBadge || 'Menú de Servicios & Precios Claros'}
        </span>
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark leading-tight">
          {sections.servicesTitle || 'Tarifas Transparentes & Adicionales'}
        </h2>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-brand-muted">
          {sections.servicesSubtitle ||
            'Cada servicio incluye manicura combinada rusa de alta precisión. Selecciona tus adicionales y mira el precio final en tiempo real.'}
        </p>
      </div>

      {/* Category Pills (Touch-Friendly, horizontal swipe without negative margin bugs) */}
      <div className="w-full overflow-x-auto pb-2 mb-6 sm:mb-10 no-scrollbar flex items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[44px] px-4 sm:px-5 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-brand-dark text-white shadow-md ring-2 ring-brand-dark/20'
                  : 'bg-white/90 border border-canvas-border text-brand-muted hover:text-brand-dark hover:border-pastel-pink hover:bg-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
        {filteredServices.map((srv) => {
          const selectedForThis = activeVariants[srv.id] || [];
          const variantsPrice = (srv.variants || [])
            .filter((v) => selectedForThis.includes(v.id))
            .reduce((sum, v) => sum + v.extraPrice, 0);
          const computedTotal = srv.price + variantsPrice;
          const isExpanded = expandedDescriptions[srv.id] || false;

          return (
            <div
              key={srv.id}
              className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-card border border-canvas-border flex flex-col justify-between hover:border-pastel-purple hover:shadow-float transition-all duration-300 relative group overflow-hidden"
            >
              {srv.isPopular && (
                <div className="absolute top-3 right-3 sm:top-3 sm:right-4 z-10">
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-pastel-pink text-brand-dark shadow-sm border border-pastel-pinkDark/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-dark" />
                    Más Solicitado
                  </span>
                </div>
              )}

              <div>
                {/* Service Image Preview */}
                {srv.image && (
                  <div className="relative h-44 xs:h-48 rounded-xl sm:rounded-2xl overflow-hidden mb-4 border border-canvas-border/60 bg-canvas">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-brand-dark backdrop-blur-xs shadow-xs">
                        {srv.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Title & Timing */}
                <div className="flex items-start justify-between gap-2 mb-1.5 pr-20 sm:pr-0">
                  <h3 className="text-base sm:text-lg font-bold text-brand-dark leading-snug">{srv.title}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-brand-muted mb-2.5">
                  <Clock className="w-3.5 h-3.5 text-pastel-pinkDark shrink-0" />
                  <span>Turno dedicado de {srv.durationMinutes} minutos</span>
                </div>

                {/* Description with Expand */}
                {srv.description && (
                  <>
                    <p
                      className={`text-xs sm:text-sm text-brand-muted leading-relaxed mb-2.5 ${
                        !isExpanded ? 'line-clamp-2' : ''
                      }`}
                    >
                      {srv.description}
                    </p>

                    {srv.description.length > 90 && (
                      <button
                        type="button"
                        onClick={() => toggleDescription(srv.id)}
                        className="text-xs font-semibold text-pastel-pinkDark hover:underline inline-flex items-center gap-1 mb-3.5"
                      >
                        {isExpanded ? (
                          <>
                            Ver menos <ChevronUp className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            Ver detalle completo <ChevronDown className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}

                {/* Variants Selector */}
                {srv.variants && srv.variants.length > 0 && (
                  <div className="pt-3 border-t border-canvas-border/80 mb-3.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark block mb-2">
                      Personalizar con Adicionales:
                    </span>
                    <div className="space-y-1.5">
                      {srv.variants.map((v) => {
                        const isChecked = selectedForThis.includes(v.id);
                        return (
                          <label
                            key={v.id}
                            className={`min-h-[46px] flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors active:scale-[0.99] gap-2 ${
                              isChecked
                                ? 'bg-pastel-cream border-pastel-pink text-brand-dark font-medium shadow-2xs'
                                : 'bg-canvas/40 border-canvas-border/70 text-brand-muted hover:bg-canvas'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleVariant(srv.id, v.id)}
                                className="w-4 h-4 rounded text-pastel-pinkDark focus:ring-pastel-pink border-gray-300 shrink-0"
                              />
                              <span className="leading-tight text-xs truncate sm:whitespace-normal">{v.name}</span>
                            </div>
                            <span className="font-bold text-brand-dark shrink-0 text-xs ml-1">
                              +{formatCOP(v.extraPrice)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Action Button */}
              <div className="pt-3.5 border-t border-canvas-border mt-3 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-[11px] text-brand-muted block">Precio estimado:</span>
                    <span className="text-xl sm:text-2xl font-black text-brand-dark block truncate">
                      {formatCOP(computedTotal)}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] sm:text-[11px] text-brand-muted block">Anticipo:</span>
                    <strong className="text-xs sm:text-sm text-brand-dark block">
                      {formatCOP(siteSettings.depositAmount || 15000)}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleChooseService(srv.id)}
                  className="w-full min-h-[48px] py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-canvas border border-canvas-border hover:bg-brand-dark hover:text-white hover:border-brand-dark active:scale-[0.98] text-brand-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 shadow-2xs"
                >
                  <span className="truncate">Elegir servicio y ver turnos</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
