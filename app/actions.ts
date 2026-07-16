"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Vercel Environment Variables से कीज़ उठाना
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SU_BASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase configuration keys!");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
