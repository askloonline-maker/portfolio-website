"use client";
import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

interface RecentQuestionsProps {
  filterCategory?: string; // Optional target slug prop passed from space router views
}

export default function RecentQuestions({ filterCategory }: RecentQuestionsProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Append routing criteria parameter if active
    const fetchUrl = filterCategory 
      ? `/api/posts?category=${filterCategory}`
      : "/api/posts";

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (data && Array.isArray(data.posts)) {
          setPosts(data.posts);
        }
      })
      .catch((err) => console.error("Error loading recent posts:", err))
      .finally(() => setLoading(false));
  }, [filterCategory]);

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
        <div className="text-center py-12 bg-white rounded-2xl border border-blue-50 text-slate-400 italic text-sm font-sans font-medium">
          No active discussions found inside this space yet.
        </div>
      ) : (
        posts.map((post: any) => (
          <QuestionCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}
