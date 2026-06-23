import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-6">
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm w-full max-w-md flex flex-col items-center">
        <div className="text-center space-y-1 mb-6 w-full">
          <h2 className="text-xl font-black text-[#0f172a] tracking-tight">Welcome Back</h2>
          <p className="text-xs text-[#64748b]">Sign in to interact with the Living Room.</p>
        </div>
        <SignIn routing="path" path="/login" signUpUrl="/signup" />
      </div>
    </div>
  );
}
