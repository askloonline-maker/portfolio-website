"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase क्लाइंट इनिशियलाइजेशन
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function AskCompositionPage() {
  const [mode, setMode] = useState<"QUESTION" | "DISCUSSION">("QUESTION");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    
    setLoading(true);

    try {
      // 1. LocalStorage से यूज़र की अनोनिमस device_id निकालें
      const currentDeviceId = localStorage.getItem("asklo_device_id");

      // 2. Supabase के 'posts' टेबल में पोस्ट इन्सर्ट करना
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .insert([
          {
            title: title,
            content: details,
            type: mode, // QUESTION या DISCUSSION
            device_id: currentDeviceId // बैकएंड ट्रैकिंग के लिए अनिवार्य लिंक
          }
        ])
        .select(); // .select() यह सुनिश्चित करता है कि डेटा सबमिशन ट्रैक हो सके

      // यदि पोस्ट टेबल में कोई एरर आया है, तो यहीं पर कैच करें
      if (postError) {
        throw new Error(`Database insert failed: ${postError.message}`);
      }

      // 3. यदि पोस्ट सफलतापूर्वक सेव हो गई, तो वॉलेट में ₹0.01 क्रेडिट करें
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

      // फॉर्म रीसेट करें और सीधे होमपेज पर रीडायरेक्ट करें
      setTitle("");
      setDetails("");
      window.location.href = "/";
      
    } catch (err: any) {
      console.error("Submission Error:", err);
      // यहाँ यूज़र को बिल्कुल सटीक एरर दिखाई देगा ताकि डीबग करना आसान हो
      alert(`Submission Failed: ${err.message || "Failed to fetch. Check Supabase connection or RLS Policies."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm space-y-5">
      <div>
        <h1 className="text-lg font-black text-[#0f172a] tracking-tight">Create Submission</h1>
        <p className="text-xs text-[#64748b]">Formulate inquiries or launch discussion threads safely into the network stream.</p>
      </div>

      {/* Model Toggle Switcher */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
        <button 
          type="button"
          onClick={() => setMode("QUESTION")}
          className={`py-2 text-xs font-bold rounded-lg transition ${mode === "QUESTION" ? "bg-white text-[#1d4ed8] shadow-sm" : "text-[#64748b]"}`}
        >
          ❓ Ask a Question
        </button>
        <button 
          type="button"
          onClick={() => setMode("DISCUSSION")}
          className={`py-2 text-xs font-bold rounded-lg transition ${mode === "DISCUSSION" ? "bg-white text-[#1d4ed8] shadow-sm" : "text-[#64748b]"}`}
        >
          💬 Post a Discussion
        </button>
      </div>

      {/* Action Form */}
      <form onSubmit={handlePublish} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">Title / Core Goal</label>
          <input 
            type="text" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={mode === "QUESTION" ? "e.g., What is the baseline execution difference between linear and logistic models?" : "e.g., Why content pipelines are moving toward headless frameworks"}
            className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1d4ed8] transition text-[#0f172a]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">Supporting Context Body</label>
          <textarea 
            rows={5} 
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Input all parameters, data points, or descriptive analysis text fields required by your query context here..."
            className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1d4ed8] transition text-[#0f172a] font-sans"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold px-6 py-2.5 rounded-full transition shadow-sm disabled:bg-slate-400"
          >
            {loading ? "Publishing..." : "Publish Live Component"}
          </button>
        </div>
      </form>
    </div>
  );
}
