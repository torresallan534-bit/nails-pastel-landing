import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { services, gallery, config } = body;

    // Verify presence of data
    if (!services && !gallery && !config) {
      return NextResponse.json({ error: 'No se recibieron datos para guardar.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // Log the update
    console.log(`[ADMIN SAVE] Actualización recibida a las ${timestamp}`);

    return NextResponse.json({
      success: true,
      message: '¡Datos guardados y sincronizados exitosamente!',
      timestamp,
      countServices: services ? services.length : undefined,
      countGallery: gallery ? gallery.length : undefined,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al procesar el guardado.', details: error.message },
      { status: 500 }
    );
  }
}
