import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const BASE_URL = "https://www.asklo.online";

function getSupabaseClient() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yyxaxcqlrxawdtloucwx.supabase.co";
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_eXzrOqilWFw1Pd5q1xeTYg_exKGkl5C";

  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = getSupabaseClient();
  let posts: any[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, created_at")
        .order("created_at", { ascending: false });

      if (!error && data) {
        posts = data;
      }
    } catch (err) {
      console.error("Sitemap fetch error:", err);
    }
  }

  // 1. Core static routes and category spaces
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

  // 2. Map dynamic posts
  const dynamicPostRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/?post=${post.id}`,
    lastModified: post.created_at ? new Date(post.created_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicPostRoutes];
}
