import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <SignIn signUpUrl="/signup" routing="hash" />
    </div>
  );
}
