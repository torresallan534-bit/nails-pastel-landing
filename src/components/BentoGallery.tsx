'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Instagram,
} from 'lucide-react';
import { GalleryItem, SectionsContentData } from '@/types';
import { defaultSectionsContent } from '@/data/initialData';

interface BentoGalleryProps {
  items: GalleryItem[];
  sections?: SectionsContentData;
}

export default function BentoGallery({
  items,
  sections = defaultSectionsContent,
}: BentoGalleryProps) {
  const [selectedTag, setSelectedTag] = useState<string>('Todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Dynamically compute tags from gallery items
  const tags = useMemo(() => {
    const rawTags = Array.from(new Set(items.map((i) => i.tag)));
    return ['Todos', ...rawTags];
  }, [items]);

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
        setLightboxIndex((prev) =>
          prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="galeria" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5 sm:gap-6">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-pastel-soft/60 text-brand-dark border border-pastel-soft mb-2.5 sm:mb-3">
            <Camera className="w-3.5 h-3.5 text-brand-dark" />
            {sections.galleryBadge || 'Portafolio Real & Inspiración'}
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark">
            {sections.galleryTitle || 'Galería de Creaciones'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-brand-muted max-w-xl">
            {sections.gallerySubtitle ||
              'Cada set es una obra única diseñada al milímetro. Fotografía 100% de nuestras clientas reales.'}
          </p>
        </div>

        {/* Instagram Profile Link */}
        <a
          href={sections.instagramUrl || 'https://instagram.com'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white border border-canvas-border hover:border-pastel-pink text-xs font-bold text-brand-dark shadow-xs transition-all hover:scale-105 active:scale-95 shrink-0 self-start md:self-auto"
        >
          <Instagram className="w-4 h-4 text-pastel-pinkDark shrink-0" />
          <span>{sections.instagramButtonText || 'Ver más en Instagram'}</span>
        </a>
      </div>

      {/* Filter Tabs (Horizontal swipe without negative margin bugs) */}
      <div className="w-full overflow-x-auto pb-2 mb-6 sm:mb-8 no-scrollbar flex items-center gap-2">
        {tags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`min-h-[44px] px-4 sm:px-5 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-brand-dark text-white shadow-md ring-2 ring-brand-dark/20'
                  : 'bg-white/90 border border-canvas-border text-brand-muted hover:text-brand-dark hover:border-pastel-purple hover:bg-white'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Rock-solid 2-Column Mobile & 4-Column Desktop Luxury Grid (No broken holes) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {filteredItems.map((item, index) => {
          return (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative w-full aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-card transition-all duration-300 border border-canvas-border/80 bg-white active:scale-[0.98]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                priority={index < 4}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-5 text-white" />

              {/* Tag Badge */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-brand-dark backdrop-blur-md shadow-xs border border-white/50">
                  {item.tag}
                </span>
              </div>

              {/* Title bar */}
              <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-4 text-white flex flex-col justify-end z-10">
                <h4 className="font-bold text-xs sm:text-sm md:text-base leading-snug drop-shadow-sm truncate">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5 hidden sm:block">
                    {item.caption}
                  </p>
                )}
                <div className="hidden sm:flex items-center gap-1.5 mt-1.5 text-[11px] font-semibold text-pastel-pink">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Ampliar</span>
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
          className="fixed inset-0 z-50 bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
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
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
              );
            }}
            aria-label="Foto anterior"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
              );
            }}
            aria-label="Foto siguiente"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div
            className="relative max-w-4xl max-h-[88vh] w-full flex flex-col items-center px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[52vh] xs:h-[58vh] sm:h-[70vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <Image
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom Caption bar */}
            <div className="w-full mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-white px-1 sm:px-2 gap-2 sm:gap-4">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-pastel-pink">
                  {activeLightboxItem.tag}
                </span>
                <h3 className="text-sm sm:text-lg font-bold truncate sm:whitespace-normal">{activeLightboxItem.title}</h3>
                {activeLightboxItem.caption && (
                  <p className="text-xs text-white/70 line-clamp-2 max-w-xl">{activeLightboxItem.caption}</p>
                )}
              </div>

              <a
                href="#agenda"
                onClick={() => setLightboxIndex(null)}
                className="w-full sm:w-auto text-center px-5 py-2.5 rounded-full bg-pastel-pink text-brand-dark font-extrabold text-xs shadow-glow-pink hover:bg-pastel-pinkHover active:scale-95 transition-all shrink-0"
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
