import React from "react";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";

const spacesData = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: "📈",
    count: "Active Hub",
    description: "SEO structures, growth architectures, and optimization frameworks."
  },
  {
    id: "startups-business",
    title: "Startups & Business",
    icon: "💼",
    count: "Active Hub",
    description: "Venture strategies, scaling frameworks, business models, and operational systems."
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    icon: "🤖",
    count: "Active Hub",
    description: "Large Language Models, deployment patterns, and operational systems."
  },
  {
    id: "tech",
    title: "General Tech",
    icon: "💻",
    count: "Active Hub",
    description: "Next.js configurations, environment structures, and operational frameworks."
  },
  {
    id: "health-fitness-beauty",
    title: "Health - Fitness - Beauty",
    icon: "🌿",
    count: "Active Hub",
    description: "Wellness routines, physical preparation, lifestyle choices, and aesthetic self-care."
  },
  {
    id: "others",
    title: "Others",
    icon: "✨",
    count: "Active Hub",
    description: "Miscellaneous inquiries, general life observations, and unclassified discussions."
  }
];

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  // Await searchParams to satisfy Next.js asynchronous execution rules
  await searchParams;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_34%,#ffffff_100%)] text-slate-950 relative">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[60px_1fr] lg:grid-cols-[240px_minmax(0,1fr)_310px] gap-2 sm:gap-5 px-2 sm:px-4 py-6">
        
        {/* Left Sidebar */}
        <aside>
          <div className="sticky top-24 rounded-2xl md:rounded-3xl border border-blue-100 bg-white/90 p-1 md:p-3 shadow-sm shadow-blue-950/5 backdrop-blur">
            <Sidebar />
          </div>
        </aside>

        {/* Center Section: Spaces Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto py-4 space-y-2">
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">Spaces and Communities</h1>
            <p className="text-xs font-medium text-slate-500 leading-relaxed">
              Browse to find the spaces that fit your needs and click to explore. Use the targeted contextual hubs to match your research parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spacesData.map((space) => (
              <div key={space.id} className="group bg-white border border-blue-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl bg-blue-50/60 p-2.5 rounded-xl block w-fit">{space.icon}</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{space.count}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-950">{space.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-500 font-medium mt-0.5">{space.description}</p>
                  </div>
                </div>
                <a href={`/space/${space.id}`} className="inline-flex items-center gap-1 text-[11px] font-black text-[#1d4ed8] hover:text-[#0f2f88] transition mt-1">
                  Explore Space <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <RightSidebar />
          </div>
        </aside>

      </div>
    </main>
  );
}
