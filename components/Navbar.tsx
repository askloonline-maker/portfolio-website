"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image"; // Added for image rendering

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 shadow-sm shadow-blue-950/5 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 py-3">
        
        {/* LOGO LINK CONTAINER */}
        <Link href="/" className="group flex items-center gap-2">
          {/* 🖼️ Replaced your <span> box with your real root image asset */}
          <div className="relative h-10 w-10 overflow-hidden rounded-xl">
            <Image
              src="/LOGO.png"
              alt="Asklo.Online Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-2xl font-black tracking-tight text-[#123c9c] leading-none">
            </span>
            {/* ✨ Premium Slogan positioned cleanly below the core text brand */}
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-600 pt-1 leading-none">
              The World's Living Room
            </span>
          </div>
        </Link>

        <div className="hidden flex-1 md:block">
          <label className="relative block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-blue-500">⌕</span>
            <input
              type="text"
              placeholder="Search questions, answers, topics..."
              className="w-full rounded-full border border-blue-100 bg-blue-50/70 py-3 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/ask" className="hidden rounded-full border border-blue-200 px-4 py-2 text-xs font-black text-blue-700 transition hover:bg-blue-50 sm:inline-flex">
            Ask
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0f2f88] px-4 py-2 text-xs font-black text-white shadow-lg shadow-blue-950/20">
            {/* 💚 Fixed: Changed dot from bg-white/90 to a vibrant green indicator with a clean back-glow shadow */}
            <span className="h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
            Anonymous On
          </span>
        </div>
      </div>
    </nav>
  );
}
