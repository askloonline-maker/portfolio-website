import React from 'react';

export default function SpacesDirectory() {
  const highTraffic = [
    "AI & ChatGPT", "Programming", "Startups", "Finance & Investing", 
    "Health & Fitness", "Relationships", "Careers", "Digital Marketing"
  ];

  const categories = [
    { id: 1, title: "Artificial Intelligence & ML", icon: "🤖", desc: "Forums examining neural models, prompt creation, deep frameworks, and start-up ethics.", subs: ["AI Tools", "Generative AI", "ChatGPT", "Data Science"] },
    { id: 2, title: "Programming & Dev", icon: "💻", desc: "Engineers discussing production ecosystems, system architecture, mobile frameworks, and clean code.", subs: ["Python", "React", "JavaScript", "DevOps"] },
    { id: 3, title: "Startups & Growth", icon: "🚀", desc: "Founders evaluating product-market fit metrics, venture fundraising, and lean bootstrapping.", subs: ["SaaS Businesses", "Venture Capital", "Growth Hacking"] },
    { id: 4, title: "Finance & Investing", icon: "📈", desc: "Strategic tracking for wealth indices, asset generation, real estate distribution, and safety tools.", subs: ["Stock Market", "Personal Finance", "ETFs"] },
    { id: 5, title: "Cryptocurrency & Web3", icon: "🪙", desc: "Tracking distributed ledgers, asset metrics, digital decentralized architecture, and token utilities.", subs: ["Bitcoin", "Ethereum", "DeFi", "Web3"] },
    { id: 6, title: "Digital Marketing", icon: "🎯", desc: "Growth engines reviewing targeted operations, acquisition metrics, conversion pathways, and content loops.", subs: ["SEO Optimization", "PPC Campaigns", "Content loops"] },
    { id: 7, title: "Health & Wellness", icon: "🌱", desc: "Shared methodologies for internal longevity, sleep optimization, and biological alignment.", subs: ["Nutrition", "Mental Health", "Sleep Metrics"] },
    { id: 8, title: "Fitness & Bodybuilding", icon: "💪", desc: "Hypertrophy protocols, kinetic load testing, core discipline, and conditioning systems.", subs: ["Strength Training", "Calisthenics", "Running"] }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
      
      {/* Sidebar Focus Link */}
      <aside className="hidden md:block col-span-1 bg-white border border-[#e6e6e6] rounded-md p-3 text-xs">
        <h3 className="font-bold text-gray-400 uppercase tracking-wider mb-2">Popular Categories</h3>
        <div className="flex flex-col gap-1.5 font-medium text-gray-700">
          {highTraffic.map((t, idx) => (
            <a key={idx} href="#" className="hover:bg-gray-50 px-2 py-1 rounded transition hover:text-blue-600">• {t}</a>
          ))}
        </div>
      </aside>

      {/* Grid List Collection */}
      <main className="col-span-1 md:col-span-3 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Explore Spaces</h1>
          <p className="text-xs text-gray-500 mt-0.5">Discover verified community forums matching your analytical research loops.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white border border-[#e6e6e6] rounded-md p-4 shadow-xs hover:shadow-sm transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{cat.icon}</span>
                  <h2 className="text-sm font-bold text-gray-950 hover:text-blue-600 cursor-pointer transition">{cat.title}</h2>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{cat.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {cat.subs.map((s, i) => (
                    <span key={i} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-50 flex justify-end">
                <button className="text-xs font-semibold text-[#b92b27] hover:underline">
                  Follow Space
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
