import React from 'react';

export default function CategoriesPage() {
  const highTraffic = [
    "AI & ChatGPT", "Programming", "Startups", "Finance & Investing", 
    "Health & Fitness", "Relationships", "Careers", "Digital Marketing", 
    "Gaming", "Travel", "Movies & Entertainment", "Education", 
    "Personal Development", "Business", "Cryptocurrency"
  ];

  const categories = [
    {
      id: 1,
      title: "Artificial Intelligence & Machine Learning",
      icon: "🤖",
      reddit: ["AI tools", "Chatbots", "Machine learning", "Deep learning", "Prompt engineering", "AI startups", "AI ethics", "Computer vision", "NLP"],
      quora: ["Artificial Intelligence", "Machine Learning", "ChatGPT", "Generative AI", "Data Science", "Neural Networks"]
    },
    {
      id: 2,
      title: "Programming & Software Development",
      icon: "💻",
      reddit: ["Python", "JavaScript", "React", "Java", "C++", "Web development", "Mobile apps", "DevOps", "Cloud computing"],
      quora: ["Programming", "Software Engineering", "Python Programming Language", "Web Development", "Software Architecture"]
    },
    {
      id: 3,
      title: "Startups & Entrepreneurship",
      icon: "🚀",
      reddit: ["Startup ideas", "SaaS businesses", "Bootstrapping", "Fundraising", "Venture capital", "Growth hacking", "Product-market fit"],
      quora: ["Entrepreneurship", "Startups", "Venture Capital", "Business Strategy", "Product Management"]
    },
    {
      id: 4,
      title: "Finance & Investing",
      icon: "📈",
      reddit: ["Stock investing", "ETFs", "Real estate", "Retirement planning", "Personal finance", "Trading", "Side hustles"],
      quora: ["Investing", "Stock Market", "Personal Finance", "Financial Planning", "Wealth Management"]
    },
    {
      id: 5,
      title: "Cryptocurrency & Blockchain",
      icon: "🪙",
      reddit: ["Bitcoin", "Ethereum", "Altcoins", "Web3", "NFTs", "DeFi", "Crypto trading"],
      quora: ["Cryptocurrency", "Bitcoin", "Blockchain Technology", "Ethereum"]
    },
    {
      id: 6,
      title: "Digital Marketing",
      icon: "🎯",
      reddit: ["SEO", "Content marketing", "Email marketing", "PPC", "Affiliate marketing", "Social media marketing"],
      quora: ["Digital Marketing", "Search Engine Optimization (SEO)", "Content Marketing", "Social Media Marketing"]
    },
    {
      id: 7,
      title: "Health & Wellness",
      icon: "🌱",
      reddit: ["Weight loss", "Nutrition", "Mental health", "Fitness", "Sleep", "Supplements", "Healthy habits"],
      quora: ["Health", "Nutrition", "Mental Health", "Fitness", "Dieting"]
    },
    {
      id: 8,
      title: "Fitness & Bodybuilding",
      icon: "💪",
      reddit: ["Strength training", "Running", "Yoga", "Calisthenics", "CrossFit", "Bodybuilding"],
      quora: ["Fitness", "Exercise", "Weight Training", "Running"]
    },
    {
      id: 9,
      title: "Education & Learning",
      icon: "🎓",
      reddit: ["Study techniques", "Online courses", "Exams", "Universities", "Scholarships"],
      quora: ["Education", "Learning", "Study Skills", "Higher Education"]
    },
    {
      id: 10,
      title: "Career & Jobs",
      icon: "💼",
      reddit: ["Job hunting", "Resume reviews", "Interviews", "Salary negotiation", "Career changes"],
      quora: ["Careers", "Job Interviews", "Resume Writing", "Career Advice"]
    },
    {
      id: 11,
      title: "Relationships & Dating",
      icon: "❤️",
      reddit: ["Dating advice", "Marriage", "Breakups", "Friendships", "Family issues"],
      quora: ["Relationships", "Dating", "Marriage", "Family"]
    },
    {
      id: 12,
      title: "Travel",
      icon: "✈️",
      reddit: ["Budget travel", "Luxury travel", "Backpacking", "Digital nomads", "Visa advice"],
      quora: ["Travel", "Tourism", "Backpacking", "Solo Travel"]
    },
    {
      id: 13,
      title: "Food & Cooking",
      icon: "🍳",
      reddit: ["Recipes", "Meal prep", "Baking", "Restaurants", "Cooking tips"],
      quora: ["Cooking", "Recipes", "Food", "Baking"]
    },
    {
      id: 14,
      title: "Gaming",
      icon: "🎮",
      reddit: ["PC gaming", "Console gaming", "Esports", "Game development", "Mobile gaming"],
      quora: ["Video Games", "Esports", "Game Development"]
    },
    {
      id: 15,
      title: "Movies & Entertainment",
      icon: "🎬",
      reddit: ["Movies", "TV shows", "Streaming", "Celebrities", "Reviews"],
      quora: ["Movies", "Television", "Entertainment Industry"]
    },
    {
      id: 16,
      title: "Books & Writing",
      icon: "📚",
      reddit: ["Fiction", "Non-fiction", "Self-publishing", "Writing advice", "Book recommendations"],
      quora: ["Books", "Writing", "Literature", "Authors"]
    },
    {
      id: 17,
      title: "Science",
      icon: "🔬",
      reddit: ["Physics", "Biology", "Chemistry", "Space", "Psychology"],
      quora: ["Science", "Physics", "Biology", "Psychology"]
    },
    {
      id: 18,
      title: "Automotive",
      icon: "🚗",
      reddit: ["Cars", "Electric vehicles", "Repairs", "Motorcycles", "Car buying"],
      quora: ["Automobiles", "Electric Vehicles", "Car Maintenance"]
    },
    {
      id: 19,
      title: "Real Estate",
      icon: "🏠",
      reddit: ["Buying homes", "Renting", "Property investment", "Commercial real estate"],
      quora: ["Real Estate", "Property Investment", "Home Buying"]
    },
    {
      id: 20,
      title: "Pets & Animals",
      icon: "🐶",
      reddit: ["Dogs", "Cats", "Pet training", "Animal care"],
      quora: ["Pets", "Dogs", "Cats", "Animal Behavior"]
    },
    {
      id: 21,
      title: "Fashion & Beauty",
      icon: "✨",
      reddit: ["Men&apos;s fashion", "Women&apos;s fashion", "Skincare", "Makeup", "Grooming"],
      quora: ["Fashion", "Beauty", "Skin Care", "Cosmetics"]
    },
    {
      id: 22,
      title: "Local Communities",
      icon: "📍",
      reddit: ["City discussions", "Local events", "Restaurant recommendations", "Housing"],
      quora: ["Cities", "Countries", "Regional Communities"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex flex-col justify-center cursor-pointer">
            <div className="flex items-center gap-2 font-bold text-2xl text-blue-700 tracking-tight leading-none">
              <span>💬</span>
              <span>Asklo.Online</span>
            </div>
            <span className="text-[10px] font-semibold text-gray-400 mt-1 tracking-wide uppercase">
              The World&apos;s Living Room
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition">
              Back to Home
            </a>
            <a href="/ask" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-full text-sm transition-all shadow-sm">
              Add Post
            </a>
          </div>
        </div>
      </nav>

      {/* CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR: HIGH TRAFFIC TOPICS */}
        <aside className="hidden lg:block col-span-1 bg-white border border-gray-200 rounded-xl p-4 shadow-sm h-fit sticky top-22">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🔥 High-Traffic Hubs</h2>
          <div className="flex flex-col gap-1">
            {highTraffic.map((topic, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 px-2.5 py-1.5 rounded-lg transition"
              >
                # {topic}
              </a>
            ))}
          </div>
        </aside>

        {/* MAIN 22 CATEGORIES CONTAINER */}
        <main className="col-span-1 lg:col-span-3 space-y-6">
          <div>
            <h1 className="text-3xl font-black text-gray-950 tracking-tight">Explore Spaces</h1>
            <p className="text-sm text-gray-500 mt-1">Discover customized forums and channels matching your curiosity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  {/* Category Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl p-2 bg-blue-50 text-blue-700 rounded-xl font-bold shrink-0">{cat.icon}</span>
                    <h2 className="text-base font-bold text-gray-900 leading-snug pt-1 hover:text-blue-600 cursor-pointer transition-colors">
                      {cat.title}
                    </h2>
                  </div>

                  {/* Reddit Spaces */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold tracking-wider text-red-500 uppercase block mb-1.5">r/ Reddit Sub-spaces</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.reddit.map((r, i) => (
                        <span key={i} className="text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md cursor-pointer transition">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quora Spaces */}
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase block mb-1.5">q/ Quora Knowledge-spaces</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {cat.quora.map((q, i) => (
                        <span key={i} className="text-xs text-gray-600 hover:text-blue-600 cursor-pointer transition hover:underline">
                          • {q}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-end">
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition">
                    Enter Space <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}
