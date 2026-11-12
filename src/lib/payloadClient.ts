import {
  ThemeBrandingData,
  HeroContentData,
  SectionsContentData,
  BookingContentData,
  PoliciesContentData,
  SiteConfig,
  FooterContentData,
  ServiceItem,
  GalleryItem,
  CategoryItem,
} from '../types';
import {
  defaultThemeBranding,
  defaultHeroContent,
  defaultSectionsContent,
  defaultBookingContent,
  defaultPoliciesContent,
  defaultFooterContent,
  siteConfig,
  initialServices,
  initialGallery,
  defaultCategories,
} from '../data/initialData';

async function getPayloadInstance() {
  if (!process.env.MONGODB_URI) return null;
  try {
    const { getPayload } = await import('payload');
    const config = await import('@payload-config');
    return await getPayload({ config: config.default });
  } catch (error) {
    return null;
  }
}

function resolveMediaUrl(media: any, fallback: string): string {
  if (!media) return fallback;
  if (typeof media === 'string') return media;
  if (typeof media === 'object' && media.url) return media.url;
  return fallback;
}

export async function getThemeBranding(): Promise<ThemeBrandingData> {
  const payload = await getPayloadInstance();
  if (!payload) return defaultThemeBranding;

  try {
    const data = await payload.findGlobal({ slug: 'theme-branding', depth: 1 });
    if (!data) return defaultThemeBranding;

    return {
      businessName: data.businessName || defaultThemeBranding.businessName,
      tagline: data.tagline || defaultThemeBranding.tagline,
      logoUrl: resolveMediaUrl(data.logo, defaultThemeBranding.logoUrl),
      primaryColor: data.primaryColor || defaultThemeBranding.primaryColor,
      accentPurple: data.accentPurple || defaultThemeBranding.accentPurple,
      accentSoft: data.accentSoft || defaultThemeBranding.accentSoft,
      backgroundColor: data.backgroundColor || defaultThemeBranding.backgroundColor,
      textColor: data.textColor || defaultThemeBranding.textColor,
    };
  } catch (e) {
    return defaultThemeBranding;
  }
}

export async function getHeroContent(): Promise<HeroContentData> {
  const payload = await getPayloadInstance();
  if (!payload) return defaultHeroContent;

  try {
    const data = await payload.findGlobal({ slug: 'hero-content', depth: 1 });
    if (!data) return defaultHeroContent;

    return {
      badge: data.badge || defaultHeroContent.badge,
      title: data.title || defaultHeroContent.title,
      highlightWord: data.highlightWord || defaultHeroContent.highlightWord,
      subtitle: data.subtitle || defaultHeroContent.subtitle,
      ctaPrimaryText: data.ctaPrimaryText || defaultHeroContent.ctaPrimaryText,
      ctaSecondaryText: data.ctaSecondaryText || defaultHeroContent.ctaSecondaryText,
      heroImageUrl: resolveMediaUrl(data.heroImage, defaultHeroContent.heroImageUrl || ''),
      showcaseBadge: data.showcaseBadge || defaultHeroContent.showcaseBadge,
      showcaseTitle: data.showcaseTitle || defaultHeroContent.showcaseTitle,
      showcasePill: data.showcasePill || defaultHeroContent.showcasePill,
      ratingText: data.ratingText || defaultHeroContent.ratingText,
      trustBadges:
        Array.isArray(data.trustBadges) && data.trustBadges.length > 0
          ? (data.trustBadges as any)
          : defaultHeroContent.trustBadges,
    };
  } catch (e) {
    return defaultHeroContent;
  }
}

