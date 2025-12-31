import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { html } = await request.json();

    if (!html) {
      return new NextResponse('No HTML content provided', { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'rudit', 'dist', 'index.html');
    await fs.writeFile(filePath, html);

    return new NextResponse(JSON.stringify({ filePath }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('Server error:', e);
    return new NextResponse(`Server error: ${e.message}`, { status: 500 });
  }
}
