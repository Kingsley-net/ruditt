
import { NextRequest, NextResponse } from 'next/server';
import getColors from 'get-image-colors';

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get('imageUrl');

  if (!imageUrl) {
    return NextResponse.json({ error: 'imageUrl query parameter is required' }, { status: 400 });
  }

  try {
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: imageResponse.status });
    }
    const imageBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    const contentType = imageResponse.headers.get('content-type');

    if (!contentType) {
      return NextResponse.json({ error: 'Could not determine content type of image' }, { status: 400 });
    }

    const colors = await getColors(buffer, contentType);
    const palette = colors.map((color:any) => color.hex());

    return NextResponse.json({ palette });
  } catch (error) {
    console.error('Error extracting colors:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Error extracting colors', details: errorMessage }, { status: 500 });
  }
}


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
      type: file.type,
    });
    const palette = colors.map((color: { hex: () => string }) => color.hex());

    return NextResponse.json({ palette });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Error processing image.' });
  }
}
