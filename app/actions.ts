"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Vercel वेरिएबल्स से सुरक्षित लोडिंग
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function createAnonymousPost(content: string) {
  // अगर URL या Key ही गलत है, तो यही पकड़ लें
  if (!supabaseUrl.startsWith("http")) {
    return { success: false, error: "Invalid Database URL configuration." };
  }

  try {
    const { error } = await supabase
      .from("posts")
      .insert([{
        title: content.substring(0, 50),
        content: content.trim(),
        author_name: "Anonymous",
        category: "General"
      }]);

    if (error) throw error;

    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
