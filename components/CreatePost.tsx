"use client";
import React, { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || "Untitled Question",
          content: content,
          author_name: "Anonymous Guest",
          user_id: "00000000-0000-0000-0000-000000000000" // Fallback static guest UUID
        }),
      });

      if (res.ok) {
        setTitle("");
        setContent("");
        window.location.reload(); // Instantly update view
      }
    } catch (err) {
      console.error("Failed to post message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title or main question (optional)"
          className="w-full text-base font-semibold placeholder-slate-400 focus:outline-none border-b border-slate-100 pb-2 focus:border-[#bfdbfe]"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are your thoughts? Ask anything or post helpful information legal..."
          rows={3}
          className="w-full resize-none border-none focus:ring-0 text-sm placeholder-slate-400 focus:outline-none pt-1"
        />
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400 italic">Posting anonymously without sign up</span>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow-sm transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Post to Square"}
          </button>
        </div>
      </form>
    </div>
  );
}
