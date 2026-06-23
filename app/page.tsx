import React from 'react';

export default function HomeFeed() {
  const customSpaces = [
    { emoji: "🤖", name: "Artificial Intelligence" },
    { emoji: "💻", name: "Web Development" },
    { emoji: "🚀", name: "Startup Strategy" },
    { emoji: "📈", name: "Personal Finance" },
    { emoji: "🎮", name: "Gaming Culture" },
    { emoji: "✈️", name: "Budget Travel" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
      
      {/* LEFT SIDEBAR: CREATOR / TOPIC SPACES */}
      <aside className="hidden md:block col-span-1 space-y-1 text-sm">
        <a href="/categories" className="flex items-center gap-2 px-2 py-1.5 rounded bg-gray-200/50 text-gray-900 font-medium transition mb-2">
          <span>➕</span> Create Space
        </a>
        {customSpaces.map((space, index) => (
          <a 
            key={index} 
            href="/categories" 
            className="flex items-center gap-2.5 px-2 py-1.5 rounded text-gray-600 hover:bg-white hover:text-gray-900 transition font-normal"
          >
            <span className="p-1 bg-white border border-gray-200 rounded text-xs shadow-sm shrink-0">{space.emoji}</span>
            <span className="truncate">{space.name}</span>
          </a>
        ))}
      </aside>

      {/* CENTRAL COLUMN: CLEAN KNOWLEDGE DISCUSSION FEED */}
      <main className="col-span-1 md:col-span-2 space-y-3">
        
        {/* Quick Question Entry Field Box */}
        <div className="bg-white border border-[#e6e6e6] rounded-md p-3 shadow-xs">
          <div className="flex gap-2.5 items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">U</div>
            <a href="/ask" className="w-full text-left text-sm text-gray-400 bg-[#f7f7f8] border border-[#dee0e1] rounded-full py-1.5 px-4 hover:bg-gray-100/80 transition cursor-pointer">
              What is your question or link?
            </a>
          </div>
          <div className="flex items-center justify-around text-xs text-gray-500 pt-1 font-medium border-t border-gray-100">
            <a href="/ask" className="hover:text-gray-900 flex items-center gap-1.5 transition">❓ Ask</a>
            <div className="w-px h-3 bg-gray-200"></div>
            <a href="/ask" className="hover:text-gray-900 flex items-center gap-1.5 transition">📝 Answer</a>
            <div className="w-px h-3 bg-gray-200"></div>
            <a href="/ask" className="hover:text-gray-900 flex items-center gap-1.5 transition">🎨 Post</a>
          </div>
        </div>

        {/* FEED DISCUSSION BLOCK 1 */}
        <article className="bg-white border border-[#e6e6e6] rounded-md shadow-xs p-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="font-bold text-gray-800 hover:underline cursor-pointer">Artificial Intelligence</span>
            <span>•</span>
            <span>Answered by Expert AI</span>
            <span>•</span>
            <span>12h ago</span>
          </div>
          
          <h2 className="text-base font-bold text-gray-950 hover:text-blue-600 cursor-pointer transition-colors mb-1.5 leading-snug">
            What is the absolute best way to practice Prompt Engineering in 2026?
          </h2>
          
          <p className="text-gray-800 text-sm leading-relaxed line-clamp-3 mb-3">
            The single most effective method is structured framework iterative testing. Don&apos;t just type random instructions. Use parameters like systemic constraints, variable data assignment, and clear few-shot examples inside your input environments to achieve consistent deterministic models.
          </p>

          {/* Premium Engagement Metrics Control Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-2 mt-2 text-xs">
            <div className="flex items-center bg-[#f7f7f8] border border-[#dee0e1] rounded-full overflow-hidden shrink-0">
              <button className="px-3 py-1.5 font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-1">
                ▲ Upvote <span className="text-gray-400 font-normal">85</span>
              </button>
              <div className="w-px h-full bg-gray-200"></div>
              <button className="px-2.5 py-1.5 text-gray-500 hover:bg-red-50 hover:text-red-500 transition">
                ▼
              </button>
            </div>

            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <button className="hover:bg-gray-100 px-2 py-1 rounded transition">💬 14</button>
              <button className="hover:bg-gray-100 px-2 py-1 rounded transition">🔄 4</button>
            </div>
          </div>
        </article>

        {/* FEED DISCUSSION BLOCK 2 */}
        <article className="bg-white border border-[#e6e6e6] rounded-md shadow-xs p-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="font-bold text-gray-800 hover:underline cursor-pointer">Web Development</span>
            <span>•</span>
            <span>Trending Insight</span>
          </div>
          
          <h2 className="text-base font-bold text-gray-950 hover:text-blue-600 cursor-pointer transition-colors mb-1.5 leading-snug">
            Why are modern developers transitioning fully away from monolithic architecture designs?
          </h2>
          
          <p className="text-gray-800 text-sm leading-relaxed line-clamp-3 mb-3">
            Decoupled frameworks allow modular optimization. When your front-end components render independently on modern server networks, isolated scaling ensures system bugs never disrupt your global client workflows.
          </p>

          <div className="flex items-center justify-between border-t border-gray-100 pt-2 mt-2 text-xs">
            <div className="flex items-center bg-[#f7f7f8] border border-[#dee0e1] rounded-full overflow-hidden shrink-0">
              <button className="px-3 py-1.5 font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-1">
                ▲ Upvote <span className="text-gray-400 font-normal">1.2k</span>
              </button>
              <div className="w-px h-full bg-gray-200"></div>
              <button className="px-2.5 py-1.5 text-gray-500 hover:bg-red-50 hover:text-red-500 transition">
                ▼
              </button>
            </div>

            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <button className="hover:bg-gray-100 px-2 py-1 rounded transition">💬 42</button>
              <button className="hover:bg-gray-100 px-2 py-1 rounded transition">🔄 11</button>
            </div>
          </div>
        </article>

      </main>

      {/* RIGHT SIDEBAR: COMMUNITY CONTEXT INFOCARD */}
      <aside className="hidden md:block col-span-1 bg-white border border-[#e6e6e6] rounded-md p-3 shadow-xs sticky top-16 text-xs text-gray-500 space-y-3">
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-2 border-b border-gray-100 pb-1.5">Improve Your Feed</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline">✅ Visit 5 distinct Spaces</li>
            <li className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600 transition">⚪ Upvote 3 answers</li>
            <li className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600 transition">⚪ Ask your first question</li>
          </ul>
        </div>
        <hr className="border-gray-100" />
        <footer className="text-[10px] leading-relaxed text-gray-400">
          About • Careers • Terms • Privacy • © 2026 Asklo.Online
        </footer>
      </aside>

    </div>
  );
}
