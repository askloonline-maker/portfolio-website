"use client";
import React, { useState } from "react";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    try {
      // Send directly to your database API route
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content,
          author_name: "Anonymous Guest", // Default fallback name for open posting
          user_id: "00000000-0000-0000-0000-000000000000" // Static guest UUID layout
        }),
      });

      if (res.ok) {
        setContent("");
        window.location.reload(); // Refresh feed to display the new submission
      }
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What is your question or thought? Post anything legally..."
          rows={3}
          className="w-full resize-none border-none focus:ring-0 text-base placeholder-slate-400 focus:outline-none"
        />
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400">Posting instantly as Public Guest</span>
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-5 py-2 rounded-full transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
