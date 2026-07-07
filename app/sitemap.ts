import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

// Forces the sitemap to update dynamically whenever Google crawls it
export const revalidate = 0;
export const dynamic = "force-dynamic";

const BASE_URL = "https://www.asklo.online";

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = getSupabaseClient();
  let posts: any[] = [];

  // Fetch live posts from Supabase
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("id, created_at")
      .order("created_at", { ascending: false });
    posts = data || [];
  }

  // 1. Define core platform static routes along with legal and space categories
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ask`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Category Space Paths
    {
      url: `${BASE_URL}/space/digital-marketing`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/space/startups-business`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/space/artificial-intelligence`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/space/tech`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/space/health-fitness-beauty`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/space/others`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.64,
    },
  ];

  // 2. Map dynamic posts directly into the official object type layout
  const dynamicPostRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/?post=${post.id}`,
    lastModified: post.created_at ? new Date(post.created_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Combine both sets and export cleanly back to Next.js
  return [...staticRoutes, ...dynamicPostRoutes];
}
