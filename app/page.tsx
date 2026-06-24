import React from "react";
import { createClient } from "@supabase/supabase-js";
import CreatePost from "../components/CreatePost";
import QuestionCard from "../components/QuestionCard";

// Initialize Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

async function checkDatabaseConnection() {
  try {
    // Tries to make a tiny query to verify connection
    const { data, error } = await supabase.from("posts").select("id").limit(1);
    if (error) return { connected: false, message: error.message };
    return { connected: true, message: "Database Connected Successfully!" };
  } catch (err: any) {
    return { connected: false, message: err.message || "Failed to connect" };
  }
}

async function getAllPublicPosts() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  } catch (err) {
    return [];
  }
}

export default async function HomePage() {
  const dbStatus = await checkDatabaseConnection();
  const posts = await getAllPublicPosts();

  return (
    <div className="space-y-6">
      {/* Premium Royal Blue Headline Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm border-t-4 border-t-[#1d4ed8]">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              🌐 Asklo Public Square
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Welcome to the world's open living room. No registration required. Everything here is entirely anonymous, instant, and free.
            </p>
          </div>

          {/* ⚡ LIVE CONNECTION STATUS BADGE */}
          {dbStatus.connected ? (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              Supabase Connected
            </span>
          ) : (
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
              ⚠️ Database Error: {dbStatus.message}
            </span>
          )}
        </div>
      </div>

      {/* Post Submission Box */}
      <CreatePost />

      {/* Streamed Content Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm italic">
            No discussions found yet. Break the ice and add the very first post above!
          </div>
        ) : (
          posts.map((post: any) => (
            <QuestionCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
