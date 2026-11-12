import {
  ServiceItem,
  CategoryItem,
  GalleryItem,
  SiteConfig,
  ThemeBrandingData,
  HeroContentData,
  SectionsContentData,
  BookingContentData,
  PoliciesContentData,
  FooterContentData,
} from '@/types';

export const defaultThemeBranding: ThemeBrandingData = {
  businessName: 'Nails Pastel',
  tagline: 'Luxury Nail Studio',
  logoUrl: '/images/logo/logo.png',
  primaryColor: '#ffa0d3',
  accentPurple: '#f7bbfd',
  accentSoft: '#f0cdef',
  backgroundColor: '#fcf5f2',
  textColor: '#010101',
};

export const defaultHeroContent: HeroContentData = {
  badge: 'Estudio Privado • Agenda Abierta Hoy',
  title: 'Tus uñas en manos expertas con la estética pastel que mereces.',
  highlightWord: 'estética pastel',
  subtitle:
    'Especialistas en manicura rusa combinada, nivelación con base rubber, extensiones esculpidas y micro nail art. En Nails Pastel trabajamos con bloques dedicados de 2 horas para garantizar un acabado impecable, duradero y sin maltratar tu uña natural.',
  ctaPrimaryText: 'Ver turnos disponibles',
  ctaSecondaryText: 'Google Calendar Oficial',
  heroImageUrl: '/images/gallery/work-1.jpg',
  showcaseBadge: 'Técnica Estrella',
  showcaseTitle: 'Semipermanente Rusa + Nivelación',
  showcasePill: '28 días intactas',
  ratingText: '5.0 (Calificación de clientas)',
  trustBadges: [
    {
      title: 'Atención Personalizada',
      subtitle: 'Solo tú y la manicurista',
      icon: 'Heart',
    },
    {
      title: 'Espacio Propio y Bioseguro',
      subtitle: 'Instrumental esterilizado',
      icon: 'ShieldCheck',
    },
    {
      title: 'Cero Esperas',
      subtitle: 'Turnos de 2h exactas',
      icon: 'Clock',
    },
  ],
};

export const defaultSectionsContent: SectionsContentData = {
  servicesBadge: 'Menú de Servicios & Precios Claros',
  servicesTitle: 'Tarifas Transparentes & Adicionales',
  servicesSubtitle:
    'Cada servicio incluye manicura combinada rusa de alta precisión. Selecciona tus adicionales y mira el precio final en tiempo real.',
  servicesImportantNotice:
    'Estos son los precios base de los servicios, el precio total varía según las decoraciones, efectos adicionales.',
  galleryBadge: 'Portafolio Real & Inspiración',
  galleryTitle: 'Galería de Creaciones',
  gallerySubtitle:
    'Cada set es una obra única diseñada al milímetro. Fotografía 100% de nuestras clientas reales en Nails Pastel.',
  instagramButtonText: 'Ver más en Instagram @nailspastel',
  instagramUrl: 'https://instagram.com',
  bookingBadge: 'Turnos Dedicados de 2 Horas',
  bookingTitle: 'Reserva tu Turno en Línea',
  bookingSubtitle:
    'Selecciona tu servicio, el día y tu hora disponible. Nuestro sistema bloquea el turno y te genera el enlace de WhatsApp con el valor del anticipo.',
};

