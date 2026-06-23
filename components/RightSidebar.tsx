import React from "react";
import Link from "next/link";

export default function RightSidebar() {
  return (
    <div className="space-y-4 w-full">
      {/* Rule Framework Card */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-xs uppercase text-[#64748b] tracking-wider mb-3">Platform Guidelines</h3>
        <ul className="text-xs space-y-2 text-[#0f172a] list-disc list-inside leading-relaxed">
          <li>Search before posting down duplicate content blocks.</li>
          <li>Clearly declare complex questions vs open conversations.</li>
          <li>No malicious spam or toxic links tolerated.</li>
        </ul>
      </div>

      {/* Mini Technical Footer */}
      <div className="text-[11px] text-[#64748b] px-2 flex flex-wrap gap-x-2 gap-y-1">
        <Link href="/" className="hover:underline">Rules Policy</Link>
        <span>•</span>
        <Link href="/" className="hover:underline">Privacy Terms</Link>
        <span>•</span>
        <p>© 2026 Asklo.Online Inc.</p>
      </div>
    </div>
  );
}
