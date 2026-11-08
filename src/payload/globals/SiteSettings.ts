import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración General del Negocio',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Datos de Contacto',
          fields: [
            {
              name: 'businessName',
              type: 'text',
              required: true,
              defaultValue: 'Nails Pastel',
              label: 'Nombre del Estudio',
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Estudio de Manicura & Nail Art Profesional',
              label: 'Eslogan / Subtítulo',
            },
            {
              name: 'whatsappNumber',
              type: 'text',
              required: true,
              defaultValue: '573052829795',
              label: 'Número de WhatsApp (con indicativo país, sin +)',
              admin: {
                description: 'Ej: 573052829795 para Colombia.',
              },
            },
            {
              name: 'notificationEmail',
              type: 'email',
              required: true,
              defaultValue: 'nelmarianm@gmail.com',
              label: 'Correo de Notificaciones / Google Calendar',
            },
            {
              name: 'googleCalendarScheduleUrl',
              type: 'text',
              defaultValue: 'https://calendar.google.com/calendar/u/0/appointments/schedules',
              label: 'Enlace a Página de Citas de Google Calendar (Appointment Schedule)',
              admin: {
                description: 'Link público generado desde calendar.google.com para citas nativas gratuitas.',
              },
            },
            {
              name: 'locationAddress',
              type: 'text',
              defaultValue: 'Local propio y privado (Dirección exacta enviada al confirmar anticipo)',
              label: 'Ubicación / Dirección',
            },
            {
              name: 'instagramHandle',
              type: 'text',
              defaultValue: '@nailspastel',
              label: 'Usuario de Instagram',
            },
          ],
        },
        {
          label: 'Horarios y Turnos',
          fields: [
            {
              name: 'openTime',
              type: 'text',
              required: true,
              defaultValue: '07:00',
              label: 'Hora de Apertura (formato 24h: HH:mm)',
            },
            {
              name: 'closeTime',
              type: 'text',
              required: true,
              defaultValue: '18:00',
              label: 'Hora de Cierre (formato 24h: HH:mm)',
            },
            {
              name: 'lunchBreak',
              type: 'text',
              required: true,
              defaultValue: '13:00',
              label: 'Inicio de Almuerzo / Bloqueo (formato 24h: HH:mm)',
            },
            {
              name: 'lunchDurationMinutes',
              type: 'number',
              defaultValue: 60,
              label: 'Duración de Almuerzo (Minutos)',
            },
            {
              name: 'slotDurationMinutes',
              type: 'number',
              defaultValue: 120,
              label: 'Duración Estándar por Turno (Minutos)',
            },
            {
              name: 'bufferMinutes',
              type: 'number',
              defaultValue: 10,
              label: 'Tiempo Colchón / Sanitización entre turnos (Minutos)',
            },
            {
              name: 'daysOpen',
              type: 'select',
              hasMany: true,
              label: 'Días Operativos Hábiles',
              defaultValue: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],
              options: [
                { label: 'Lunes', value: 'lunes' },
                { label: 'Martes', value: 'martes' },
                { label: 'Miércoles', value: 'miercoles' },
                { label: 'Jueves', value: 'jueves' },
                { label: 'Viernes', value: 'viernes' },
                { label: 'Sábado', value: 'sabado' },
                { label: 'Domingo', value: 'domingo' },
              ],
            },
          ],
        },
        {
          label: 'Políticas y Anticipo',
          fields: [
            {
              name: 'depositAmount',
              type: 'number',
              required: true,
              defaultValue: 15000,
              label: 'Valor del Anticipo / Reserva (COP)',
            },
            {
              name: 'depositInstructions',
              type: 'textarea',
              required: true,
              defaultValue: 'Transfiere tu anticipo de $15.000 COP a Nequi o Daviplata al 3052829795 a nombre de Nelmarian. Envía el comprobante por WhatsApp para validar tu reserva en el sistema.',
              label: 'Instrucciones de Pago del Anticipo',
            },
            {
              name: 'lateToleranceMinutes',
              type: 'number',
              defaultValue: 10,
              label: 'Tolerancia máxima de retraso (minutos)',
            },
            {
              name: 'bookingPolicies',
              type: 'textarea',
              defaultValue: '1. El anticipo es obligatorio para apartar el turno y se descuenta del valor total.\n2. Máximo 10 minutos de tolerancia.\n3. Cancelaciones o reprogramaciones deben avisarse con al menos 24 horas de anticipación.',
              label: 'Políticas y Condiciones visibles al cliente',
            },
          ],
        },
      ],
    },
  ],
};
