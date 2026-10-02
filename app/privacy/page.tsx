import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-700">
      <div className="max-w-3xl mx-auto bg-white border border-blue-100 rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-blue-950/5">
        <h1 className="text-3xl font-black text-slate-950 tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-8">
          Effective Date: October 2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            Welcome to <strong>Asklo.Online</strong> (accessible at{" "}
            <code>https://www.asklo.online</code>). We run a premium anonymous knowledge network designed so you can ask and answer queries cleanly without account friction. Because no signup flow, profile setup, or identity validation exists here, we handle user metrics with extreme confidentiality.
          </p>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              1. Zero Account Tracking Policy
            </h2>
            <p>
              We do not collect personal names, user email records, phone details, or social login states. Any textual answer or question you submit is immediately written directly as an anonymous contribution to our public knowledge base.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              2. Cookies and Log Infrastructure
            </h2>
            <p>
              To maintain system performance and prevent spam vectors, we use standard server cookies and local session storage markers. These are used to save local system theme options and to rate-limit user actions so our databases remain fast and stable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              3. Google Analytics and AdSense Cookie Disclosures
            </h2>
            <p>
              Our platform uses third-party metrics tools, including Google Analytics, to observe visitor footprints, browser environments, and overall user flow volumes. Additionally, third-party advertising vendors (including Google via AdSense) display programmatic advertisements on this site.
            </p>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites on the Internet. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.
            </p>
            <p>
              Users may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-medium"
              >
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              4. Important Safety Warning
            </h2>
            <p>
              Because your text is pushed directly to an unauthenticated community space, please be highly vigilant. Do not include your real name, personal contact numbers, home address, or confidential corporate credentials inside the body text of your questions or answers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
