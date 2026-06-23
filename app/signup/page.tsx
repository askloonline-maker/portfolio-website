import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-6">
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm w-full max-w-md flex flex-col items-center">
        <div className="text-center space-y-1 mb-6 w-full">
          <h2 className="text-xl font-black text-[#0f172a] tracking-tight">Create an Account</h2>
          <p className="text-xs text-[#64748b]">Join Asklo.Online to start sharing knowledge.</p>
        </div>
        <SignUp routing="path" path="/signup" signInUrl="/login" />
      </div>
    </div>
  );
}
