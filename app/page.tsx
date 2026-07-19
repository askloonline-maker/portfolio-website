"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import CreatePost from "../components/CreatePost";
import QuestionCard from "../components/QuestionCard";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

// ब्राउज़र में सेफली एक्सेस करने के लिए पब्लिक वेरिएबल्स का इस्तेमाल
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dmcbbpusnruwopdkkiom.supabase.co";
// यहाँ स्क्रीनशॉट वाली Secret key (sb_secret_...) या Anon key पेस्ट कर सकते हैं अगर वेरिएबल काम न करे
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl.replace(/\/$/, ""), supabaseKey.trim());

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState({ connected: true, message: "" });
  const [latestUniqueTopics, setLatestUniqueTopics] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // 1. डेटाबेस से पोस्ट्स लेकर आएँ
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          setDbStatus({ connected: false, message: error.message });
          setLoading(false);
          return;
        }

        const fetchedPosts = data || [];
        setPosts(fetchedPosts);
        setDbStatus({ connected: true, message: "Anonymous posting is live" });

        // 2. टॉपिक्स (Tags) निकालें
        const uniqueTopicsSet = new Set<string>();
        fetchedPosts.forEach((post: any) => {
          if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach((tag: string) => {
              if (tag) uniqueTopicsSet.add(tag.trim());
            });
          } else if (post.category) {
            uniqueTopicsSet.add(post.category.trim());
          }
        });
        setLatestUniqueTopics(Array.from(uniqueTopicsSet).slice(0, 5));
      } catch (err: any) {
        setDbStatus({ connected: false, message: err.message || "Connection failed" });
      } finally {
        setLoading(false);
      }
    }

    if (supabaseUrl && supabaseKey) {
      fetchData();
    } else {
      setDbStatus({ connected: false, message: "Supabase Environment Variables missing!" });
      setLoading(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 relative font-sans antialiased">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_320px] gap-6 px-6 py-6">
        <aside className="hidden md:block sticky top-6 self-start space-y-6">
          <Sidebar />
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 border border-blue-100/50 relative overflow-hidden shadow-sm">
            <div className="absolute right-[-10px] bottom-[-10px] w-16 h-16 bg-blue-600/10 rounded-full blur-xl"></div>
            <h4 className="font-extrabold text-slate-800 text-sm leading-snug">
              Ask freely.<br />Answer boldly.
            </h4>
            <div className="mt-4 space-y-1.5">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">100% Anonymous</p>
              <p className="text-[11px] font-semibold text-slate-500">No login required</p>
            </div>
            <div className="absolute right-4 bottom-4 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] shadow-md shadow-blue-500/20">
              ✓
            </div>
          </div>
          <div className="text-[11px] font-medium text-slate-400 space-y-1 px-4">
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

        <section className="space-y-5">
          <div className="rounded-2xl bg-gradient-to-r from-[#0d1b2a] via-[#1b263b] to-[#2e3e52] text-white p-6 relative overflow-hidden shadow-md border border-slate-800/20 flex flex-col justify-between min-h-[170px]">
            <div className="space-y-1 z-10 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-wider text-blue-300 border border-white/5">
                🌐 The World's Living Room
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug mt-1">
                Ask anything.<br />Share what you can't say anywhere else.
              </h1>
            </div>
          </div>

          {/* Sync Notice बैनर */}
          {!dbStatus.connected && (
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-3.5 text-xs font-bold text-rose-700 shadow-sm">
              🚨 Sync Notice: {dbStatus.message}
            </div>
          )}

          <div id="ask-section">
            <CreatePost />
          </div>

          <div className="flex items-center gap-1 border-b border-slate-100 pb-1">
            {[{ name: "For You", active: true }].map((tab) => (
              <button key={tab.name} className="bg-blue-50 text-blue-600 shadow-xs px-4 py-2 text-xs font-bold rounded-lg">
                {tab.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-xs font-bold text-slate-400 animate-pulse">
                🔄 Loading live anonymous feed...
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
                <p className="text-sm font-bold text-slate-800">No anonymous discussions active.</p>
                <p className="mt-1 text-xs text-slate-400">Be the first person to initiate an open dialog.</p>
              </div>
            ) : (
              posts.map((post: any) => <QuestionCard key={post.id} post={post} />)
            )}
          </div>
        </section>

        <aside className="hidden lg:block sticky top-6 self-start">
          <RightSidebar {...({ customTopics: latestUniqueTopics } as any)} />
        </aside>
      </div>
    </main>
  );
}
