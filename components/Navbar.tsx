"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link"; // यहाँ सुधार कर दिया गया है (Correct Import)
import Image from "next/image";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // बाहर क्लिक करने पर ड्रॉपडाउन बंद करने के लिए
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 shadow-sm shadow-blue-950/5 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 py-3">
        
        {/* LOGO LINK CONTAINER */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl">
            <Image
              src="/LOGO.png"
              alt="Asklo Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-2xl font-black tracking-tight text-[#123c9c] leading-none">
              Asklo
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-600 pt-1 leading-none">
              The World's Living Room
            </span>
          </div>
        </Link>

        {/* SEARCH BAR */}
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

        {/* ACTIONS SECTION */}
        <div className="ml-auto flex items-center gap-3">
          
          {/* QUORA-STYLE SPLIT DROPDOWN BUTTON */}
          <div className="relative inline-flex items-center" ref={dropdownRef}>
            {/* मुख्य बटन: Ask Question */}
            <Link
              href="/ask?type=question"
              className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-black px-4 py-2 rounded-l-full transition-colors duration-150 shadow-sm border-r border-[#1e40af]"
            >
              Ask Question
            </Link>

            {/* ड्रॉपडाउन एरो बटन */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
              className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white p-2 rounded-r-full transition-colors duration-150 shadow-sm focus:outline-none"
              aria-label="Toggle ask options"
            >
              <svg
                className={`w-3.5 h-3.5 transform transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* छोटा सुंदर पॉपअप ड्रॉपडाउन */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                <div className="relative bg-white py-1">
                  <Link
                    href="/ask?type=post"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Create Post
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ANONYMOUS STATUS */}
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0f2f88] px-4 py-2 text-xs font-black text-white shadow-lg shadow-blue-950/20">
            <span className="h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
            Anonymous On
          </span>
          
        </div>
      </div>
    </nav>
  );
}
