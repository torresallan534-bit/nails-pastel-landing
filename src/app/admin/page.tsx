'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Database,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Save,
  Tag,
  Phone,
  Mail,
  RefreshCw,
  Clock,
  Eye,
  Plus,
  Trash2,
  Edit3,
  X,
  Check,
  RotateCcw,
} from 'lucide-react';
import { initialServices, initialGallery, siteConfig } from '@/data/initialData';
import { ServiceItem, GalleryItem, SiteConfig, ServiceVariant } from '@/types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'services' | 'settings' | 'gallery' | 'mongo'>('services');

  // Editable State
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [config, setConfig] = useState<SiteConfig>(siteConfig);

  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Modal Editing State for Service
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewService, setIsNewService] = useState(false);

  // Live Mongo Diagnostic State
  const [mongoStatus, setMongoStatus] = useState<{
    loading: boolean;
    hasMongoUri: boolean;
    maskedUri: string;
    hasPayloadSecret: boolean;
    vercelEnv: string;
  }>({
    loading: true,
    hasMongoUri: false,
    maskedUri: 'Comprobando...',
    hasPayloadSecret: false,
    vercelEnv: 'desconocido',
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedServices = localStorage.getItem('nails_pastel_services');
      if (savedServices) {
        const parsed = JSON.parse(savedServices);
        if (Array.isArray(parsed) && parsed.length > 0) setServices(parsed);
      }

      const savedGallery = localStorage.getItem('nails_pastel_gallery');
      if (savedGallery) {
        const parsed = JSON.parse(savedGallery);
        if (Array.isArray(parsed) && parsed.length > 0) setGallery(parsed);
      }

      const savedConfig = localStorage.getItem('nails_pastel_config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        if (parsed?.whatsappNumber) setConfig(parsed);
      }
    } catch (e) {
      console.warn('Error loading local data:', e);
    }
  }, []);

  const checkMongoStatus = async () => {
    setMongoStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch('/api/admin/mongo-status');
      const data = await res.json();
      setMongoStatus({
        loading: false,
        hasMongoUri: data.hasMongoUri,
        maskedUri: data.maskedUri,
        hasPayloadSecret: data.hasPayloadSecret,
        vercelEnv: data.vercelEnv,
      });
    } catch {
      setMongoStatus({
        loading: false,
        hasMongoUri: false,
        maskedUri: 'No se pudo conectar al endpoint.',
        hasPayloadSecret: false,
        vercelEnv: 'local',
      });
    }
  };

  useEffect(() => {
    checkMongoStatus();
  }, []);

  // Save changes to localStorage and server API
  const handleSaveAll = async () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem('nails_pastel_services', JSON.stringify(services));
      localStorage.setItem('nails_pastel_gallery', JSON.stringify(gallery));
      localStorage.setItem('nails_pastel_config', JSON.stringify(config));

      await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services, gallery, config }),
      });

      setSaveStatus('saved');
      setHasChanges(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Error saving data:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3500);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('¿Estás segura de restaurar los servicios y tarifas a los valores de fábrica?')) {
      localStorage.removeItem('nails_pastel_services');
      localStorage.removeItem('nails_pastel_gallery');
      localStorage.removeItem('nails_pastel_config');
      setServices(initialServices);
      setGallery(initialGallery);
      setConfig(siteConfig);
      setHasChanges(false);
      alert('Valores restaurados con éxito.');
    }
  };

  // Service Edit Handlers
  const handleOpenEditService = (service: ServiceItem) => {
    setEditingService(JSON.parse(JSON.stringify(service)));
    setIsNewService(false);
  };

  const handleOpenCreateService = () => {
    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: 'Nuevo Servicio de Manicura',
      slug: 'nuevo-servicio',
      category: 'Semipermanente',
      price: 50000,
      durationMinutes: 120,
      description: 'Descripción del procedimiento...',
      isPopular: false,
      image: '/images/gallery/work-1.jpg',
      variants: [],
    };
    setEditingService(newSrv);
    setIsNewService(true);
  };

  const handleSaveModalService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (isNewService) {
      setServices((prev) => [editingService, ...prev]);
    } else {
      setServices((prev) => prev.map((s) => (s.id === editingService.id ? editingService : s)));
    }

    setEditingService(null);
    setHasChanges(true);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('¿Estás segura de eliminar este servicio?')) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      setHasChanges(true);
    }
  };

  // Variant in Modal Handlers
  const handleAddVariant = () => {
    if (!editingService) return;
    const newVar: ServiceVariant = {
      id: `var-${Date.now()}`,
      name: 'Nuevo Adicional',
      extraPrice: 10000,
    };
    setEditingService({
      ...editingService,
      variants: [...(editingService.variants || []), newVar],
    });
  };

  const handleRemoveVariant = (varId: string) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      variants: (editingService.variants || []).filter((v) => v.id !== varId),
    });
  };

  return (
    <div className="min-h-screen bg-[#fcf5f2] text-brand-dark font-sans selection:bg-pastel-pink pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-canvas-border px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden border border-pastel-pink/50 bg-white p-1 shadow-xs">
              <Image
                src="/images/logo/logo.png"
                alt="Nails Pastel Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-brand-dark leading-none">
                  Nails Pastel Studio
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-pastel-pink text-brand-dark">
                  Modo Edición Activo
                </span>
              </div>
              <p className="text-[11px] text-brand-muted mt-0.5">
                Panel de control de Nelmarian — Edición de precios y reservas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="px-3 py-2 rounded-xl border border-canvas-border hover:bg-canvas text-brand-muted text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-brand-dark text-white hover:bg-black font-bold text-xs tracking-wide shadow-xs flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-pastel-pink" />
              <span>Ver Web Pública</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Floating Save Banner when there are unsaved changes */}
      {hasChanges && (
        <div className="sticky top-16 z-30 bg-pastel-pink/90 backdrop-blur-md border-b border-pastel-pinkDark px-4 py-2.5 text-brand-dark flex items-center justify-between shadow-md animate-in slide-in-from-top-2">
          <span className="text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-dark" />
            Tienes cambios pendientes por guardar.
          </span>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saveStatus === 'saving'}
            className="px-4 py-1.5 rounded-xl bg-brand-dark text-white hover:bg-black font-extrabold text-xs shadow-xs flex items-center gap-1.5"
          >
            {saveStatus === 'saving' ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 text-pastel-pink" />
            )}
            <span>{saveStatus === 'saving' ? 'Guardando...' : 'Guardar Cambios'}</span>
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-canvas-border">
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`min-h-[44px] px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-canvas-border text-brand-muted hover:text-brand-dark'
            }`}
          >
            💅 Servicios & Precios ({services.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`min-h-[44px] px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-canvas-border text-brand-muted hover:text-brand-dark'
            }`}
          >
            ⚙️ Google Calendar & Anticipo
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`min-h-[44px] px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-canvas-border text-brand-muted hover:text-brand-dark'
            }`}
          >
            📸 Galería ({gallery.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mongo')}
            className={`min-h-[44px] px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'mongo'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-canvas-border text-brand-muted hover:text-brand-dark'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>MongoDB Atlas</span>
          </button>
        </div>

        {/* TAB 1: EDIT SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-brand-dark">Catálogo de Servicios</h2>
                <p className="text-xs text-brand-muted">
                  Haz clic en "Editar" en cualquier servicio para cambiar su precio base, descripción o
                  adicionales.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenCreateService}
                className="px-4 py-2.5 rounded-2xl bg-pastel-pink hover:bg-pastel-pinkHover text-brand-dark font-extrabold text-xs shadow-xs flex items-center gap-2 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Nuevo Servicio</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-3xl p-5 border border-canvas-border shadow-xs flex flex-col justify-between hover:border-pastel-pink transition-all"
                >
                  <div className="space-y-3">
                    {srv.image && (
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-canvas">
                        <Image src={srv.image} alt={srv.title} fill className="object-cover" />
                        <div className="absolute top-2 left-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-brand-dark shadow-xs">
                            {srv.category}
                          </span>
                        </div>
                      </div>
                    )}

                    <h3 className="font-extrabold text-base text-brand-dark leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-brand-muted line-clamp-2">{srv.description}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-canvas-border text-xs">
                      <span className="text-brand-muted">Duración:</span>
                      <span className="font-bold text-brand-dark">{srv.durationMinutes} min (2h)</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-muted">Precio Base:</span>
                      <span className="text-lg font-black text-brand-dark">
                        ${srv.price.toLocaleString('es-CO')} COP
                      </span>
                    </div>

                    {srv.variants && srv.variants.length > 0 && (
                      <div className="pt-2 border-t border-canvas-border text-[11px] text-brand-muted">
                        <span className="font-bold text-brand-dark block mb-1">
                          Adicionales ({srv.variants.length}):
                        </span>
                        {srv.variants.map((v) => (
                          <div key={v.id} className="flex justify-between">
                            <span>• {v.name}</span>
                            <span>+${v.extraPrice.toLocaleString('es-CO')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-canvas-border flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditService(srv)}
                      className="flex-1 py-2 rounded-xl bg-canvas hover:bg-brand-dark hover:text-white border border-canvas-border text-brand-dark font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteService(srv.id)}
                      className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      title="Eliminar servicio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: EDIT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-canvas-border shadow-card space-y-6">
            <div className="pb-4 border-b border-canvas-border">
              <h2 className="text-2xl font-black text-brand-dark">Configuración General</h2>
              <p className="text-xs text-brand-muted mt-1">
                Modifica aquí el enlace oficial de Google Calendar, el WhatsApp y los datos del
                anticipo.
              </p>
            </div>

            <div className="space-y-5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                  Enlace Oficial de Citas Google Calendar (Appointment Schedule)
                </label>
                <input
                  type="url"
                  value={config.googleCalendarScheduleUrl}
                  onChange={(e) => {
                    setConfig({ ...config, googleCalendarScheduleUrl: e.target.value });
                    setHasChanges(true);
                  }}
                  className="w-full h-12 px-4 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark font-mono text-xs focus:ring-2 focus:ring-pastel-pink outline-none"
                  placeholder="https://calendar.app.google/..."
                />
                <span className="text-[11px] text-brand-muted mt-1 block">
                  Actualmente vinculado a: <code>https://calendar.app.google/4FftVZiHKhicYrPdA</code>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                    Número de WhatsApp (con 57)
                  </label>
                  <input
                    type="text"
                    value={config.whatsappNumber}
                    onChange={(e) => {
                      setConfig({ ...config, whatsappNumber: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full h-12 px-4 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark font-mono text-xs focus:ring-2 focus:ring-pastel-pink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                    Valor Anticipo COP
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={config.depositAmount}
                    onChange={(e) => {
                      setConfig({ ...config, depositAmount: Number(e.target.value) || 0 });
                      setHasChanges(true);
                    }}
                    className="w-full h-12 px-4 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark font-bold text-sm focus:ring-2 focus:ring-pastel-pink outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                  Instrucciones de Pago Nequi / Daviplata para el Anticipo
                </label>
                <textarea
                  rows={3}
                  value={config.depositInstructions}
                  onChange={(e) => {
                    setConfig({ ...config, depositInstructions: e.target.value });
                    setHasChanges(true);
                  }}
                  className="w-full p-3 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark text-xs focus:ring-2 focus:ring-pastel-pink outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-canvas-border flex items-center justify-between">
                <span className="text-xs text-brand-muted">
                  Los cambios se sincronizan en vivo en la landing page.
                </span>

                <button
                  type="button"
                  onClick={handleSaveAll}
                  disabled={saveStatus === 'saving'}
                  className="px-6 py-2.5 rounded-xl bg-pastel-pink hover:bg-pastel-pinkHover text-brand-dark font-black text-xs shadow-xs flex items-center gap-2 transition-all"
                >
                  {saveStatus === 'saving' ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>{saveStatus === 'saving' ? 'Guardando...' : 'Guardar Configuración'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EDIT GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-brand-dark">Galería de Trabajos ({gallery.length})</h2>
                <p className="text-xs text-brand-muted">
                  Fotografías reales mostradas en el Bento Grid de la página principal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-3 border border-canvas-border shadow-xs space-y-2 relative group"
                >
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-canvas">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...gallery];
                        updated[index].title = e.target.value;
                        setGallery(updated);
                        setHasChanges(true);
                      }}
                      className="w-full text-xs font-bold text-brand-dark border-b border-transparent hover:border-canvas-border focus:border-brand-dark outline-none bg-transparent"
                    />
                    <select
                      value={item.tag}
                      onChange={(e) => {
                        const updated = [...gallery];
                        updated[index].tag = e.target.value as any;
                        setGallery(updated);
                        setHasChanges(true);
                      }}
                      className="text-[10px] font-bold uppercase text-pastel-pinkDark bg-transparent outline-none cursor-pointer"
                    >
                      <option value="Tendencias">Tendencias</option>
                      <option value="Acrílicas">Acrílicas</option>
                      <option value="Minimalistas">Minimalistas</option>
                      <option value="Diseño a mano">Diseño a mano</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MONGODB STATUS */}
        {activeTab === 'mongo' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-canvas-border shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-canvas-border">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-brand-dark">
                    Estado de MongoDB Atlas en Vercel
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Información sobre las variables del entorno de base de datos.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={checkMongoStatus}
                  className="px-4 py-2 rounded-xl bg-canvas border border-canvas-border hover:bg-white text-xs font-bold flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${mongoStatus.loading ? 'animate-spin' : ''}`} />
                  <span>Comprobar</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-canvas/70 border border-canvas-border space-y-2">
                <span className="text-xs font-bold text-brand-dark block">
                  Variable MONGODB_URI:
                </span>
                <p className="text-xs font-mono text-brand-muted break-all">
                  {mongoStatus.maskedUri}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                <span className="font-bold block">✨ Edición Directa Habilitada</span>
                <p>
                  Ya puedes cambiar los precios, servicios y el enlace de Google Calendar desde las
                  pestañas anteriores sin bloqueos de servidor. Todos los cambios se guardan y se
                  reflejan en la web de inmediato.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-canvas-border shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-canvas-border">
              <h3 className="font-extrabold text-lg text-brand-dark">
                {isNewService ? 'Crear Nuevo Servicio' : 'Editar Servicio'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="w-8 h-8 rounded-full bg-canvas flex items-center justify-center text-brand-muted hover:text-brand-dark"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModalService} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">
                  Nombre del Servicio *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) =>
                    setEditingService({ ...editingService, title: e.target.value })
                  }
                  className="w-full h-11 px-3.5 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark font-medium outline-none focus:ring-2 focus:ring-pastel-pink text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">
                    Categoría
                  </label>
                  <select
                    value={editingService.category}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark font-medium outline-none focus:ring-2 focus:ring-pastel-pink text-xs"
                  >
                    <option value="Semipermanente">Semipermanente</option>
                    <option value="Acrílicas / Esculpidas">Acrílicas / Esculpidas</option>
                    <option value="Nail Art">Nail Art</option>
                    <option value="Cuidado Natural">Cuidado Natural</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">
                    Precio Base (COP) *
                  </label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={editingService.price}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark font-bold outline-none focus:ring-2 focus:ring-pastel-pink text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">
                  Duración (Minutos)
                </label>
                <input
                  type="number"
                  step="10"
                  value={editingService.durationMinutes}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      durationMinutes: Number(e.target.value) || 120,
                    })
                  }
                  className="w-full h-11 px-3.5 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark font-medium outline-none focus:ring-2 focus:ring-pastel-pink text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-canvas-border bg-canvas/40 text-brand-dark outline-none focus:ring-2 focus:ring-pastel-pink text-xs resize-none"
                />
              </div>

              {/* Variants / Adicionales */}
              <div className="pt-2 border-t border-canvas-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                    Adicionales ({editingService.variants?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-[11px] font-bold text-pastel-pinkDark hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Adicional</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {editingService.variants?.map((v, i) => (
                    <div key={v.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={v.name}
                        onChange={(e) => {
                          const updated = [...(editingService.variants || [])];
                          updated[i].name = e.target.value;
                          setEditingService({ ...editingService, variants: updated });
                        }}
                        className="flex-1 h-9 px-2.5 rounded-lg border border-canvas-border text-xs"
                        placeholder="Nombre adicional"
                      />
                      <input
                        type="number"
                        step="1000"
                        value={v.extraPrice}
                        onChange={(e) => {
                          const updated = [...(editingService.variants || [])];
                          updated[i].extraPrice = Number(e.target.value) || 0;
                          setEditingService({ ...editingService, variants: updated });
                        }}
                        className="w-24 h-9 px-2 rounded-lg border border-canvas-border text-xs font-bold"
                        placeholder="Precio"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(v.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-canvas-border flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2.5 rounded-xl border border-canvas-border text-brand-muted hover:bg-canvas text-xs font-semibold"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-pastel-pink hover:bg-pastel-pinkHover text-brand-dark font-extrabold text-xs shadow-xs"
                >
                  Guardar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
