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

  // 🏷️ Extract Latest 5 Unique Topics dynamically from posts
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
    <main className="min-h-screen bg-[#f1f2f2] text-slate-800 relative font-sans antialiased">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuralSchema) }}
      />
      
      <div className={`transition-all duration-300 ${sharedPost ? "blur-md pointer-events-none brightness-95 opacity-50 select-none" : ""}`}>
        
        {/* 📐 Master Layout Grid */}
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[180px_1fr_240px] gap-6 px-4 py-6">
          
          {/* 🚪 Left Sidebar */}
          <aside className="hidden md:block sticky top-6 self-start space-y-4 text-slate-600 text-xs font-medium">
            <div className="space-y-1">
              <Sidebar />
            </div>

            {/* Quora-Style Footer */}
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

          {/* ⚡ Center Feed */}
          <section className="space-y-4">
            
            {!dbStatus.connected && (
              <div className="rounded-lg border border-rose-100 bg-rose-50 p-3.5 text-xs font-bold text-rose-700 shadow-sm">
                🚨 Sync Notice: {dbStatus.message}
              </div>
            )}

            {/* 📥 Single Clean Create Post Box */}
            <div id="ask-section" className="scroll-mt-20 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CreatePost />
            </div>

            {/* Feed Section Title */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Questions for you
              </h2>
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

          {/* 🏆 Right Sidebar Widget */}
          <aside className="hidden lg:block sticky top-6 self-start">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <RightSidebar customTopics={latestUniqueTopics} />
            </div>
          </aside>

        </div>
      </div>

      {/* Shared Post Overlay Modal */}
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
