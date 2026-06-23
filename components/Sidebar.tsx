import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="space-y-1 w-full">
      <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#eff6ff] text-[#1d4ed8] font-bold text-sm transition">
        <span>🏠</span> Home Feed
      </Link>
      <Link href="/categories" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] text-sm font-medium transition">
        <span>🌐</span> Explore Topics
      </Link>
      <Link href="/notifications" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] text-sm font-medium transition justify-between">
        <span className="flex items-center gap-3"><span>🔔</span> Notifications</span>
        <span className="bg-[#dc2626] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">2</span>
      </Link>
      
      <hr className="my-4 border-[#e2e8f0]" />
      
      <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] px-4 mb-2">Popular Communities</p>
      <div className="space-y-1">
        <Link href="/categories" className="block px-4 py-1.5 text-xs text-[#0f172a] font-medium hover:text-[#1d4ed8] transition"># data-science</Link>
        <Link href="/categories" className="block px-4 py-1.5 text-xs text-[#0f172a] font-medium hover:text-[#1d4ed8] transition"># digital-marketing</Link>
        <Link href="/categories" className="block px-4 py-1.5 text-xs text-[#0f172a] font-medium hover:text-[#1d4ed8] transition"># artificial-intelligence</Link>
      </div>
    </nav>
  );
}
