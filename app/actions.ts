"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function createAnonymousPost(content: string) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // 1. अगर URL या Key सही नहीं है, तो तुरंत बता दें
  if (!url || !url.startsWith("https")) {
    console.error("CRITICAL ERROR: Supabase URL is invalid:", url);
    return { success: false, error: `Invalid URL: ${url}` };
  }

  if (!key) {
    console.error("CRITICAL ERROR: Supabase Anon Key is missing");
    return { success: false, error: "Missing Supabase Key" };
  }

  try {
    const supabase = createClient(url, key);
  
    // 2. इनपुट चेक करें
    if (!content || !content.trim()) {
      return { success: false, error: "Content cannot be empty." };
    }

    // 3. डेटाबेस में पोस्ट सेव करें
    const { error } = await supabase
      .from("posts")
      .insert([
        {
          title: content.trim().substring(0, 50),
          content: content.trim(),
          author_name: "Anonymous",
          category: "General",
        },
      ]);

    if (error) {
      console.error("Supabase Database Error:", error.message);
      return { success: false, error: error.message };
    }

    // 4. पेज रीवैलिडेट करें ताकि नई पोस्ट तुरंत दिखे
    revalidatePath("/");
    return { success: true };

  } catch (err: any) {
    console.error("Unexpected Error in Action:", err);
    return { success: false, error: err?.message || "Internal Server Error" };
  }
}
