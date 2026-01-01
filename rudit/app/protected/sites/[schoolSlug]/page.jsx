export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";

export default async function SchoolSitePage(props) {
  // ✅ params MUST be awaited
  const params = await props.params;
  const schoolSlug = params.schoolSlug;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("schools")
    .select("html_content")
    .eq("slug", schoolSlug)
    .single();

  if (error || !data) {
    return <h1>School not found</h1>;
  }

  return (
    <main dangerouslySetInnerHTML={{ __html: data.html_content }} />
  );
}
