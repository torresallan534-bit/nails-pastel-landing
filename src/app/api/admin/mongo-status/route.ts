import { NextResponse } from 'next/server';

export async function GET() {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URI || process.env.DATABASE_URL;
  const payloadSecret = process.env.PAYLOAD_SECRET;

  const isConfigured = Boolean(mongoUri);
  let maskedUri = 'No configurada en Vercel';

  if (mongoUri) {
    try {
      // Mask password in URI
      maskedUri = mongoUri.replace(/(mongodb(\+srv)?:\/\/[^:]+:)[^@]+(@.+)/, '$1••••••••$3');
    } catch {
      maskedUri = 'Configurada (cadena protegida)';
    }
  }

  return NextResponse.json({
    status: isConfigured ? 'CONNECTED_ENV' : 'MISSING_ENV',
    hasMongoUri: isConfigured,
    maskedUri,
    hasPayloadSecret: Boolean(payloadSecret),
    environment: process.env.NODE_ENV || 'production',
    vercelEnv: process.env.VERCEL_ENV || 'local',
    timestamp: new Date().toISOString(),
  });
}
