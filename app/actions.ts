"use server";

import { createClient } from "@supabase/supabase-js";

// पक्का करें कि ये Vercel से आ रहे हैं
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function createAnonymousPost(content: string) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ 
        title: content.substring(0, 50), 
        content: content,
        author_name: "Anonymous",
        category: "General"
      }]);

    if (error) {
      // यहाँ हम एरर के साथ उसका 'code' और 'details' भी प्रिंट करेंगे
      console.error("Supabase Error Object:", JSON.stringify(error, null, 2));
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
