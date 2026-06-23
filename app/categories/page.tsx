import React from "react";
import CategoryGrid from "../../components/CategoryGrid";

export default function CategoriesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Explore Spaces & Communities</h1>
        <p className="text-xs text-[#64748b]">Select an analytical cluster block below to filter context down to your parameters.</p>
      </div>
      <CategoryGrid />
    </div>
  );
}
