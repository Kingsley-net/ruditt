
import { NextRequest, NextResponse } from 'next/server';
import getColors from 'get-image-colors';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided.' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const colors = await getColors(buffer, {
      type: 'image/png',
    });
    const palette = colors.map((color: { hex: () => string }) => color.hex());

    return NextResponse.json({ palette });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Error processing image.' });
  }
}
