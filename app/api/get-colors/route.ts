
import { NextResponse } from 'next/server';
import getColors from 'get-image-colors';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('imageUrl');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  try {
    const colors = await getColors(imageUrl, {
      count: 5, // Increased from 2 to 5
      type: 'image/png',
    });
    const palette = colors.map(color => color.hex());

    return NextResponse.json({ palette });
  } catch (error) {
    console.error('Error getting image colors:', error);
    return NextResponse.json({ error: 'Failed to extract colors from image' }, { status: 500 });
  }
}
