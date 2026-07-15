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
    // 🎨 Ultra Premium Gradient Background UI (#FFFFFF -> #F4F8FF -> #EEF4FF)
    <main className="min-h-screen bg-gradient-to-b from-[#FFFFFF] via-[#F4F8FF] to-[#EEF4FF] text-slate-950 relative font-sans antialiased selection:bg-blue-500/20">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuralSchema) }}
      />
      
      <div className={`transition-all duration-300 ${sharedPost ? "blur-md pointer-events-none brightness-95 opacity-50 select-none" : ""}`}>
        
        {/* 📐 Master Grid Layout with optimized gap-6 spacing */}
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[60px_1fr] lg:grid-cols-[260px_minmax(0,1fr)_320px] gap-6 px-4 py-6">
          
          {/* 🚪 Left Sidebar (Enhanced Navigation, Gamification & Popular Communities) */}
          <aside className="sticky top-24 self-start space-y-6">
            <div className="rounded-[2rem] border border-blue-100/50 bg-white/90 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] backdrop-blur-md space-y-6">
              <Sidebar />
              
              {/* Gamification / Badges Block */}
              <div className="hidden lg:block pt-4 border-t border-slate-100/80">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3 px-2">Gamification</h3>
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                  <div className="p-2 rounded-xl bg-orange-50 text-orange-700 border border-orange-100/50 flex flex-col items-center">
                    <span>🔥 Streak</span>
                    <span className="font-black text-xs">5 Days</span>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100/50 flex flex-col items-center">
                    <span>👑 Badge</span>
                    <span className="font-black text-xs">Explorer</span>
                  </div>
                </div>
              </div>

              {/* Popular Communities Section */}
              <div className="hidden lg:block pt-4 border-t border-slate-100/80">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3 px-2">Popular Communities</h3>
                <div className="space-y-1 text-xs">
                  {[
                    { name: "Technology", icon: "💻" },
                    { name: "Relationships", icon: "❤️" },
                    { name: "Career", icon: "💼" },
                    { name: "Startup", icon: "🚀" },
                    { name: "Finance", icon: "💰" },
                    { name: "AI", icon: "🤖" },
                    { name: "Gaming", icon: "🎮" }
                  ].map((com) => (
                    <button key={com.name} className="w-full flex items-center justify-between px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition duration-200 font-semibold text-left">
                      <span className="flex items-center gap-2">
                        <span>{com.icon}</span> {com.name}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold">Hot</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ⚡ Center Content Stream */}
          <section className="space-y-6">
            
            {/* 🔮 1. Premium Dynamic Hero Box ("The World's Living Room") */}
            <div className="overflow-hidden rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-[#0f2f88] via-[#1d4ed8] to-[#2563eb] shadow-[0_25px_60px_rgba(29,78,216,0.18)] text-white relative group">
              <div className="absolute -top-12 -right-12 w-96 h-96 bg-white/5 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110 pointer-events-none"></div>
              
              <div className="p-8 sm:p-10 space-y-6 relative z-10">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                    🌎 The World's Living Room
                  </span>
                  <h1 className="text-3.5xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white drop-shadow-sm">
                    Ask freely. <br className="sm:hidden" />Answer boldly. <br />Stay anonymous.
                  </h1>
                  <p className="text-xs text-blue-100 max-w-xl font-medium leading-relaxed">
                    Share what you can't say anywhere else. Join decentralized online communities talking marketing, tech, startups, and private confessions.
                  </p>
                </div>

                {/* FOMO Live Stats Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center sm:text-left">
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">5,246</p>
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/80 font-bold">Questions Today</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">18,743</p>
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/80 font-bold">Anonymous Discussions</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">100%</p>
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/80 font-bold">Free & Secure</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-[#10b981] flex items-center justify-center sm:justify-start gap-1.5">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      13,942
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/80 font-bold">Online Now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 📊 2. Live Community Stats Strip */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 bg-white border border-blue-100/60 p-4 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.01)] text-center text-xs font-semibold">
              <div className="hover:scale-105 transition duration-200">
                <span className="block text-base sm:text-lg font-black text-slate-900">58K</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Questions</span>
              </div>
              <div className="hover:scale-105 transition duration-200">
                <span className="block text-base sm:text-lg font-black text-slate-900">110K</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Answers</span>
              </div>
              <div className="hidden sm:block hover:scale-105 transition duration-200">
                <span className="block text-base sm:text-lg font-black text-slate-900">18K</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Members</span>
              </div>
              <div className="hidden sm:block hover:scale-105 transition duration-200">
                <span className="block text-base sm:text-lg font-black text-slate-900">126</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Countries</span>
              </div>
              <div className="hover:scale-105 transition duration-200">
                <span className="block text-base sm:text-lg font-black text-emerald-600">92%</span>
                <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider">Answer Rate</span>
              </div>
            </div>

            {/* 🔍 3. ChatGPT Style Enhanced Search Bar */}
            <div className="bg-white rounded-3xl border border-blue-100/80 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search anonymous discussions, secrets, careers..." 
                  className="w-full bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 font-medium transition-all duration-300 placeholder:text-slate-400"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
              </div>
              
              {/* Suggested Topics / Autocomplete Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
                <span className="text-slate-400 uppercase tracking-widest text-[9px] mr-1">Trending Topics:</span>
                {["AI", "Relationships", "Career", "Mental Health", "Confessions", "Money"].map((topic) => (
                  <button 
                    key={topic} 
                    className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-100 rounded-full transition-all duration-200 hover:scale-[1.03]"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </div>

            {/* 🎯 4. Daily Prompt Box */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/70 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition duration-300 hover:shadow-md">
              <div className="space-y-1.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 bg-amber-100/80 px-2.5 py-1 rounded-md">Today's Prompt</span>
                <h4 className="text-sm sm:text-base font-extrabold text-amber-900 leading-snug">"What is something you've never told anyone?"</h4>
              </div>
              <button className="whitespace-nowrap px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-full transition shadow-md hover:scale-[1.03] active:scale-[0.97]">
                Answer Anonymously
              </button>
            </div>

            {/* 📥 5. Premium Ask Box (Create Post) */}
            <div id="ask-section" className="scroll-mt-24">
              <CreatePost />
            </div>

            {/* Live Feed Header & Counter Badges */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Community Discussion Boards</h2>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{posts.length} Active Threads</span>
            </div>

            {/* Posts Feed with Infinite Scroll compatibility container */}
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="rounded-[2.5rem] border border-dashed border-slate-200 bg-white p-12 text-center shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                  <p className="text-sm font-black text-slate-900">No anonymous conversations yet.</p>
                  <p className="mt-2 text-xs text-slate-400">Be the first person to ask a question or share a useful answer above.</p>
                </div>
              ) : (
                posts.map((post: any) => <QuestionCard key={post.id} post={post} />)
              )}
            </div>

            {/* ⭐ 6. Trust & Social Proof Strip */}
            <div className="rounded-[2rem] border border-blue-100/30 bg-white p-6 text-center space-y-3 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex justify-center text-amber-400 text-lg gap-0.5">⭐⭐⭐⭐⭐</div>
              <p className="text-xs font-bold text-slate-500">
                Trusted by <span className="text-slate-950 font-black">52,000+ Anonymous Members</span> across <span className="text-slate-950 font-black">120+ Countries</span>
              </p>
            </div>
          </section>

          {/* 🏆 Right Sidebar (Hot Topics, Featured posts & Live Analytics) */}
          <aside className="hidden lg:block sticky top-24 self-start space-y-6">
            <RightSidebar />
          </aside>
        </div>
      </div>

      {/* Floating Action Button (FAB) - Always Visible Bottom Right */}
      <a href="#ask-section" className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-[0_10px_25px_rgba(29,78,216,0.3)] hover:scale-110 active:scale-95 transition-all duration-200 flex items-center gap-2 group">
        <span className="text-xl font-bold leading-none">+</span>
        <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 text-xs font-black tracking-wide whitespace-nowrap">
          Ask Question
        </span>
      </a>

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
