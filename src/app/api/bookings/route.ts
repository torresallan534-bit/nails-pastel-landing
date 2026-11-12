import { NextRequest, NextResponse } from 'next/server';
import { BookingWebhookPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { client, service, appointment } = body;

    if (!client?.name || !client?.phone || !service?.title || !appointment?.date || !appointment?.startTime) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios para registrar la cita.' },
        { status: 400 }
      );
    }

    const bookingId = `NP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    const webhookPayload: BookingWebhookPayload = {
      source: 'web_landing_nails_pastel',
      timestamp: new Date().toISOString(),
      bookingId,
      client: {
        name: client.name.trim(),
        phone: client.phone.trim(),
        notes: client.notes?.trim() || '',
        needsRepair: Boolean(client.needsRepair),
        needsRemoval: Boolean(client.needsRemoval),
      },
      service: {
        id: service.id,
        title: service.title,
        category: service.category || 'Manicura',
        basePrice: Number(service.basePrice) || 0,
        variants: service.variants || [],
        totalEstimatedPrice: Number(service.totalEstimatedPrice) || Number(service.basePrice) || 0,
        depositRequired: 15000,
        remainingBalance: Math.max(0, (Number(service.totalEstimatedPrice) || Number(service.basePrice) || 0) - 15000),
        durationMinutes: Number(service.durationMinutes) || 120,
        repairPrice: Number(service.repairPrice) || 0,
        removalPrice: Number(service.removalPrice) || 0,
      },
      appointment: {
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        calendarEmail: 'nelmarianm@gmail.com',
        location: 'Nails Pastel Studio - Local Propio',
      },
      status: 'PENDING_DEPOSIT_VERIFICATION',
    };

    // Forward to n8n webhook if configured
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    let n8nDispatched = false;

    if (n8nWebhookUrl) {
      try {
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload),
        });
        n8nDispatched = response.ok;
      } catch (err) {
        console.warn('Could not forward to n8n webhook:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Turno registrado preliminarmente. Esperando comprobante de anticipo.',
      bookingId,
      n8nDispatched,
      data: webhookPayload,
    });
  } catch (error: any) {
    console.error('Error handling booking request:', error);
    return NextResponse.json(
      { error: 'Error interno al procesar la cita.', details: error.message },
      { status: 500 }
    );
  }
}
