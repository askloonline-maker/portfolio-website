"use client";
import React, { useState } from "react";

interface PostProps {
  post: {
    id: string;
    title?: string;
    content: string;
    author_name?: string;
    created_at: string;
    upvotes?: number;
  };
}

export default function QuestionCard({ post }: PostProps) {
  const [votes, setVotes] = useState(post.upvotes || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleUpvote = () => {
    if (hasVoted) {
      setVotes(prev => prev - 1);
      setHasVoted(false);
    } else {
      setVotes(prev => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex gap-4">
      {/* Reddit-style sidebar vote column */}
      <div className="flex flex-col items-center bg-slate-50 rounded-lg p-2 h-fit min-w-[44px]">
        <button 
          onClick={handleUpvote}
          className={`text-lg transition ${hasVoted ? "text-[#1d4ed8] font-bold" : "text-slate-400 hover:text-slate-600"}`}
        >
          ▲
        </button>
        <span className="text-xs font-bold text-slate-700 my-1">{votes}</span>
      </div>

      {/* Primary content area */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-[#1d4ed8] bg-[#eff6ff] px-2 py-0.5 rounded-md">
            {post.author_name || "Anonymous Guest"}
          </span>
          <span>•</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        
        {post.title && (
          <h2 className="text-lg font-bold text-slate-900 leading-snug hover:text-[#1d4ed8] cursor-pointer transition">
            {post.title}
          </h2>
        )}
        
        <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>
    </div>
  );
}
