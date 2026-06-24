import React from "react";
import Link from "next/link";

export default function RightSidebar() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-950/5">
        <div className="bg-gradient-to-r from-[#0f2f88] to-[#2563eb] p-4 text-white">
          <h3 className="text-sm font-black">Anonymous promise</h3>
          <p className="mt-1 text-xs leading-5 text-blue-50">Everyone can publish as Anonymous without account friction.</p>
        </div>
        <ul className="space-y-3 p-4 text-xs font-semibold leading-5 text-slate-600">
          <li>✅ Do not add personal details you do not want public.</li>
          <li>✅ Keep questions clear and useful.</li>
          <li>✅ Debate ideas, not people.</li>
          <li>🚫 Spam, abuse, and harmful links are not welcome.</li>
        </ul>
      </div>

      <div className="rounded-[2rem] border border-blue-100 bg-white p-4 shadow-sm shadow-blue-950/5">
        <h3 className="text-sm font-black text-slate-950">Trending today</h3>
        <div className="mt-3 space-y-3">
          {["How do anonymous communities stay high quality?", "Best AI tools for small creators", "Career advice people rarely say out loud"].map((item) => (
            <Link key={item} href="/" className="block rounded-2xl bg-blue-50/70 p-3 text-xs font-bold leading-5 text-slate-700 transition hover:bg-blue-100 hover:text-blue-800">
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-1 px-2 text-[11px] font-semibold text-slate-400">
        <Link href="/" className="hover:text-blue-700">Rules</Link>
        <span>•</span>
        <Link href="/" className="hover:text-blue-700">Privacy</Link>
        <span>•</span>
        <p>© 2026 Asklo.Online</p>
      </div>
    </div>
  );
}
