"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// 🔐 Vercel में मौजूद आपके सटीक वैरिएबल नामों का उपयोग करना
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SU_BASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function CreatePost() {
  const [inputText, setInputText] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    if (!inputText.trim() || isPublishing) return;

    setIsPublishing(true);

    try {
      // 📤 Supabase 'posts' टेबल में डेटा इन्सर्ट करना
      const { error } = await supabase
        .from("posts")
        .insert([
          {
            title: inputText.substring(0, 60), 
            content: inputText,
            category: "General", 
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) {
        console.error("Supabase Error:", error.message);
        alert(`Failed to post: ${error.message}`);
      } else {
        setInputText(""); // इनपुट फील्ड को क्लियर करें
        
        // 🔄 फ़ीड को बिना पेज रीलोड किए तुरंत अपडेट करने के लिए रीफ्रेश
        router.refresh(); 
        
        // एक छोटा सा कन्फर्मेशन (वैकल्पिक)
        alert("Post Live Successfully! 🚀");
      }
    } catch (err: any) {
      console.error("Submit Error:", err);
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
