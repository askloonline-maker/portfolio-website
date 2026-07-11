// app/topics/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { SEO_SUB_TOPICS } from "@/utils/seoKeywords";
import QuestionCard from "@/components/QuestionCard"; // इम्पोर्ट पाथ को यहाँ ठीक कर दिया गया है

export const revalidate = 1800; // हर 30 मिनट में पेज बैकएंड पर ऑटो-अपडेट होगा

// Next.js को पहले से बताने के लिए कि कौन से रास्तों को बिल्ड करना है
export async function generateStaticParams() {
  return SEO_SUB_TOPICS.map((topic) => ({ slug: topic.slug }));
}

// Google Search Engine के लिए आकर्षक Metadata (Title और Description) जेनरेट करना
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

  // Supabase Database Connection Setup
  const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  // बैकएंड से उस मुख्य स्पेस (Parent Category) की सभी लेटेस्ट पोस्ट्स लाना
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("space", parentCategory)
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6 space-y-6 min-h-screen bg-white">
      {/* 🛠️ Structured JSON-LD Schema For Google Bot Indexing */}
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

      {/* Breadcrumb - क्लीन स्ट्रक्चर जो गूगल को बहुत पसंद है */}
      <nav className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
        <Link href="/" className="hover:underline hover:text-blue-600 transition">Home</Link>
        <span>/</span>
        <span className="text-blue-600 font-medium">{parentCategory}</span>
        <span>/</span>
        <span className="text-slate-600 capitalize truncate max-w-[200px] sm:max-w-none">{keywordLabel}</span>
      </nav>

      {/* Rich Premium Hero Banner */}
      <div className="rounded-[2rem] bg-gradient-to-br from-[#0b1b4f] via-[#0f2f88] to-[#1d4ed8] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 bg-blue-950/40 px-3 py-1 rounded-full border border-blue-800/50">
          Decentralized SEO Database
        </span>
        <h1 className="text-2xl font-black mt-3 sm:text-3xl tracking-tight leading-none text-white drop-shadow-sm">
          {keywordLabel}
        </h1>
        <p className="text-xs sm:text-sm text-blue-100/90 mt-3 leading-relaxed max-w-2xl">
          Welcome to the public directory for <strong>{keywordLabel}</strong>. This stream actively aggregates real-time footprints, submission platforms, and anonymous discussions cataloged inside the <strong>{parentCategory}</strong> zone.
        </p>
      </div>

      {/* Discussion List */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">Live Community Boards</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {posts?.length || 0} Open Threads
          </span>
        </div>

        {/* Posts Loop Mapping */}
        {posts && posts.length > 0 ? (
          posts.map((post: any) => <QuestionCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 text-xs text-slate-400">
            No active anonymous threads in {parentCategory} right now. Be the first to start a discussion!
          </div>
        )}
      </div>
    </main>
  );
}
