"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    
    setLoading(true);

    try {
      const currentDeviceId = localStorage.getItem("asklo_device_id");

      const { error: postError } = await supabase
        .from("posts")
        .insert([
          {
            title: title,
            content: "", // No supporting context details anymore
            type: "QUESTION", // Defaulted to QUESTION
            device_id: currentDeviceId 
          }
        ]);

      if (postError) throw new Error(postError.message);

      // Keep Wallet Logic functional
      if (currentDeviceId) {
        await supabase.rpc('increment_wallet_balance', { target_device_id: currentDeviceId });
      }

      alert("Success! Published your question.");
      setTitle("");
      window.location.reload();
    } catch (err: any) {
      alert(`Submission Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-black/[0.05] rounded-[2rem] p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] space-y-5">
      <div className="flex items-start gap-3">
        <div className="bg-blue-50 p-2.5 rounded-xl text-base">😎</div>
        <div>
          <h2 className="text-sm font-black text-slate-900 tracking-tight">Post anonymously</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">Your post is published as Anonymous. No sign-up, profile, or identity field required.</p>
        </div>
      </div>

      {/* Action Form */}
      <form onSubmit={handlePublish} className="space-y-4">
        {/* 🎯 "Add question" Label and Single Input Block */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Add question
          </label>
          <input 
            type="text" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., What is the baseline execution difference between linear and logistic models?"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-slate-900 shadow-sm placeholder:text-slate-400"
          />
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <span className="text-[10px] text-slate-400 font-medium">Anonymous by default · Public feed</span>
          <button 
            type="submit" 
            disabled={loading || !title.trim()}
            className="bg-[#0046cd] hover:bg-blue-700 text-white text-xs font-black px-6 py-2.5 rounded-full transition shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing..." : "Publish anonymously"}
          </button>
        </div>
      </form>
    </div>
  );
}
