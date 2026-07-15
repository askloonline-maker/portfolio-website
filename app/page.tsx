import React from "react";
import { createClient } from "@supabase/supabase-js";
import CreatePost from "../components/CreatePost";
import QuestionCard from "../components/QuestionCard";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

export const revalidate = 0;

// 🔐 Supabase Client Initialization
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey);
}

// 🌐 Database Connection Check
async function checkDatabaseConnection() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return { connected: false, message: "Supabase environment variables are missing" };
    const { error } = await supabase.from("posts").select("id").limit(1);
    if (error) return { connected: false, message: error.message };
    return { connected: true, message: "Anonymous posting is live" };
  } catch (err: any) {
    return { connected: false, message: err.message || "Failed to connect" };
  }
}

// 📥 Data Fetcher for Feed
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

  const structuralSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AskLo Online Anonymous Q&A Knowledge Sharing Website",
    "headline": "AskLo Premium Anonymous Q&A Platform & Discussion Feed",
    "description": "A public repository of anonymous questions, marketing strategy discussions, career advice, and community discussion boards.",
    "url": "https://www.asklo.online",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.slice(0, 15).map((post, index) => {
        const textContent = post.content || post.title || "Anonymous Discussion Context";
        const headlineText = post.title || (post.content ? post.content.substring(0, 80) : "Anonymous Question");
        
        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "DiscussionForumPosting",
            "headline": headlineText,
            "datePublished": post.created_at || latestPostDate,
            "author": {
              "@type": "Person",
              "name": "Anonymous",
              "url": "https://www.asklo.online"
            },
            "text": textContent,
            "url": "https://www.asklo.online/?post=" + post.id,
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/CommentAction",
              "userInteractionCount": post.comment_count || 0
            }
          }
        };
      })
    }
  };

  return (
    // 🎨 Quora-Like Soft Off-White Clean Background
    <main className="min-h-screen bg-[#f1f2f2] text-slate-800 relative font-sans antialiased">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuralSchema) }}
      />

      {/* 🏛️ 1. Quora-Style Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm px-4 py-2">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <a href="/" className="text-2xl font-black tracking-tight text-[#b92b27] hover:opacity-90 transition">
              AskLo
            </a>
            
            {/* Quick Navigation Icons (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 text-slate-500 font-semibold">
              <a href="/" className="flex items-center gap-1.5 text-[#b92b27] border-b-2 border-[#b92b27] pb-1 pt-1 px-1 transition">
                🏠 <span className="text-sm">Home</span>
              </a>
              <a href="#spaces" className="flex items-center gap-1.5 hover:text-slate-800 transition pb-1 pt-1 px-1">
                👥 <span className="text-sm">Spaces</span>
              </a>
              <a href="#notifications" className="flex items-center gap-1.5 hover:text-slate-800 transition pb-1 pt-1 px-1 relative">
                🔔 <span className="text-sm">Notifications</span>
                <span className="absolute -top-1 -right-2 bg-[#b92b27] text-white text-[9px] font-bold px-1 rounded-full">3</span>
              </a>
            </nav>
          </div>

          {/* Search Bar Input */}
          <div className="flex-1 max-w-md relative">
            <input 
              type="text" 
              placeholder="Search AskLo..." 
              className="w-full bg-[#f1f2f2] border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white outline-none rounded-md py-1.5 pl-9 pr-4 text-xs text-slate-800 font-medium transition"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 rounded-full transition">
              🌐 EN
            </button>
            <a href="#ask-section" className="bg-[#b92b27] hover:bg-[#a12320] text-white px-4 py-1.5 text-xs font-black rounded-full transition shadow-sm flex items-center gap-1">
              Add Question
            </a>
          </div>

        </div>
      </header>
      
      <div className={`transition-all duration-300 ${sharedPost ? "blur-md pointer-events-none brightness-95 opacity-50 select-none" : ""}`}>
        
        {/* 📐 Master Grid Layout (Width matches Quora max-w-5xl structure perfectly) */}
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[180px_1fr_240px] gap-6 px-4 py-6">
          
          {/* 🚪 Left Directory Sidebar */}
          <aside className="hidden md:block sticky top-16 self-start space-y-4 text-slate-600 text-xs font-medium">
            <div className="space-y-1">
              <Sidebar />
            </div>

            {/* Quora-Style Mini Footer Links */}
            <div className="pt-4 border-t border-slate-200/80 text-[10px] text-slate-400 space-y-1.5 px-2">
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

          {/* ⚡ Center Stream Feed */}
          <section className="space-y-4">
            
            {/* System Error Alert Banner */}
            {!dbStatus.connected && (
              <div className="rounded-lg border border-rose-100 bg-rose-50 p-3.5 text-xs font-bold text-rose-700 shadow-sm">
                🚨 Sync Notice: {dbStatus.message}
              </div>
            )}

            {/* 📥 2. Clean 'What do you want to ask or share' Input Box */}
            <div id="ask-section" className="scroll-mt-20 rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-500">
                  🕶️
                </div>
                <div className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full py-2 px-4 text-xs text-slate-400 font-medium cursor-pointer transition">
                  What do you want to ask or share?
                </div>
              </div>
              
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-around text-xs font-bold text-slate-500">
                <button className="flex items-center gap-1.5 hover:text-blue-600 transition">
                  ❓ Ask Question
                </button>
                <div className="h-4 w-px bg-slate-200"></div>
                <button className="flex items-center gap-1.5 hover:text-green-600 transition">
                  ✍️ Write Answer
                </button>
                <div className="h-4 w-px bg-slate-200"></div>
                <button className="flex items-center gap-1.5 hover:text-orange-500 transition">
                  🚀 Post Secret
                </button>
              </div>

              {/* Collapsible Supabase Form inside styling wrapper */}
              <div className="pt-2">
                <CreatePost />
              </div>
            </div>

            {/* Live Feed Header */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Questions for you</h2>
              <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                {posts.length} Threads
              </span>
            </div>

            {/* Questions Stream */}
            <div className="space-y-3">
              {posts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
                  <p className="text-sm font-bold text-slate-800">No anonymous discussions active.</p>
                  <p className="mt-1 text-xs text-slate-400">Be the first person to initiate an open dialog.</p>
                </div>
              ) : (
                posts.map((post: any) => <QuestionCard key={post.id} post={post} />)
              )}
            </div>
          </section>

          {/* 🏆 Right Widget Column */}
          <aside className="hidden lg:block sticky top-16 self-start">
            <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              <RightSidebar />
            </div>
          </aside>

        </div>
      </div>

      {/* Shared Post Spotlight Overlay Modals */}
      {sharedPost && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/20 px-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-3 shadow-2xl transition-all duration-200">
            <div className="pb-3 pt-1 flex justify-end">
              <a href="/" className="rounded-full bg-blue-50 hover:bg-blue-100 text-[#1d4ed8] px-4 py-2 text-xs font-bold tracking-wide shadow-sm transition">
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
