"use client";
import React, { useState } from "react";

interface PostProps {
  post: {
    id: string;
    title?: string;
    content: string;
    author_name?: string;
    created_at: string;
    upvotes?: number;
  };
}

export default function QuestionCard({ post }: PostProps) {
  const [votes, setVotes] = useState(post.upvotes || 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [shareText, setShareText] = useState("Share");
  
  // States for Answer / Reply logic
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [localReplies, setLocalReplies] = useState<string[]>([]);

  const handleUpvote = () => {
    setVotes((prev) => (hasVoted ? prev - 1 : prev + 1));
    setHasVoted((prev) => !prev);
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/?post=${post.id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setShareText("Copied!");
      setTimeout(() => setShareText("Share"), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    // Adds the comment directly to the local feed state below
    setLocalReplies((prev) => [...prev, replyContent.trim()]);
    setReplyContent("");
  };

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-950/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-950/10">
      <div className="flex gap-4 p-5">
        <div className="flex h-fit min-w-[52px] flex-col items-center rounded-2xl border border-blue-100 bg-blue-50/70 p-2">
          <button
            onClick={handleUpvote}
            className={`text-xl transition ${hasVoted ? "text-[#123c9c]" : "text-blue-300 hover:text-blue-700"}`}
            aria-label="Upvote anonymous post"
          >
            ▲
          </button>
          <span className="my-1 text-xs font-black text-slate-800">{votes}</span>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-[#0f2f88] px-3 py-1 font-black text-white">{post.author_name || "Anonymous"}</span>
            <span>asked anonymously</span>
            <span>•</span>
            <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString()}</time>
          </div>

          {post.title && <h2 className="text-xl font-black leading-snug text-slate-950 transition group-hover:text-[#123c9c]">{post.title}</h2>}

          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">{post.content}</p>

          <div className="flex flex-wrap gap-2 pt-1 text-xs font-black text-blue-700">
            <button 
              onClick={() => setShowAnswerForm(!showAnswerForm)} 
              className={`rounded-full px-3 py-1.5 transition ${showAnswerForm ? "bg-blue-600 text-white" : "bg-blue-50 hover:bg-blue-100"}`}
            >
              {showAnswerForm ? "Close Answer" : "Answer"}
            </button>
            <button 
              onClick={handleShare} 
              className="rounded-full bg-blue-50 px-3 py-1.5 transition hover:bg-blue-100"
            >
              {shareText}
            </button>
          </div>

          {/* Expanded Dynamic Reply Section */}
          {showAnswerForm && (
            <div className="mt-4 rounded-2xl border border-blue-50 bg-slate-50/50 p-4 transition-all">
              <form onSubmit={handleSubmitReply} className="space-y-3">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write an anonymous reply..."
                  className="w-full rounded-xl border border-blue-100 bg-white p-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-full bg-[#1d4ed8] px-4 py-1.5 text-xs font-bold text-white transition hover:bg-[#0f2f88]"
                  >
                    Submit Reply
                  </button>
                </div>
              </form>

              {/* Render Local Replies */}
              {localReplies.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-blue-100 pt-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Replies</p>
                  {localReplies.map((reply, index) => (
                    <div key={index} className="rounded-xl bg-white p-3 border border-blue-50 shadow-2xs">
                      <p className="text-xs font-bold text-[#0f2f88] mb-1">Anonymous reply</p>
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{reply}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </article>
  );
}
