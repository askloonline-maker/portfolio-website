"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// सर्वर-साइड और क्लाइंट-साइड दोनों फ़ॉलबैक क्रेडेंशियल्स का उपयोग करना
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SU_BASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
