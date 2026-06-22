import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-900">
      {/* 1. NAVBAR (Quora/Reddit Inspired) */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-2xl text-blue-700 tracking-tight cursor-pointer">
            <span className="text-xl">💬</span>
            <span>BlueSpace</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Search BlueSpace..." 
              className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:border-blue-600 focus:bg-white transition-colors text-sm"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-blue-600 text-xl p-2 rounded-full hover:bg-gray-100 transition">
              🔔
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-full text-sm transition-all shadow-sm">
              Add Post
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-600 flex items-center justify-center font-bold text-blue-800 cursor-pointer text-sm">
              U
            </div>
          </div>
        </div>
      </nav>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* LEFT SIDEBAR (Spaces / Subreddits) */}
        <aside className="hidden md:block col-span-1 space-y-2 sticky top-20 h-fit">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Feeds & Spaces</p>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium transition">
            🏠 Home
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
            🔥 Popular
          </a>
          <hr class="my-3 border-gray-200" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">My Communities</p>
          <a href="#" className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> r/AskTech
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span> r/WebDevelopment
          </a>
        </aside>

        {/* CENTER FEED (The Posts) */}
        <main className="col-span-1 md:col-span-2 space-y-4">
          
          {/* Quick Post Box */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 shrink-0">U</div>
            <input 
              type="text" 
              placeholder="What do you want to ask or share?" 
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-4 text-sm focus:outline-none hover:bg-gray-100 transition cursor-pointer"
            />
          </div>

          {/* Post Card 1 */}
          <article className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="font-semibold text-gray-800 hover:underline cursor-pointer">r/WebDevelopment</span>
                <span>•</span>
                <span>Posted by u/code_wizard</span>
                <span>•</span>
                <span>2 hours ago</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-950 leading-snug hover:text-blue-600 cursor-pointer transition-colors mb-2">
                What is the best stack to build a modern community website in 2026?
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                I am trying to build a platform that combines the nested, fast-paced discussion threads of Reddit with the clean, knowledge-base formatting of Quora. Should I go with Next.js and Tailwind?
              </p>
            </div>
            
            <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-t border-gray-100 text-sm">
              <div className="flex items-center gap-1 bg-gray-200/60 rounded-full p-0.5">
                <button className="px-3 py-1 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition">
                  ▲ <span className="font-medium ml-1">142</span>
                </button>
                <button className="px-3 py-1 rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600 transition">
                  ▼
                </button>
              </div>
              <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-200/60 px-3 py-1.5 rounded-full transition">
                💬 <span className="font-medium">38 Comments</span>
              </button>
            </div>
          </article>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden md:block col-span-1 space-y-4 sticky top-20 h-fit">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-3 uppercase tracking-wider">Trending Topics</h3>
            <div className="space-y-3">
              <div>
                <a href="#" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition block">#TailwindCSS</a>
                <span className="text-xs text-gray-500">12.4k posts</span>
              </div>
              <div>
                <a href="#" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition block">#NextJS_Updates</a>
                <span className="text-xs text-gray-500">8.1k posts</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
