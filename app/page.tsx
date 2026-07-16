import React from "react";
import { createClient } from "@supabase/supabase-js";
import CreatePost from "../components/CreatePost";
import QuestionCard from "../components/QuestionCard";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

export const revalidate = 0;

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey);
}

async function checkDatabaseConnection() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return { connected: false, message: "Supabase key missing" };
    const { error } = await supabase.from("posts").select("id").limit(1);
    if (error) return { connected: false, message: error.message };
    return { connected: true, message: "Anonymous posting is live" };
  } catch (err: any) {
    return { connected: false, message: err.message || "Connection failed" };
  }
}

async function getAllPublicPosts() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];
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

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const dbStatus = await checkDatabaseConnection();
  const posts = await getAllPublicPosts();

  const targetPostId = typeof resolvedParams.post === "string" ? resolvedParams.post : null;
  const sharedPost = targetPostId ? posts.find((p) => p.id === targetPostId) : null;

  // Extract latest unique tags
  const uniqueTopicsSet = new Set<string>();
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        if (tag) uniqueTopicsSet.add(tag.trim());
      });
    } else if (post.category) {
      uniqueTopicsSet.add(post.category.trim());
    }
  });
  const latestUniqueTopics = Array.from(uniqueTopicsSet).slice(0, 5);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 relative font-sans antialiased">
      <div className={sharedPost ? "blur-md pointer-events-none brightness-95 opacity-50 select-none transition-all duration-300" : "transition-all duration-300"}>
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_320px] gap-6 px-6 py-6">
          
          {/* Left Sidebar */}
          <aside className="hidden md:block sticky top-6 self-start space-y-6">
            <Sidebar />
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 border border-blue-100/50 relative overflow-hidden shadow-sm">
              <div className="absolute right-[-10px] bottom-[-10px] w-16 h-16 bg-blue-600/10 rounded-full blur-xl"></div>
              <h4 className="font-extrabold text-slate-800 text-sm leading-snug">
                Ask freely.<br />Answer boldly.
              </h4>
              <div className="mt-4 space-y-1.5">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">100% Anonymous</p>
                <p className="text-[11px] font-semibold text-slate-500">No login required</p>
              </div>
              <div className="absolute right-4 bottom-4 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] shadow-md shadow-blue-500/20">
                ✓
              </div>
            </div>
            <div className="text-[11px] font-medium text-slate-400 space-y-1 px-4">
              <div
