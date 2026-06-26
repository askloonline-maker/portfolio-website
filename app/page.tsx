import React from "react";
import { createClient } from "@supabase/supabase-js";
import CreatePost from "../components/CreatePost";
import QuestionCard from "../components/QuestionCard";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

export const revalidate = 0;

// 🗂️ Spaces Grid Dataset
const spacesData = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: "📈",
    count: "Active Hub",
    description: "SEO structures, growth architectures, and optimization frameworks."
  },
  {
    id: "startups-business",
    title: "Startups & Business",
    icon: "💼",
    count: "Active Hub",
    description: "Venture strategies, scaling frameworks, business models, and operational systems."
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    icon: "🤖",
    count: "Active Hub",
    description: "Large Language Models, deployment patterns, and operational systems."
  },
  {
    id: "tech",
    title: "General Tech",
    icon: "💻",
    count: "Active Hub",
    description: "Next.js configurations, environment structures, and operational frameworks."
  },
  {
    id: "health-fitness-beauty",
    title: "Health - Fitness - Beauty",
    icon: "🌿",
    count: "Active Hub",
    description: "Wellness routines, physical preparation, lifestyle choices, and aesthetic self-care."
  },
  {
    id: "others",
    title: "Others",
    icon: "✨",
    count: "Active Hub",
    description: "Miscellaneous inquiries, general life observations, and unclassified discussions."
  }
];

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

// 📐 TypeScript Type Definitions
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 🏠 Main Server Component Home Page
export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const dbStatus = await checkDatabaseConnection();
  const posts = await getAllPublicPosts();

  const targetPostId = typeof resolvedParams.post === "string" ? resolvedParams.post : null;
  const sharedPost = targetPostId ? posts.find((p) => p.id === targetPostId) : null;

  // 🛠️ DYNAMIC SEO HOOK: Compiles real-time structured data schema for crawlers
  const structuralSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": posts.length,
    "itemListElement": posts.slice(0, 15).map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Question",
        "name": post.title || post.content?.substring(0, 100) || "Anonymous Question",
        "text": post.content || post.title,
        "url": `https://www.asklo.online/?post=${post.id}`,
        "dateCreated": post.created_at,
        "answerCount": post.comment_count || 0
      }
    }))
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_34%,#ffffff_100%)] text-slate-950 relative">
      
      {/* Dynamic JSON-LD Injection Point */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuralSchema) }}
      />
      
      {/* Background feed grid layout */}
      <div className={`transition-all duration-300 ${sharedPost ? "blur-md pointer-events-none brightness-95 opacity-50 select-none" : ""}`}>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[60px_1fr] lg:grid-cols-[240px_minmax(0,1fr)_310px] gap-2 sm:gap-5 px-2 sm:px-4 py-6">
          
          <aside>
            <div className="sticky top-24 rounded-2xl md:rounded-3xl border border-blue-100 bg-white/90 p-1 md:p-3 shadow-sm shadow-blue-950/5 backdrop-blur">
              <Sidebar />
            </div>
          </aside>

          <section className="space-y-5">
            <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-blue-950/10">
              <div className="bg-gradient-to-r from-[#0f2f88] via-[#1d4ed8] to-[#3b82f6] p-6 text-white">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-100">Premium Anonymous Knowledge Network</p>
                    <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Ask freely. Answer boldly. Stay anonymous.</h1>
                    <p className="text-sm leading-6 text-blue-50">Where questions spark conversations and answers create value.</p>
                  </div>
                  {dbStatus.connected ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-bold text-white shadow-sm backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />
                      {dbStatus.message}
                    </span>
                  ) : (
                    <span className="rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-700">
                      Database Error: {dbStatus.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-3 bg-blue-50/60 p-4 text-xs font-semibold text-slate-600 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">🕶️ No account or display name required</div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">💬 Questions, answers, and opinions welcome</div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">🛡️ Public, respectful, moderated by community rules</div>
              </div>
            </div>

            💡 {/* 🗂️ Communities Grid Injection Point */}
            <div className="space-y-4 pt-2">
              <div className="px-1">
                <h2 className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Spaces and Communities</h2>
                <p className="text-xs font-medium text-slate-400 mt-0.5">Select a contextual hub to filter relevant discussions.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {spacesData.map((space) => (
                  <div key={space.id} className="group bg-white border border-blue-50 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl bg-blue-50/60 p-2.5 rounded-xl block w-fit">{space.icon}</span>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{space.count}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-950">{space.title}</h3>
                        <p className="text-xs leading-relaxed text-slate-500 font-medium mt-0.5">{space.description}</p>
                      </div>
                    </div>
                    <a href={`/space/${space.id}`} className="inline-flex items-center gap-1 text-[11px] font-black text-[#1d4ed8] hover:text-[#0f2f88] transition mt-1">
                      Explore Space <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <CreatePost />

            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Top conversations</h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{posts.length} live posts</span>
            </div>

            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-blue-200 bg-white p-12 text-center shadow-sm">
                  <p className="text-lg font-black text-slate-900">No anonymous conversations yet.</p>
                  <p className="mt-2 text-sm text-slate-500">Be the first person to ask a question or share a useful answer above.</p>
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
          <div className="w-full max-w-2xl rounded-[2.5rem] border border-blue-100 bg-white/95 p-3 shadow-2xl backdrop-blur-md transition-all duration-200">
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
