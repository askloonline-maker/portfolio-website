import React from 'react';

export default function AskQuestion() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-900">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col justify-center cursor-pointer">
            <div className="flex items-center gap-2 font-bold text-2xl text-blue-700 tracking-tight leading-none">
              <span>💬</span>
              <span>Asklo.Online</span>
            </div>
            <span className="text-[10px] font-semibold text-gray-400 mt-1 tracking-wide uppercase">
              The World&apos;s Living Room
            </span>
          </div>

          <a href="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition">
            Back to Home
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-950">Create a Post</h1>
            <p className="text-sm text-gray-500 mt-1">Share a question or link with the Asklo community.</p>
          </div>

          <form className="space-y-5">
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Choose a Space
              </label>
              <select className="block w-full bg-gray-50 border border-gray-300 text-gray-700 py-2.5 px-3 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors">
                <option value="">Select a community...</option>
                <option value="ai-ml">🤖 Artificial Intelligence & Machine Learning</option>
                <option value="programming">💻 Programming & Software Development</option>
                <option value="startups">🚀 Startups & Entrepreneurship</option>
                <option value="finance">📈 Finance & Investing</option>
                <option value="crypto">🪙 Cryptocurrency & Blockchain</option>
                <option value="marketing">🎯 Digital Marketing</option>
                <option value="health">🌱 Health & Wellness</option>
                <option value="fitness">💪 Fitness & Bodybuilding</option>
                <option value="education">🎓 Education & Learning</option>
                <option value="career">💼 Career & Jobs</option>
                <option value="relationships">❤️ Relationships & Dating</option>
                <option value="travel">✈️ Travel</option>
                <option value="food">🍳 Food & Cooking</option>
                <option value="gaming">🎮 Gaming</option>
                <option value="entertainment">🎬 Movies & Entertainment</option>
                <option value="books">📚 Books & Writing</option>
                <option value="science">🔬 Science</option>
                <option value="automotive">🚗 Automotive</option>
                <option value="realestate">🏠 Real Estate</option>
                <option value="pets">🐶 Pets & Animals</option>
                <option value="fashion">✨ Fashion & Beauty</option>
                <option value="local">📍 Local Communities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Title / Question *
              </label>
              <input 
                type="text" 
                placeholder="Be specific and imagine you&apos;re asking a person..." 
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Details & Context (Optional)
              </label>
              <textarea 
                rows={6}
                placeholder="Include all the information someone would need to answer your question..." 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors placeholder:text-gray-400 resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Tags (Comma separated)
              </label>
              <input 
                type="text" 
                placeholder="e.g., nextjs, coding, advice" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <a 
                href="/" 
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition"
              >
                Cancel
              </a>
              <button 
                type="submit" 
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full shadow-sm transition"
              >
                Publish Post
              </button>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
}
