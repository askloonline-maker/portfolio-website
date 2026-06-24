"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/ask", icon: "✍️", label: "Ask anonymously" },
  { href: "/categories", icon: "🌐", label: "Spaces" },
  { href: "#", icon: "🔥", label: "Trending" },
  { href: "#", icon: "🔖", label: "Saved" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1.5 flex flex-col items-center md:items-stretch">
      {links.map((link) => {
        // Simple client checking to see if link is currently active
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            title={link.label}
            className={`flex items-center justify-center md:justify-start gap-3 rounded-xl md:rounded-2xl w-full p-3 text-sm font-black transition ${
              isActive 
                ? "bg-[#0f2f88] text-white shadow-lg shadow-blue-950/20" 
                : "text-slate-600 hover:bg-blue-50 hover:text-[#123c9c]"
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="hidden md:block">{link.label}</span>
          </Link>
        );
      })}

      <div className="my-2 w-full h-px bg-blue-100" />

      {/* Title description block: visible only on desktop */}
      <p className="hidden md:block px-4 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
        Popular Spaces
      </p>
      
      <div className="flex flex-col gap-1 w-full items-center md:items-stretch pt-0.5">
        {["anonymous-life", "technology", "startups", "relationships", "learning"].map((space) => (
          <Link 
            key={space} 
            href="/categories" 
            title={`# ${space}`}
            className="rounded-xl px-2 md:px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 text-center md:text-left"
          >
            <span className="md:hidden">#</span>
            <span className="hidden md:inline"># {space}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