export async function getSectionsContent(): Promise<SectionsContentData> {
  const payload = await getPayloadInstance();
  if (!payload) return defaultSectionsContent;

  try {
    const data = await payload.findGlobal({ slug: 'sections-content' });
    if (!data) return defaultSectionsContent;

    return {
      servicesBadge: data.servicesBadge || defaultSectionsContent.servicesBadge,
      servicesTitle: data.servicesTitle || defaultSectionsContent.servicesTitle,
      servicesSubtitle: data.servicesSubtitle || defaultSectionsContent.servicesSubtitle,
      servicesImportantNotice:
        data.servicesImportantNotice || defaultSectionsContent.servicesImportantNotice,
      galleryBadge: data.galleryBadge || defaultSectionsContent.galleryBadge,
      galleryTitle: data.galleryTitle || defaultSectionsContent.galleryTitle,
      gallerySubtitle: data.gallerySubtitle || defaultSectionsContent.gallerySubtitle,
      instagramButtonText:
        data.instagramButtonText || defaultSectionsContent.instagramButtonText,
      instagramUrl: data.instagramUrl || defaultSectionsContent.instagramUrl,
      bookingBadge: data.bookingBadge || defaultSectionsContent.bookingBadge,
      bookingTitle: data.bookingTitle || defaultSectionsContent.bookingTitle,
      bookingSubtitle: data.bookingSubtitle || defaultSectionsContent.bookingSubtitle,
    };
  } catch (e) {
    return defaultSectionsContent;
  }
}

export async function getBookingContent(): Promise<BookingContentData> {
  const payload = await getPayloadInstance();
  if (!payload) return defaultBookingContent;

  try {
    const data = await payload.findGlobal({ slug: 'booking-content' });
    if (!data) return defaultBookingContent;

    return {
      badge: data.badge || defaultBookingContent.badge,
      title: data.title || defaultBookingContent.title,
      subtitle: data.subtitle || defaultBookingContent.subtitle,
      modeInteractiveText:
        data.modeInteractiveText || defaultBookingContent.modeInteractiveText,
      modeGoogleCalendarText:
        data.modeGoogleCalendarText || defaultBookingContent.modeGoogleCalendarText,
      step1Badge: data.step1Badge || defaultBookingContent.step1Badge,
      step1Title: data.step1Title || defaultBookingContent.step1Title,
      step1DurationLabel:
        data.step1DurationLabel || defaultBookingContent.step1DurationLabel,
      step1VariantsTitle:
        data.step1VariantsTitle || defaultBookingContent.step1VariantsTitle,
      step2Badge: data.step2Badge || defaultBookingContent.step2Badge,
      step2Title: data.step2Title || defaultBookingContent.step2Title,
      step2DaysLabel: data.step2DaysLabel || defaultBookingContent.step2DaysLabel,
      step2SundayNotice:
        data.step2SundayNotice || defaultBookingContent.step2SundayNotice,
      step3Badge: data.step3Badge || defaultBookingContent.step3Badge,
      step3Title: data.step3Title || defaultBookingContent.step3Title,
      step3BufferLabel:
        data.step3BufferLabel || defaultBookingContent.step3BufferLabel,
      step3LunchLabel: data.step3LunchLabel || defaultBookingContent.step3LunchLabel,
      step3SafetyNotice:
        data.step3SafetyNotice || defaultBookingContent.step3SafetyNotice,
      summaryTitle: data.summaryTitle || defaultBookingContent.summaryTitle,
      summarySubtitle: data.summarySubtitle || defaultBookingContent.summarySubtitle,
      nameLabel: data.nameLabel || defaultBookingContent.nameLabel,
      namePlaceholder:
        data.namePlaceholder || defaultBookingContent.namePlaceholder,
      phoneLabel: data.phoneLabel || defaultBookingContent.phoneLabel,
      phonePlaceholder:
        data.phonePlaceholder || defaultBookingContent.phonePlaceholder,
      repairTitle: data.repairTitle || defaultBookingContent.repairTitle,
      repairSubtitle: data.repairSubtitle || defaultBookingContent.repairSubtitle,
      repairPrice:
        typeof data.repairPrice === 'number'
          ? data.repairPrice
          : defaultBookingContent.repairPrice,
      removalTitle: data.removalTitle || defaultBookingContent.removalTitle,
      removalSubtitle:
        data.removalSubtitle || defaultBookingContent.removalSubtitle,
      removalPrice:
        typeof data.removalPrice === 'number'
          ? data.removalPrice
          : defaultBookingContent.removalPrice,
      submitButtonText:
        data.submitButtonText || defaultBookingContent.submitButtonText,
    };
  } catch (e) {
    return defaultBookingContent;
  }
}

