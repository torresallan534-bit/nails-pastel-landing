import type { GlobalConfig } from 'payload';

export const ThemeBranding: GlobalConfig = {
  slug: 'theme-branding',
  label: '🎨 Identidad y Colores de Marca',
  admin: {
    group: 'Control de Marca',
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
          label: 'Marca y Logotipo',
          fields: [
            {
              name: 'businessName',
              type: 'text',
              required: true,
              defaultValue: 'Nails Pastel',
              label: 'Nombre de la Marca / Estudio',
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Luxury Nail Studio',
              label: 'Eslogan / Subtítulo Corto',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logotipo Oficial (Subir Archivo)',
              admin: {
                description: 'Sube tu logo en formato PNG, SVG o WebP.',
              },
            },
          ],
        },
        {
          label: 'Paleta de Colores en Vivo',
          fields: [
            {
              name: 'primaryColor',
              type: 'text',
              label: 'Color Primario / Botones de Acción (Hex)',
              defaultValue: '#ffa0d3',
              admin: {
                placeholder: '#ffa0d3',
                description: 'Color principal para botones CTA, acentos y resaltados vibrantes.',
              },
            },
            {
              name: 'accentPurple',
              type: 'text',
              label: 'Color de Acento Lavanda (Hex)',
              defaultValue: '#f7bbfd',
              admin: {
                placeholder: '#f7bbfd',
                description: 'Lavanda pastel para tarjetas, fondos decorativos y badges.',
              },
            },
            {
              name: 'accentSoft',
              type: 'text',
              label: 'Color Rosa Lila Suave (Hex)',
              defaultValue: '#f0cdef',
              admin: {
                placeholder: '#f0cdef',
              },
            },
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Color de Fondo Canvas (Hex)',
              defaultValue: '#fcf5f2',
              admin: {
                placeholder: '#fcf5f2',
                description: 'Color de fondo general de toda la landing page (ej. crema suave).',
              },
            },
            {
              name: 'textColor',
              type: 'text',
              label: 'Color del Texto Principal (Hex)',
              defaultValue: '#010101',
              admin: {
                placeholder: '#010101',
                description: 'Negro profundo o carbón para máxima legibilidad.',
              },
            },
          ],
        },
      ],
    },
  ],
};
