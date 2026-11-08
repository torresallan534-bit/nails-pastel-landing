import type { GlobalConfig } from 'payload';

export const HeroContent: GlobalConfig = {
  slug: 'hero-content',
  label: '✨ Cabecera Principal (Hero)',
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
          label: 'Textos Principales',
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Insignia Superior (Badge)',
              defaultValue: 'Estudio Privado • Agenda Abierta Hoy',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Gran Titular (Headline)',
              required: true,
              defaultValue: 'Tus uñas en manos expertas con la estética pastel que mereces.',
            },
            {
              name: 'highlightWord',
              type: 'text',
              label: 'Palabra o Frase Resaltada con Ondas',
              defaultValue: 'estética pastel',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Párrafo Descriptivo',
              required: true,
              defaultValue:
                'Especialistas en manicura rusa combinada, nivelación con base rubber, extensiones esculpidas y micro nail art. En Nails Pastel trabajamos con bloques dedicados de 2 horas para garantizar un acabado impecable, duradero y sin maltratar tu uña natural.',
            },
            {
              name: 'ctaPrimaryText',
              type: 'text',
              label: 'Texto del Botón Principal (CTA)',
              defaultValue: 'Ver turnos disponibles',
            },
            {
              name: 'ctaSecondaryText',
              type: 'text',
              label: 'Texto del Botón Secundario',
              defaultValue: 'Google Calendar Oficial',
            },
          ],
        },
        {
          label: 'Tarjeta Visual & Foto',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Foto Destacada del Hero (Subir Archivo)',
              admin: {
                description: 'Foto principal que se muestra en la tarjeta flotante del Hero.',
              },
            },
            {
              name: 'showcaseBadge',
              type: 'text',
              label: 'Etiqueta de la Tarjeta Flotante',
              defaultValue: 'Técnica Estrella',
            },
            {
              name: 'showcaseTitle',
              type: 'text',
              label: 'Título de la Tarjeta Flotante',
              defaultValue: 'Semipermanente Rusa + Nivelación',
            },
            {
              name: 'showcasePill',
              type: 'text',
              label: 'Insignia Negra (Duración/Garantía)',
              defaultValue: '28 días intactas',
            },
            {
              name: 'ratingText',
              type: 'text',
              label: 'Texto de Calificación de Clientas',
              defaultValue: '5.0 (Calificación de clientas)',
            },
          ],
        },
        {
          label: 'Insignias de Confianza',
          fields: [
            {
              name: 'trustBadges',
              type: 'array',
              label: 'Insignias de Confianza (3 puntos clave)',
              defaultValue: [
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
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Título Breve',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  required: true,
                  label: 'Subtítulo / Aclaración',
                },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icono Representativo',
                  defaultValue: 'Heart',
                  options: [
                    { label: 'Corazón (Atención & Cuidado)', value: 'Heart' },
                    { label: 'Escudo (Bioseguridad & Higiene)', value: 'ShieldCheck' },
                    { label: 'Reloj (Puntualidad & Cero Esperas)', value: 'Clock' },
                    { label: 'Destello (Calidad & Belleza)', value: 'Sparkles' },
                    { label: 'Estrella (Excelencia)', value: 'Star' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
