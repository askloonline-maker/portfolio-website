import React from "react";
import { createClient } from "@supabase/supabase-js";
import CreatePost from "../components/CreatePost";
import QuestionCard from "../components/QuestionCard";

// Initialize Supabase Client directly for Server Component fetching
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

async function getPosts() {
  try {
    // Pulls EVERY single legal post without filtering by user login state
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false }); // Newest questions show up first

    if (error) {
      console.error("Supabase error fetching posts:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("Failed to connect to database:", err);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      {/* Premium Subheader Intro Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">
          Welcome to the Public Square 🌐
        </h1>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Ask questions, share information, or start discussions. No signup required. Everything posted here is completely anonymous and open to the world.
        </p>
      </div>

      {/* Box to create a new post */}
      <CreatePost />

      {/* Dynamic Main Feed Container */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-sm italic">
            No discussions found. Be the first to ask a question above!
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
