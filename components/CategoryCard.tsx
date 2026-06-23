import React from "react";
import Link from "next/link";

interface CategoryCardProps {
  topic: { name: string; slug: string; count: string; description: string; indicator: string };
}

export default function CategoryCard({ topic }: CategoryCardProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm hover:border-[#1d4ed8] transition flex flex-col justify-between space-y-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xl">{topic.indicator}</span>
          <span className="text-[10px] font-bold text-[#64748b] bg-slate-100 px-2 py-0.5 rounded-full">{topic.count} items</span>
        </div>
        <h3 className="text-sm font-bold text-[#0f172a] pt-1">c/{topic.slug}</h3>
        <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed">{topic.description}</p>
      </div>
      <Link href="/" className="text-xs font-bold text-[#1d4ed8] hover:underline block pt-1">
        Explore Space →
      </Link>
    </div>
  );
}
