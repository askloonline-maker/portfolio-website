"use client";
import React from "react";

// 🏷️ Define interface to accept unique dynamic topics from page.tsx
interface RightSidebarProps {
  customTopics?: string[];
}

export default function RightSidebar({ customTopics = [] }: RightSidebarProps) {
  // Static fallback if database has no active tags/categories yet
  const defaultTopics = [
    { name: "Growth Hacking", count: "24 Qs" },
    { name: "SaaS Startups", count: "18 Qs" },
    { name: "SEO Frameworks", count: "15 Qs" },
    { name: "Ad Optimization", count: "12 Qs" },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header section styling matching Quora format */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <span className="text-sm">🔥</span>
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
          Hot Topics
        </h3>
        <span className="ml-auto text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md animate-pulse">
          Live Shift
        </span>
      </div>

      {/* Topics list renderer */}
      <div className="space-y-1">
        {customTopics.length > 0
          ? customTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-2 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition cursor-pointer text-left"
              >
                <span className="truncate"># {topic}</span>
              </div>
            ))
          : defaultTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-2 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition cursor-pointer"
              >
                <span className="truncate"># {topic.name}</span>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {topic.count}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}
