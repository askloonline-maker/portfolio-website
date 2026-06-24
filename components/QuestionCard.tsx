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
    setVotes((prev) => (hasVoted ? prev - 1 : prev + 1));
    setHasVoted((prev) => !prev);
  };

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-950/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-950/10">
      <div className="flex gap-4 p-5">
        <div className="flex h-fit min-w-[52px] flex-col items-center rounded-2xl border border-blue-100 bg-blue-50/70 p-2">
          <button
            onClick={handleUpvote}
            className={`text-xl transition ${hasVoted ? "text-[#123c9c]" : "text-blue-300 hover:text-blue-700"}`}
            aria-label="Upvote anonymous post"
          >
            ▲
          </button>
          <span className="my-1 text-xs font-black text-slate-800">{votes}</span>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-[#0f2f88] px-3 py-1 font-black text-white">{post.author_name || "Anonymous"}</span>
            <span>asked anonymously</span>
            <span>•</span>
            <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString()}</time>
          </div>

          {post.title && <h2 className="text-xl font-black leading-snug text-slate-950 transition group-hover:text-[#123c9c]">{post.title}</h2>}

          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-650 text-slate-600">{post.content}</p>

          <div className="flex flex-wrap gap-2 pt-1 text-xs font-black text-blue-700">
            <button className="rounded-full bg-blue-50 px-3 py-1.5 transition hover:bg-blue-100">Answer</button>
            <button className="rounded-full bg-blue-50 px-3 py-1.5 transition hover:bg-blue-100">Follow</button>
            <button className="rounded-full bg-blue-50 px-3 py-1.5 transition hover:bg-blue-100">Share</button>
          </div>
        </div>
      </div>
    </article>
  );
}
