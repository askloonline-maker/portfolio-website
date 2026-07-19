"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function createAnonymousPost(content: string) {
  try {
    // यहाँ हम वो सब कुछ भेज रहे हैं जो आपकी टेबल में है
    const postData = {
      title: content.substring(0, 50),
      content: content,
      author_name: "Anonymous",
      category: "General",
      // created_at और id को Supabase खुद संभाल लेगा अगर वे डिफॉल्ट हैं
    };

    const { data, error } = await supabase
      .from("posts")
      .insert([postData]);

    if (error) {
      console.error("SUPABASE ERROR DETAILS:", error); // यह Vercel Logs में दिखेगा
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("CATCH ERROR:", err);
    return { success: false, error: "System error, please check logs." };
  }
}
