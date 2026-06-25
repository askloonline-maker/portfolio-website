import React from "react";
import CategoryGrid from "../../components/CategoryGrid";
import RecentQuestions from "../../components/RecentQuestions";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const targetCategory = typeof resolvedParams.filter === "string" ? resolvedParams.filter : undefined;

  // Format professional space headers based on URL parameter
  const categoryHeaders: Record<string, { title: string; desc: string }> = {
    "digital-marketing": { title: "Digital Marketing Discussions", desc: "SEO architecture, conversion matrices, and optimization strategies." },
    "startups-business": { title: "Startups & Business Strategy", desc: "Venture architectures, monetization modeling, and hyper-scaling." },
    "artificial-intelligence": { title: "Artificial Intelligence Hub", desc: "Large Language Models, neural architectures, and edge deployment." },
    "tech": { title: "General Engineering & Tech", desc: "Next.js routing, database optimization, and cloud infrastructure frameworks." },
  };

  if (targetCategory && categoryHeaders[targetCategory]) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-sans font-black text-[#0f172a] tracking-tight">
            {categoryHeaders[targetCategory].title}
          </h1>
          <p className="text-xs font-sans text-[#64748b]">
            {categoryHeaders[targetCategory].desc}
          </p>
        </div>
        {/* Passed category string */}
        <RecentQuestions filterCategory={targetCategory} />
      </div>
    );
  }

  // Clean layout architecture: Old ghost headers removed!
  return (
    <div className="w-full">
      <CategoryGrid />
    </div>
  );
}
