import React from 'react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased text-gray-900">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Branding */}
        <a href="/" className="inline-flex flex-col items-center justify-center cursor-pointer group">
          <div className="flex items-center gap-2 font-black text-3xl text-blue-700 tracking-tight leading-none">
            <span>💬</span>
            <span>Asklo.Online</span>
          </div>
          <span className="text-[10px] font-bold text-gray-400 mt-1.5 tracking-widest uppercase group-hover:text-blue-600 transition-colors">
            The World&apos;s Living Room
          </span>
        </a>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-1.5 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition">
            Sign in
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-gray-200/80 shadow-sm sm:rounded-2xl sm:px-10">
          
          {/* Premium Social Logins */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.83z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.79 1.21 5.49l4.11-3.25z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.49l4.11 3.25c.94-2.85 3.57-4.99 6.68-4.99z"/>
              </svg>
              <span>Sign up with Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <svg className="w-5 h-5 fill-current text-gray-900" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>Sign up with GitHub</span>
            </button>
          </div>

          {/* Premium Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-400 font-semibold tracking-wider">Or register with email</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                placeholder="u/username"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-start pt-1">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <div className="ml-2.5 text-xs text-gray-500 leading-normal">
                I agree to the{" "}
                <a href="#" className="font-semibold text-gray-700 hover:text-blue-600 underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-gray-700 hover:text-blue-600 underline">Privacy Policy</a>.
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2"
            >
              Agree & Sign Up
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
