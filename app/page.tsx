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
        
        <div className="flex items-center
