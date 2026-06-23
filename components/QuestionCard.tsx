import React from "react";
import Link from "next/link";

interface QuestionCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    type: "QUESTION" | "DISCUSSION";
    score: number;
    category: string;
    author: string;
    replies: number;
  };
}

export default function QuestionCard({ post }: QuestionCardProps) {
  const isQuestion = post.type === "QUESTION";

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm hover:border-slate-300 transition overflow-hidden flex">
      {/* Vote Pillar Container */}
      <div className="bg-slate-50/50 w-12 flex flex-col items-center py-3 border-r border-[#e2e8f0] select-none text-center">
        <button className="text-[#64748b] hover:text-[#1d4ed8] text-sm font-bold p-1 transition">▲</button>
        <span className="text-xs font-black text-[#0f172a] my-0.5">{post.score}</span>
        <button className="text-[#64748b] hover:text-[#dc2626] text-sm font-bold p-1 transition">▼</button>
      </div>

      {/* Main Metadata Text Pane */}
      <div className="p-4 flex-1 space-y-2">
        <div className="flex items-center flex-wrap gap-2 text-[11px] text-[#64748b]">
          {isQuestion ? (
            <span className="bg-[#eff6ff] text-[#1d4ed8] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide text-[9px] border border-blue-100">
              ❓ Question
            </span>
          ) : (
            <span className="bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide text-[9px] border border-emerald-100">
              💬 Discussion
            </span>
          )}
          <span className="font-bold text-[#0f172a]">#{post.category}</span>
          <span>•</span>
          <span>Posted by @{post.author}</span>
        </div>

        <h2 className="text-base font-bold text-[#0f172a] hover:text-[#1d4ed8] tracking-tight leading-snug transition cursor-pointer">
          {post.title}
        </h2>

        <p className="text-sm text-[#64748b] line-clamp-2 leading-relaxed">
          {post.content}
        </p>

        <div className="pt-2 flex items-center gap-4 text-xs text-[#64748b] font-semibold">
          <span className="flex items-center gap-1.5 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition cursor-pointer">
            💬 {post.replies} Answers & Comments
          </span>
          <span className="flex items-center gap-1.5 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition cursor-pointer">
            🔖 Save
          </span>
        </div>
      </div>
    </div>
  );
}
