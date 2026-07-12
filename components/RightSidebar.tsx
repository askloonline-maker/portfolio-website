"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface TopicMetric {
  id: string;
  name: string;
  slug: string;
  question_count: number;
}

// 🛡️ Chapter 5: Premium Static Fallback list if database records return empty
const STATIC_TRENDING_CATEGORIES = [
  { id: "fallback-1", name: "Growth Hacking", slug: "growth-hacking", question_count: 24 },
  { id: "fallback-2", name: "SaaS Startups", slug: "saas-startups", question_count: 18 },
  { id: "fallback-3", name: "SEO Frameworks", slug: "seo-frameworks", question_count: 15 },
  { id: "fallback-4", name: "Ad Optimization", slug: "ad-optimization", question_count: 12 },
];

export default function RightSidebar() {
  const [topics, setTopics] = useState<TopicMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingTopics() {
      try {
        const { data, error } = await supabase
          .from("topics")
          .select("id, name, slug, question_count")
          .order("question_count", { ascending: false })
          .limit(6);

        if (!error && data && data.length > 0) {
          setTopics(data);
        } else {
          // If 0 length array returned, seamlessly assign high-quality fallback topics
          setTopics(STATIC_TRENDING_CATEGORIES);
        }
      } catch (err) {
        console.error("Error shifting topics layout:", err);
        setTopics(STATIC_TRENDING_CATEGORIES);
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingTopics();
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="w-full bg-white border border-black/[0.05] rounded-[2rem] p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] space-y-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">🔥 Hot Topics</h3>
          <span className="bg-red-50 text-red-600 text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">Live Shift</span>
        </div>

        {loading ? (
          <div className="space-y-2 py-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-slate-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/70 transition-all duration-150 border border-transparent hover:border-blue-100"
              >
                <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors flex items-center gap-1.5">
                  <span className="text-blue-500 font-black text-sm">#</span>
                  {topic.name}
                </span>
                
                <span className="bg-slate-100 text-slate-600 group-hover:bg-[#0046cd] group-hover:text-white text-[10px] font-black px-2 py-0.5 rounded-md transition-all">
                  {topic.question_count || 0} Qs
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