export const defaultBookingContent: BookingContentData = {
  badge: 'Agenda Inteligente & Turnos de 2 Horas',
  title: 'Reserva tu Turno en Línea',
  subtitle:
    'Elige la modalidad que prefieras: el agendador guiado con comprobante directo a WhatsApp o la página de citas nativa de Google Calendar.',
  modeInteractiveText: 'Agendador Guiado + WhatsApp',
  modeGoogleCalendarText: 'Google Calendar Oficial',
  step1Badge: 'Paso 1',
  step1Title: 'Elige tu servicio de uñas',
  step1DurationLabel: 'Duración: 2 Horas',
  step1VariantsTitle: '¿Deseas agregar algún adicional?',
  step2Badge: 'Paso 2',
  step2Title: 'Selecciona el día de tu cita',
  step2DaysLabel: 'Lunes a Sábado',
  step2SundayNotice: '* Los domingos el estudio permanece cerrado por mantenimiento y descanso.',
  step3Badge: 'Paso 3',
  step3Title: 'Selecciona tu franja horaria',
  step3BufferLabel: 'Bloques de 2h + 10m buffer',
  step3LunchLabel: 'Almuerzo',
  step3SafetyNotice: 'Cada turno incluye sanitización previa y atención exclusiva sin interrupciones.',
  summaryTitle: 'Resumen de tu Turno',
  summarySubtitle: 'Completa tus datos para pre-agendar y generar tu comprobante de WhatsApp.',
  nameLabel: 'Tu Nombre y Apellido *',
  namePlaceholder: 'Ej: Laura Sofía Martínez',
  phoneLabel: 'Número de WhatsApp *',
  phonePlaceholder: 'Ej: 305 282 9795',
  repairTitle: '¿Necesitas reparación de uña?',
  repairSubtitle: 'Arreglo de uña partida o fisurada',
  repairPrice: 8000,
  removalTitle: '¿Traes esmalte o sistema previo para retiro?',
  removalSubtitle: 'Retiro cuidadoso de semipermanente o acrílico previo',
  removalPrice: 15000,
  submitButtonText: 'Confirmar cita por WhatsApp',
};

export const defaultCategories: CategoryItem[] = [
  { id: 'cat-1', name: 'Semipermanente', slug: 'semipermanente', order: 1 },
  { id: 'cat-2', name: 'Acrílicas / Esculpidas', slug: 'acrilicas-esculpidas', order: 2 },
  { id: 'cat-3', name: 'Nail Art', slug: 'nail-art', order: 3 },
  { id: 'cat-4', name: 'Cuidado Natural', slug: 'cuidado-natural', order: 4 },
  { id: 'cat-5', name: 'Mantenimiento', slug: 'mantenimiento', order: 5 },
];

export const defaultPoliciesContent: PoliciesContentData = {
  badge: 'Transparencia & Compromiso Mutuo',
  title: 'Políticas de Reserva y Anticipo',
  subtitle:
    'Trabajamos con citas programadas para brindarte un servicio exclusivo, higiénico y sin retrasos.',
  depositAmount: 15000,
  accountNumber: '305 282 9795',
  accountBank: 'Nequi / Daviplata',
  accountHolder: 'Nelmarian',
  footerNotice:
    'Al confirmar tu cita por WhatsApp, te enviaremos la ubicación exacta y el mapa del estudio en Bogotá.',
  policiesList: [
    {
      title: 'Anticipo de $15.000 COP',
      description:
        'Para apartar tu turno en la agenda se requiere el abono de $15.000 COP a través de Nequi o Daviplata. Este valor se deduce automáticamente del monto total el día de tu servicio.',
      badgeText: 'Obligatorio para agendar',
      icon: 'Smartphone',
    },
    {
      title: 'Tolerancia de 10 Minutos',
      description:
        'Tolerancia máxima de retraso: 10 minutos. Pasado ese tiempo, el turno podría ser reajustado en diseño o cancelado para respetar el tiempo de la siguiente clienta.',
      badgeText: 'Puntualidad es respeto mutuo',
      icon: 'Clock',
    },
    {
      title: 'Reprogramaciones (24h)',
      description:
        'Puedes reprogramar tu fecha u hora con al menos 24 horas de anticipación sin perder tu abono. Las cancelaciones de último momento no son reembolsables.',
      badgeText: 'Aviso previo protege tu cupo',
      icon: 'CalendarCheck',
    },
  ],
};

