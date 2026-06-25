import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

// Your existing POST route
export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Server configuration error: missing Supabase credentials" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { title, content, category, author_name, user_id } = body;

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ error: "Category/topic selection is required" }, { status: 400 });
    }

    const { data, error } = await supabase.from("posts").insert([
      {
        title: title || "Anonymous question",
        content: content.trim(),
        category: category, 
        author_name: author_name || "Anonymous",
        user_id: user_id || "00000000-0000-0000-0000-000000000000",
      },
    ]).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unexpected error" }, { status: 500 });
  }
}

// 🎯 ADD THIS GET HANDLER TO FILTER POSTS BY SPACE PARAMETERS
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase configuration error" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const categoryFilter = searchParams.get("category");

    let query = supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    // If an intentional filter parameter is present, target it directly
    if (categoryFilter) {
      query = query.eq("category", categoryFilter);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to load posts" }, { status: 500 });
  }
}
