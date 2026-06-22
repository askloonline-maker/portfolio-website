import React from 'react';

export default function AskQuestion() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-blue-700 tracking-tight cursor-pointer">
            <span>💬</span>
            <span>BlueSpace</span>
          </div>
          <a href="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition">
            Back to Home
          </a>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          
          {/* Header */}
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-950">Create a Post</h1>
            <p className="text-sm text-gray-500 mt-1">Share a question or link with the BlueSpace community.</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            
            {/* Choose Community / Space Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Choose a Space
              </label>
              <select className="block w-full md:w-64 bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors">
                <option value="">Select a community...</option>
                <option value="webdev">r/WebDevelopment</option>
                <option value="asktech">r/AskTech</option>
                <option value="philosophy">r/Philosophy</option>
              </select>
            </div>

            {/* Title / Question input */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Title / Question *
              </label>
              <input 
                type="text" 
                placeholder="Be specific and imagine you’re asking a person..." 
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors placeholder:text-gray-400"
              />
            </div>

            {/* Description / Body text */}
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

            {/* Tags Input (Reddit/Quora style categorization) */}
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

            {/* Action Buttons */}
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
