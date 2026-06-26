export default async function HomePage({ searchParams }: PageProps) {
  const dbStatus = await checkDatabaseConnection();
  const posts = await getAllPublicPosts();

  const targetPostId = typeof searchParams.post === "string" ? searchParams.post : null;
  const sharedPost = targetPostId ? posts.find((p) => p.id === targetPostId) : null;

  // 🛠️ DYNAMIC SEO HOOK: Compiles real-time structured data schema for crawlers
  const structuralSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": posts.length,
    "itemListElement": posts.slice(0, 15).map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Question",
        "name": post.title || post.content?.substring(0, 100) || "Anonymous Question",
        "text": post.content || post.title,
        "url": `https://www.asklo.online/?post=${post.id}`,
        "dateCreated": post.created_at,
        "answerCount": post.comment_count || 0
      }
    }))
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_34%,#ffffff_100%)] text-slate-950 relative">
      
      {/* Dynamic JSON-LD Injection Point */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuralSchema) }}
      />
      
      {/* Background feed grid layout */}
      <div className={`transition-all duration-300 ${sharedPost ? "blur-md pointer-events-none brightness-95 opacity-50 select-none" : ""}`}>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[60px_1fr] lg:grid-cols-[240px_minmax(0,1fr)_310px] gap-2 sm:gap-5 px-2 sm:px-4 py-6">
          
          <aside>
            <div className="sticky top-24 rounded-2xl md:rounded-3xl border border-blue-100 bg-white/90 p-1 md:p-3 shadow-sm shadow-blue-950/5 backdrop-blur">
              <Sidebar />
            </div>
          </aside>

          <section className="space-y-5">
            <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-blue-950/10">
              <div className="bg-gradient-to-r from-[#0f2f88] via-[#1d4ed8] to-[#3b82f6] p-6 text-white">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-100">Premium Anonymous Knowledge Network</p>
                    <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Ask freely. Answer boldly. Stay anonymous.</h1>
                    <p className="text-sm leading-6 text-blue-50">Where questions spark conversations and answers create value.</p>
                  </div>
                  {dbStatus.connected ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-bold text-white shadow-sm backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />
                      {dbStatus.message}
                    </span>
                  ) : (
                    <span className="rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-700">
                      Database Error: {dbStatus.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-3 bg-blue-50/60 p-4 text-xs font-semibold text-slate-600 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">🕶️ No account or display name required</div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">💬 Questions, answers, and opinions welcome</div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">🛡️ Public, respectful, moderated by community rules</div>
              </div>
            </div>

            <CreatePost />

            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Top conversations</h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{posts.length} live posts</span>
            </div>

            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-blue-200 bg-white p-12 text-center shadow-sm">
                  <p className="text-lg font-black text-slate-900">No anonymous conversations yet.</p>
                  <p className="mt-2 text-sm text-slate-500">Be the first person to ask a question or share a useful answer above.</p>
                </div>
              ) : (
                posts.map((post: any) => <QuestionCard key={post.id} post={post} />)
              )}
            </div>
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <RightSidebar />
            </div>
          </aside>
        </div>
      </div>

      {sharedPost && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/20 px-4">
          <div className="w-full max-w-2xl rounded-[2.5rem] border border-blue-100 bg-white/95 p-3 shadow-2xl backdrop-blur-md transition-all duration-200">
            <div className="pb-3 pt-1 flex justify-end">
              <a href="/" className="rounded-full bg-blue-50 hover:bg-blue-100 text-[#1d4ed8] px-4 py-2 text-xs font-black tracking-wide shadow-sm transition">
                ✕ Close & View Feed
              </a>
            </div>
            <div className="max-h-[75vh] overflow-y-auto p-1">
              <QuestionCard post={sharedPost} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
