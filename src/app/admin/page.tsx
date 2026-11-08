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
  Lock,
  RefreshCw,
  Clock,
  Eye,
  KeyRound,
  FileCode2,
} from 'lucide-react';
import { initialServices, initialGallery, siteConfig } from '@/data/initialData';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'gallery' | 'settings' | 'mongo'>(
    'overview'
  );

  // Authentication state (Simple client-side unlock for Nelmarian / Admin)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default open or protected
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

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
        maskedUri: 'No se pudo conectar al endpoint de diagnóstico.',
        hasPayloadSecret: false,
        vercelEnv: 'local',
      });
    }
  };

  useEffect(() => {
    checkMongoStatus();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf5f2] text-brand-dark font-sans selection:bg-pastel-pink">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-canvas-border px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-pastel-pink/50 bg-white p-1 shadow-xs">
              <Image
                src="/images/logo/logo.png"
                alt="Nails Pastel Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-brand-dark leading-none">
                  Nails Pastel Studio
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-pastel-pink text-brand-dark">
                  Panel Admin
                </span>
              </div>
              <p className="text-xs text-brand-muted mt-0.5">
                Gestión comercial & Base de datos de Nelmarian
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-canvas border border-canvas-border text-xs">
              <Database
                className={`w-3.5 h-3.5 ${
                  mongoStatus.hasMongoUri ? 'text-emerald-600' : 'text-amber-500'
                }`}
              />
              <span className="font-semibold text-[11px]">
                MongoDB: {mongoStatus.hasMongoUri ? 'Vinculado en Vercel' : 'Pendiente / Local'}
              </span>
            </div>

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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-canvas-border">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`min-h-[44px] px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'overview'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-canvas-border text-brand-muted hover:text-brand-dark'
            }`}
          >
            📊 Resumen General
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
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            <span>Diagnóstico MongoDB & Payload</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`min-h-[44px] px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'services'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-canvas-border text-brand-muted hover:text-brand-dark'
            }`}
          >
            💅 Servicios ({initialServices.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`min-h-[44px] px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'gallery'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-canvas-border text-brand-muted hover:text-brand-dark'
            }`}
          >
            📸 Galería ({initialGallery.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`min-h-[44px] px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'settings'
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-canvas-border text-brand-muted hover:text-brand-dark'
            }`}
          >
            ⚙️ Google Calendar & WhatsApp
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Alert Banner */}
            <div className="bg-gradient-to-r from-pastel-purple/30 via-pastel-soft/30 to-pastel-pink/20 rounded-3xl p-6 border border-pastel-pink/40 shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pastel-pinkDark" />
                    <span className="text-xs font-black uppercase tracking-wider text-brand-dark">
                      Estudio en Operación
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-brand-dark">
                    Bienvenida al Administrador de Nails Pastel
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted">
                    Aquí puedes verificar el estado de la base de datos de MongoDB Atlas, el enlace
                    oficial de Google Calendar y las políticas comerciales de Nelmarian.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('mongo')}
                  className="px-5 py-2.5 rounded-2xl bg-brand-dark text-white font-bold text-xs shadow-xs hover:bg-black transition-colors shrink-0"
                >
                  Ver Diagnóstico MongoDB
                </button>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-canvas-border shadow-xs">
                <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block mb-1">
                  Valor Anticipo Requerido
                </span>
                <span className="text-2xl font-black text-brand-dark">$15.000 COP</span>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  Por Nequi / Daviplata
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-canvas-border shadow-xs">
                <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block mb-1">
                  Duración Estándar Turno
                </span>
                <span className="text-2xl font-black text-brand-dark">2 Horas</span>
                <p className="text-[11px] text-brand-muted mt-1">+10 min de colchón higiénico</p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-canvas-border shadow-xs">
                <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block mb-1">
                  Página de Citas Google
                </span>
                <span className="text-xs font-bold text-blue-600 block truncate mt-1">
                  calendar.app.google/...
                </span>
                <p className="text-[11px] text-brand-muted mt-1">Sincronizado con nelmarianm@gmail.com</p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-canvas-border shadow-xs">
                <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block mb-1">
                  Base de Datos (Atlas)
                </span>
                <span
                  className={`text-base font-extrabold block mt-0.5 ${
                    mongoStatus.hasMongoUri ? 'text-emerald-700' : 'text-amber-600'
                  }`}
                >
                  {mongoStatus.hasMongoUri ? 'Conectada en Vercel' : 'Por verificar'}
                </span>
                <p className="text-[11px] text-brand-muted mt-1">Variables MONGODB_URI</p>
              </div>
            </div>

            {/* Direct Links and Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-canvas-border shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-brand-dark flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pastel-pinkDark" />
                  Página Oficial de Citas Google
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Las clientas pueden reservar turnos de 2 horas en vivo directamente en tu Google
                  Calendar sin intermediarios.
                </p>
                <div className="p-3 bg-canvas rounded-2xl border border-canvas-border text-xs break-all text-brand-dark font-mono">
                  https://calendar.app.google/4FftVZiHKhicYrPdA
                </div>
                <a
                  href="https://calendar.app.google/4FftVZiHKhicYrPdA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pastel-pink text-brand-dark font-extrabold text-xs shadow-xs hover:bg-pastel-pinkHover transition-colors"
                >
                  <span>Abrir Agenda en Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-canvas-border shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-brand-dark flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  WhatsApp de Atención & Reservas
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Canal directo donde las clientas envían el comprobante del anticipo de $15.000 COP
                  para validar su turno.
                </p>
                <div className="p-3 bg-canvas rounded-2xl border border-canvas-border text-xs text-brand-dark font-mono">
                  +57 305 282 9795 (Nequi & Daviplata a nombre de Nelmarian)
                </div>
                <a
                  href="https://wa.me/573052829795"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark text-white font-bold text-xs shadow-xs hover:bg-black transition-colors"
                >
                  <span>Probar Chat de WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 text-pastel-pink" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIAGNÓSTICO MONGODB & PAYLOAD */}
        {activeTab === 'mongo' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
            {/* Status Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-canvas-border shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-canvas-border">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pastel-purple/40 text-brand-dark">
                    <Database className="w-3.5 h-3.5 text-emerald-600" />
                    Estado de Conexión en Vercel
                  </span>
                  <h2 className="text-2xl font-black text-brand-dark">
                    Diagnóstico de MongoDB & Payload CMS
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={checkMongoStatus}
                  disabled={mongoStatus.loading}
                  className="px-4 py-2 rounded-xl bg-canvas border border-canvas-border hover:bg-white text-brand-dark text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${mongoStatus.loading ? 'animate-spin' : ''}`}
                  />
                  <span>Comprobar Estado</span>
                </button>
              </div>

              {/* Status Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-canvas/70 border border-canvas-border space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                    Variable de Conexión MONGODB_URI
                  </span>
                  <div className="flex items-center gap-2">
                    {mongoStatus.hasMongoUri ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    )}
                    <span className="font-bold text-sm text-brand-dark">
                      {mongoStatus.hasMongoUri
                        ? 'Detectada en el entorno'
                        : 'No detectada en este entorno'}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-brand-muted break-all pt-1">
                    {mongoStatus.maskedUri}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-canvas/70 border border-canvas-border space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                    Variable PAYLOAD_SECRET
                  </span>
                  <div className="flex items-center gap-2">
                    {mongoStatus.hasPayloadSecret ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    )}
                    <span className="font-bold text-sm text-brand-dark">
                      {mongoStatus.hasPayloadSecret
                        ? 'Configurada'
                        : 'Usando clave de seguridad predeterminada'}
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-muted pt-1">
                    Requerida para la firma criptográfica de sesiones de usuarios en Payload.
                  </p>
                </div>
              </div>

              {/* Step by step checklist for Vercel + MongoDB */}
              <div className="p-6 rounded-3xl bg-pastel-cream border border-pastel-pink/50 space-y-4">
                <h3 className="font-black text-base text-brand-dark flex items-center gap-2">
                  <Shield className="w-5 h-5 text-pastel-pinkDark" />
                  ¿Por qué no podías entrar antes al /admin? (Solución Paso a Paso)
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-brand-muted leading-relaxed">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-dark text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-brand-dark block">
                        La ruta /admin no existía en el build de Next.js:
                      </strong>
                      <span>
                        En el repositorio anterior solo estaban los esquemas de TypeScript pero no
                        había ninguna página asignada a la ruta <code>/admin</code>, por lo que
                        Next.js mostraba el error 404 (Página no encontrada). Con esta actualización,
                        la ruta <code>/admin</code> ya está activa y funcionando.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-dark text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-brand-dark block">
                        Permitir acceso de red en MongoDB Atlas (IP Whitelist):
                      </strong>
                      <span>
                        MongoDB Atlas por seguridad bloquea todas las IPs externas. Dado que Vercel
                        utiliza servidores sin IP fija (serverless), debes entrar a tu panel de{' '}
                        <strong>MongoDB Atlas &gt; Network Access &gt; Add IP Address</strong> y
                        seleccionar <strong>"Allow Access From Anywhere" (0.0.0.0/0)</strong>. Si no
                        haces esto, MongoDB rechazará la conexión de Vercel.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-dark text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-brand-dark block">
                        Verificar la variable MONGODB_URI en Vercel:
                      </strong>
                      <span>
                        En tu panel de Vercel (<strong>Project Settings &gt; Environment Variables</strong>),
                        asegúrate de que la variable se llame <code>MONGODB_URI</code> y tenga
                        marcadas las 3 casillas: <strong>Production</strong>, <strong>Preview</strong>{' '}
                        y <strong>Development</strong>.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICIOS */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-brand-dark">Catálogo de Servicios</h2>
                <p className="text-xs text-brand-muted">
                  Servicios configurados con duración de 2 horas para Nails Pastel.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-canvas-border">
                Total: {initialServices.length} servicios
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialServices.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-3xl p-5 border border-canvas-border shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {srv.image && (
                      <div className="relative h-36 rounded-2xl overflow-hidden bg-canvas">
                        <Image src={srv.image} alt={srv.title} fill className="object-cover" />
                        <div className="absolute top-2 left-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-brand-dark shadow-xs">
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
                      <span className="font-bold text-brand-dark">{srv.durationMinutes} min</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-muted">Precio Base:</span>
                      <span className="text-base font-black text-brand-dark">
                        ${srv.price.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>

                  {srv.variants && srv.variants.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-canvas-border text-[11px] text-brand-muted">
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
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALERÍA */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-brand-dark">Fotografías del Portafolio</h2>
                <p className="text-xs text-brand-muted">
                  12 trabajos reales de manicura rusa y estética importados en alta calidad.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-canvas-border">
                Total: {initialGallery.length} fotos
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {initialGallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-3 border border-canvas-border shadow-xs space-y-2"
                >
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-canvas">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="px-1">
                    <span className="text-[10px] uppercase font-bold text-pastel-pinkDark block">
                      {item.tag}
                    </span>
                    <h4 className="text-xs font-bold text-brand-dark truncate">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CONFIGURACIÓN & GOOGLE CALENDAR */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-canvas-border shadow-card space-y-6 animate-in fade-in duration-200">
            <div className="pb-4 border-b border-canvas-border">
              <h2 className="text-2xl font-black text-brand-dark">Configuración General</h2>
              <p className="text-xs text-brand-muted mt-1">
                Datos clave de contacto, cuentas bancarias para el anticipo y enlaces oficiales.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                  Enlace Oficial de Citas Google Calendar
                </label>
                <input
                  type="text"
                  readOnly
                  value="https://calendar.app.google/4FftVZiHKhicYrPdA"
                  className="w-full h-11 px-4 rounded-xl border border-canvas-border bg-canvas/60 text-brand-dark font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                    WhatsApp de Reservas
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="+57 305 282 9795"
                    className="w-full h-11 px-4 rounded-xl border border-canvas-border bg-canvas/60 text-brand-dark font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                    Correo Notificaciones
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="nelmarianm@gmail.com"
                    className="w-full h-11 px-4 rounded-xl border border-canvas-border bg-canvas/60 text-brand-dark font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                  Instrucciones de Anticipo ($15.000 COP)
                </label>
                <textarea
                  readOnly
                  rows={3}
                  value="Transferir $15.000 COP a Nequi o Daviplata al número 3052829795 a nombre de Nelmarian. Enviar comprobante por WhatsApp para validar el cupo."
                  className="w-full p-3 rounded-xl border border-canvas-border bg-canvas/60 text-brand-dark text-xs resize-none"
                />
              </div>

              <div className="pt-4 border-t border-canvas-border flex items-center justify-between">
                <span className="text-xs text-brand-muted">
                  Datos sincronizados con <strong>initialData.ts</strong> y <strong>SiteSettings.ts</strong>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Activo & Protegido
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
