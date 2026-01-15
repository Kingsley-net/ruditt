import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60; // Revalidate the data at most every 60 seconds

// The 'generateStaticParams' function was removed because it was causing a
// runtime error. It was attempting to access user cookies, which are not
// available during the static build process. By removing it, pages will be
// generated dynamically at request time. The `revalidate` option will still
// ensure the pages are cached for performance after the first visit.

export default async function SchoolSitePage({ params }) {
  const { schoolSlug } = params;

  // The supabase client for Server Components is asynchronous.
  const supabase = await createClient();

  const { data: school, error } = await supabase
    .from('schools')
    .select('html_content, status') // Select the html_content and status
    .eq('slug', schoolSlug)
    .single();

  // If there's an error or the school is not found, show a 404 page.
  if (error || !school) {
    notFound();
  }

  // If the school is found but is not published, show a specific message.
  if (school.status !== 'published') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa'
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Site Not Published</h1>
        <p style={{ fontSize: '16px', color: '#6c757d' }}>This site has been created but has not been published yet.</p>
        <p style={{ fontSize: '16px', color: '#6c757d' }}>Please check back later.</p>
      </div>
    );
  }

  // If the school is published but there is no content, show a default message.
  if (!school.html_content) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f8f9fa'
          }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Coming Soon!</h1>
            <p style={{ fontSize: '16px', color: '#6c757d' }}>This website is under construction.</p>
            <p style={{ fontSize: '16px', color: '#6c757d' }}>The school owner needs to add content in the Website Builder.</p>
        </div>
    );
}

  // If the school is published and has content, render it.
  return <div dangerouslySetInnerHTML={{ __html: school.html_content }} />;
}
