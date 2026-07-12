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
    // 🎨 Chapter 2: Soft Contrast Neutral Background & Modern Typography
    <main className="min-h-screen bg-[#f8fafc] text-slate-950 relative font-sans antialiased">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuralSchema) }}
      />
      
      <div className={`transition-all duration-300 ${sharedPost ? "blur-md pointer-events-none brightness-95 opacity-50 select-none" : ""}`}>
        {/* 📐 Chapter 2: Balanced 24px Grid Spacing (gap-6) everywhere */}
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[60px_1fr] lg:grid-cols-[240px_minmax(0,1fr)_310px] gap-6 px-4 py-6">
          
          <aside>
            <div className="sticky top-24 rounded-3xl border border-black/[0.05] bg-white/90 p-1 md:p-3 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] backdrop-blur">
              <Sidebar />
            </div>
          </aside>

          <section className="space-y-6">
            {/* 💎 Premium Elevated Hero Box */}
            <div className="overflow-hidden rounded-[2rem] border border-black/[0.05] bg-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
              <div className="bg-gradient-to-r from-[#0f2f88] via-[#1d4ed8] to-[#3b82f6] p-6 sm:p-8 text-white relative">
                <div className="max-w-2xl space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-200">Premium Anonymous Knowledge Network</p>
                  
                  {/* ✍️ Chapter 1: Line-Height spacing adjusted (leading-tight) */}
                  <h1 className="text-3xl font-black tracking-tight sm:text-4xl leading-tight text-white drop-shadow-sm">
                    Ask freely. Answer boldly. Stay anonymous.
                  </h1>
                  
                  {/* 🛠️ Chapter 1: Converted Markdown to clean HTML bold layout */}
                  <p className="text-sm leading-relaxed text-blue-50/90 font-medium">
                    Welcome to AskLo, a secure <strong className="text-white font-extrabold underline decoration-blue-400 decoration-2 underline-offset-2">knowledge sharing platform</strong> and public <strong className="text-white font-extrabold underline decoration-blue-400 decoration-2 underline-offset-2">question answer website</strong>. What insights would you share if your name wasn't attached? Join decentralized online communities talking marketing, tech, and startups today.
                  </p>
                </div>
                
                {/* 🛡️ Chapter 3: Duplicate badge removed to maintain high-end web layout cleanliness */}
              </div>

              {/* 🎯 Chapter 4: Value Prop Cards centered alignment and dark text */}
              <div className="grid gap-4 bg-slate-50/50 p-5 text-xs font-bold text-slate-700 sm:grid-cols-3 border-t border-slate-100">
                <div className="rounded-2xl bg-white p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center justify-center gap-2 text-center">
                  <span>🕶️</span> No account registration required
                </div>
                <div className="rounded-2xl bg-white p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center justify-center gap-2 text-center">
                  <span>💬</span> Open question answer format
                </div>
                <div className="rounded-2xl bg-white p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center justify-center gap-2 text-center">
                  <span>🛡️</span> Safe community discussion
                </div>
              </div>
            </div>

            {/* If DB fails, print it elegantly here as a system error banner */}
            {!dbStatus.connected && (
              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-xs font-bold text-rose-700 shadow-sm">
                🚨 System Sync Warning: {dbStatus.message}
              </div>
            )}

            <CreatePost />

            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Community Discussion Boards</h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{posts.length} active threads</span>
            </div>

            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-12 text-center shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
                  <p className="text-sm font-black text-slate-900">No anonymous conversations yet.</p>
                  <p className="mt-2 text-xs text-slate-400">Be the first person to ask a question or share a useful answer above.</p>
                </div>
              ) : (
                posts.map((post: any) => <QuestionCard key={post.id} post={post} />)
              )}
            </div>
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <RightSidebar />
            </div>
          </aside>
        </div>
      </div>

      {sharedPost && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/20 px-4">
          <div className="w-full max-w-2xl rounded-[2.5rem] border border-black/[0.05] bg-white/95 p-3 shadow-2xl backdrop-blur-md transition-all duration-200">
            <div className="pb-3 pt-1 flex justify-end">
              <a href="/" className="rounded-full bg-blue-50 hover:bg-blue-100 text-[#1d4ed8] px-4 py-2 text-xs font-black tracking-wide shadow-sm transition">
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
