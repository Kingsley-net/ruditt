
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import getColors from 'get-image-colors';

export const streaming = 'edge';
export const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request: Request) {
  const { imageUrl } = await request.json();

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const colors = await getColors(imageUrl, { count: 1 });
    const dominantColor = colors[0].hex();

    if (dominantColor) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('schools (id)')
        .eq('id', user.id)
        .single();

      if (profile && profile.schools) {
        const schoolId = (profile.schools as any).id;
        
        const { error: updateError } = await supabase
          .from('schools')
          .update({ theme_color: dominantColor, logo_url: imageUrl })
          .eq('id', schoolId);

        if (updateError) {
          console.error('Supabase update error:', updateError);
          throw updateError;
        }

        return NextResponse.json({ message: 'Theme updated successfully', color: dominantColor, logo_url: imageUrl });

      } else {
        return NextResponse.json({ error: 'Could not find an associated school for the user.' }, { status: 404 });
      }
    } else {
         return NextResponse.json({ error: 'Could not extract a dominant color from the image.' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Error in theme update API:', error);
    return NextResponse.json({ error: 'Failed to process image and update theme.', details: error.message }, { status: 500 });
  }
}
