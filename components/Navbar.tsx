"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Identity / Logo */}
        <Link href="/" className="text-2xl font-black text-[#1d4ed8] tracking-tight hover:opacity-90 transition">
          Asklo<span className="text-slate-800 font-medium">.Online</span>
        </Link>

        {/* Global Search Interface */}
        <div className="flex-1 max-w-xl mx-6 hidden sm:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions, topics, or trends..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Status indicator showing public guest mode */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1d4ed8] bg-[#eff6ff] px-3 py-1.5 rounded-full border border-[#bfdbfe]">
            <span className="h-2 w-2 rounded-full bg-[#3b82f6] animate-pulse"></span>
            Anonymous Guest Mode
          </span>
        </div>
      </div>
    </nav>
  );
}