export async function getPoliciesContent(): Promise<PoliciesContentData> {
  const payload = await getPayloadInstance();
  if (!payload) return defaultPoliciesContent;

  try {
    const data = await payload.findGlobal({ slug: 'policies-content' });
    if (!data) return defaultPoliciesContent;

    return {
      badge: data.badge || defaultPoliciesContent.badge,
      title: data.title || defaultPoliciesContent.title,
      subtitle: data.subtitle || defaultPoliciesContent.subtitle,
      depositAmount:
        typeof data.depositAmount === 'number'
          ? data.depositAmount
          : defaultPoliciesContent.depositAmount,
      accountNumber: data.accountNumber || defaultPoliciesContent.accountNumber,
      accountBank: data.accountBank || defaultPoliciesContent.accountBank,
      accountHolder: data.accountHolder || defaultPoliciesContent.accountHolder,
      footerNotice: data.footerNotice || defaultPoliciesContent.footerNotice,
      policiesList:
        Array.isArray(data.policiesList) && data.policiesList.length > 0
          ? (data.policiesList as any)
          : defaultPoliciesContent.policiesList,
    };
  } catch (e) {
    return defaultPoliciesContent;
  }
}

export async function getSiteSettings(): Promise<SiteConfig> {
  const payload = await getPayloadInstance();
  if (!payload) return siteConfig;

  try {
    const data = await payload.findGlobal({ slug: 'site-settings' });
    if (!data) return siteConfig;

    return {
      businessName: data.businessName || siteConfig.businessName,
      tagline: data.tagline || siteConfig.tagline,
      whatsappNumber: data.whatsappNumber || siteConfig.whatsappNumber,
      notificationEmail: data.notificationEmail || siteConfig.notificationEmail,
      googleCalendarScheduleUrl:
        data.googleCalendarScheduleUrl || siteConfig.googleCalendarScheduleUrl,
      locationAddress: data.locationAddress || siteConfig.locationAddress,
      openTime: data.openTime || siteConfig.openTime,
      closeTime: data.closeTime || siteConfig.closeTime,
      lunchBreak: data.lunchBreak || siteConfig.lunchBreak,
      lunchDurationMinutes:
        typeof data.lunchDurationMinutes === 'number'
          ? data.lunchDurationMinutes
          : siteConfig.lunchDurationMinutes,
      slotDurationMinutes:
        typeof data.slotDurationMinutes === 'number'
          ? data.slotDurationMinutes
          : siteConfig.slotDurationMinutes,
      bufferMinutes:
        typeof data.bufferMinutes === 'number' ? data.bufferMinutes : siteConfig.bufferMinutes,
      depositAmount:
        typeof data.depositAmount === 'number' ? data.depositAmount : siteConfig.depositAmount,
      depositInstructions: data.depositInstructions || siteConfig.depositInstructions,
      lateToleranceMinutes:
        typeof data.lateToleranceMinutes === 'number'
          ? data.lateToleranceMinutes
          : siteConfig.lateToleranceMinutes,
      daysOpen: Array.isArray(data.daysOpen) ? data.daysOpen : siteConfig.daysOpen,
    };
  } catch (e) {
    return siteConfig;
  }
}

