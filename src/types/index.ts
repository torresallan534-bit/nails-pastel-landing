export interface ServiceVariant {
  id: string;
  name: string;
  extraPrice: number;
  extraMinutes?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'Semipermanente' | 'Acrílicas / Esculpidas' | 'Nail Art' | 'Cuidado Natural' | 'Mantenimiento';
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
  instagramHandle: string;
  openTime: string; // "07:00"
  closeTime: string; // "18:00"
  lunchBreak: string; // "13:00"
  lunchDurationMinutes: number; // 60
  slotDurationMinutes: number; // 120
  bufferMinutes: number; // 10
  depositAmount: number; // 15000
  depositInstructions: string;
  lateToleranceMinutes: number;
  bookingPolicies: string;
  daysOpen: string[];
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
  notes: string;
}

export interface BookingWebhookPayload {
  source: 'web_landing_nails_pastel';
  timestamp: string;
  bookingId: string;
  client: {
    name: string;
    phone: string;
    notes?: string;
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
