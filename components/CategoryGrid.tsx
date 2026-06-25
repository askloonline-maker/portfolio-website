import React from "react";
import CategoryCard from "./CategoryCard";

const TOPICS = [
  { name: "Digital Marketing", slug: "digital-marketing", count: "1.4k", description: "SEO structures, growth architectures, and optimization frameworks.", indicator: "📈" },
  { name: "Startups & Business", slug: "startups-business", count: "890", description: "Venture strategies, scaling frameworks, business models, and operational systems.", indicator: "💼" },
  { name: "Artificial Intelligence", slug: "artificial-intelligence", count: "2.1k", description: "Large Language Models, deployment patterns, and operational systems.", indicator: "🤖" },
  { name: "General Tech", slug: "tech", count: "3.4k", description: "Next.js configurations, environment structures, and operational frameworks.", indicator: "💻" }
];

export default function CategoryGrid() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 font-sans antialiased">
      
      {/* Centered Premium Title Header & Subtitle Block */}
      <div className="text-center mb-12 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
          Spaces and Communities
        </h2>
        <p className="mt-3 text-sm font-medium text-slate-500 max-w-xl leading-relaxed">
          Browse to find the spaces that fit your needs and click to explore. Use the targeted contextual hubs to match your research parameters.
        </p>
      </div>

      {/* 4-Column Grid Architecture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TOPICS.map((item) => (
          <CategoryCard key={item.slug} topic={item} />
        ))}
      </div>
    </div>
  );
}