export async function getFooterContent(): Promise<FooterContentData> {
  const payload = await getPayloadInstance();
  if (!payload) return defaultFooterContent;

  try {
    const data = await payload.findGlobal({ slug: 'footer-content' });
    if (!data) return defaultFooterContent;

    return {
      aboutText: data.aboutText || defaultFooterContent.aboutText,
      scheduleLine1: data.scheduleLine1 || defaultFooterContent.scheduleLine1,
      scheduleLine2: data.scheduleLine2 || defaultFooterContent.scheduleLine2,
      scheduleLine3: data.scheduleLine3 || defaultFooterContent.scheduleLine3,
      addressText: data.addressText || defaultFooterContent.addressText,
      phoneText: data.phoneText || defaultFooterContent.phoneText,
      instagramUrl: data.instagramUrl || defaultFooterContent.instagramUrl,
      tiktokUrl: data.tiktokUrl || defaultFooterContent.tiktokUrl,
      copyrightText: data.copyrightText || defaultFooterContent.copyrightText,
      creditsText: data.creditsText || defaultFooterContent.creditsText,
    };
  } catch (e) {
    return defaultFooterContent;
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  const payload = await getPayloadInstance();
  if (!payload) return initialServices;

  try {
    const result = await payload.find({
      collection: 'services',
      limit: 100,
      depth: 1,
    });

    if (!result.docs || result.docs.length === 0) return initialServices;

    return result.docs.map((doc: any) => {
      let imageSrc = '/images/gallery/work-1.jpg';
      if (doc.image && typeof doc.image === 'object' && doc.image.url) {
        imageSrc = doc.image.url;
      } else if (typeof doc.image === 'string') {
        imageSrc = doc.image;
      }

      const variants = Array.isArray(doc.variants)
        ? doc.variants.map((v: any, idx: number) => ({
            id: v.id || `var-${idx}`,
            name: v.name,
            extraPrice: v.extraPrice || 0,
            extraMinutes: v.extraMinutes || 0,
          }))
        : [];

      return {
        id: doc.id,
        title: doc.title,
        slug: doc.slug || doc.title.toLowerCase().replace(/\s+/g, '-'),
        category: doc.category || 'Semipermanente',
        price: doc.price || 50000,
        durationMinutes: doc.durationMinutes || 120,
        description: doc.description || '',
        isPopular: Boolean(doc.isPopular),
        image: imageSrc,
        variants,
      };
    });
  } catch (e) {
    return initialServices;
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  const payload = await getPayloadInstance();
  if (!payload) return initialGallery;

  try {
    const result = await payload.find({
      collection: 'gallery',
      limit: 100,
      depth: 1,
    });

    if (!result.docs || result.docs.length === 0) return initialGallery;

    return result.docs.map((doc: any, idx: number) => {
      let imageSrc = '/images/gallery/work-1.jpg';
      if (doc.image && typeof doc.image === 'object' && doc.image.url) {
        imageSrc = doc.image.url;
      } else if (typeof doc.image === 'string') {
        imageSrc = doc.image;
      }

      const aspectRatios: Array<'tall' | 'wide' | 'square'> = ['tall', 'square', 'wide'];
      const autoAspect = aspectRatios[idx % 3];

      return {
        id: doc.id,
        title: doc.title || 'Diseño Nails Pastel',
        image: imageSrc,
        tag: doc.tag || 'Tendencias',
        isFeatured: Boolean(doc.isFeatured),
        caption: doc.caption || '',
        aspectRatio: autoAspect,
      };
    });
  } catch (e) {
    return initialGallery;
  }
}

export async function getCategories(): Promise<CategoryItem[]> {
  const payload = await getPayloadInstance();
  if (!payload) return defaultCategories;

  try {
    const result = await payload.find({
      collection: 'categories',
      limit: 100,
      sort: 'order',
    });

    if (!result.docs || result.docs.length === 0) return defaultCategories;

    return result.docs.map((doc: any, idx: number) => ({
      id: doc.id,
      name: doc.name,
      slug: doc.slug || doc.name.toLowerCase().replace(/\s+/g, '-'),
      order: typeof doc.order === 'number' ? doc.order : idx + 1,
      description: doc.description || '',
    }));
  } catch (e) {
    return defaultCategories;
  }
}
