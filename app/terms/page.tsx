import React from "react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-700">
      <div className="max-w-3xl mx-auto bg-white border border-blue-100 rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-blue-950/5">
        <h1 className="text-3xl font-black text-slate-950 tracking-tight mb-2">Community Rules & Terms</h1>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-8">Effective Date: June 25, 2026</p>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            By accessing or writing content on <strong>Asklo.Online</strong> ("The World's Living Room"), you formally enter a legal agreement to follow these moderation standards and code-level usage guidelines.
          </p>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">1. The Anonymous Code of Honor</h2>
            <p>
              Anonymity provides the freedom to share knowledge clearly, but it requires high mutual respect. You retain full moral and legal responsibility for any textual data, code blocks, or technical context you broadcast onto our open spaces.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">2. Forbidden Actions & Auto-Removal Rules</h2>
            <p>
              To maintain an exceptional domain quality score for ad providers, our moderation scripts will instantly wipe content containing:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Targeted harassment, personal hate speech, structural insults, or defamatory statements.</li>
              <li>Affiliate link manipulation, programmatic keyword stuffing, or low-quality product ads.</li>
              <li>Injections of malicious software scripts or instructional keys for illegal operations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">3. Structural Enforcement</h2>
            <p>
              The administration team reserves absolute authority to erase any submitted entries, wipe database rows, or configure IP-level network blocks instantly and without warning to protect the system from denial-of-service attempts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">4. Disclaimer of Professional Content</h2>
            <p>
              Answers found across our marketing, business, engineering, and AI categories are crowdsourced and crowdsourced entries do not equal official legal, financial, or industrial engineering advice. Verify any production advice independently.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
