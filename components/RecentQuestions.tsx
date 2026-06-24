"use client";
import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

export default function RecentQuestions() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch directly from your public posts API endpoint
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch((err) => console.error("Error loading recent posts:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-xl h-32 animate-pulse border border-slate-200" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="text-center py-8 text-slate-400 italic text-sm">
          No recent discussions found.
        </div>
      ) : (
        posts.map((post: any) => (
          <QuestionCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}
