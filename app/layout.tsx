import React from "react";
import Link from "next/link";
import "../styles/globals.css"; // Ensure standard Tailwind imports are present here

export const metadata = {
  title: "Asklo.Online - The World's Living Room",
  description: "A premium hub for global questions, comprehensive answers, and open discussions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-[#0f172a] min-h-screen flex flex-col antialiased">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <Link href="/" className="text-xl font-black text-[#1d4ed8] tracking-tight flex items-center gap-1">
              Asklo<span className="text-[#64748b]">.Online</span>
            </Link>
            
            <div className="flex-1 max-w-xl relative">
              <input 
                type="text" 
                placeholder="Search queries, tags, or topics..." 
                className="w-full bg-[#f1f5f9] border border-[#e2e8f0] rounded-full px-5 py-2 text-sm focus:outline-none focus:border-[#1d4ed8] focus:bg-white transition"
              />
            </div>

            <div className="flex items-center gap-3">
              <Link href="/create" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition shadow-sm">
                + Ask or Post
              </Link>
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-[#1d4ed8] flex items-center justify-center text-xs font-bold text-[#1d4ed8]">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic 3-Column Core Area */}
        <div className="max-w-7xl mx-auto w-full px-4 py-6 flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Navigation Sidebar */}
          <aside className="hidden md:block space-y-1 self-start sticky top-22">
            <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#eff6ff] text-[#1d4ed8] font-bold text-sm transition">
              <span>🏠</span> Home Feed
            </Link>
            <Link href="/explore" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] text-sm font-medium transition">
              <span>🌐</span> Explore Topics
            </Link>
            <Link href="/notifications" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] text-sm font-medium transition flex justify-between w-full">
              <span className="flex items-center gap-3"><span>🔔</span> Notifications</span>
              <span className="bg-[#dc2626] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">3</span>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] text-sm font-medium transition">
              <span>🛡️</span> Mod Queue
            </Link>
            <hr className="my-4 border-[#e2e8f0]" />
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] px-4 mb-2">My Communities</p>
            <Link href="/c/data-science" className="flex items-center gap-2 px-4 py-1.5 text-xs text-[#0f172a] font-medium hover:underline">
              # data-science
            </Link>
            <Link href="/c/digital-marketing" className="flex items-center gap-2 px-4 py-1.5 text-xs text-[#0f172a] font-medium hover:underline">
              # digital-marketing
            </Link>
          </aside>

          {/* Core App Viewport */}
          <main className="md:col-span-2 space-y-4">
            {children}
          </main>

          {/* Right Layout Context Panel */}
          <aside className="hidden md:block space-y-4 self-start sticky top-22">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-xs uppercase text-[#64748b] tracking-wider mb-3">Platform Guidelines</h3>
              <ul className="text-xs space-y-2 text-[#0f172a] list-disc list-inside">
                <li>Search for existing answers first.</li>
                <li>Stay clean, professional, and accurate.</li>
                <li>No toxic self-promotion or raw spam.</li>
              </ul>
            </div>
            <div className="text-[11px] text-[#64748b] px-2 flex flex-wrap gap-2">
              <Link href="/rules" className="hover:underline">Rules</Link>
              <span>•</span>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <span>•</span>
              <p>© 2026 Asklo.Online Inc.</p>
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}
