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
          
          {/* 🚪 Left Sidebar (Fully expanded & matching mockup style) */}
          <aside className="hidden md:block sticky top-6 self-start space-y-6">
            <Sidebar />

            {/* Sidebar Promo Card "Ask freely. Answer boldly." */}
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

          {/* ⚡ Center Feed (Main Content) */}
          <section className="space-y-6">
            
            {/* 🟦 1. Premium Blue Hero Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-[#0d1b2a] via-[#1b263b] to-[#415a77] text-white p-8 relative overflow-hidden shadow-xl border border-slate-800/20 flex flex-col justify-between min-h-[260px]">
              {/* Background Artful Elements */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-[240px] h-[200px]">
                {/* Visual Placeholder representing the cozy room sofa concept with glowing lamp */}
                <div className="relative w-full h-full opacity-90">
                  <div className="absolute bottom-4 left-6 w-40 h-20 bg-blue-950/40 rounded-t-3xl border-t border-blue-500/20 shadow-inner"></div> {/* Sofa Base */}
                  <div className="absolute bottom-20 left-32 w-12 h-12 bg-yellow-100/10 rounded-full blur-md animate-pulse"></div> {/* Glowing Lamp effect */}
                  <div className="absolute bottom-6 left-36 w-1 h-14 bg-slate-400"></div> {/* Lamp Stand */}
                  <div className="absolute bottom-20 left-34 w-5 h-5 bg-slate-300 rounded-t-full"></div> {/* Shade */}
                  <div className="absolute top-2 left-16 bg-blue-500/20 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 flex items-center gap-1.5">
                    <span className="text-sm">?</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 z-10 max-w-lg">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-300 border border-white/5">
                  🌐 The World's Living <span className="text-yellow-400">Room</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mt-1">
                  Ask anything.<br />Share what you can't say anywhere else.
                </h1>
                
                {/* Stats indicators inside banner */}
                <div className="flex gap-4 pt-2 text-xs text-slate-300 font-medium">
                  <div><strong className="text-white">5,246</strong> Questions Today</div>
                  <div><strong className="text-white">18,743</strong> Discussions</div>
                  <div><strong className="text-white">100%</strong> Anonymous</div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 z-10">
                <a href="#ask-section" className="bg-white hover:bg-slate-100 text-slate-900 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md">
                  Ask Anonymously
                </a>
                <button className="bg-white/15 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition border border-white/10">
                  Explore Topics
                </button>
              </div>
            </div>

            {/* 🟢 2. Live Platform Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              {[
                { label: "People Online", value: "1,248", color: "text-emerald-500", dot: "bg-emerald-500" },
                { label: "Questions in 5m", value: "18", color: "text-rose-500", dot: "bg-rose-500" },
                { label: "New Answers", value: "3", color: "text-blue-500", dot: "bg-blue-500" },
                { label: "Answer Rate", value: "92%", color: "text-violet-500", dot: "bg-violet-500" },
                { label: "Countries", value: "126", color: "text-indigo-500", dot: "bg-indigo-500" },
                { label: "Community Rating", value: "4.9/5", color: "text-amber-500", dot: "bg-amber-500" },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50/50 text-center">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${stat.dot}`}></span>
                    <span className="text-xs font-black text-slate-800">{stat.value}</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Sync Alert if Offline */}
            {!dbStatus.connected && (
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-3.5 text-xs font-bold text-rose-700 shadow-sm">
                🚨 Sync Notice: {dbStatus.message}
              </div>
            )}

            {/* 📥 3. Premium Interactive Post Creator */}
            <div id="ask-section" className="scroll-mt-20">
              <CreatePost />
            </div>

            {/* 📑 4. Feed Filter Tab Navigation */}
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

          {/* 🏆 Right Sidebar Widget */}
          <aside className="hidden lg:block sticky top-6 self-start">
            <RightSidebar {...({ customTopics: latestUniqueTopics } as any)} />
          </aside>

        </div>
      </div>

      {/* Shared Post Overlay Modal */}
      {sharedPost && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/20 px-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl transition-all duration-200">
            <div className="pb-3 pt-1 flex justify-end">
              <a href="/" className="rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 text-xs font-bold tracking-wide shadow-sm transition">
                ✕ Close & View Feed
              </a>
            </div>
            <div className="max-h-[75vh] overflow-y-auto p-1">
              <QuestionCard post={sharedPost} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