export const defaultFooterContent: FooterContentData = {
  aboutText:
    'Estudio privado de manicura estética y de alta gama. Técnica rusa, arquitectura y nivelación con base rubber, esculpido y micro nail art en turnos personalizados de 2 horas.',
  scheduleLine1: 'Lunes a Sábado: 7:00 AM – 6:00 PM',
  scheduleLine2: 'Bloques de Atención: Turnos de 2 horas continuas',
  scheduleLine3: 'Pausa de Almuerzo: 1:00 PM – 2:00 PM (No agendable)',
  addressText:
    'Local propio y privado en Bogotá, Colombia. (Dirección compartida tras verificar el anticipo).',
  phoneText: '+57 305 282 9795',
  instagramUrl: 'https://instagram.com',
  tiktokUrl: 'https://tiktok.com',
  copyrightText: '© 2026 Nails Pastel. Todos los derechos reservados.',
  creditsText: 'Hecho con amor por Panda Haus.',
};

export const siteConfig: SiteConfig = {
  businessName: 'Nails Pastel',
  tagline: 'Estudio de Manicura & Nail Art Profesional',
  whatsappNumber: '573052829795',
  notificationEmail: 'nelmarianm@gmail.com',
  googleCalendarScheduleUrl: 'https://calendar.app.google/4FftVZiHKhicYrPdA',
  locationAddress:
    'Local propio y privado — Bogotá / Colombia (Dirección exacta y mapa enviados al confirmar tu anticipo)',
  openTime: '07:00',
  closeTime: '18:00',
  lunchBreak: '13:00',
  lunchDurationMinutes: 60,
  slotDurationMinutes: 120, // 2 horas fijas
  bufferMinutes: 10, // 10 minutos entre turnos
  depositAmount: 15000,
  lateToleranceMinutes: 10,
  depositInstructions:
    'Para apartar tu turno y bloquear la agenda, debes realizar el anticipo de $15.000 COP a Nequi o Daviplata al número 3052829795 a nombre de Nelmarian. Este monto se descuenta del valor final del servicio.',
  daysOpen: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],
};

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Semipermanente Rusa con Nivelación',
    slug: 'semipermanente-rusa-nivelacion',
    category: 'Semipermanente',
    price: 55000,
    durationMinutes: 120,
    isPopular: true,
    image: '/images/gallery/work-1.jpg',
    description:
      'Manicura combinada con torno para limpieza profunda de cutícula, nivelación con base rubber para crear una arquitectura perfecta y curvatura C, y esmaltado de alta durabilidad (hasta 28 días).',
    variants: [
      { id: 'var-1', name: 'Efecto Glazed / Chrome Perlado', extraPrice: 8000, extraMinutes: 10 },
      { id: 'var-2', name: 'Nail Art Minimalista en 2 uñas', extraPrice: 10000, extraMinutes: 15 },
      { id: 'var-3', name: 'Retiro de esmaltado previo', extraPrice: 12000, extraMinutes: 20 },
    ],
  },
  {
    id: 'srv-2',
    title: 'Acrílicas Esculpidas Luxury (Set Nuevo)',
    slug: 'acrilicas-esculpidas-set-nuevo',
    category: 'Acrílicas / Esculpidas',
    price: 85000,
    durationMinutes: 120,
    isPopular: true,
    image: '/images/gallery/work-2.jpg',
    description:
      'Esculpido artesanal sobre molde adaptado a la morfología de tu uña natural. Incluye estructura almendra, cuadrada o coffin, limado simétrico y esmaltado semipermanente de tono a elección.',
    variants: [
      { id: 'var-4', name: 'Largo XL / Extra Long', extraPrice: 15000, extraMinutes: 20 },
      { id: 'var-5', name: 'Encapsulado con Foil y Glitter', extraPrice: 15000, extraMinutes: 15 },
      { id: 'var-6', name: 'Cristalería Swarovsky Premium (x10 gemas)', extraPrice: 12000, extraMinutes: 15 },
    ],
  },
  {
    id: 'srv-3',
    title: 'Soft Gel / Tips Jelly Press Estructurado',
    slug: 'soft-gel-press-estructurado',
    category: 'Acrílicas / Esculpidas',
    price: 70000,
    durationMinutes: 120,
    image: '/images/gallery/work-3.jpg',
    description:
      'Extensión express ultraligera de gel sólido que no maltrata la uña natural. Flexible, resistente y con acabado hiper-natural. Durabilidad de 3 a 4 semanas.',
    variants: [
      { id: 'var-7', name: 'Diseño Frenchie Moderno / Doble Línea', extraPrice: 12000, extraMinutes: 15 },
      { id: 'var-8', name: 'Retiro de Soft Gel anterior', extraPrice: 15000, extraMinutes: 20 },
    ],
  },
  {
    id: 'srv-4',
    title: 'Diseño a Mano Alzada & Micro-Pintura (Full Set)',
    slug: 'diseno-mano-alzada-nail-art',
    category: 'Nail Art',
    price: 75000,
    durationMinutes: 120,
    isPopular: true,
    image: '/images/gallery/work-4.jpg',
    description:
      'Arte personalizado en tus uñas: flores 3D, líneas curvas abstractas, aura nails, corazones o ilustraciones a pincel fino inspiradas en tus referencias de Pinterest e Instagram.',
    variants: [
      { id: 'var-9', name: 'Gemas 3D / Charms Coreanos', extraPrice: 10000, extraMinutes: 10 },
      { id: 'var-10', name: 'Efecto Blooming Gel / Mármol', extraPrice: 10000, extraMinutes: 10 },
    ],
  },
  {
    id: 'srv-5',
    title: 'Baño de Acrílico sobre Uña Natural (Kapping)',
    slug: 'bano-acrilico-kapping',
    category: 'Acrílicas / Esculpidas',
    price: 60000,
    durationMinutes: 120,
    image: '/images/gallery/work-5.jpg',
    description:
      'Capa protectora de acrílico cristal o cover sobre la longitud de tu uña natural para evitar que se quiebre, permitiendo su crecimiento fuerte y parejo.',
    variants: [
      { id: 'var-11', name: 'Esmaltado Semipermanente French', extraPrice: 10000, extraMinutes: 15 },
    ],
  },
  {
    id: 'srv-6',
    title: 'Manicura Spa Cuidado Natural & Keratina',
    slug: 'manicura-spa-cuidado-natural',
    category: 'Cuidado Natural',
    price: 40000,
    durationMinutes: 90,
    image: '/images/gallery/work-6.jpg',
    description:
      'Limpieza completa, exfoliación suave, mascarilla de keratina regenerativa, corte y limado fisiológico con sellador de brillo nutritivo sin químicos invasivos.',
    variants: [
      { id: 'var-12', name: 'Mascarilla Térmica de Colágeno', extraPrice: 10000, extraMinutes: 15 },
    ],
  },
  {
    id: 'srv-7',
    title: 'Mantenimiento / Retoque de Sistema',
    slug: 'mantenimiento-retoque-sistema',
    category: 'Mantenimiento',
    price: 65000,
    durationMinutes: 120,
    image: '/images/gallery/work-7.jpg',
    description:
      'Rebalance de peso y relleno del crecimiento del acrílico o gel (hasta 21 días de crecimiento). Cambio de diseño y color.',
    variants: [
      { id: 'var-13', name: 'Reparación de uña rota (por unidad)', extraPrice: 8000, extraMinutes: 10 },
    ],
  },
  {
    id: 'srv-8',
    title: 'Retiro Profesional de Sistema + Tratamiento',
    slug: 'retiro-profesional-sistema',
    category: 'Mantenimiento',
    price: 25000,
    durationMinutes: 60,
    image: '/images/gallery/work-8.jpg',
    description:
      'Retiro cuidadoso mediante fresa de carburo y disolvente hidratante, sin limado agresivo de la placa ungular, culminando con aplicación de sérum vitamínico.',
    variants: [],
  },
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Milky French con Puntos de Luz Pastel',
    image: '/images/gallery/work-1.jpg',
    tag: 'Tendencias',
    isFeatured: true,
    aspectRatio: 'tall',
    caption: 'Estructura almendra con base milky y acentos lavanda y lila pastel.',
  },
  {
    id: 'gal-2',
    title: 'Acrílicas Coffin con Cristales Swarovsky',
    image: '/images/gallery/work-2.jpg',
    tag: 'Acrílicas',
    isFeatured: true,
    aspectRatio: 'square',
    caption: 'Set completo esculpido con gemas y degradado baby boomer suave.',
  },
  {
    id: 'gal-3',
    title: 'Clean Girl Nails con Curvatura Natural',
    image: '/images/gallery/work-3.jpg',
    tag: 'Minimalistas',
    isFeatured: true,
    aspectRatio: 'tall',
    caption: 'Manicura rusa impecable con base rubber y brillo efecto espejo.',
  },
  {
    id: 'gal-4',
    title: 'Micro Nail Art en Trazo Fino',
    image: '/images/gallery/work-4.jpg',
    tag: 'Diseño a mano',
    isFeatured: true,
    aspectRatio: 'wide',
    caption: 'Detalles botánicos y líneas minimalistas pintadas a mano con pincel 00.',
  },
  {
    id: 'gal-5',
    title: 'Glazed Donut Nails & Acento Lila',
    image: '/images/gallery/work-5.jpg',
    tag: 'Tendencias',
    isFeatured: false,
    aspectRatio: 'square',
    caption: 'Efecto chrome perla sobre base pastel que refleja la luz con elegancia.',
  },
  {
    id: 'gal-6',
    title: 'Acrílicas Cortas Forma Ovalada',
    image: '/images/gallery/work-6.jpg',
    tag: 'Acrílicas',
    isFeatured: false,
    aspectRatio: 'tall',
    caption: 'Comodidad y resistencia para el día a día sin perder sofisticación.',
  },
  {
    id: 'gal-7',
    title: 'French Abstracto en Tonos Rosa Pastel',
    image: '/images/gallery/work-7.jpg',
    tag: 'Tendencias',
    isFeatured: false,
    aspectRatio: 'square',
    caption: 'Líneas asimétricas en la punta combinando lila y rosa chicle suave.',
  },
  {
    id: 'gal-8',
    title: 'Nude Soft & Detalle Geométrico',
    image: '/images/gallery/work-8.jpg',
    tag: 'Minimalistas',
    isFeatured: false,
    aspectRatio: 'wide',
    caption: 'Tono nude universal con líneas geométricas plateadas super discretas.',
  },
  {
    id: 'gal-9',
    title: 'Aura Nails en Lavanda y Rosa',
    image: '/images/gallery/work-9.jpg',
    tag: 'Diseño a mano',
    isFeatured: true,
    aspectRatio: 'tall',
    caption: 'Degradado radial estilo aura con aerógrafo y estrellas centelleantes.',
  },
  {
    id: 'gal-10',
    title: 'Acrílico Cover Natural + Cutícula Perfecta',
    image: '/images/gallery/work-10.jpg',
    tag: 'Acrílicas',
    isFeatured: false,
    aspectRatio: 'square',
    caption: 'Definición exacta de bordes y cutícula pulida sin enrojecimiento.',
  },
  {
    id: 'gal-11',
    title: 'Baby Boomer Clásico Difuminado',
    image: '/images/gallery/work-11.jpg',
    tag: 'Tendencias',
    isFeatured: false,
    aspectRatio: 'tall',
    caption: 'Transición perfecta de rosa traslúcido a blanco lechoso en punta.',
  },
  {
    id: 'gal-12',
    title: 'Corazones & Mini Flores a Mano Alzada',
    image: '/images/gallery/work-12.jpg',
    tag: 'Diseño a mano',
    isFeatured: false,
    aspectRatio: 'square',
    caption: 'Técnica de micro-pintura kawaii y estética coquette sobre base nude.',
  },
];
