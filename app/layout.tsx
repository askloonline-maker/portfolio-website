import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
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
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#f1f4f8] text-[#1e2229] antialiased font-sans selection:bg-blue-100">
          
          {/* HEADER SECTION */}
          <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50 shadow-sm h-12 flex items-center">
            <div className="max-w-[1000px] w-full mx-auto px-4 flex items-center justify-between gap-6">
              
              {/* Brand Logo */}
              <a href="/" className="flex flex-col cursor-pointer shrink-0">
                <span className="font-black text-xl text-[#1d4ed8] tracking-tight leading-none">
                  Asklo.Online
                </span>
                <span className="text-[8px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">
                  The World&apos;s Living Room
                </span>
              </a>

              {/* Central Search Bar */}
              <div className="flex-1 max-w-[550px] relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search Asklo.Online..." 
                  className="w-full pl-9 pr-4 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs focus:outline-none focus:border-[#1d4ed8] focus:bg-white transition-colors"
                />
              </div>

              {/* Dynamic Authentication Actions */}
              <div className="flex items-center gap-4 shrink-0">
                {/* Logged Out View */}
                <SignedOut>
                  <a href="/login" className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition">
                    Login
                  </a>
                  <a href="/signup" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium px-4 py-1.5 rounded-full text-xs transition-all shadow-sm">
                    Sign Up
                  </a>
                </SignedOut>

                {/* Logged In View */}
                <SignedIn>
                  <a href="/ask" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium px-4 py-1.5 rounded-full text-xs transition-all shadow-sm">
                    Add Question
                  </a>
                  <div className="flex items-center justify-center pt-0.5">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>

            </div>
          </header>

          {/* MAIN MOUNT POINT */}
          <div className="max-w-[1000px] mx-auto px-4 py-4">
            {children}
          </div>

        </body>
      </html>
    </ClerkProvider>
  );
}
