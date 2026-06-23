import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center py-6">
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm w-full max-w-md flex flex-col items-center space-y-4">
        <div className="text-center space-y-1 mb-2">
          <h2 className="text-xl font-black text-[#0f172a] tracking-tight">Welcome Back</h2>
          <p className="text-xs text-[#64748b]">Access your global conversation board parameters.</p>
        </div>

        {/* Clean, error-free production Clerk Sign In component */}
        <SignIn 
          routing="path" 
          path="/login" 
          signUpUrl="/signup"
          appearance={{
            elements: {
              formButtonPrimary: "bg-[#1d4ed8] hover:bg-[#1e40af] text-xs font-bold rounded-xl transition normal-case py-2.5",
              card: "shadow-none border-0 p-0 m-0 w-full",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              footer: "text-xs text-[#64748b]"
            }
          }}
        />
      </div>
    </div>
  );
}
