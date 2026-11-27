import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) return null;

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function validatePostId(postId: string) {
  return UUID_PATTERN.test(postId);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  if (!validatePostId(postId)) {
    return NextResponse.json({ error: "A valid post ID is required" }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    const error = new Error("Missing Supabase server credentials");
    console.error("[replies] Failed to fetch replies:", error);
    return NextResponse.json({ error: "Replies are temporarily unavailable" }, { status: 500 });
  }

  try {
    const { data, error } = await supabase
      .from("replies")
      .select("id, post_id, content, author_name, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[replies] Failed to fetch replies:", error);
      return NextResponse.json({ error: "Unable to load replies" }, { status: 500 });
    }

    return NextResponse.json({ replies: data ?? [] });
  } catch (error) {
    console.error("[replies] Failed to fetch replies:", error);
    return NextResponse.json({ error: "Unable to load replies" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;
  if (!validatePostId(postId)) {
    return NextResponse.json({ error: "A valid post ID is required" }, { status: 400 });
  }

  let body: { content?: unknown };
  try {
    body = await request.json();
  } catch (error) {
    console.error("[replies] Invalid submission body:", error);
    return NextResponse.json({ error: "Reply content is required" }, { status: 400 });
  }

  const content = typeof body.content === "string" ? body.content.trim() : "";
  if (!content) {
    return NextResponse.json({ error: "Reply content is required" }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    const error = new Error("Missing Supabase server credentials");
    console.error("[replies] Failed to submit reply:", error);
    return NextResponse.json({ error: "Replies are temporarily unavailable" }, { status: 500 });
  }

  try {
    const { data, error } = await supabase
      .from("replies")
      .insert({ post_id: postId, content, author_name: "Anonymous" })
      .select("id, post_id, content, author_name, created_at")
      .single();

    if (error) {
      console.error("[replies] Failed to submit reply:", error);
      return NextResponse.json({ error: "Unable to submit reply" }, { status: 500 });
    }

    return NextResponse.json({ reply: data }, { status: 201 });
  } catch (error) {
    console.error("[replies] Failed to submit reply:", error);
    return NextResponse.json({ error: "Unable to submit reply" }, { status: 500 });
  }
}
