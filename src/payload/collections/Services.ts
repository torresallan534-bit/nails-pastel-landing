import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'durationMinutes'],
    group: 'Catálogo',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nombre del Servicio',
      admin: {
        placeholder: 'Ej: Semipermanente Rusa + Nivelación',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      label: 'Categoría',
      defaultValue: 'Semipermanente',
      admin: {
        placeholder: 'Ej: Semipermanente, Acrílicas / Esculpidas, Nail Art, Cuidado Natural, Mantenimiento...',
        description: 'Nombre de la categoría (debe coincidir con tus Categorías para agrupar en el menú).',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Precio Base (COP)',
      min: 0,
      admin: {
        step: 1000,
        description: 'Precio base en pesos colombianos (COP).',
      },
    },
    {
      name: 'durationMinutes',
      type: 'number',
      required: true,
      defaultValue: 120,
      label: 'Duración Estimada (Minutos)',
      admin: {
        step: 10,
        description: 'Bloque estándar de turno: 120 min (2 horas).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción Detallada',
      admin: {
        placeholder: 'Incluye limpieza profunda de cutícula, nivelación con base rubber, esmaltado y aceite hidratante...',
      },
    },
    {
      name: 'isPopular',
      type: 'boolean',
      label: 'Destacar como más pedido',
      defaultValue: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto de Referencia',
    },
    {
      name: 'variants',
      type: 'array',
      label: 'Variantes y Adicionales',
      labels: {
        singular: 'Variante / Adicional',
        plural: 'Variantes / Adicionales',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nombre del Adicional (ej. Cristalería Swarovsky, Largo XL, Efecto Espejo)',
        },
        {
          name: 'extraPrice',
          type: 'number',
          required: true,
          defaultValue: 0,
          label: 'Precio Adicional (COP)',
          admin: {
            step: 1000,
          },
        },
        {
          name: 'extraMinutes',
          type: 'number',
          defaultValue: 0,
          label: 'Tiempo Adicional (Minutos)',
        },
      ],
    },
  ],
};
