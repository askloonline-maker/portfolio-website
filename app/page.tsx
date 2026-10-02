"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import CreatePost from "../components/CreatePost";
import QuestionCard from "../components/QuestionCard";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState({ connected: true, message: "" });
  const [latestUniqueTopics, setLatestUniqueTopics] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const supabaseUrl = "https://yyxaxcqlrxawdtloucwx.supabase.co";
        const supabaseKey = "sb_publishable_eXzrOqilWFw1Pd5q1xeTYg_exKGkl5C";

        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        });

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          setDbStatus({ connected: false, message: error.message });
          setLoading(false);
          return;
        }

        setPosts(data || []);
        setDbStatus({ connected: true, message: "Anonymous posting is live" });

        const uniqueTopicsSet = new Set<string>();
        if (data) {
          data.forEach((post: any) => {
            if (post.tags && Array.isArray(post.tags)) {
              post.tags.forEach((tag: string) => {
                if (tag) uniqueTopicsSet.add(tag.trim());
              });
            } else if (post.category) {
              uniqueTopicsSet.add(post.category.trim());
            }
          });
        }
        setLatestUniqueTopics(Array.from(uniqueTopicsSet).slice(0, 5));
      } catch (err: any) {
        setDbStatus({
          connected: false,
          message: err.message || "Failed to fetch live feed",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 relative font-sans antialiased">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_320px] gap-6 px-6 py-6">
        {/* Left Sidebar */}
        <aside className="hidden md:block sticky top-6 self-start space-y-6">
          <Sidebar />
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 border border-blue-100/50 relative overflow-hidden shadow-sm">
            <div className="absolute right-[-10px] bottom-[-10px] w-16 h-16 bg-blue-600/10 rounded-full blur-xl"></div>
            <h4 className="font-extrabold text-slate-800 text-sm leading-snug">
              Ask freely.
              <br />
              Answer boldly.
            </h4>
            <div className="mt-4 space-y-1.5">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                100% Anonymous
              </p>
              <p className="text-[11px] font-semibold text-slate-500">
                No login required
              </p>
            </div>
            <div className="absolute right-4 bottom-4 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] shadow-md shadow-blue-500/20">
              ✓
            </div>
          </div>
          <div className="text-[11px] font-medium text-slate-400 space-y-1 px-4">
            <div className="flex flex-wrap gap-1.5">
              <a href="/about" className="hover:underline">
                About
              </a>
              <span>·</span>
              <a href="/terms" className="hover:underline">
                Terms
              </a>
              <span>·</span>
              <a href="/privacy" className="hover:underline">
                Privacy
              </a>
            </div>
            <p>© AskLo Inc. 2026</p>
          </div>
        </aside>

        {/* Main Content Feed */}
        <section className="space-y-6">
          {/* Main Hero Title Box */}
          <header className="rounded-2xl bg-gradient-to-r from-[#0d1b2a] via-[#1b263b] to-[#2e3e52] text-white p-6 relative overflow-hidden shadow-md border border-slate-800/20 flex flex-col justify-between min-h-[170px]">
            <div className="space-y-1 z-10 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-wider text-blue-300 border border-white/5">
                🌐 The World's Living Room
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug mt-1">
                AskLo – Anonymous Questions & Community Knowledge Base
              </h1>
              <p className="text-xs text-slate-300 font-medium mt-2">
                Ask questions freely, share unfiltered workplace and tech advice, and discuss online trends without user registration.
              </p>
            </div>
          </header>

          {/* Indexable Editorial Content Section (Fixes Low Word Count & Thin Content Issues) */}
          <article className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              An Open Platform for Frictionless Knowledge Sharing
            </h2>
            <p>
              Welcome to <strong>AskLo</strong>, a high-speed anonymous Q&A community created to facilitate unbiased intellectual discourse. Traditional discussion forums force users through lengthy authentication barriers, username selection, and public reputation scores. AskLo eliminates these obstacles entirely, giving you direct access to ask and answer questions with absolute freedom.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-xs mb-1">💼 Business & Startups</h3>
                <p className="text-[12px] text-slate-500">
                  Discuss growth hacking strategies, SaaS business models, fundraising rounds, and corporate career decisions completely off the record.
                </p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-xs mb-1">🤖 AI & Tech Architecture</h3>
                <p className="text-[12px] text-slate-500">
                  Get raw, objective technical advice on AI model deployments, cloud infrastructure, web development frameworks, and database scalability.
                </p>
              </div>
            </div>
          </article>

          {/* Sync Status Banner */}
          {!dbStatus.connected && (
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-3.5 text-xs font-bold text-rose-700 shadow-sm">
              Sync Notice: {dbStatus.message}
            </div>
          )}

          {/* Ask Input Box */}
          <div id="ask-section">
            <CreatePost />
          </div>

          {/* Feed Filter Tab */}
          <div className="flex items-center gap-1 border-b border-slate-100 pb-1">
            {[{ name: "For You", active: true }].map((tab) => (
              <button
                key={tab.name}
                className="bg-blue-50 text-blue-600 shadow-xs px-4 py-2 text-xs font-bold rounded-lg"
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Dynamic Feed Posts */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-xs font-bold text-slate-400 animate-pulse">
                🔄 Loading live anonymous feed...
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
                <p className="text-sm font-bold text-slate-800">
                  No anonymous discussions active.
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Be the first person to initiate an open dialog.
                </p>
              </div>
            ) : (
              posts.map((post: any) => (
                <QuestionCard key={post.id} post={post} />
              ))
            )}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="hidden lg:block sticky top-6 self-start">
          <RightSidebar {...({ customTopics: latestUniqueTopics } as any)} />
        </aside>
      </div>
    </main>
  );
}
