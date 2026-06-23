import React from "react";
import CategoryCard from "./CategoryCard";

const TOPICS = [
  { name: "Digital Marketing", slug: "digital-marketing", count: "1.4k", description: "SEO structures, growth architectures, and optimization frameworks.", indicator: "📈" },
  { name: "Data Science", slug: "data-science", count: "890", description: "Structured database schemas, modeling configurations, and validation models.", indicator: "📊" },
  { name: "Artificial Intelligence", slug: "artificial-intelligence", count: "2.1k", description: "Large Language Models, deployment patterns, and operational systems.", indicator: "🤖" },
  { name: "General Tech", slug: "tech", count: "3.4k", description: "Next.js configurations, environment structures, and operational frameworks.", indicator: "💻" }
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {TOPICS.map((item) => (
        <CategoryCard key={item.slug} topic={item} />
      ))}
    </div>
  );
}
