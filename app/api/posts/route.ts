import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. URL को सीधे यहाँ फिक्स कर दिया ताकि 'Invalid URL' का झंझट हमेशा के लिए खत्म हो जाए
    const supabaseUrl = "https://dmcbbpusnruwopdkkiom.supabase.co";
    
    // 2. सीक्रेट की को Vercel Environment Variables से सुरक्षित तरीके से उठा रहे हैं
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseKey) {
      return NextResponse.json({ error: "Supabase Secret Key missing on server" }, { status: 500 });
    }

    // क्लाइंट इनिशियलाइज करना
    const supabase = createClient(supabaseUrl, supabaseKey.trim(), {
      auth: { persistSession: false }
    });

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
