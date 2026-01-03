export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

// Optional: Metadata for SEO based on the school
export async function generateMetadata(props) {
  const params = await props.params;
  return { title: `School: ${params.schoolSlug}` };
}

export default async function SchoolSitePage(props) {
  // 1. In Next.js 16, params MUST be awaited
  const params = await props.params;
  const schoolSlug = params.schoolSlug;

  const supabase = await createClient();

  // 2. Use maybeSingle() to handle missing rows gracefully without throwing
  const { data: school, error } = await supabase
    .from("schools")
    .select("html_content, is_published")
    .eq("slug", schoolSlug)
    .maybeSingle();

  // 3. Robust checks: Ensure school exists and is actually published
  if (error || !school || !school.is_published) {
    return notFound(); // Shows your app's not-found.tsx page
  }
  return (
    <div className="min-h-screen bg-white">
      {/* The 'prose' class is what makes the raw HTML look like a website */}
      <article className="prose prose-slate prose-xl max-w-none">
        <div dangerouslySetInnerHTML={{ __html: school.html_content }} />
      </article>
    </div>
  )

 
      
    
}
