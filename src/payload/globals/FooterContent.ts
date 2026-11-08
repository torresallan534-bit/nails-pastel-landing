import type { GlobalConfig } from 'payload';

export const FooterContent: GlobalConfig = {
  slug: 'footer-content',
  label: '📍 Pie de Página (Footer)',
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
          label: 'Descripción y Redes',
          fields: [
            {
              name: 'aboutText',
              type: 'textarea',
              label: 'Descripción de la Marca (Columna 1)',
              defaultValue:
                'Estudio privado de manicura estética y de alta gama. Técnica rusa, arquitectura y nivelación con base rubber, esculpido y micro nail art en turnos personalizados de 2 horas.',
            },
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Enlace a Instagram',
              defaultValue: 'https://instagram.com',
            },
            {
              name: 'tiktokUrl',
              type: 'text',
              label: 'Enlace a TikTok',
              defaultValue: 'https://tiktok.com',
            },
          ],
        },
        {
          label: 'Horarios e Información',
          fields: [
            {
              name: 'scheduleLine1',
              type: 'text',
              label: 'Línea de Horario 1',
              defaultValue: 'Lunes a Sábado: 7:00 AM – 6:00 PM',
            },
            {
              name: 'scheduleLine2',
              type: 'text',
              label: 'Línea de Horario 2',
              defaultValue: 'Bloques de Atención: Turnos de 2 horas continuas',
            },
            {
              name: 'scheduleLine3',
              type: 'text',
              label: 'Línea de Horario 3 (Almuerzo)',
              defaultValue: 'Pausa de Almuerzo: 1:00 PM – 2:00 PM (No agendable)',
            },
            {
              name: 'addressText',
              type: 'text',
              label: 'Texto de Ubicación',
              defaultValue:
                'Local propio y privado en Bogotá, Colombia. (Dirección compartida tras verificar el anticipo).',
            },
            {
              name: 'phoneText',
              type: 'text',
              label: 'Teléfono / WhatsApp Visible',
              defaultValue: '+57 305 282 9795',
            },
          ],
        },
        {
          label: 'Copyright y Créditos',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              label: 'Texto de Derechos Reservados',
              defaultValue: '© 2026 Nails Pastel. Todos los derechos reservados.',
            },
            {
              name: 'creditsText',
              type: 'text',
              label: 'Texto de Créditos / Autor',
              defaultValue: 'Hecho con amor por Panda Haus.',
            },
          ],
        },
      ],
    },
  ],
};
