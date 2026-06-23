"use client";
import React, { useState } from "react";
import QuestionCard from "./QuestionCard";

const MOCK_STREAM = [
  {
    id: "1",
    title: "What are the core prerequisites for clearing Google's Digital Marketing and Ecommerce Certification track?",
    content: "I am building out my technical knowledge portfolio map. I need specific outlines regarding modules, requirements, and total estimated execution hours.",
    type: "QUESTION" as const,
    score: 38,
    category: "digital-marketing",
    author: "jwillms_growth",
    replies: 12
  },
  {
    id: "2",
    title: "Why keeping your Next.js route structures and matchers simple eliminates production middleware runtime errors",
    content: "Complex regular expression structures inside your edge configs can cause unhandled parsing runtime drops on Vercel infrastructure. Here's a clean alternative logic loop configuration setup.",
    type: "DISCUSSION" as const,
    score: 24,
    category: "tech",
    author: "ssamal_dev",
    replies: 7
  }
];

export default function RecentQuestions() {
  const [filter, setFilter] = useState<"HOT" | "NEW">("HOT");

  return (
    <div className="space-y-4">
      {/* Dynamic Sorting Selection Wrapper */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl px-4 py-2 flex items-center gap-1 shadow-sm">
        <button 
          onClick={() => setFilter("HOT")}
          className={`text-xs font-bold px-4 py-2 rounded-lg transition ${filter === "HOT" ? "bg-[#eff6ff] text-[#1d4ed8]" : "text-[#64748b] hover:bg-slate-50"}`}
        >
          🔥 Hot Content
        </button>
        <button 
          onClick={() => setFilter("NEW")}
          className={`text-xs font-bold px-4 py-2 rounded-lg transition ${filter === "NEW" ? "bg-[#eff6ff] text-[#1d4ed8]" : "text-[#64748b] hover:bg-slate-50"}`}
        >
          ✨ Newest Actions
        </button>
      </div>

      {/* Main Grid Component Injector */}
      <div className="space-y-3">
        {MOCK_STREAM.map((item) => (
          <QuestionCard key={item.id} post={item} />
        ))}
      </div>
    </div>
  );
}
