import type { GlobalConfig } from 'payload';

export const BookingContent: GlobalConfig = {
  slug: 'booking-content',
  label: '📅 Textos de la Agenda y Turnos',
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
          label: 'Encabezado y Modalidades',
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Insignia Superior (Badge)',
              defaultValue: 'Agenda Inteligente & Turnos de 2 Horas',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Título de la Sección',
              defaultValue: 'Reserva tu Turno en Línea',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Párrafo Descriptivo',
              defaultValue:
                'Elige la modalidad que prefieras: el agendador guiado con comprobante directo a WhatsApp o la página de citas nativa de Google Calendar.',
            },
            {
              name: 'modeInteractiveText',
              type: 'text',
              label: 'Texto Botón Modo WhatsApp',
              defaultValue: 'Agendador Guiado + WhatsApp',
            },
            {
              name: 'modeGoogleCalendarText',
              type: 'text',
              label: 'Texto Botón Modo Google Calendar',
              defaultValue: 'Google Calendar Oficial',
            },
          ],
        },
        {
          label: 'Paso 1: Servicios',
          fields: [
            {
              name: 'step1Badge',
              type: 'text',
              label: 'Etiqueta del Paso 1',
              defaultValue: 'Paso 1',
            },
            {
              name: 'step1Title',
              type: 'text',
              label: 'Título del Paso 1',
              defaultValue: 'Elige tu servicio de uñas',
            },
            {
              name: 'step1DurationLabel',
              type: 'text',
              label: 'Texto de Duración',
              defaultValue: 'Duración: 2 Horas',
            },
            {
              name: 'step1VariantsTitle',
              type: 'text',
              label: 'Título de Adicionales',
              defaultValue: '¿Deseas agregar algún adicional?',
            },
          ],
        },
        {
          label: 'Paso 2: Día y Fechas',
          fields: [
            {
              name: 'step2Badge',
              type: 'text',
              label: 'Etiqueta del Paso 2',
              defaultValue: 'Paso 2',
            },
            {
              name: 'step2Title',
              type: 'text',
              label: 'Título del Paso 2',
              defaultValue: 'Selecciona el día de tu cita',
            },
            {
              name: 'step2DaysLabel',
              type: 'text',
              label: 'Días Operativos Visibles',
              defaultValue: 'Lunes a Sábado',
            },
            {
              name: 'step2SundayNotice',
              type: 'text',
              label: 'Aviso de Domingos Cerrados',
              defaultValue: '* Los domingos el estudio permanece cerrado por mantenimiento y descanso.',
            },
          ],
        },
        {
          label: 'Paso 3: Horarios y Franjas',
          fields: [
            {
              name: 'step3Badge',
              type: 'text',
              label: 'Etiqueta del Paso 3',
              defaultValue: 'Paso 3',
            },
            {
              name: 'step3Title',
              type: 'text',
              label: 'Título del Paso 3',
              defaultValue: 'Selecciona tu franja horaria',
            },
            {
              name: 'step3BufferLabel',
              type: 'text',
              label: 'Aclaración de Bloques',
              defaultValue: 'Bloques de 2h + 10m buffer',
            },
            {
              name: 'step3LunchLabel',
              type: 'text',
              label: 'Etiqueta de Bloqueo de Almuerzo',
              defaultValue: 'Almuerzo',
            },
            {
              name: 'step3SafetyNotice',
              type: 'text',
              label: 'Aviso de Bioseguridad y Sanitización',
              defaultValue:
                'Cada turno incluye sanitización previa y atención exclusiva sin interrupciones.',
            },
          ],
        },
        {
          label: 'Resumen, Reparaciones y Retiros',
          fields: [
            {
              name: 'summaryTitle',
              type: 'text',
              label: 'Título del Resumen',
              defaultValue: 'Resumen de tu Turno',
            },
            {
              name: 'summarySubtitle',
              type: 'text',
              label: 'Subtítulo del Resumen',
              defaultValue:
                'Completa tus datos para pre-agendar y generar tu comprobante de WhatsApp.',
            },
            {
              name: 'nameLabel',
              type: 'text',
              label: 'Etiqueta Campo Nombre',
              defaultValue: 'Tu Nombre y Apellido *',
            },
            {
              name: 'namePlaceholder',
              type: 'text',
              label: 'Placeholder Campo Nombre',
              defaultValue: 'Ej: Laura Sofía Martínez',
            },
            {
              name: 'phoneLabel',
              type: 'text',
              label: 'Etiqueta Campo WhatsApp',
              defaultValue: 'Número de WhatsApp *',
            },
            {
              name: 'phonePlaceholder',
              type: 'text',
              label: 'Placeholder Campo WhatsApp',
              defaultValue: 'Ej: 305 282 9795',
            },
            {
              name: 'repairTitle',
              type: 'text',
              label: 'Título Botón Reparaciones',
              defaultValue: '¿Necesitas reparación de uña?',
            },
            {
              name: 'repairSubtitle',
              type: 'text',
              label: 'Subtítulo / Aclaración Reparaciones',
              defaultValue: 'Arreglo de uña partida o fisurada',
            },
            {
              name: 'repairPrice',
              type: 'number',
              label: 'Precio Adicional de Reparación (COP)',
              defaultValue: 8000,
            },
            {
              name: 'removalTitle',
              type: 'text',
              label: 'Título Botón Retiros',
              defaultValue: '¿Traes esmalte o sistema previo para retiro?',
            },
            {
              name: 'removalSubtitle',
              type: 'text',
              label: 'Subtítulo / Aclaración Retiros',
              defaultValue: 'Retiro cuidadoso de semipermanente o acrílico previo',
            },
            {
              name: 'removalPrice',
              type: 'number',
              label: 'Precio Adicional de Retiro (COP)',
              defaultValue: 15000,
            },
            {
              name: 'submitButtonText',
              type: 'text',
              label: 'Texto del Botón de Envío',
              defaultValue: 'Confirmar cita por WhatsApp',
            },
          ],
        },
      ],
    },
  ],
};
