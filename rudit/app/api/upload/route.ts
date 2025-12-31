'use client'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new NextResponse('No file provided', { status: 400 });
    }

    const filePath = `public/${Date.now()}_${file.name}`;

    const { data, error: uploadError } = await supabase.storage
      .from('images') 
      .upload(filePath, file);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return new NextResponse(`Upload error: ${uploadError.message}`, { status: 500 });
    }

    // Get the public URL
    const { publicURL, error: urlError } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('Supabase URL error:', urlError);
      return new NextResponse(`Error getting public URL: ${urlError.message}`, { status: 500 });
    }

    return new NextResponse(JSON.stringify({ url: publicURL }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (e) {
    console.error('Server error:', e);
    return new NextResponse(`Server error: ${e.message}`, { status: 500 });
  }
}
