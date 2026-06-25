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
        category: category, // Inserts the chosen slug (e.g., 'startups-business') into your database column
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
