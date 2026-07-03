"use client";
import React from "react";

export default function SearchBar() {
  return (
    <div className="w-full relative">
      <span className="absolute left-4 top-2.5 text-sm text-[#64748b]">🔍</span>
      <input 
        type="text" 
        aria-label="Search posts, queries, or topics" // ♿️ Fixes Interactive Element Label warning
        placeholder="Search posts, queries, or topics..." 
        className="w-full bg-[#f1f5f9] border border-[#e2e8f0] rounded-full pl-10 pr-5 py-2 text-sm focus:outline-none focus:border-[#1d4ed8] focus:bg-white transition"
      />
    </div>
  );
}
