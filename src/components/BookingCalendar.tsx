'use client';

import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Check,
  Send,
  AlertCircle,
  Copy,
  ChevronRight,
  ShieldCheck,
  HeartHandshake,
  ExternalLink,
  CalendarCheck2,
  Smartphone,
} from 'lucide-react';
import {
  ServiceItem,
  TimeSlot,
  ServiceVariant,
  SectionsContentData,
  BookingContentData,
  SiteConfig,
} from '@/types';
import {
  defaultSectionsContent,
  defaultBookingContent,
  siteConfig as defaultSiteConfig,
} from '@/data/initialData';

interface BookingCalendarProps {
  services: ServiceItem[];
  selectedServiceId?: string;
  onServiceChange?: (serviceId: string) => void;
  sections?: SectionsContentData;
  bookingContent?: BookingContentData;
  siteSettings?: SiteConfig;
}

export default function BookingCalendar({
  services,
  selectedServiceId,
  onServiceChange,
  sections = defaultSectionsContent,
  bookingContent = defaultBookingContent,
  siteSettings = defaultSiteConfig,
}: BookingCalendarProps) {
  // Booking Mode: 'interactive' (con anticipo & WhatsApp) or 'google-calendar' (página nativa Google)
  const [bookingMode, setBookingMode] = useState<'interactive' | 'google-calendar'>('interactive');

  // Service selection
  const [activeServiceId, setActiveServiceId] = useState<string>(
    selectedServiceId || services[0]?.id || ''
  );
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);

  // Update if prop changes
  React.useEffect(() => {
    if (selectedServiceId && selectedServiceId !== activeServiceId) {
      setActiveServiceId(selectedServiceId);
    }
  }, [selectedServiceId]);

  const activeService = useMemo(() => {
    return services.find((s) => s.id === activeServiceId) || services[0];
  }, [services, activeServiceId]);

  // Date selection (Next 21 days, skipping Sundays)
  const availableDates = useMemo(() => {
    const dates: Array<{ dateStr: string; dayName: string; dayNumber: number; monthName: string; isSunday: boolean }> = [];
    const now = new Date();

    for (let i = 0; i < 21; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const dayOfWeek = d.getDay(); // 0 is Sunday
      const isSunday = dayOfWeek === 0;

      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('es-CO', { weekday: 'short' });
      const dayNumber = d.getDate();
      const monthName = d.toLocaleDateString('es-CO', { month: 'short' });

      dates.push({
        dateStr,
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', ''),
        dayNumber,
        monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1).replace('.', ''),
        isSunday,
      });
    }
    return dates;
  }, []);

  // Default date to first available non-Sunday
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const firstValid = availableDates.find((d) => !d.isSunday);
    return firstValid ? firstValid.dateStr : availableDates[0]?.dateStr || '';
  });

  // Calculate 2-hour slots with 10 min buffer and 1:00 PM lunch break
  const slots: TimeSlot[] = useMemo(() => {
    return [
      {
        id: 'slot-1',
        startTime: '07:00',
        endTime: '09:00',
        displayTime: '7:00 AM – 9:00 AM',
        isAvailable: true,
      },
      {
        id: 'slot-2',
        startTime: '09:10',
        endTime: '11:10',
        displayTime: '9:10 AM – 11:10 AM',
        isAvailable: true,
      },
      {
        id: 'slot-3',
        startTime: '11:20',
        endTime: '13:20',
        displayTime: '11:20 AM – 1:20 PM',
        isAvailable: true,
      },
      {
        id: 'slot-lunch',
        startTime: '13:00',
        endTime: '14:00',
        displayTime: '1:00 PM – 2:00 PM',
        isAvailable: false,
        isLunchBreak: true,
        reason: 'Hora de almuerzo / sanitización',
      },
      {
        id: 'slot-4',
        startTime: '14:00',
        endTime: '16:00',
        displayTime: '2:00 PM – 4:00 PM',
        isAvailable: true,
      },
      {
        id: 'slot-5',
        startTime: '16:10',
        endTime: '18:10',
        displayTime: '4:10 PM – 6:10 PM',
        isAvailable: true,
      },
    ];
  }, []);

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(slots[0]);

  // Client info form
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [needsRepair, setNeedsRepair] = useState(false);
  const [needsRemoval, setNeedsRemoval] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Variant toggle
  const toggleVariant = (variantId: string) => {
    setSelectedVariants((prev) =>
      prev.includes(variantId) ? prev.filter((id) => id !== variantId) : [...prev, variantId]
    );
  };

  // Pricing calculations
  const repairPrice =
    typeof bookingContent?.repairPrice === 'number' ? bookingContent.repairPrice : 8000;
  const removalPrice =
    typeof bookingContent?.removalPrice === 'number' ? bookingContent.removalPrice : 15000;

  const repairCost = needsRepair ? repairPrice : 0;
  const removalCost = needsRemoval ? removalPrice : 0;

  const totalVariantsPrice = useMemo(() => {
    if (!activeService?.variants) return 0;
    return activeService.variants
      .filter((v) => selectedVariants.includes(v.id))
      .reduce((sum, v) => sum + v.extraPrice, 0);
  }, [activeService, selectedVariants]);

  const totalPrice = (activeService?.price || 0) + totalVariantsPrice + repairCost + removalCost;
  const depositAmount = siteSettings.depositAmount;
  const remainingBalance = Math.max(0, totalPrice - depositAmount);

  const selectedVariantsObjects: ServiceVariant[] = useMemo(() => {
    if (!activeService?.variants) return [];
    return activeService.variants.filter((v) => selectedVariants.includes(v.id));
  }, [activeService, selectedVariants]);

  // Format currency COP
  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Generate formatted date for message
  const formattedBookingDate = useMemo(() => {
    if (!selectedDate) return '';
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [selectedDate]);

  // WhatsApp Link generation for interactive booking
  const buildWhatsAppUrl = () => {
    const rawPhone = siteSettings.whatsappNumber; // '573052829795'
    const serviceName = activeService?.title || 'Servicio de Manicura';
    const dateStr = formattedBookingDate;
    const timeStr = selectedSlot?.displayTime || 'Turno a convenir';
    const nameStr = clientName.trim() || 'Cliente';

    const variantsText =
      selectedVariantsObjects.length > 0
        ? ` (Adicionales: ${selectedVariantsObjects.map((v) => v.name).join(', ')})`
        : '';
    const repairText = needsRepair ? ` | Reparación de uña (+${formatCOP(repairPrice)})` : '';
    const removalText = needsRemoval ? ` | Retiro de sistema previo (+${formatCOP(removalPrice)})` : '';

    const message = `¡Hola Nails Pastel! Quiero agendar mi cita de ${serviceName}${variantsText}${repairText}${removalText} para el ${dateStr} a las ${timeStr}. Mi nombre es ${nameStr}. Mi número es ${clientPhone.trim()}. Valor total estimado: ${formatCOP(totalPrice)}. Voy a transferir el anticipo de $15.000 COP a Nequi/Daviplata.`;

    return `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;
  };

  // WhatsApp Link for Google Calendar confirmation
  const buildGoogleCalendarWhatsAppUrl = () => {
    const rawPhone = siteSettings.whatsappNumber;
    const message = `¡Hola Nelmarian! 🌸 Acabo de apartar mi cita en tu página de Google Calendar para Nails Pastel. Ya realicé la transferencia de los $15.000 COP de anticipo a tu Nequi/Daviplata. Adjunto mi comprobante para confirmar mi cupo.`;
    return `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!clientName.trim()) {
      setFormError('Por favor ingresa tu nombre completo.');
      return;
    }

    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 7) {
      setFormError('Por favor ingresa un número de teléfono / WhatsApp válido.');
      return;
    }

    if (!selectedSlot || !selectedSlot.isAvailable) {
      setFormError('Por favor selecciona un turno horario disponible.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: {
            name: clientName,
            phone: clientPhone,
            needsRepair,
            needsRemoval,
          },
          service: {
            id: activeService.id,
            title: activeService.title,
            category: activeService.category,
            basePrice: activeService.price,
            variants: selectedVariantsObjects.map((v) => ({
              name: v.name,
              price: v.extraPrice,
            })),
            totalEstimatedPrice: totalPrice,
            durationMinutes: activeService.durationMinutes,
            repairPrice: repairCost,
            removalPrice: removalCost,
          },
          appointment: {
            date: selectedDate,
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
          },
        }),
      });

      const waUrl = buildWhatsAppUrl();
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error('Error submitting booking:', err);
      const waUrl = buildWhatsAppUrl();
      window.open(waUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyPaymentNumber = () => {
    navigator.clipboard.writeText('3052829795');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  return (
    <section id="agenda" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-pastel-purple/50 text-brand-dark border border-pastel-purple/80 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-brand-dark" />
          {bookingContent.badge || sections.bookingBadge || 'Agenda Inteligente & Turnos de 2 Horas'}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark">
          {bookingContent.title || sections.bookingTitle || 'Reserva tu Turno en Línea'}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-brand-muted">
          {bookingContent.subtitle ||
            sections.bookingSubtitle ||
            `Elige la modalidad que prefieras: el agendador guiado con comprobante directo a WhatsApp o la página de citas nativa de Google Calendar vinculada a ${siteSettings.notificationEmail}.`}
        </p>

        {/* Segmented Mode Switch - Mobile Responsive */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:inline-flex sm:flex-row p-1.5 rounded-2xl bg-white border border-canvas-border shadow-xs max-w-full w-full sm:w-auto gap-1 sm:gap-0">
          <button
            type="button"
            onClick={() => setBookingMode('interactive')}
            className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 w-full sm:w-auto ${
              bookingMode === 'interactive'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'text-brand-muted hover:text-brand-dark hover:bg-canvas/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pastel-pink shrink-0" />
            <span>{bookingContent.modeInteractiveText || 'Agendador Guiado + WhatsApp'}</span>
          </button>

          <button
            type="button"
            onClick={() => setBookingMode('google-calendar')}
            className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 w-full sm:w-auto ${
              bookingMode === 'google-calendar'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'text-brand-muted hover:text-brand-dark hover:bg-canvas/50'
            }`}
          >
            <CalendarCheck2 className="w-4 h-4 text-pastel-pink shrink-0" />
            <span>{bookingContent.modeGoogleCalendarText || 'Google Calendar Oficial'}</span>
          </button>
        </div>
      </div>

      {/* MODE 1: INTERACTIVE AGENDADOR */}
      {bookingMode === 'interactive' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start animate-in fade-in duration-300">
          {/* LEFT COLUMN: Service & Schedule Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Step 1: Service Selection */}
            <div className="bg-white/85 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-card border border-canvas-border">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-pastel-pinkDark flex items-center gap-1.5">
                  {bookingContent.step1Badge || 'Paso 1'}
                </span>
                <span className="text-xs text-brand-muted">
                  {bookingContent.step1DurationLabel || 'Duración: 2 Horas'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">
                {bookingContent.step1Title || 'Elige tu servicio de uñas'}
              </h3>

              {/* Service selector pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {services.map((srv) => {
                  const isSelected = srv.id === activeServiceId;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        setActiveServiceId(srv.id);
                        setSelectedVariants([]);
                        if (onServiceChange) onServiceChange(srv.id);
                      }}
                      className={`min-h-[56px] text-left p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-dark bg-pastel-cream shadow-sm ring-2 ring-brand-dark/10'
                          : 'border-canvas-border bg-white hover:border-pastel-pink hover:bg-canvas/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-sm text-brand-dark leading-snug">
                          {srv.title}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-brand-dark text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-canvas-border/50 text-xs">
                        <span className="text-brand-muted">{srv.category}</span>
                        <span className="font-bold text-brand-dark">{formatCOP(srv.price)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Service Description & Variants */}
              {activeService && (
                <div className="bg-canvas/60 rounded-2xl p-4 border border-canvas-border">
                  <p className="text-xs sm:text-sm text-brand-muted mb-3 leading-relaxed">
                    {activeService.description}
                  </p>

                  {/* Additional variants */}
                  {activeService.variants && activeService.variants.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
                        {bookingContent.step1VariantsTitle || '¿Deseas agregar algún adicional?'}
                      </h4>
                      <div className="space-y-2">
                        {activeService.variants.map((v) => {
                          const checked = selectedVariants.includes(v.id);
                          return (
                            <label
                              key={v.id}
                              className={`min-h-[48px] flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                                checked
                                  ? 'bg-white border-pastel-pink text-brand-dark shadow-xs'
                                  : 'bg-transparent border-canvas-border hover:bg-white/60 text-brand-muted'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleVariant(v.id)}
                                  className="w-5 h-5 rounded text-pastel-pinkDark focus:ring-pastel-pink border-gray-300"
                                />
                                <span className="text-xs sm:text-sm font-medium">{v.name}</span>
                              </div>
                              <span className="text-xs font-bold text-brand-dark">
                                +{formatCOP(v.extraPrice)}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 2: Date Picker */}
            <div className="bg-white/85 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-card border border-canvas-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pastel-pinkDark">
                  {bookingContent.step2Badge || 'Paso 2'}
                </span>
                <span className="text-xs text-brand-muted">
                  {bookingContent.step2DaysLabel || 'Lunes a Sábado'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-3 sm:mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-brand-dark" />
                {bookingContent.step2Title || 'Selecciona el día de tu cita'}
              </h3>

              {/* Horizontal scroll of days (touch-friendly >= 48px) */}
              <div className="w-full flex gap-2 sm:gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.dateStr;
                  const isDisabled = item.isSunday;

                  return (
                    <button
                      key={item.dateStr}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => {
                        if (!isDisabled) setSelectedDate(item.dateStr);
                      }}
                      className={`min-w-[64px] sm:min-w-[72px] h-[86px] sm:h-[92px] p-2 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all duration-200 shrink-0 active:scale-95 ${
                        isDisabled
                          ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200'
                          : isSelected
                          ? 'bg-brand-dark text-white shadow-md ring-2 ring-brand-dark/20'
                          : 'bg-canvas border border-canvas-border hover:border-pastel-pink hover:bg-white text-brand-dark'
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider opacity-80">
                        {item.dayName}
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold my-0.5">{item.dayNumber}</span>
                      <span className="text-[10px] sm:text-[11px] opacity-75">{item.monthName}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-brand-muted mt-2 italic">
                {bookingContent.step2SundayNotice ||
                  '* Los domingos el estudio permanece cerrado por mantenimiento y descanso.'}
              </p>
            </div>

            {/* Step 3: 2-Hour Time Slots Selector */}
            <div className="bg-white/85 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-card border border-canvas-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pastel-pinkDark">
                  {bookingContent.step3Badge || 'Paso 3'}
                </span>
                <span className="text-xs text-brand-muted">
                  {bookingContent.step3BufferLabel || 'Bloques de 2h + 10m buffer'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-3 sm:mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-dark" />
                {bookingContent.step3Title || 'Selecciona tu franja horaria'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  const isBlocked = !slot.isAvailable || slot.isLunchBreak;

                  if (isBlocked) {
                    return (
                      <div
                        key={slot.id}
                        className="min-h-[52px] p-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50/80 text-gray-400 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="font-medium line-through">{slot.displayTime}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                          {bookingContent.step3LunchLabel || 'Almuerzo'}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`min-h-[52px] p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                        isSelected
                          ? 'bg-pastel-pink/35 border-brand-dark text-brand-dark font-bold shadow-xs ring-2 ring-brand-dark/15'
                          : 'bg-white border-canvas-border hover:border-pastel-pink text-brand-dark'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            isSelected ? 'bg-brand-dark' : 'bg-emerald-500'
                          }`}
                        />
                        <span className="text-sm">{slot.displayTime}</span>
                      </div>
                      {isSelected && (
                        <span className="text-[11px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-dark text-white">
                          Elegido
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-brand-muted bg-canvas/70 p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {bookingContent.step3SafetyNotice ||
                    'Cada turno incluye sanitización previa y atención exclusiva sin interrupciones.'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form & Summary & Deposit Box (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <form
              onSubmit={handleBookingSubmit}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-float border border-canvas-border"
            >
              <div className="border-b border-canvas-border pb-4 sm:pb-5 mb-4 sm:mb-5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight">
                  {bookingContent.summaryTitle || 'Resumen de tu Turno'}
                </h3>
                <p className="text-xs text-brand-muted mt-1">
                  {bookingContent.summarySubtitle ||
                    'Completa tus datos para pre-agendar y generar tu comprobante de WhatsApp.'}
                </p>
              </div>

              {/* Client Inputs */}
              <div className="space-y-3.5 sm:space-y-4 mb-5 sm:mb-6">
                <div>
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                    {bookingContent.nameLabel || 'Tu Nombre y Apellido *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={bookingContent.namePlaceholder || 'Ej: Laura Sofía Martínez'}
                    className="w-full h-12 px-4 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark placeholder-brand-muted/60 text-base focus:outline-none focus:ring-2 focus:ring-pastel-pink focus:border-brand-dark transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                    {bookingContent.phoneLabel || 'Número de WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder={bookingContent.phonePlaceholder || 'Ej: 305 282 9795'}
                    className="w-full h-12 px-4 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark placeholder-brand-muted/60 text-base focus:outline-none focus:ring-2 focus:ring-pastel-pink focus:border-brand-dark transition-all"
                  />
                </div>

                {/* Reparaciones & Retiros interactive buttons (replaces old notes textarea) */}
                <div className="space-y-2 pt-1">
                  <span className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider">
                    Servicios adicionales rápidos:
                  </span>

                  {/* Botón Reparaciones */}
                  <button
                    type="button"
                    onClick={() => setNeedsRepair((prev) => !prev)}
                    className={`w-full min-h-[52px] p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-200 active:scale-[0.99] ${
                      needsRepair
                        ? 'bg-pastel-cream border-brand-dark shadow-xs ring-2 ring-brand-dark/10'
                        : 'bg-canvas/40 border-canvas-border hover:bg-canvas/80 text-brand-muted hover:text-brand-dark'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                          needsRepair ? 'bg-brand-dark text-white' : 'border border-gray-400 bg-white'
                        }`}
                      >
                        {needsRepair && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-brand-dark leading-tight truncate">
                          {bookingContent.repairTitle || '¿Necesitas reparación de uña?'}
                        </p>
                        <p className="text-[11px] text-brand-muted leading-tight truncate">
                          {bookingContent.repairSubtitle || 'Arreglo de uña partida o fisurada'}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-extrabold shrink-0 px-2 py-0.5 rounded-lg ${
                        needsRepair ? 'bg-pastel-pink text-brand-dark' : 'bg-canvas text-brand-dark'
                      }`}
                    >
                      +{formatCOP(repairPrice)}
                    </span>
                  </button>

                  {/* Botón Retiros */}
                  <button
                    type="button"
                    onClick={() => setNeedsRemoval((prev) => !prev)}
                    className={`w-full min-h-[52px] p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-200 active:scale-[0.99] ${
                      needsRemoval
                        ? 'bg-pastel-cream border-brand-dark shadow-xs ring-2 ring-brand-dark/10'
                        : 'bg-canvas/40 border-canvas-border hover:bg-canvas/80 text-brand-muted hover:text-brand-dark'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                          needsRemoval ? 'bg-brand-dark text-white' : 'border border-gray-400 bg-white'
                        }`}
                      >
                        {needsRemoval && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-brand-dark leading-tight truncate">
                          {bookingContent.removalTitle || '¿Traes esmalte o sistema previo para retiro?'}
                        </p>
                        <p className="text-[11px] text-brand-muted leading-tight truncate">
                          {bookingContent.removalSubtitle ||
                            'Retiro cuidadoso de semipermanente o acrílico previo'}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-extrabold shrink-0 px-2 py-0.5 rounded-lg ${
                        needsRemoval ? 'bg-pastel-pink text-brand-dark' : 'bg-canvas text-brand-dark'
                      }`}
                    >
                      +{formatCOP(removalPrice)}
                    </span>
                  </button>
                </div>
              </div>

              {/* Summary Details */}
              <div className="bg-canvas/60 rounded-2xl p-4 border border-canvas-border space-y-2.5 text-xs sm:text-sm mb-6">
                <div className="flex justify-between items-center text-brand-dark">
                  <span className="font-medium text-brand-muted">Servicio:</span>
                  <span className="font-bold text-right">{activeService?.title}</span>
                </div>

                {selectedVariantsObjects.length > 0 && (
                  <div className="pt-2 border-t border-canvas-border/60">
                    <span className="font-medium text-brand-muted block mb-1">Adicionales:</span>
                    {selectedVariantsObjects.map((v) => (
                      <div key={v.id} className="flex justify-between text-xs text-brand-muted pl-2">
                        <span>• {v.name}</span>
                        <span>+{formatCOP(v.extraPrice)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {needsRepair && (
                  <div className="flex justify-between items-center text-xs text-brand-dark pt-1.5 border-t border-canvas-border/50">
                    <span className="font-medium text-brand-muted">• Reparación de uña:</span>
                    <span className="font-bold">+{formatCOP(repairPrice)}</span>
                  </div>
                )}

                {needsRemoval && (
                  <div className="flex justify-between items-center text-xs text-brand-dark pt-1.5 border-t border-canvas-border/50">
                    <span className="font-medium text-brand-muted">• Retiro de sistema previo:</span>
                    <span className="font-bold">+{formatCOP(removalPrice)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-canvas-border/60">
                  <span className="font-medium text-brand-muted">Fecha:</span>
                  <span className="font-semibold text-brand-dark capitalize">
                    {formattedBookingDate || selectedDate}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium text-brand-muted">Turno:</span>
                  <span className="font-semibold text-brand-dark">
                    {selectedSlot?.displayTime || 'No seleccionado'}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-canvas-border/60">
                  <span className="font-medium text-brand-muted">Valor total estimado:</span>
                  <span className="text-base font-extrabold text-brand-dark">
                    {formatCOP(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Deposit Box Callout */}
              <div className="bg-pastel-purple/20 border-2 border-pastel-pink/60 rounded-2xl p-4 mb-6">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-pastel-pinkDark shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-dark uppercase tracking-wider text-[11px]">
                        Anticipo de Reserva Requerido
                      </span>
                      <span className="font-black text-sm text-brand-dark">
                        {formatCOP(depositAmount)} COP
                      </span>
                    </div>
                    <p className="text-brand-muted mt-1 leading-relaxed">
                      Para asegurar tu cupo y bloquear la fecha en la agenda, transfiere el anticipo
                      a:
                    </p>

                    <div className="mt-2.5 bg-white/90 p-2.5 rounded-xl border border-pastel-pink/40 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-brand-dark block text-xs">
                          Nequi / Daviplata: 305 282 9795
                        </span>
                        <span className="text-[10px] text-brand-muted">Titular: Nelmarian</span>
                      </div>
                      <button
                        type="button"
                        onClick={copyPaymentNumber}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-pastel-pink text-brand-dark hover:bg-pastel-pinkHover transition-colors flex items-center gap-1"
                      >
                        {copiedAccount ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedAccount ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>

                    <p className="text-[11px] text-brand-muted mt-2">
                      * El valor se descuenta del total el día de tu cita. Saldo pendiente a pagar en
                      el local: <strong className="text-brand-dark">{formatCOP(remainingBalance)}</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Confirmation CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-pastel-pink hover:bg-pastel-pinkHover active:scale-[0.99] text-brand-dark font-extrabold text-base tracking-wide shadow-glow-pink flex items-center justify-center gap-2 transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                    <span>Procesando...</span>
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-brand-dark" />
                    <span>{bookingContent.submitButtonText || 'Confirmar cita por WhatsApp'}</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-brand-muted">
                  <HeartHandshake className="w-3.5 h-3.5 text-pastel-pinkDark" />
                  Tolerancia de 10 min de retraso. Cupos limitados por día.
                </span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODE 2: GOOGLE CALENDAR APPOINTMENT SCHEDULES */}
      {bookingMode === 'google-calendar' && (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
          {/* Information & Deposit Alert Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-canvas-border shadow-card">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-canvas-border">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                  <CalendarCheck2 className="w-3.5 h-3.5" />
                  Página de Citas Oficial (Google Calendar)
                </div>
                <h3 className="text-2xl font-black text-brand-dark">
                  Sincronización directa con Nelmarian
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted">
                  Vinculado al correo oficial: <strong className="text-brand-dark">{siteSettings.notificationEmail}</strong>
                </p>
              </div>

              {/* Direct Open Button */}
              <a
                href={siteSettings.googleCalendarScheduleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] px-6 py-2.5 rounded-2xl bg-brand-dark text-white hover:bg-black font-bold text-xs tracking-wide shadow-md flex items-center gap-2 shrink-0"
              >
                <span>Abrir en Google Calendar</span>
                <ExternalLink className="w-4 h-4 text-pastel-pink" />
              </a>
            </div>

            {/* Deposit notice for Google Calendar bookings */}
            <div className="mt-6 p-4 rounded-2xl bg-pastel-purple/20 border-2 border-pastel-pink/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-pastel-pinkDark shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-extrabold text-brand-dark text-sm block">
                    Recuerda transferir tu anticipo de ${siteSettings.depositAmount.toLocaleString('es-CO')} COP
                  </span>
                  <p className="text-brand-muted mt-0.5">
                    Al agendar por Google Calendar, tu turno queda en reserva preliminar. Transfiere
                    el abono a Nequi / Daviplata al <strong>305 282 9795</strong> y envía el
                    comprobante para confirmar el cupo.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={copyPaymentNumber}
                  className="px-3 py-2 rounded-xl bg-white border border-pastel-pink/60 text-xs font-bold text-brand-dark hover:bg-pastel-pink transition-colors flex items-center gap-1.5"
                >
                  {copiedAccount ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedAccount ? 'Copiado' : 'Copiar 3052829795'}
                </button>

                <a
                  href={buildGoogleCalendarWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-pastel-pink text-brand-dark text-xs font-black hover:bg-pastel-pinkHover shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Comprobante</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Direct Link CTA Bar */}
          <div className="bg-white rounded-3xl p-5 border border-canvas-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-pastel-pink/30 flex items-center justify-center shrink-0">
                <CalendarCheck2 className="w-5 h-5 text-brand-dark" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-dark block">
                  Página nativa de Google Calendar de Nelmarian
                </span>
                <span className="text-[11px] text-brand-muted">
                  Disponible para reservar turnos en vivo y sincronizar con tu cuenta
                </span>
              </div>
            </div>

            <a
              href={siteSettings.googleCalendarScheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-pastel-pink hover:bg-pastel-pinkHover text-brand-dark font-extrabold text-xs tracking-wide shadow-xs flex items-center justify-center gap-2 transition-all shrink-0"
            >
              <span>Abrir página oficial de citas</span>
              <ExternalLink className="w-4 h-4 text-brand-dark" />
            </a>
          </div>

          {/* Embedded Google Calendar Appointment Schedule Frame */}
          <div className="relative rounded-4xl overflow-hidden bg-white shadow-float border border-canvas-border min-h-[680px]">
            <iframe
              src={siteSettings.googleCalendarScheduleUrl}
              title="Google Calendar Appointment Schedule - Nails Pastel"
              className="w-full h-[700px] border-0"
              loading="lazy"
            />
          </div>

          <div className="text-center text-xs text-brand-muted p-4 bg-canvas/60 rounded-2xl border border-canvas-border">
            💡 <strong>¿Eres Nelmarian?</strong> Puedes personalizar los días, horarios y descansos
            de tu página de citas entrando a tu Google Calendar personal con tu cuenta{' '}
            <span className="font-bold text-brand-dark">nelmarianm@gmail.com</span> y haciendo clic
            en <em>"Páginas de citas"</em>.
          </div>
        </div>
      )}
    </section>
  );
}
