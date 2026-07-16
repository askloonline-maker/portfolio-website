"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Vercel Environment Variables से कीज़ उठाना
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SU_BASE_ANON_KEY || "";

// Supabase client को सर्वर साइड पर initialize करना
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function createAnonymousPost(content: string) {
  // अगर कंटेंट खाली है तो यहीं से वापस लौट जाएं
  if (!content || !content.trim()) {
    return { success: false, error: "Content cannot be empty" };
  }

  try {
    const { error } = await supabase
      .from("posts")
      .insert([
        {
          title: content.substring(0, 60), // पहले 60 कैरेक्टर्स को टाइटल मान लेते हैं
          content: content,
          category: "General", 
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error("Supabase Insertion Error:", error.message);
      return { success: false, error: error.message };
    }

    // '/' (Home Page) के कैश को रीवैलिडेट करना ताकि नया पोस्ट तुरंत दिखाई दे
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Action Error:", err);
    return { success: false, error: err.message || "Something went wrong on the server" };
  }
}
