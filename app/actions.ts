"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// पक्का करने के लिए कि वेरिएबल्स लोड हुए हैं या नहीं
if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase Config Error: URL or Key is missing in Vercel!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function createAnonymousPost(content: string) {
  if (!content || !content.trim()) return { success: false, error: "Empty content" };

  try {
    const { error } = await supabase
      .from("posts")
      .insert([{ title: content.substring(0, 60), content, category: "General", created_at: new Date().toISOString() }]);

    if (error) throw error;

    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Action Error:", err.message);
    return { success: false, error: err.message };
  }
}
