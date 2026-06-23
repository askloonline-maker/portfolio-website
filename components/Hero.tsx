import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm relative overflow-hidden">
      <div className="absolute right-0 top-0 text-7xl opacity-10 p-4 select-none">🌐</div>
      <div className="max-w-md space-y-3">
        <h1 className="text-2xl font-black text-[#0f172a] tracking-tight leading-tight">
          Welcome to the World's Living Room
        </h1>
        <p className="text-sm text-[#64748b] leading-relaxed">
          Asklo.Online brings global answers and conversations together. Share knowledge, track analytics, and build trusted topics.
        </p>
        <div className="pt-1">
          <Link href="/ask" className="inline-block bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition">
            Start a Conversation Block →
          </Link>
        </div>
      </div>
    </div>
  );
}
