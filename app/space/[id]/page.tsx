import React from "react";
import { createClient } from "@supabase/supabase-js";
import QuestionCard from "../../../components/QuestionCard";
import Sidebar from "../../../components/Sidebar";
import RightSidebar from "../../../components/RightSidebar";

export const revalidate = 0;

// 🔐 Supabase Client Initialization
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey);
}

// 📥 Fetch filtered posts based on the dynamic URL space slug
async function getSpacePosts(spaceId: string) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("category", spaceId)
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  } catch (err) {
    return [];
  }
}

// Helper map to convert URL parameters into clean text headings
function getSpaceTitle(id: string) {
  const titles: { [key: string]: string } = {
    "digital-marketing": "Digital Marketing",
    "startups-business": "Startups & Business",
    "artificial-intelligence": "Artificial Intelligence",
    "tech": "General Tech",
    "health-fitness-beauty": "Health - Fitness - Beauty",
    "others": "Others",
  };
  return titles[id] || "Community Hub";
}

interface SpacePageProps {
  params: Promise<{ id: string }>;
}

export default async function SpacePage({ params }: SpacePageProps) {
  const { id } = await params;
  const posts = await getSpacePosts(id);
  const spaceTitle = getSpaceTitle(id);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_34%,#ffffff_100%)] text-slate-950 relative">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[60px_1fr] lg:grid-cols-[240px_minmax(0,1fr)_310px] gap-2 sm:gap-5 px-2 sm:px-4 py-6">
        
        {/* Left Sidebar */}
        <aside>
          <div className="sticky top-24 rounded-2xl md:rounded-3xl border border-blue-100 bg-white/90 p-1 md:p-3 shadow-sm shadow-blue-950/5 backdrop-blur">
            <Sidebar />
          </div>
        </aside>

        {/* Center Dynamic Content Feed */}
        <section className="space-y-5">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 px-1 text-xs font-bold text-slate-400">
            <a href="/" className="hover:text-blue-600 transition">Home</a>
            <span>/</span>
            <span className="text-slate-600">Spaces</span>
            <span>/</span>
            <span className="text-blue-600 font-black">{spaceTitle}</span>
          </div>

          {/* Heading Section */}
          <div className="flex items-center justify-between px-1 border-b border-blue-50 pb-2">
            <div>
              <h1 className="text-2xl font-black text-slate-950 tracking-tight">{spaceTitle}</h1>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Viewing anonymous discussions filed under this domain.</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-blue-200 bg-white p-12 text-center shadow-sm">
                <p className="text-base font-black text-slate-900">No anonymous posts here yet.</p>
                <p className="mt-1.5 text-xs text-slate-500 max-w-sm mx-auto">
                  Be the first person to start an interactive discussion! Head back to the homepage feed to submit your anonymous entry.
                </p>
                <a href="/" className="mt-5 inline-block rounded-full bg-gradient-to-r from-[#0f2f88] to-[#2563eb] px-5 py-2.5 text-xs font-black text-white shadow-md hover:scale-[1.01] transition">
                  ← Back to Home Form
                </a>
              </div>
            ) : (
              posts.map((post: any) => <QuestionCard key={post.id} post={post} />)
            )}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <RightSidebar />
          </div>
        </aside>

      </div>
    </main>
  );
}
