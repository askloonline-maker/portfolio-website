import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Force Vercel to compile this using the standard Node.js server engine instead of Edge
export const runtime = 'nodejs';

export const config = {
  matcher: [
    // Runs middleware on every single page except static files and assets
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest))).*',
    '/(api|trpc)(.*)',
  ],
};
