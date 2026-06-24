import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      error: "Supabase environment variables are missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.",
    };
  }

  return { supabaseUrl, serviceRoleKey };
}

function getSupabaseClient() {
  const config = getSupabaseConfig();

  if ("error" in config) {
    return { error: config.error };
  }

  return {
    supabase: createClient(config.supabaseUrl, config.serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }),
  };
}

function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : "Unexpected database error";
}

export async function GET() {
  try {
    const client = getSupabaseClient();
    if ("error" in client) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const { data, error } = await client.supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = getSupabaseClient();
    if ("error" in client) {
      return NextResponse.json({ error: client.error }, { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    const title = typeof body.title === "string" && body.title.trim() ? body.title.trim() : "Anonymous question";
    const content = typeof body.content === "string" ? body.content.trim() : "";

    if (!content) {
      return NextResponse.json({ error: "Post content is required" }, { status: 400 });
    }

    const { data, error } = await client.supabase
      .from("posts")
      .insert({
        title,
        content,
        author_name: "Anonymous",
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
}
