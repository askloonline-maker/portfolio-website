import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Branding Target */}
        <Link href="/" className="text-xl font-black text-[#1d4ed8] tracking-tight flex items-center gap-1">
          Asklo<span className="text-[#64748b]">.Online</span>
        </Link>
        
        {/* Central Search Routing Anchor */}
        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Dynamic Action Controls */}
        <div className="flex items-center gap-3">
          <Link href="/ask" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition shadow-sm">
            + Ask or Post
          </Link>
          <Link href="/login" className="text-xs font-bold text-[#64748b] hover:text-[#1d4ed8] px-2 py-1 transition">
            Login
          </Link>
          <Link href="/signup" className="bg-[#eff6ff] hover:bg-blue-100 text-[#1d4ed8] text-xs font-bold px-4 py-2.5 rounded-full transition">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
