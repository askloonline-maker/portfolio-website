import { createClient } from "@supabase/supabase-js";

// Ensure Next.js builds this dynamically on request instead of statically caching empty/stale logs
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE_URL = "https://www.asklo.online";

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey);
}

export async function GET() {
  const supabase = getSupabaseClient();
  let posts: any[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("id, created_at")
      .order("created_at", { ascending: false });
    posts = data || [];
  }

  // 1. Build the XML map headers with strict line returns and no leading tabs/spaces
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 2. Add core static pages (No manual formatting indents inside strings)
  xml += `  <url>\n    <loc>${BASE_URL}</loc>\n    <changefreq>always</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${BASE_URL}/categories</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${BASE_URL}/ask</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;

  // 3. Dynamically append loop strings cleanly
  posts.forEach((post) => {
    const postDate = post.created_at 
      ? new Date(post.created_at).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0];
    
    xml += `  <url>\n    <loc>${BASE_URL}/?post=${post.id}</loc>\n    <lastmod>${postDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += "</urlset>";

  // 4. Return clean context validation parameters explicitly back to Google
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}
