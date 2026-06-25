import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-700">
      <div className="max-w-3xl mx-auto bg-white border border-blue-100 rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-blue-950/5">
        <h1 className="text-3xl font-black text-slate-950 tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-8">Effective Date: June 25, 2026</p>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            Welcome to <strong>Asklo.Online</strong> (accessible at <code>https://www.asklo.online</code>). We run a premium anonymous knowledge network designed so you can ask and answer queries cleanly without account friction. Because no signup flow, profile setup, or identity validation exists here, we handle user metrics with extreme confidentiality.
          </p>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">1. Zero Account Tracking Policy</h2>
            <p>
              We do not collect personal names, user email records, phone details, or social login states. Any textual answer or question you submit is immediately written directly as an anonymous contribution to our public knowledge base.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">2. Cookies and Log Infrastructure</h2>
            <p>
              To maintain system performance and prevent spam vectors, we use standard server cookies and local session storage markers. These are used to save local system theme options and to rate-limit user actions so our databases remain fast and stable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">3. Google Analytics and AdSense Metrics</h2>
            <p>
              Our platform uses third-party metrics tools, including Google Analytics, to observe visitor footprints, browser environments, and overall user flow volumes. Additionally, third-party advertising vendors (including Google via AdSense) display programmatic advertisements on this site. 
            </p>
            <p>
              Google uses cookies to serve targeted ads based on your historical visits here or across other digital locations on the Internet. You can completely opt-out of personalized advertising trackers by adjusting your personal Google Ads Settings dashboard.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">4. Important Safety Warning</h2>
            <p>
              Because your text is pushed directly to an unauthenticated community space, please be highly vigilant. Do not include your real name, personal contact numbers, home address, or confidential corporate credentials inside the body text of your questions or answers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
