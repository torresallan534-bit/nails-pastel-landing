import type { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoría',
    plural: 'Categorías',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre de la Categoría',
      admin: {
        placeholder: 'Ej: Semipermanente, Acrílicas / Esculpidas, Nail Art, Spa',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Identificador / Slug',
      admin: {
        placeholder: 'ej: semipermanente, acrilicas, nail-art',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de Aparición',
      defaultValue: 0,
      admin: {
        description: 'Número menor aparece primero en la barra de filtros (ej. 1, 2, 3...).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción Breve (Opcional)',
    },
  ],
};
