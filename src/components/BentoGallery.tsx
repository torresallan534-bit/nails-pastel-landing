'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { GalleryItem } from '@/types';

interface BentoGalleryProps {
  items: GalleryItem[];
}

type TagFilter = 'Todos' | 'Tendencias' | 'Acrílicas' | 'Minimalistas' | 'Diseño a mano';

export default function BentoGallery({ items }: BentoGalleryProps) {
  const [selectedTag, setSelectedTag] = useState<TagFilter>('Todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tags: TagFilter[] = ['Todos', 'Tendencias', 'Acrílicas', 'Minimalistas', 'Diseño a mano'];

  const filteredItems = items.filter((item) => {
    if (selectedTag === 'Todos') return true;
    return item.tag === selectedTag;
  });

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="galeria" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-pastel-soft/60 text-brand-dark border border-pastel-soft mb-3">
            <Camera className="w-3.5 h-3.5 text-brand-dark" />
            Portafolio Real & Inspiración
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark">
            Galería de Creaciones
          </h2>
          <p className="mt-2 text-sm sm:text-base text-brand-muted max-w-xl">
            Cada set es una obra única diseñada al milímetro. Fotografía 100% de nuestras clientas
            reales en Nails Pastel.
          </p>
        </div>

        {/* Instagram Profile Link */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-canvas-border hover:border-pastel-pink text-xs font-bold text-brand-dark shadow-xs transition-all hover:scale-105 shrink-0 self-start md:self-auto"
        >
          <Instagram className="w-4 h-4 text-pastel-pinkDark" />
          <span>Ver más en Instagram @nailspastel</span>
        </a>
      </div>

      {/* Filter Tabs (Touch Friendly >= 48px) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar -mx-2 px-2">
        {tags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`min-h-[48px] px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-brand-dark text-white shadow-md scale-102 ring-2 ring-brand-dark/20'
                  : 'bg-white/80 border border-canvas-border text-brand-muted hover:text-brand-dark hover:border-pastel-purple hover:bg-white'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]">
        {filteredItems.map((item, index) => {
          // Dynamic bento sizing for visual rhythm
          const isSpanRow2 = index % 5 === 0 || item.aspectRatio === 'tall';
          const isSpanCol2 = (index % 7 === 0 && index !== 0) || item.aspectRatio === 'wide';

          return (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-card transition-all duration-300 border border-canvas-border/80 bg-white ${
                isSpanRow2 ? 'sm:row-span-2' : ''
              } ${isSpanCol2 ? 'sm:col-span-2' : ''}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                priority={index < 4}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white" />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-brand-dark backdrop-blur-md shadow-xs border border-white/50">
                  {item.tag}
                </span>
              </div>

              {/* Hover Details Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 text-white">
                <h4 className="font-bold text-sm sm:text-base leading-snug drop-shadow-sm">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 drop-shadow-xs">
                    {item.caption}
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-pastel-pink">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Tocar para ampliar</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button (min 48px) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Cerrar vista ampliada"
            className="absolute top-5 right-5 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev (min 48px) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
              );
            }}
            aria-label="Foto anterior"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next (min 48px) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
              );
            }}
            aria-label="Foto siguiente"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <Image
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom Caption bar */}
            <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between text-white px-2 gap-2">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-pastel-pink">
                  {activeLightboxItem.tag}
                </span>
                <h3 className="text-base sm:text-lg font-bold">{activeLightboxItem.title}</h3>
                {activeLightboxItem.caption && (
                  <p className="text-xs text-white/70 max-w-xl">{activeLightboxItem.caption}</p>
                )}
              </div>

              <a
                href="#agenda"
                onClick={() => setLightboxIndex(null)}
                className="px-5 py-2.5 rounded-full bg-pastel-pink text-brand-dark font-extrabold text-xs shadow-glow-pink hover:bg-pastel-pinkHover transition-all shrink-0"
              >
                Pedir este diseño
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
