"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function createAnonymousPost(content: string) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  // यहाँ हमने दोनों नई और पुरानी दोनों प्रकार की की का सपोर्ट जोड़ दिया है
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !url.startsWith("https")) {
    return { success: false, error: `Invalid URL: ${url}` };
  }

  if (!key) {
    return { success: false, error: "Missing Supabase Key" };
  }

  try {
    const supabase = createClient(url, key);
  
    if (!content || !content.trim()) {
      return { success: false, error: "Content cannot be empty." };
    }

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

    revalidatePath("/");
    return { success: true };

  } catch (err: any) {
    console.error("Unexpected Error in Action:", err);
    return { success: false, error: err?.message || "Internal Server Error" };
  }
}
