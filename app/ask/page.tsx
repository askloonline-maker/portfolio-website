"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// 🛠️ मुख्य फॉर्म कॉम्पोनेंट जो URL params को रीड करेगा
function AskFormContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"QUESTION" | "DISCUSSION">("QUESTION");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  // URL Query Param (?type=post या ?type=question) को ट्रैक और सिंक करना
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "post") {
      setMode("DISCUSSION");
    } else {
      setMode("QUESTION");
    }
  }, [searchParams]);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    
    setLoading(true);

    try {
      const currentDeviceId = localStorage.getItem("asklo_device_id");

      const { data: postData, error: postError } = await supabase
        .from("posts")
        .insert([
          {
            title: title,
            content: details,
            type: mode, 
            device_id: currentDeviceId 
          }
        ])
        .select(); 

      if (postError) {
        throw new Error(`Database insert failed: ${postError.message}`);
      }

      if (currentDeviceId) {
        const { error: rpcError } = await supabase.rpc('increment_wallet_balance', {
          target_device_id: currentDeviceId
        });

        if (rpcError) {
          console.error("Wallet increment failed:", rpcError.message);
          alert(`Post published successfully, but wallet update delayed: ${rpcError.message}`);
        } else {
          alert(`Success! Published node type: ${mode}. ₹0.01 added to your wallet!`);
        }
      } else {
        alert(`Success! Published node type: ${mode}. (No device tracking token found)`);
      }

      setTitle("");
      setDetails("");
      window.location.href = "/";
      
    } catch (err: any) {
      console.error("Submission Error:", err);
      alert(`Submission Failed: ${err.message || "Failed to fetch. Check Supabase connection or RLS Policies."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm space-y-6 mt-6">
      <div>
        <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Create Submission</h1>
        <p className="text-xs text-[#64748b] mt-1">Formulate inquiries or launch discussion threads safely into the network stream.</p>
      </div>

      {/* क्लीनर मॉड स्विच सब-टैब सिस्टम */}
      <div className="flex border-b border-slate-200 text-xs font-bold max-w-xs">
        <button
          type="button"
          onClick={() => setMode("QUESTION")}
          className={`flex-1 pb-2.5 text-center transition-all ${
            mode === "QUESTION"
              ? "text-blue-600 border-b-2 border-blue-600 font-black"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          ❓ Ask a Question
        </button>
        <button
          type="button"
          onClick={() => setMode("DISCUSSION")}
          className={`flex-1 pb-2.5 text-center transition-all ${
            mode === "DISCUSSION"
              ? "text-blue-600 border-b-2 border-blue-600 font-black"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          💬 Post a Discussion
        </button>
      </div>

      {/* Action Form */}
      <form onSubmit={handlePublish} className="space-y-5">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-[#64748b] mb-1.5">
            {mode === "QUESTION" ? "Your Question / Title" : "Post Title / Core Goal"}
          </label>
          <input 
            type="text" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={mode === "QUESTION" ? "e.g., What is the baseline execution difference between linear and logistic models?" : "e.g., Why content pipelines are moving toward headless frameworks"}
            className="w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-blue-50 transition text-[#0f172a]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-[#64748b] mb-1.5">Supporting Context Body</label>
          <textarea 
            rows={6} 
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={mode === "QUESTION" ? "Provide background details or conditions behind your question..." : "Input all parameters, analysis text fields, or data points for your discussion here..."}
            className="w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-blue-50 transition text-[#0f172a] font-sans resize-none"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-black px-6 py-3 rounded-full transition shadow-md disabled:bg-slate-400"
          >
            {loading ? "Publishing..." : mode === "QUESTION" ? "Publish Question" : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

// 📦 मुख्य डिफॉल्ट एक्सपोर्ट जो पूरे फॉर्म को Suspense के साथ रैप करेगा (Vercel Build फिक्स)
export default function AskCompositionPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20 text-xs font-bold text-slate-400">
        Loading Creation Terminal...
      </div>
    }>
      <AskFormContent />
    </Suspense>
  );
}
