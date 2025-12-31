
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function SchoolSitePage({ params }) {
  // 1. Get the school slug from the dynamic route parameter
  const { schoolSlug } = params;

  // 2. Create a Supabase client for server-side operations
  const supabase = createServerClient();

  // 3. Fetch the school data from the 'schools' table
  const { data: school, error } = await supabase
    .from('schools')
    .select('html_content, status')
    .eq('slug', schoolSlug)
    .single();

  // 4. If there was an error or the school is not found, return a 404 page
  if (error || !school) {
    notFound();
  }

  // 5. If the school's site is not published, show a simple message
  if (school.status !== 'published') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'sans-serif'
      }}>
        <p>This site is not currently published.</p>
      </div>
    );
  }

  // 6. If the site is published, render the stored HTML content
  // WARNING: Only use dangerouslySetInnerHTML with trusted, sanitized HTML
  // to prevent XSS attacks. We trust our saved HTML in this case.
  return <div dangerouslySetInnerHTML={{ __html: school.html_content }} />;
}
