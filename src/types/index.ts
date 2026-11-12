export interface ServiceVariant {
  id: string;
  name: string;
  extraPrice: number;
  extraMinutes?: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  order: number;
  description?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  durationMinutes: number;
  description: string;
  isPopular?: boolean;
  image?: string;
  variants?: ServiceVariant[];
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  tag: 'Tendencias' | 'Acrílicas' | 'Minimalistas' | 'Diseño a mano';
  isFeatured?: boolean;
  caption?: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
}

export interface SiteConfig {
  businessName: string;
  tagline: string;
  whatsappNumber: string;
  notificationEmail: string;
  googleCalendarScheduleUrl: string;
  locationAddress: string;
  openTime: string; // "07:00"
  closeTime: string; // "18:00"
  lunchBreak: string; // "13:00"
  lunchDurationMinutes: number; // 60
  slotDurationMinutes: number; // 120
  bufferMinutes: number; // 10
  depositAmount: number; // 15000
  depositInstructions: string;
  lateToleranceMinutes: number;
  daysOpen: string[];
}

export interface ThemeBrandingData {
  businessName: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  accentPurple: string;
  accentSoft: string;
  backgroundColor: string;
  textColor: string;
}

export interface TrustBadgeItem {
  title: string;
  subtitle: string;
  icon: string;
}

export interface HeroContentData {
  badge: string;
  title: string;
  highlightWord: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  heroImageUrl?: string;
  showcaseBadge: string;
  showcaseTitle: string;
  showcasePill: string;
  ratingText: string;
  trustBadges: TrustBadgeItem[];
}

export interface SectionsContentData {
  servicesBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;
  servicesImportantNotice: string;
  galleryBadge: string;
  galleryTitle: string;
  gallerySubtitle: string;
  instagramButtonText: string;
  instagramUrl: string;
  bookingBadge: string;
  bookingTitle: string;
  bookingSubtitle: string;
}

export interface BookingContentData {
  badge: string;
  title: string;
  subtitle: string;
  modeInteractiveText: string;
  modeGoogleCalendarText: string;
  step1Badge: string;
  step1Title: string;
  step1DurationLabel: string;
  step1VariantsTitle: string;
  step2Badge: string;
  step2Title: string;
  step2DaysLabel: string;
  step2SundayNotice: string;
  step3Badge: string;
  step3Title: string;
  step3BufferLabel: string;
  step3LunchLabel: string;
  step3SafetyNotice: string;
  summaryTitle: string;
  summarySubtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  repairTitle: string;
  repairSubtitle: string;
  repairPrice: number;
  removalTitle: string;
  removalSubtitle: string;
  removalPrice: number;
  submitButtonText: string;
}

export interface PolicyCardItem {
  title: string;
  description: string;
  badgeText: string;
  icon: string;
}

export interface PoliciesContentData {
  badge: string;
  title: string;
  subtitle: string;
  depositAmount: number;
  accountNumber: string;
  accountBank: string;
  accountHolder: string;
  footerNotice: string;
  policiesList: PolicyCardItem[];
}

export interface FooterContentData {
  aboutText: string;
  scheduleLine1: string;
  scheduleLine2: string;
  scheduleLine3: string;
  addressText: string;
  phoneText: string;
  instagramUrl: string;
  tiktokUrl: string;
  copyrightText: string;
  creditsText: string;
}

export interface TimeSlot {
  id: string;
  startTime: string; // "07:00"
  endTime: string; // "09:00"
  displayTime: string; // "7:00 AM - 9:00 AM"
  isAvailable: boolean;
  isLunchBreak?: boolean;
  reason?: string;
}

export interface BookingFormData {
  serviceId: string;
  selectedVariants: string[];
  date: string; // "YYYY-MM-DD"
  slot: TimeSlot | null;
  clientName: string;
  clientPhone: string;
  notes?: string;
  needsRepair: boolean;
  needsRemoval: boolean;
  repairPrice: number;
  removalPrice: number;
}

export interface BookingWebhookPayload {
  source: 'web_landing_nails_pastel';
  timestamp: string;
  bookingId: string;
  client: {
    name: string;
    phone: string;
    notes?: string;
    needsRepair?: boolean;
    needsRemoval?: boolean;
  };
  service: {
    id: string;
    title: string;
    category: string;
    basePrice: number;
    variants: Array<{ name: string; price: number }>;
    totalEstimatedPrice: number;
    depositRequired: number;
    remainingBalance: number;
    durationMinutes: number;
    repairPrice?: number;
    removalPrice?: number;
  };
  appointment: {
    date: string;
    startTime: string;
    endTime: string;
    calendarEmail: string;
    location: string;
  };
  status: 'PENDING_DEPOSIT_VERIFICATION';
}
