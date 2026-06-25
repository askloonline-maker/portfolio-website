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
    <div className="group flex flex-col justify-between rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-950/5 text-center items-center h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-blue-950/10">
      
      {/* Top Section: Icon & Counter Row */}
      <div className="w-full flex justify-between items-center mb-2">
        <div className="text-xl p-1 bg-slate-50 rounded-xl">{topic.indicator}</div>
        <span className="rounded-full bg-slate-100 border border-slate-200/50 px-2.5 py-0.5 text-[10px] font-bold text-slate-500 font-sans">
          {topic.count} items
        </span>
      </div>

      {/* Middle Section: Centered Text Content */}
      <div className="flex-1 flex flex-col justify-center py-3">
        <h3 className="text-sm font-black text-slate-950 font-sans tracking-tight antialiased mb-1.5">
          {topic.name}
        </h3>
        <p className="text-xs font-medium leading-relaxed text-slate-500 font-sans antialiased line-clamp-3">
          {topic.description}
        </p>
      </div>

      {/* Bottom Section: Explore Action Link Link */}
      <div className="w-full mt-2 pt-3 border-t border-blue-50">
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
