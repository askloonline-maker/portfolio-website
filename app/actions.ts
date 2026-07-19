"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// ✅ Vercel के नए variables को प्राथमिकता देते हुए नेटवर्क फ़ेच एरर फिक्स
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function createAnonymousPost(content: string) {
  if (!content || !content.trim()) {
    return { success: false, error: "Content cannot be empty" };
  }

  try {
    const { error } = await supabase
      .from("posts")
      .insert([
        {
          title: content.substring(0, 60), // पहले 60 अक्षर को टाइटल के रूप में सेट करना
          content: content,
          category: "General",
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error("Supabase Database Error:", error.message);
      return { success: false, error: error.message };
    }

    // होमपेज के कैश को सर्वर पर तुरंत रीवैलिडेट (Refresh) करना
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Server Action Execution Error:", err);
    return { success: false, error: err.message || "Server error occurred" };
  }
}
