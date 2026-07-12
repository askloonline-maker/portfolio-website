"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function CreatePost() {
  const [submissionType, setSubmissionType] = useState<"QUESTION" | "DISCUSSION">("QUESTION");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
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
            content: details,
            type: submissionType, 
            device_id: currentDeviceId 
          }
        ]);

      if (postError) throw new Error(postError.message);

      if (currentDeviceId) {
        await supabase.rpc('increment_wallet_balance', { target_device_id: currentDeviceId });
      }

      alert(`Success! Published as ${submissionType}`);
      setTitle("");
      setDetails("");
      window.location.reload();
    } catch (err: any) {
      alert(`Submission Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-blue-100 rounded-[2rem] p-5 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <div className="bg-blue-50 p-2 rounded-xl text-base">😎</div>
        <div>
          <h2 className="text-sm font-black text-slate-900 tracking-tight">Post anonymously</h2>
          <p className="text-[11px] text-slate-500">Your post is published as Anonymous. No sign-up, profile, or identity field required.</p>
        </div>
      </div>

      {/* 🚀 4th फोटो जैसा क्लीनर सब-टैब सिस्टम */}
      <div className="flex border border-slate-100 text-xs font-bold w-full bg-slate-50/50 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => setSubmissionType("QUESTION")}
          className={`flex-1 py-2.5 text-center transition-all rounded-lg ${
            submissionType === "QUESTION"
              ? "bg-white text-blue-600 shadow-sm font-black"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          ❓ Ask a Question
        </button>
        <button
          type="button"
          onClick={() => setSubmissionType("DISCUSSION")}
          className={`flex-1 py-2.5 text-center transition-all rounded-lg ${
            submissionType === "DISCUSSION"
              ? "bg-white text-blue-600 shadow-sm font-black"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          💬 Post a Discussion
        </button>
      </div>

      {/* Action Form */}
      <form onSubmit={handlePublish} className="space-y-4">
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={submissionType === "QUESTION" ? "What do you want to ask?" : "What do you want to discuss?"}
          className="w-full bg-white border border-blue-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition text-slate-900"
        />

        <textarea 
          rows={4} 
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Add context, parameters, or descriptive metrics here..."
          className="w-full bg-white border border-blue-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition text-slate-900 font-sans resize-none"
        />

        <div className="flex items-center justify-between pt-1 border-t border-slate-50">
          <span className="text-[10px] text-slate-400 font-medium">Anonymous by default · Public feed</span>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-5 py-2.5 rounded-full transition shadow-md disabled:bg-slate-400"
          >
            {loading ? "Publishing..." : "Publish anonymously"}
          </button>
        </div>
      </form>
    </div>
  );
}
