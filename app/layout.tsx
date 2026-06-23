import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Asklo.Online - Share Knowledge & Explore the World',
  description: "A premium platform to ask questions, share insights, and connect with living-room spaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f1f4f8] text-[#1e2229] antialiased font-sans selection:bg-blue-100">
        
        {/* PREMIUM ROYAL BLUE THEMED HEADER */}
        <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50 shadow-sm h-12 flex items-center">
          <div className="max-w-[1000px] w-full mx-auto px-4 flex items-center justify-between gap-6">
            
            {/* Brand Logo & Slogan */}
            <a href="/" className="flex flex-col cursor-pointer shrink-0">
              <span className="font-black text-xl text-[#1d4ed8] tracking-tight leading-none">
                Asklo.Online
              </span>
              <span className="text-[8px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">
                The World&apos;s Living Room
              </span>
            </a>

            {/* Icon Tab Navigation */}
            <nav className="hidden md:flex items-center h-12 text-gray-500">
              <a href="/" className="flex items-center justify-center w-14 h-full border-b-2 border-[#1d4ed8] text-[#1d4ed8] transition-all" title="Home">
                <span className="text-xl">🏠</span>
              </a>
              <a href="/categories" className="flex items-center justify-center w-14 h-full border-b-2 border-transparent hover:border-gray-300 hover:text-gray-900 transition-all" title="Spaces">
                <span className="text-xl">📂</span>
              </a>
              <a href="/ask" className="flex items-center justify-center w-14 h-full border-b-2 border-transparent hover:border-gray-300 hover:text-gray-900 transition-all" title="Answer">
                <span className="text-xl">✍️</span>
              </a>
            </nav>

            {/* Global Search Bar */}
            <div className="flex-1 max-w-[550px] relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
              <input 
                type="text" 
                placeholder="Search Asklo.Online..." 
                className="w-full pl-9 pr-4 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs focus:outline-none focus:border-[#1d4ed8] focus:bg-white transition-colors"
              />
            </div>

            {/* Interactive Navigation Elements */}
            <div className="flex items-center gap-3 shrink-0">
              <a href="/login" className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition">
                Login
              </a>
              <a href="/ask" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium px-4 py-1.5 rounded-full text-xs transition-all shadow-sm">
                Add Question
              </a>
            </div>

          </div>
        </header>

        {/* CONTAINER VIEWPORTS */}
        <div className="max-w-[1000px] mx-auto px-4 py-4">
          {children}
        </div>

      </body>
    </html>
  );
}
