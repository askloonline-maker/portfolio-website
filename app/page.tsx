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
  const latestPostDate = posts[0]?.created_at || new Date().toISOString();

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
      <div className={`transition-all duration-300 ${sharedPost ? "blur-md pointer-events-none brightness-95 opacity-50 select-none" : ""}`}>
        
        {/* Master Layout Grid */}
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_320px] gap-6 px-6 py-6">
          
          {/* Left Sidebar */}
          <aside className="hidden md:block sticky top-6 self-start space-y-6">
            <Sidebar />

            {/* Sidebar Promo Card */}
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

            {/* Footer */}
            <div className="text-[11px] font-medium text-slate-400 space-y-1 px-4">
              <div className="flex flex-wrap gap-1.5">
                <a href="#about" className="hover:underline">About</a>
                <span>·</span>
                <a href="#terms" className="hover:underline">Terms</a>
                <span>·</span>
                <a href="#privacy" className="hover:underline">Privacy</a>
              </div>
              <p>© AskLo Inc. 2026</p>
            </div>
          </aside>

          {/* Center Feed */}
          <section className="space-y-5">
            
            {/* 🟦 Compact Blue Hero Banner (Without Stats Indicators) */}
            <div className="rounded-2xl bg-gradient-to-r from-[#0d1b2a] via-[#1b263b] to-[#2e3e52] text-white p-6 relative overflow-hidden shadow-md border border-slate-800/20 flex flex-col justify-between min-h-[170px]">
              
              {/* Minimalist ambient lamp/glow on the right side */}
              <div className="absolute right-8 bottom-0 top-0 hidden lg:flex items-center justify-center opacity-30 pointer-events-none">
                <div className="relative w-24 h-24 bg-blue-400/20 rounded-full blur-2xl"></div>
              </div>

              <div className="space-y-1 z-10 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-wider text-blue-300 border border-white/5">
                  🌐 The World's Living <span className="text-yellow-400">Room</span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug mt-1">
                  Ask anything.<br />Share what you can't say anywhere else.
                </h1>
              </div>

              <div className="flex gap-2.5 mt-4 z-10">
                <a href="#ask-section" className="bg-white hover:bg-slate-100 text-slate-900 px-4 py-2 rounded-lg text-xs font-bold transition shadow-xs">
                  Ask Anonymously
                </a>
                <button className="bg-white/15 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition border border-white/10">
                  Explore Topics
                </button>
              </div>
            </div>

            {/* Sync Alert if Offline */}
            {!dbStatus.connected && (
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-3.5 text-xs font-bold text-rose-700 shadow-sm">
                🚨 Sync Notice: {dbStatus.message}
              </div>
            )}

            {/* 📥 Interactive Post Creator */}
            <div id="ask-section" className="scroll-mt-20">
              <CreatePost />
            </div>

            {/* Feed Filter Tab Navigation */}
            <div className="flex items-center gap-1 border-b border-slate-100 pb-1">
              {[
                { name: "For You", active: true },
                { name: "Trending", active: false },
                { name: "Latest", active: false },
                { name: "Following", active: false },
              ].map((tab) => (
                <button
                  key={tab.name}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    tab.active
                      ? "bg-blue-50 text-blue-600 shadow-xs"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Questions Stream */}
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
                  <p className="text-sm font-bold text-slate-800">No anonymous discussions active.</p>
                  <p className="mt-1 text-xs text-slate-400">Be the first person to initiate an open dialog.</p>
                </div>
              ) : (
                posts.map((post: any) => <QuestionCard key={post.id} post={post} />)
              )}
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className="hidden lg:block sticky top-6 self-start">
            <RightSidebar {...({ customTopics: latestUniqueTopics } as any)} />
          </aside>

        </div>
      </div>

      {/* Shared Post Overlay Modal */}
      {sharedPost && (
        <div className="fixed inset-0 z-50 flex flex-col items-center
