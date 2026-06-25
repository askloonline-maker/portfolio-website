"use client";
import React, { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); // Tracks the topic dropdown selection
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Front-end validation enforcement
    if (!category) {
      setError("Please select a relevant space/topic before posting!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || "Anonymous question",
          content: content.trim(),
          category: category, // Sends the selected slug string to the API backend
          author_name: "Anonymous",
          user_id: "00000000-0000-0000-0000-000000000000",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Unable to publish anonymously");
      }

      setTitle("");
      setContent("");
      setCategory(""); // Reset dropdown on success
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to publish anonymously");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-950/10">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-2xl">🕶️</div>
        <div>
          <h2 className="text-lg font-black text-slate-950">Post anonymously</h2>
          <p className="text-xs font-medium text-slate-500">Your post is published as Anonymous. No sign-up, profile, or identity field.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        
        {/* REQUIRED TOPIC SELECT MENU */}
        <div className="relative">
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="" disabled className="text-slate-400">
              -- Choose a Relevant Space/Topic * --
            </option>
            <option value="digital-marketing" className="text-slate-900">📈 c/digital-marketing</option>
            <option value="startups-business" className="text-slate-900">💼 c/startups-business</option>
            <option value="artificial-intelligence" className="text-slate-900">🤖 c/artificial-intelligence</option>
            <option value="tech" className="text-slate-900">💻 c/tech</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 text-xs">
            ▼
          </div>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you want to ask or discuss?"
          className="w-full rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-base font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add context, details, opinions, or helpful information..."
          rows={4}
          className="w-full resize-none rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        />
        {error && <p className="rounded-2xl bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700">{error}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-blue-50 pt-3">
          <span className="text-xs font-bold text-blue-700">Anonymous by default · public feed · be respectful</span>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="rounded-full bg-gradient-to-r from-[#0f2f88] to-[#2563eb] px-6 py-3 text-xs font-black text-white shadow-lg shadow-blue-950/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish anonymously"}
          </button>
        </div>
      </form>
    </section>
  );
}
