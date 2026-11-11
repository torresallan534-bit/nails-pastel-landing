import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Imagen / Archivo Multimedia',
    plural: 'Biblioteca Multimedia',
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'filesize', 'createdAt'],
    group: 'Contenido Visual',
  },
  upload: {
    // Deshabilita almacenamiento en disco local para evitar errores EROFS en Vercel Serverless
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 960,
        position: 'centre',
      },
      {
        name: 'fullscreen',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      defaultValue: 'Fotografía Nails Pastel',
      label: 'Texto Alternativo (Accesibilidad & SEO)',
    },
  ],
};
