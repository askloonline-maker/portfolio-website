import React from "react";
import { createClient } from "@supabase/supabase-js";
import CreatePost from "../components/CreatePost";
import QuestionCard from "../components/QuestionCard";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

export const revalidate = 0;

// 🔐 Supabase Client Initialization
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey);
}

// 🌐 Database Connection Check
async function checkDatabaseConnection() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return { connected: false, message: "Supabase environment variables are missing" };
    const { error } = await supabase.from("posts").select("id").limit(1);
    if (error) return { connected: false, message: error.message };
    return { connected: true, message: "Anonymous posting is live" };
  } catch (err: any) {
    return { connected: false, message: err.message || "Failed to connect" };
  }
}

// 📥 Data Fetcher for Feed
async function getAllPublicPosts() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return [];
    return data || [];
  } catch (err) {
    return [];
  }
}

// 📐 TypeScript Type Definitions
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 🏠 Main Server Component Home Page
export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const dbStatus = await checkDatabaseConnection();
  const posts = await getAllPublicPosts();

  const targetPostId = typeof resolvedParams.post === "string" ? resolvedParams.post : null;
  const sharedPost = targetPostId ? posts.find((p) => p.id === targetPostId) : null;

  // 🕒 Fallback timestamp matching the newest community thread for Google crawlers
  const latestPostDate = posts[0]?.created_at || new Date().toISOString();

  // 🛠️ COMPLIANT SEO HOOK: Clears all secondary item block warnings
  const structuralSchema = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "name": "AskLo Online Anonymous Q&A Knowledge Sharing Website",
    "headline": "AskLo Premium Anonymous Q&A Platform & Discussion Feed",
    "datePublished": latestPostDate,
    "author": {
      "@type": "Person",
      "name": "Anonymous"
    },
    "text": "Welcome to AskLo, a secure public repository of anonymous questions, marketing strategy discussions, career advice, and community boards.",
    "description": "A public repository of anonymous questions, marketing strategy discussions, career advice, and community discussion boards.",
    "url": "https://www.asklo.online",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.slice(0, 15).map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "DiscussionForumPosting", // Changed to match parent specifications for nested items
          "headline": post.title || post.content?.substring(0, 100) || "Anonymous Question",
          "datePublished": post.created_at || latestPostDate,
          "author": {
            "@type": "Person",
            "name": "Anonymous"
          },
          "text": post.content || post.title || "Anonymous Thread Context",
          "url": `https://www.asklo.online/?post=${post.id}`,
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/CommentAction",
            "userInteractionCount": post.comment_count || 0
          }
        }
      }))
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_34%,#ffffff_100%)] text-slate-950 relative">
      
      {/* Dynamic JSON-LD Injection Point */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __
