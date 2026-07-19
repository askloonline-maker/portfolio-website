"use server";

import { createClient } from "@supabase/supabase-js";

export async function createAnonymousPost(content: string) {
  const url = process.env.SUPABASE_URL;
  
  // अगर URL 'https' से शुरू नहीं हो रहा, तो हमें एरर साफ़ दिखेगा
  if (!url || !url.startsWith("https")) {
    console.error("CRITICAL ERROR: Supabase URL is invalid:", url);
    return { success: false, error: `Invalid URL: ${url}` };
  }

  const supabase = createClient(url, process.env.SUPABASE_ANON_KEY!);
  
  // ... बाकी कोड ...
}
