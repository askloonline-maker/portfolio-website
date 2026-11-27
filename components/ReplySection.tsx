"use client";

import { FormEvent, useEffect, useState } from "react";

interface Reply {
  id: string;
  post_id: string;
  content: string;
  author_name: string;
  created_at: string;
}

interface ReplySectionProps {
  postId: string;
}

export default function ReplySection({ postId }: ReplySectionProps) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadReplies() {
      setLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(`/api/posts/${encodeURIComponent(postId)}/replies`, {
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Unable to load replies");
        setReplies(Array.isArray(result.replies) ? result.replies : []);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("[replies] Failed to load replies:", error);
        setErrorMessage(error instanceof Error ? error.message : "Unable to load replies");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadReplies();
    return () => controller.abort();
  }, [postId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent || submitting) return;

    setSubmitting(true);
    setErrorMessage("");
    try {
      const response = await fetch(`/api/posts/${encodeURIComponent(postId)}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmedContent }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit reply");
      if (result.reply) setReplies((current) => [...current, result.reply as Reply]);
      setContent("");
    } catch (error) {
      console.error("[replies] Failed to submit reply:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit reply");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-4 border-t border-blue-100 pt-4" aria-label="Replies">
      <h3 className="mb-3 text-sm font-black text-slate-900">
        Replies <span className="text-slate-500">({replies.length})</span>
      </h3>

      {loading ? (
        <p className="mb-3 text-sm text-slate-500" role="status">Loading replies…</p>
      ) : replies.length === 0 ? (
        <p className="mb-3 text-sm text-slate-500">No replies yet. Be the first to reply.</p>
      ) : (
        <ul className="mb-4 space-y-3">
          {replies.map((reply) => (
            <li key={reply.id} className="rounded-xl bg-blue-50/70 px-4 py-3">
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-blue-900">{reply.author_name || "Anonymous"}</span>
                <time className="text-xs text-slate-500" dateTime={reply.created_at}>
                  {new Date(reply.created_at).toLocaleString()}
                </time>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{reply.content}</p>
            </li>
          ))}
        </ul>
      )}

      {errorMessage && (
        <p className="mb-3 rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700" role="alert">
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`reply-${postId}`}>Write an anonymous reply</label>
        <input
          id={`reply-${postId}`}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a reply…"
          maxLength={5000}
          className="min-w-0 flex-1 rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Sending…" : "Reply anonymously"}
        </button>
      </form>
    </section>
  );
}
