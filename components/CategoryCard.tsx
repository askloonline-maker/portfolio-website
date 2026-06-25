"use client";
import React from "react";
import Link from "next/link";

interface TopicProps {
  topic: {
    name: string;
    slug: string;
    count: string;
    description: string;
    indicator: string;
  };
}

export default function CategoryCard({ topic }: TopicProps) {
  return (
    <div className="group relative rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-blue-950/10">
      
      {/* Dynamic Item Counter Badge */}
      <span className="absolute top-6 right-6 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 font-sans">
        {topic.count} items
      </span>

      <div className="space-y-3">
        {/* Render Emoji Indicator cleanly */}
        <div className="text-2xl">{topic.indicator}</div>
        
        {/* Clean, professional title with no "c/" prefix */}
        <h3 className="text-base font-black text-slate-950 font-sans tracking-tight antialiased">
          {topic.name}
        </h3>
        
        {/* Description Body Text */}
        <p className="text-xs font-medium leading-relaxed text-slate-500 font-sans antialiased pr-12">
          {topic.description}
        </p>
      </div>

      {/* Explore Trigger Routing Link */}
      <div className="mt-5 pt-4 border-t border-blue-50">
        <Link 
          href={`/categories?filter=${topic.slug}`}
          className="inline-flex items-center gap-1 text-xs font-black text-blue-700 font-sans tracking-wide transition group-hover:text-blue-800"
        >
          Explore Space <span className="transition group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  );
}
