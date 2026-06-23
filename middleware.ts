import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // This simple match avoids complex regex backslashes that break Vercel at runtime
    "/((?!_next/static|_next/image|favicon.ico|.*\\.).*)",
    "/(api|trpc)(.*)"
  ],
};
