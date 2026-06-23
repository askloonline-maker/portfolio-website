"use client";
import React, { useState } from "react";

interface PostItem {
  id: number;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  commentsCount: number;
  author: string;
  avatarSeed: string;
  created_at: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: 1,
      title: "What are the core technical architectures behind building high-scale anonymous routing fabrics?",
      content: "Most distributed fabrics heavily rely on multi-hop layered encryption or basic mixnets where packets are shuffled across independent staging nodes. For standard web apps, separating identity objects entirely from post schemas at the database layer usually achieves absolute software anonymity.",
      category: "q/architecture",
      upvotes: 84,
      commentsCount: 23,
      author: "Anonymous Guest",
      avatarSeed: "tech88",
      created_at: "2 hours ago"
    },
    {
      id: 2,
      title: "Unpopular opinion: Framework abstraction layers are moving way too fast for local testing configurations.",
      content: "Setting up local Docker databases along with mock engines for key-value pipelines shouldn't require a master's degree in cloud engineering. Simplicity always wins over over-engineered local environments.",
      category: "r/webdev",
      upvotes: 214,
      commentsCount: 67,
      author: "Anonymous Guest",
      avatarSeed: "dev42",
      created_at: "6 hours ago"
    }
  ]);

  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [selectedFeed, setSelectedFeed] = useState("all-spaces");

  const submitPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const dynamicPost: PostItem = {
      id: Date.now(),
      title: titleInput,
      content: contentInput,
      category: selectedFeed === "all-spaces" ? "q/general" : selectedFeed,
      upvotes: 1,
      commentsCount: 0,
      author: "Anonymous Guest",
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
    <div className="min-h-screen bg-slate-950">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-blue-900/40 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-500 shadow-md shadow-blue-500/30 flex items-center justify-center font-black text-white text-lg tracking-wider">
            Ω
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-500 bg-clip-text text-transparent">
            RoyalSphere
          </span>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-950/50 border border-blue-800/30 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          Open Guest Platform
        </div>
      </header>

      {/* BODY WRAPPER */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="premium-card">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Active Communities</h3>
            <ul className="space-y-1.5">
              {[
                { label: "🌐 All Feeds", id: "all-spaces" },
                { label: "🚀 q/architecture", id: "q/architecture" },
                { label: "💻 r/webdev", id: "r/webdev" },
                { label: "📈 q/markets", id: "q/markets" },
                { label: "🎮 r/gaming", id: "r/gaming" }
              ].map((categoryItem) => (
                <li key={categoryItem.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedFeed(categoryItem.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFeed === categoryItem.id 
                        ? "bg-blue-600/90 text-white shadow-md shadow-blue-600/20" 
                        : "text-slate-400 hover:bg-slate-900/80 hover:text-white"
                    }`}
                  >
                    {categoryItem.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* FEED COMPONENT */}
        <main className="lg:col-span-2 space-y-6">
          
          {/* COMPOSER FORM */}
          <form onSubmit={submitPostHandler} className="premium-card bg-gradient-to-br from-slate-900/80 to-slate-950/80 border-blue-900/30">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=globalGuest" 
                alt="Guest Avatar" 
                className="h-8 w-8 rounded-full bg-blue-950 border border-blue-800/40"
              />
              <span className="text-sm font-medium text-slate-300">
                Authorized as <span className="text-blue-400 font-semibold">Anonymous Guest</span>
              </span>
            </div>
            
            <input
              type="text"
              placeholder="What question or topic do you want to explore?"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors mb-3 placeholder-slate-500"
              required
            />
            
            <textarea
              placeholder="Provide background context, logs, or structured explanations..."
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none placeholder-slate-500"
            />
            
            <div className="flex justify-end mt-1">
              <button type="submit" className="btn-premium text-sm">
                Publish Stream
              </button>
            </div>
          </form>

          {/* STREAM ITERATOR */}
          <div className="space-y-4">
            {posts
              .filter(p => selectedFeed === "all-spaces" || p.category === selectedFeed)
              .map((post) => (
                <article key={post.id} className="premium-card flex gap-4 items-start">
                  
                  {/* Voting System */}
                  <div className="flex flex-col items-center bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/50 min-w-[38px]">
                    <button 
                      type="button"
                      onClick={() => incrementVote(post.id)}
                      className="text-slate-500 hover:text-blue-400 font-bold transition-colors p-0.5"
                    >
                      ▲
                    </button>
                    <span className="text-xs font-bold my-0.5 text-blue-400">{post.upvotes}</span>
                    <button 
                      type="button"
                      onClick={() => decrementVote(post.id)}
                      className="text-slate-500 hover:text-indigo-400 font-bold transition-colors p-0.5"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Main Content Container */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span className="bg-blue-950/80 text-blue-400 px-2 py-0.5 rounded font-mono border border-blue-900/40 text-[11px]">
                        {post.category}
                      </span>
                      <img 
                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${post.avatarSeed}`} 
                        alt="Author Icon" 
                        className="h-3.5 w-3.5 bg-slate-800 rounded-sm"
                      />
                      <span>• <span className="text-slate-300 font-medium">{post.author}</span></span>
                      <span>{post.created_at}</span>
                    </div>
                    
                    <h2 className="text-lg font-semibold text-white tracking-tight hover:text-blue-300 transition-colors duration-200 mb-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-sm text-slate-300 leading-relaxed font-normal mb-3 whitespace-pre-wrap">
                      {post.content}
                    </p>
                    
                    <div className="flex gap-4 text-xs text-slate-400 border-t border-slate-900 pt-3">
                      <button type="button" className="hover:text-blue-400 flex items-center gap-1 transition-colors">
                        💬 {post.commentsCount} Comments
                      </button>
                      <button type="button" className="hover:text-blue-400 transition-colors">🔗 Share Content</button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </main>

        {/* RIGHT DETAILS PANEL */}
        <aside className="lg:col-span-1">
          <div className="premium-card bg-gradient-to-b from-blue-950/20 to-transparent border-blue-900/20">
            <h3 className="text-sm font-bold text-white tracking-wide mb-2">Platform Manifest</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Welcome to an unfettered forum engine combining the logical layout of Quora spaces with the voting system of Subreddits. No registration gates or global tracking metrics required.
            </p>
            <div className="border-t border-blue-900/20 pt-3 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Live Active Feeds</span>
                <span className="text-blue-400 font-mono font-bold">100% Operational</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Database Context</span>
                <span className="text-indigo-400 font-mono font-bold">Isolated Memory</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
