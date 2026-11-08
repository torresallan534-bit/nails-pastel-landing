import type { GlobalConfig } from 'payload';

export const PoliciesContent: GlobalConfig = {
  slug: 'policies-content',
  label: '🛡️ Políticas y Anticipo',
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
          label: 'Encabezado y Anticipo',
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Insignia Superior (Badge)',
              defaultValue: 'Transparencia & Compromiso Mutuo',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Título de la Sección',
              defaultValue: 'Políticas de Reserva y Anticipo',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Párrafo Descriptivo',
              defaultValue:
                'Trabajamos con citas programadas para brindarte un servicio exclusivo, higiénico y sin retrasos.',
            },
            {
              name: 'depositAmount',
              type: 'number',
              label: 'Monto del Anticipo (COP)',
              defaultValue: 15000,
              required: true,
            },
            {
              name: 'accountNumber',
              type: 'text',
              label: 'Número de Cuenta / Teléfono Nequi o Daviplata',
              defaultValue: '305 282 9795',
            },
            {
              name: 'accountBank',
              type: 'text',
              label: 'Entidad / Plataforma',
              defaultValue: 'Nequi / Daviplata',
            },
            {
              name: 'accountHolder',
              type: 'text',
              label: 'Titular de la Cuenta',
              defaultValue: 'Nelmarian',
            },
            {
              name: 'footerNotice',
              type: 'text',
              label: 'Aviso Inferior de Ubicación',
              defaultValue:
                'Al confirmar tu cita por WhatsApp, te enviaremos la ubicación exacta y el mapa del estudio en Bogotá.',
            },
          ],
        },
        {
          label: 'Tarjetas de Políticas',
          fields: [
            {
              name: 'policiesList',
              type: 'array',
              label: 'Tarjetas de Políticas (3 o 4 puntos)',
              defaultValue: [
                {
                  title: 'Anticipo de $15.000 COP',
                  description:
                    'Para apartar tu turno en la agenda se requiere el abono de $15.000 COP a través de Nequi o Daviplata. Este valor se deduce automáticamente del monto total el día de tu servicio.',
                  badgeText: 'Obligatorio para agendar',
                  icon: 'Smartphone',
                },
                {
                  title: 'Tolerancia de 10 Minutos',
                  description:
                    'Tolerancia máxima de retraso: 10 minutos. Pasado ese tiempo, el turno podría ser reajustado en diseño o cancelado para respetar el tiempo de la siguiente clienta.',
                  badgeText: 'Puntualidad es respeto mutuo',
                  icon: 'Clock',
                },
                {
                  title: 'Reprogramaciones (24h)',
                  description:
                    'Puedes reprogramar tu fecha u hora con al menos 24 horas de anticipación sin perder tu abono. Las cancelaciones de último momento no son reembolsables.',
                  badgeText: 'Aviso previo protege tu cupo',
                  icon: 'CalendarCheck',
                },
              ],
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Título de la Política',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  label: 'Explicación Detallada',
                },
                {
                  name: 'badgeText',
                  type: 'text',
                  label: 'Etiqueta Inferior Resaltada',
                },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icono Representativo',
                  defaultValue: 'Clock',
                  options: [
                    { label: 'Teléfono / Pagos (Smartphone)', value: 'Smartphone' },
                    { label: 'Reloj / Tiempo (Clock)', value: 'Clock' },
                    { label: 'Calendario / Citas (CalendarCheck)', value: 'CalendarCheck' },
                    { label: 'Escudo / Bioseguridad (ShieldCheck)', value: 'ShieldCheck' },
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
