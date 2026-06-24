import React from "react";
import Link from "next/link";

const links = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/ask", icon: "✍️", label: "Ask anonymously" },
  { href: "/categories", icon: "🌐", label: "Spaces" },
  { href: "/", icon: "🔥", label: "Trending" },
  { href: "/", icon: "🔖", label: "Saved" },
];

export default function Sidebar() {
  return (
    <nav className="space-y-2">
      {links.map((link, index) => (
        <Link
          key={link.label}
          href={link.href}
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition ${
            index === 0 ? "bg-[#0f2f88] text-white shadow-lg shadow-blue-950/20" : "text-slate-600 hover:bg-blue-50 hover:text-[#123c9c]"
          }`}
        >
          <span>{link.icon}</span>
          {link.label}
        </Link>
      ))}

      <div className="my-4 h-px bg-blue-100" />

      <p className="px-4 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Popular Spaces</p>
      <div className="space-y-1 pt-1">
        {["anonymous-life", "technology", "startups", "relationships", "learning"].map((space) => (
          <Link key={space} href="/categories" className="block rounded-xl px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700">
            # {space}
          </Link>
        ))}
      </div>
    </nav>
  );
}
