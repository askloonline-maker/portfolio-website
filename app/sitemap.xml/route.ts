import { createClient } from "@supabase/supabase-js";

// Force Next.js to always fetch fresh database records whenever Google reads this sitemap
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

  // Fetch all posts from Supabase to extract their IDs
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("id, created_at")
      .order("created_at", { ascending: false });
    posts = data || [];
  }

  // 1. Start building the XML layout structure
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 2. Add static links (Your Home and Categories pages)
  xml += `
    <url>
      <loc>${BASE_URL}</loc>
      <changefreq>always</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${BASE_URL}/categories</loc>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${BASE_URL}/ask</loc>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  `;

  // 3. Dynamically loop through your Supabase posts and add their unique URLs
  posts.forEach((post) => {
    const postDate = post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    xml += `
    <url>
      <loc>${BASE_URL}/?post=${post.id}</loc>
      <lastmod>${postDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
    `;
  });

  xml += `</urlset>`;

  // Return the raw text as a proper browser-readable XML file map
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30"
    },
  });
}
