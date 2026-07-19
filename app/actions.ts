"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// एनवायरनमेंट वेरिएबल्स को सुरक्षित तरीके से लोड करना
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// अगर वेरिएबल्स गायब हैं, तो सर्वर क्रैश होने से बचाएं
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export async function createAnonymousPost(content: string) {
  if (!supabase) {
    return { success: false, error: "Database configuration is missing." };
  }

  if (!content || !content.trim()) {
    return { success: false, error: "Content cannot be empty." };
  }

  try {
    const { error } = await supabase
      .from("posts")
      .insert([{
        title: content.substring(0, 50),
        content: content.trim(),
        author_name: "Anonymous",
        category: "General",
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;

    revalidatePath("/"); // होमपेज रिफ्रेश करें
    return { success: true };
  } catch (err: any) {
    console.error("Action Error:", err);
    return { success: false, error: err.message || "Failed to publish." };
  }
}
