"use client";
import React, { useState, useMemo } from "react";

interface SpaceItem {
  name: string;
  subTopics: string[];
}

interface PostItem {
  id: number;
  title: string;
  content: string;
  category: string;
  groupName: string;
  upvotes: number;
  commentsCount: number;
  author: string;
  avatarSeed: string;
  created_at: string;
}

export default function HomePage() {
  // Complete 25 Groups Matrix Setup
  const communityGroups: SpaceItem[] = useMemo(() => [
    { name: "Technology", subTopics: ["Artificial Intelligence", "Programming", "Gadgets", "Cybersecurity", "Cloud Computing", "Web Development", "Mobile Apps", "Software Reviews"] },
    { name: "Business", subTopics: ["Entrepreneurship", "Startups", "Small Business", "Leadership", "Management", "Freelancing", "E-commerce", "Business Ideas"] },
    { name: "Finance", subTopics: ["Personal Finance", "Investing", "Stock Market", "Mutual Funds", "Insurance", "Credit Cards", "Taxes", "Loans"] },
    { name: "Cryptocurrency", subTopics: ["Bitcoin", "Ethereum", "Altcoins", "Blockchain", "NFTs", "Web3", "DeFi", "Crypto Trading"] },
    { name: "Marketing", subTopics: ["SEO", "Content Marketing", "Social Media Marketing", "Email Marketing", "Affiliate Marketing", "Branding", "Advertising", "Analytics"] },
    { name: "Career & Jobs", subTopics: ["Resume Tips", "Interview Preparation", "Remote Jobs", "Government Jobs", "Career Growth", "Salary Negotiation", "Workplace Skills", "Side Hustles"] },
    { name: "Education", subTopics: ["Online Learning", "Study Tips", "Exams", "Scholarships", "Language Learning", "Colleges", "Certifications", "Competitive Exams"] },
    { name: "Health", subTopics: ["Diabetes", "Yoga", "Weight Loss", "Sleep", "Meditation", "Heart Health", "Nutrition", "Mental Wellness"] },
    { name: "Fitness", subTopics: ["Gym Workouts", "Home Exercise", "Running", "Bodybuilding", "Cardio", "Strength Training", "Weight Gain", "Supplements"] },
    { name: "Food", subTopics: ["Recipes", "Healthy Eating", "Vegetarian Food", "Vegan Food", "Desserts", "Street Food", "Cooking Tips", "Kitchen Appliances"] },
    { name: "Travel", subTopics: ["Solo Travel", "Budget Travel", "Luxury Travel", "Visas", "Hotels", "Road Trips", "Backpacking", "Travel Tips"] },
    { name: "Relationships", subTopics: ["Dating", "Marriage", "Family", "Friendships", "Parenting", "Breakups", "Communication", "Emotional Health"] },
    { name: "Lifestyle", subTopics: ["Minimalism", "Habits", "Productivity", "Time Management", "Self-Improvement", "Happiness", "Motivation", "Daily Routines"] },
    { name: "Fashion & Beauty", subTopics: ["Men's Fashion", "Women's Fashion", "Skincare", "Haircare", "Makeup", "Grooming", "Accessories", "Luxury Brands"] },
    { name: "Entertainment", subTopics: ["Movies", "TV Shows", "Celebrities", "Streaming Platforms", "Music", "Podcasts", "Anime", "Comics"] },
    { name: "Sports", subTopics: ["Cricket", "Football", "Basketball", "Tennis", "Badminton", "Olympics", "Fitness Sports", "Esports"] },
    { name: "Gaming", subTopics: ["PC Gaming", "Mobile Gaming", "PlayStation", "Xbox", "Game Reviews", "Esports", "RPG Games", "Indie Games"] },
    { name: "Science", subTopics: ["Physics", "Chemistry", "Biology", "Space", "Astronomy", "Climate Science", "Genetics", "Innovations"] },
    { name: "History", subTopics: ["Ancient History", "Medieval History", "World Wars", "Indian History", "Historical Figures", "Civilizations", "Archaeology", "Historical Mysteries"] },
    { name: "Politics", subTopics: ["Indian Politics", "US Politics", "International Relations", "Elections", "Government Policies", "Democracy", "Political History", "Geopolitics"] },
    { name: "Home & Living", subTopics: ["Home Decor", "Interior Design", "Gardening", "Smart Home", "DIY Projects", "Furniture", "Cleaning Tips", "Organization"] },
    { name: "Automotive", subTopics: ["Cars", "Bikes", "Electric Vehicles", "Car Reviews", "Maintenance", "Road Safety", "Luxury Cars", "Motorsports"] },
    { name: "Pets & Animals", subTopics: ["Dogs", "Cats", "Birds", "Fish", "Pet Care", "Animal Behavior", "Wildlife", "Veterinary Advice"] },
    { name: "Religion & Spirituality", subTopics: ["Hinduism", "Buddhism", "Christianity", "Islam", "Meditation", "Astrology", "Philosophy", "Spiritual Growth"] },
    { name: "Environment & Agriculture", subTopics: ["Climate Change", "Sustainability", "Organic Farming", "Gardening", "Renewable Energy", "Water Conservation", "Agriculture Technology", "Rural Development"] }
  ], []);

  // Hydrated Global Posts State
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: 1,
      title: "Is Artificial Intelligence hitting an architectural plateau with current transformers?",
      content: "We are putting massive energy into scaling parameters, but contextual logical deduction remains heavily simulated. Do you think we need a complete shift away from deep neural webs to hit true artificial generalized systems?",
      category: "Artificial Intelligence",
      groupName: "Technology",
      upvotes: 142,
      commentsCount: 38,
      author: "Guest_2901",
      avatarSeed: "ai99",
      created_at: "34 minutes ago"
    },
    {
      id: 2,
      title: "What are your alternative side hustles that have zero dependencies on software engineering?",
      content: "Looking to split my mental time investment entirely away from screens. Curious if anyone here runs real-world operations like premium micro-agriculture or specialty local physical fabrication setups.",
      category: "Side Hustles",
      groupName: "Career & Jobs",
      upvotes: 89,
      commentsCount: 19,
      author: "Guest_8410",
      avatarSeed: "hustle3",
      created_at: "2 hours ago"
    }
  ]);

  // View States
  const [selectedGroup, setSelectedGroup] = useState<string>("All Spaces");
  const [selectedSubTopic, setSelectedSubTopic] = useState<string>("All Topics");
  const [groupSearchQuery, setGroupSearchQuery] = useState("");
  
  // Input Form Controls
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [postGroup, setPostGroup] = useState("Technology");
  const [postSubTopic, setPostSubTopic] = useState("Artificial Intelligence");

  // Dynamic composition target selection
  const activeFormSubTopics = useMemo(() => {
    const matching = communityGroups.find(g => g.name === postGroup);
    return matching ? matching.subTopics : [];
  }, [postGroup, communityGroups]);

  // Filtered Post Processing
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchGroup = selectedGroup === "All Spaces" || post.groupName === selectedGroup;
      const matchSub = selectedSubTopic === "All Topics" || post.category === selectedSubTopic;
      return matchGroup && matchSub;
    });
  }, [posts, selectedGroup, selectedSubTopic]);

  // Search Filter Handler
  const filteredSidebarGroups = useMemo(() => {
    if (!groupSearchQuery.trim()) return communityGroups;
    return communityGroups.filter(g => 
      g.name.toLowerCase().includes(groupSearchQuery.toLowerCase()) ||
      g.subTopics.some(s => s.toLowerCase().includes(groupSearchQuery.toLowerCase()))
    );
  }, [groupSearchQuery, communityGroups]);

  const submitPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const randomizedId = Math.floor(1000 + Math.random() * 9000);
    const dynamicPost: PostItem = {
      id: Date.now(),
      title: titleInput,
      content: contentInput,
      category: postSubTopic,
      groupName: postGroup,
      upvotes: 1,
      commentsCount: 0,
      author: `Guest_${randomizedId}`,
      avatarSeed: Math.random().toString(36).substring(7),
      created_at: "Just now"
    };

    setPosts([dynamicPost, ...posts]);
    setTitleInput("");
    setContentInput("");
  };

  const incrementVote = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const decrementVote = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes - 1 } : p));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 shadow-md shadow-blue-600/20 flex items-center justify-center font-black text-white text-xl tracking-tight">
            A
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
              Asklo<span className="text-blue-600 text-lg">.Online</span>
            </h1>
            <p className="text-[11px] uppercase tracking-widest font-extrabold text-blue-600/80">
              &ldquo;The World&apos;s Living Room&rdquo;
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full text-xs font-semibold text-blue-700">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          Secure Anonymous Network (No Registration Required)
        </div>
      </header>

      {/* FILTER TOP BAR SUBDISPLAY */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">Viewing Stream:</span>
        <button 
          onClick={() => { setSelectedGroup("All Spaces"); setSelectedSubTopic("All Topics"); }}
          className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded font-bold"
        >
          {selectedGroup} {selectedSubTopic !== "All Topics" && `👉 ${selectedSubTopic}`}
        </button>
        {(selectedGroup !== "All Spaces" || selectedSubTopic !== "All Topics") && (
          <button 
            onClick={() => { setSelectedGroup("All Spaces"); setSelectedSubTopic("All Topics"); }}
            className="text-slate-400 hover:text-slate-900 transition-colors pl-1 font-semibold"
          >
            Clear Filter ×
          </button>
        )}
      </div>

      {/* BODY CONFIGURATION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-1 space-y-4 max-h-[85vh] overflow-y-auto pr-2">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Global Rooms</h3>
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold border border-blue-100">25 Rooms</span>
            </div>
            
            <input 
              type="text"
              placeholder="Search Rooms or Spaces..."
              value={groupSearchQuery}
              onChange={(e) => setGroupSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder-slate-400"
            />

            <div className="space-y-1 pt-1 max-h-[50vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => { setSelectedGroup("All Spaces"); setSelectedSubTopic("All Topics"); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all mb-2 ${
                  selectedGroup === "All Spaces" 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/10" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                🌐 Show All Channels
              </button>

              {filteredSidebarGroups.map((group) => (
                <div key={group.name} className="space-y-1 pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setSelectedGroup(group.name); setSelectedSubTopic("All Topics"); }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs font-bold flex justify-between items-center transition-colors ${
                      selectedGroup === group.name ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                    }`}
                  >
                    <span>🎯 {group.name}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-semibold">{group.subTopics.length}</span>
                  </button>

                  {selectedGroup === group.name && (
                    <div className="pl-3 space-y-0.5 border-l-2 border-blue-200 ml-2 animate-fadeIn">
                      {group.subTopics.map(sub => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setSelectedSubTopic(sub)}
                          className={`w-full text-left block px-2 py-1 text-[11px] rounded transition-colors ${
                            selectedSubTopic === sub ? "text-white bg-blue-600 font-bold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                          }`}
                        >
                          # {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* FEED TRACK */}
        <main className="lg:col-span-2 space-y-6">
          
          {/* COMPOSER FORM */}
          <form onSubmit={submitPostHandler} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-xs text-blue-600">
                AG
              </div>
              <span className="text-xs font-medium text-slate-500">
                Streaming live context as <span className="text-blue-600 font-mono font-bold">Anonymous Guest</span>
              </span>
            </div>
            
            <input
              type="text"
              placeholder="What question or narrative would you like to present?"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all mb-3 placeholder-slate-400 text-slate-900"
              required
            />
            
            <textarea
              placeholder="Elaborate your premise, append technical insights, or submit logs freely..."
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all h-24 resize-none placeholder-slate-400 text-slate-700 mb-4"
            />
            
            {/* CONTAINER DROPDOWNS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Room</label>
                <select 
                  value={postGroup}
                  onChange={(e) => {
                    setPostGroup(e.target.value);
                    const matching = communityGroups.find(g => g.name === e.target.value);
                    if(matching && matching.subTopics.length > 0) {
                      setPostSubTopic(matching.subTopics[0]);
                    }
                  }}
                  className="w-full bg-white text-xs text-slate-700 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-600"
                >
                  {communityGroups.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Specific Space Category</label>
                <select 
                  value={postSubTopic}
                  onChange={(e) => setPostSubTopic(e.target.value)}
                  className="w-full bg-white text-xs text-slate-700 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-600"
                >
                  {activeFormSubTopics.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg text-xs tracking-wide transition-all shadow-md shadow-blue-600/10">
                Broadcast Anonymously
              </button>
            </div>
          </form>

          {/* STREAM ITERATOR */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="p-8 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
                <span className="text-xl">📭</span>
                <p className="text-sm text-slate-400 mt-2 font-medium">No live transmissions found in this specific subspace yet.</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article key={post.id} className="p-5 bg-white border border-slate-200 rounded-xl flex gap-4 items-start transition-all shadow-sm hover:border-blue-300">
                  
                  {/* Voting Engine */}
                  <div className="flex flex-col items-center bg-slate-50 p-1.5 rounded-lg border border-slate-200 min-w-[38px] shadow-sm">
                    <button 
                      type="button"
                      onClick={() => incrementVote(post.id)}
                      className="text-slate-400 hover:text-blue-600 font-bold transition-colors p-0.5 text-xs"
                    >
                      ▲
                    </button>
                    <span className="text-xs font-mono font-bold my-0.5 text-blue-600">{post.upvotes}</span>
                    <button 
                      type="button"
                      onClick={() => decrementVote(post.id)}
                      className="text-slate-400 hover:text-blue-600 font-bold transition-colors p-0.5 text-xs"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Article Content Grid */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono border border-blue-100 text-[10px] font-bold">
                        {post.groupName} / {post.category}
                      </span>
                      <img 
                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${post.avatarSeed}`} 
                        alt="Author Matrix Symbol" 
                        className="h-4 w-4 bg-slate-100 rounded-full border border-slate-200"
                      />
                      <span>• <span className="text-slate-600 font-mono font-semibold">{post.author}</span></span>
                      <span>• {post.created_at}</span>
                    </div>
                    
                    <h2 className="text-base font-bold text-slate-900 tracking-tight hover:text-blue-600 transition-colors duration-200 mb-1.5">
                      {post.title}
                    </h2>
                    
                    <p className="text-xs text-slate-600 leading-relaxed mb-3 whitespace-pre-wrap font-normal">
                      {post.content}
                    </p>
                    
                    <div className="flex gap-4 text-[11px] text-slate-400 border-t border-slate-100 pt-2.5">
                      <button type="button" className="hover:text-blue-600 flex items-center gap-1 transition-colors font-semibold">
                        💬 {post.commentsCount} Conversations
                      </button>
                      <button type="button" className="hover:text-blue-600 transition-colors font-semibold">🔗 DeepLink Share</button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Asklo Matrix Manifest</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Welcome to the internet&apos;s ultimate decentralized dialogue layer. A balanced combination of Quora structure and Reddit mechanics designed to guarantee raw exchange without social profiling barriers.
            </p>
            
            <div className="pt-2 space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Access Framework</span>
                <span className="text-blue-600 font-mono font-bold">Open Gateway</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Global Encryption</span>
                <span className="text-blue-600 font-mono font-bold">Enforced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tracking Scripts</span>
                <span className="text-emerald-600 font-mono font-bold">0% Detected</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
