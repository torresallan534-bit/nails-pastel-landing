import type { CollectionConfig } from 'payload';

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'isFeatured', 'createdAt'],
    group: 'Contenido Visual',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Título o Descripción breve del diseño',
      admin: {
        placeholder: 'Ej: French sutil con perlas y base milky',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Fotografía en Alta Calidad',
    },
    {
      name: 'tag',
      type: 'select',
      required: true,
      label: 'Etiqueta de Estilo',
      options: [
        { label: 'Tendencias', value: 'Tendencias' },
        { label: 'Acrílicas / Esculpidas', value: 'Acrílicas' },
        { label: 'Minimalistas / Clean Girl', value: 'Minimalistas' },
        { label: 'Diseño a mano alzada', value: 'Diseño a mano' },
      ],
      defaultValue: 'Tendencias',
    },
    {
      name: 'isFeatured',
      type: 'boolean',
      label: 'Destacar en Bento Grid Principal',
      defaultValue: false,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Pie de foto (opcional para Lightbox/Instagram)',
    },
  ],
};
