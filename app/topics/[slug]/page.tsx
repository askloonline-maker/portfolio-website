// app/topics/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { SEO_SUB_TOPICS } from "@/utils/seoKeywords";
import QuestionCard from "../../../components/QuestionCard";
import CreatePost from "../../../components/CreatePost";

export const revalidate = 1800; 

export async function generateStaticParams() {
  return SEO_SUB_TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const currentTopic = SEO_SUB_TOPICS.find(t => t.slug === resolvedParams.slug);
  const titleText = currentTopic ? currentTopic.label : resolvedParams.slug.replace(/-/g, " ");
  
  return {
    title: `${titleText} — Anonymous Threads & Q&A | Asklo`,
    description: `Explore live discussions, queries, and crowdsourced footprints for ${titleText} shared anonymously on Asklo.`,
    alternates: {
      canonical: `https://www.asklo.online/topics/${resolvedParams.slug}`,
    }
  };
}

export default async function ProgrammaticSeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const currentTopic = SEO_SUB_TOPICS.find(t => t.slug === resolvedParams.slug);
  const keywordLabel = currentTopic ? currentTopic.label : resolvedParams.slug.replace(/-/g, " ");
  const parentCategory = currentTopic ? currentTopic.parentSpace : "Digital Marketing";

  const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("space", parentCategory)
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6 space-y-6 min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${keywordLabel} Shared Community Threads`,
            "description": `Anonymous knowledge board and forum postings regarding ${keywordLabel} categorized under ${parentCategory}.`,
            "url": `https://www.asklo.online/topics/${resolvedParams.slug}`
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
        <Link href="/" className="hover:underline hover:text-blue-600 transition">Home</Link>
        <span>/</span>
        <span className="text-blue-600 font-medium">{parentCategory}</span>
        <span>/</span>
        <span className="text-slate-600 capitalize truncate max-w-[200px] sm:max-w-none">{keywordLabel}</span>
      </nav>

      {/* 🔮 Hero Layout Container */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d25b9] via-[#0a58ca] to-[#0d6efd] p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Core Bold Title Heading */}
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2 text-white leading-tight drop-shadow-sm">
          {keywordLabel}
        </h1>

        {/* 🎯 यहाँ पर पुरानी लाइन हटकर नई लाइन आ गई है */}
        <p className="text-sm sm:text-base leading-relaxed tracking-normal font-semibold text-blue-100/95">
          Premium Anonymous Knowledge Network
        </p>

        {/* Dynamic Context Tag */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 bg-blue-900/40 px-2.5 py-0.5 rounded-md border border-blue-700/30">
            Target Space: {parentCategory}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 bg-white/10 px-2.5 py-0.5 rounded-md">
            Live Stream Node Active
          </span>
        </div>
      </div>

      {/* 📥 'Post Anonymously' Action Box */}
      <CreatePost />

      {/* Feed Stream */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">Live Community Boards</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {posts?.length || 0} Open Threads
          </span>
        </div>

        {posts && posts.length > 0 ? (
          posts.map((post: any) => <QuestionCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 text-xs text-slate-400">
            No active anonymous threads in {parentCategory} right now. Be the first to start a discussion!
          </div>
        )}
      </div>
    </main>
  );
}
