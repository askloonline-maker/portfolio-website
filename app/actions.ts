"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Server side credentials (ये सर्वर पर हमेशा उपलब्ध रहते हैं)
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function createAnonymousPost(content: string) {
  if (!content.trim()) return { success: false, error: "Content is empty" };

  try {
    const { error } = await supabase
      .from("posts")
      .insert([
        {
          title: content.substring(0, 60),
          content: content,
          category: "General",
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error("Supabase Insertion Error:", error.message);
      return { success: false, error: error.message };
    }

    // फ़ीड को सर्वर साइड पर तुरंत रिफ्रेश करने के लिए
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Action Error:", err);
    return { success: false, error: err.message || "Server Error" };
  }
}
