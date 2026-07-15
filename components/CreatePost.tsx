"use client";
import React, { useState } from "react";

export default function CreatePost() {
  const [inputText, setInputText] = useState("");

  const handlePublish = () => {
    if (!inputText.trim()) return;
    alert("Anonymous Post Submitted Successfully!");
    setInputText("");
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
      {/* Top Profile Status */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm shadow-inner">
          😎
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-800">What's on your mind today?</span>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Ask anonymously..."
        className="w-full min-h-[70px] text-xs font-medium text-slate-600 placeholder-slate-400 focus:outline-none resize-none pt-2"
      />

      {/* Media & Attachment Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-50">
        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
          <button className="flex items-center gap-1.5 hover:text-slate-800 transition">
            <span className="text-slate-400">🖼️</span> Image
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-800 transition">
            <span className="text-slate-400">🎥</span> Video
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-800 transition">
            <span className="text-slate-400">📊</span> Poll
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-800 transition">
            <span className="text-slate-400">😀</span> Emoji
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-800 transition">
            <span className="text-slate-400">📎</span> Attachment
          </button>
          <button className="text-slate-400 hover:text-slate-800 transition">••• More</button>
        </div>

        {/* Visibility Toggle and Submit */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1 gap-1">
            <button className="px-2.5 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 rounded-lg">
              Public
            </button>
            <button className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 rounded-lg shadow-2xs">
              🔒 Anonymous
            </button>
          </div>
          <button
            onClick={handlePublish}
            disabled={!inputText.trim()}
            className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide flex items-center gap-1.5 transition-all ${
              inputText.trim()
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10 hover:bg-blue-700"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            Publish 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
