import React from "react";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-700">
      <div className="max-w-3xl mx-auto bg-white border border-blue-100 rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-blue-950/5">
        <h1 className="text-3xl font-black text-slate-950 tracking-tight mb-2">About Asklo.Online</h1>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-8">The World's Living Room</p>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            <strong>Asklo.Online</strong> is an optimized global knowledge-sharing network designed to eliminate traditional authentication boundaries from intellectual community discourse. We are deeply inspired by classic long-form question hubs like Quora, but engineered from the ground up for absolute friction-free anonymity.
          </p>
          <p>
            We believe some of the world's finest technical architectures, engineering patterns, and strategic business systems are designed by engineers who prefer to communicate completely off-the-record. By omitting user profiles, avatar uploads, and tracking dashboards, we focus purely on the objective quality of information.
          </p>

          <section className="bg-blue-50/50 border border-blue-100/70 rounded-2xl p-4 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#0f2f88]">Our Structural Focus Areas:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800">
              <div>📈 Digital Marketing Strategy</div>
              <div>💼 Startup Launch & Corporate Systems</div>
              <div>🤖 Artificial Intelligence Deployments</div>
              <div>💻 Advanced Engineering & Tech</div>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-950 tracking-tight">Contact Information</h2>
            <p>
              For legal inquiries, system infrastructure observations, copy removal notifications (DMCA compliance), or corporate network partnership pitches, reach out straight to our operational inbox:
            </p>
            {/* ✉️ Updated Email Address Container */}
            <div className="inline-block bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 font-bold text-blue-700 tracking-wide">
              ✉️ asklo.online@gmail.com
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Our data administration team typically reviews and addresses incoming messages within 24 to 48 standard business hours.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
