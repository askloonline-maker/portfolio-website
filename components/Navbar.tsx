"use html";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-600 tracking-tight">
          Asklo<span className="text-slate-800">.Online</span>
        </Link>

        {/* Global Search Bar like Quora */}
        <div className="flex-1 max-w-lg mx-8 hidden sm:block">
          <input
            type="text"
            placeholder="Search Asklo..."
            className="w-full bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
        </div>

        {/* Public Action Controls */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            🌐 Public Mode
          </span>
        </div>
      </div>
    </nav>
  );
}
