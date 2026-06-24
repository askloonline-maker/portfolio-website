"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  // Navigation items mapping to your left sidebar links
  const navItems = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Ask", href: "/ask", icon: "✍️" },
    { label: "Spaces", href: "/categories", icon: "🌐" },
    { label: "Trending", href: "#", icon: "🔥" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-blue-100 bg-white/95 py-2 shadow-lg shadow-blue-950/10 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1 transition-all ${
                isActive 
                  ? "text-blue-600 font-bold" 
                  : "text-slate-500 hover:text-blue-500"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
