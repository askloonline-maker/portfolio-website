"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function createAnonymousPost(content: string) {
  try {
    const { error } = await supabase
      .from("posts")
      .insert([{ 
        title: content.substring(0, 50), 
        content: content,
        category: "General",
        author_name: "Anonymous", // 👈 यह जोड़ना बहुत ज़रूरी था!
        created_at: new Date().toISOString() 
      }]);

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.toString() };
  }
}
