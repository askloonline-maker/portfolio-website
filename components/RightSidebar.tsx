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

export default function RightSidebar() {
  const [topics, setTopics] = useState<TopicMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingTopics() {
      try {
        // 📈 टॉपिक्स टेबल से डेटा लाना जहाँ सबसे ज़्यादा प्रश्न हैं
        const { data, error } = await supabase
          .from("topics")
          .select("id, name, slug, question_count")
          .order("question_count", { ascending: false })
          .limit(6);

        if (!error && data) setTopics(data);
      } catch (err) {
        console.error("Error shifting topics layout:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingTopics();
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* केवल हॉट टॉपिक्स बॉक्स दिखेगा - पॉपुलर स्पेस और ट्रेंडिंग टुडे पूरी तरह गायब */}
      <div className="w-full bg-white border border-blue-100 rounded-[2rem] p-5 shadow-sm space-y-4">
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
        ) : topics.length === 0 ? (
          <div className="text-center py-4 text-xs text-slate-400">No active topics found.</div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/70 transition-all duration-150 border border-transparent hover:border-blue-100"
              >
                {/* आकर्षक हैशटैग स्टाइल नेम */}
                <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors flex items-center gap-1.5">
                  <span className="text-blue-500 font-black text-sm">#</span>
                  {topic.name}
                </span>
                
                {/* काउंट शिफ्ट होने वाला सुंदर बैज */}
                <span className="bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white text-[10px] font-black px-2 py-0.5 rounded-md transition-all">
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
