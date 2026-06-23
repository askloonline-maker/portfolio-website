"use client";
import React, { useState } from "react";

export default function AskCompositionPage() {
  const [mode, setMode] = useState<"QUESTION" | "DISCUSSION">("QUESTION");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Success! Published node type: ${mode}`);
    setTitle("");
    setDetails("");
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
          <button type="submit" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold px-6 py-2.5 rounded-full transition shadow-sm">
            Publish Live Component
          </button>
        </div>
      </form>
    </div>
  );
}
