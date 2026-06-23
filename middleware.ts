import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that anyone can visit without logging in
const isPublicRoute = createRouteMatcher(['/', '/login', '/signup']);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  // A clean, simple matcher that Next.js perfectly understands
  matcher: ["/((?!.+.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
