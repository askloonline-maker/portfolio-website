"use client";
import React, { useState } from "react";
import { createAnonymousPost } from "../app/actions"; // 👈 इम्पोर्ट पाथ बिल्कुल सही है

export default function CreatePost() {
  const [inputText, setInputText] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!inputText.trim() || isPublishing) return;

    setIsPublishing(true);

    try {
      // 🚀 सुरक्षित सर्वर एक्शन को कॉल करना
      const result = await createAnonymousPost(inputText);

      if (result.success) {
        setInputText(""); // पोस्ट सफल होने पर इनपुट बॉक्स खाली करें
        alert("Post Live Successfully! 🚀");
      } else {
        alert(`Failed to post: ${result.error}`);
      }
    } catch (err) {
      console.error("Publishing Handler Error:", err);
      alert("Something went wrong while publishing.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-xs space-y-3">
      {/* Top Profile Status */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-xs shadow-inner">
          😎
        </div>
        <span className="text-xs font-extrabold text-slate-800">What's on your mind today?</span>
        <span className="ml-auto text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
          🔒 Anonymous Mode On
        </span>
      </div>

      {/* Input Area and Clean Publish Button */}
      <div className="flex flex-col sm:flex-row items-end gap-3 pt-1">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anonymously..."
          disabled={isPublishing}
          className="w-full min-h-[50px] text-xs font-medium text-slate-600 placeholder-slate-400 focus:outline-none resize-none bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 disabled:opacity-50"
        />
        <button
          onClick={handlePublish}
          disabled={!inputText.trim() || isPublishing}
          className={`px-4 py-2 rounded-lg text-xs font-black tracking-wide flex items-center gap-1.5 transition-all self-end ${
            inputText.trim() && !isPublishing
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isPublishing ? "Publishing..." : "Publish 🚀"}
        </button>
      </div>
    </div>
  );
}
