import type { GlobalConfig } from 'payload';

export const SectionsContent: GlobalConfig = {
  slug: 'sections-content',
  label: '📑 Títulos de Secciones',
  admin: {
    group: 'Contenido Web',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sección Servicios',
          fields: [
            {
              name: 'servicesBadge',
              type: 'text',
              label: 'Insignia Superior (Badge)',
              defaultValue: 'Menú de Servicios & Precios Claros',
            },
            {
              name: 'servicesTitle',
              type: 'text',
              label: 'Título de la Sección',
              defaultValue: 'Tarifas Transparentes & Adicionales',
            },
            {
              name: 'servicesSubtitle',
              type: 'textarea',
              label: 'Párrafo Descriptivo',
              defaultValue:
                'Cada servicio incluye manicura combinada rusa de alta precisión. Selecciona tus adicionales y mira el precio final en tiempo real.',
            },
            {
              name: 'servicesImportantNotice',
              type: 'textarea',
              label: 'Aviso Importante sobre Precios Base',
              defaultValue:
                'Estos son los precios base de los servicios, el precio total varía según las decoraciones, efectos adicionales.',
            },
          ],
        },
        {
          label: 'Sección Galería',
          fields: [
            {
              name: 'galleryBadge',
              type: 'text',
              label: 'Insignia Superior (Badge)',
              defaultValue: 'Portafolio Real & Inspiración',
            },
            {
              name: 'galleryTitle',
              type: 'text',
              label: 'Título de la Sección',
              defaultValue: 'Galería de Creaciones',
            },
            {
              name: 'gallerySubtitle',
              type: 'textarea',
              label: 'Párrafo Descriptivo',
              defaultValue:
                'Cada set es una obra única diseñada al milímetro. Fotografía 100% de nuestras clientas reales en Nails Pastel.',
            },
            {
              name: 'instagramButtonText',
              type: 'text',
              label: 'Texto del Botón de Instagram',
              defaultValue: 'Ver más en Instagram @nailspastel',
            },
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Enlace al Perfil de Instagram',
              defaultValue: 'https://instagram.com',
            },
          ],
        },
        {
          label: 'Sección Agenda',
          fields: [
            {
              name: 'bookingBadge',
              type: 'text',
              label: 'Insignia Superior (Badge)',
              defaultValue: 'Turnos Dedicados de 2 Horas',
            },
            {
              name: 'bookingTitle',
              type: 'text',
              label: 'Título de la Sección',
              defaultValue: 'Reserva tu Turno en Línea',
            },
            {
              name: 'bookingSubtitle',
              type: 'textarea',
              label: 'Párrafo Descriptivo',
              defaultValue:
                'Selecciona tu servicio, el día y tu hora disponible. Nuestro sistema bloquea el turno y te genera el enlace de WhatsApp con el valor del anticipo.',
            },
          ],
        },
      ],
    },
  ],
};
