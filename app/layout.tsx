import React from "react";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  // 🎯 Shortened to 44 characters to pass the Title Length warning (image_3a9921.png)
  title: "AskLo | Anonymous Q&A Platform & Forums",
  description: "Ask questions, get expert answers, and share perspectives anonymously. Join the online community discussion feed where curiosity overrides usernames.",
  keywords: [
    "anonymous blog website", 
    "Q&A platforms", 
    "knowledge sharing websites", 
    "discussion forums", 
    "question answer websites",
    "online communities",
    "anonymous Q&A", 
    "ask questions online", 
    "AskLo", 
    "career advice forum", 
    "marketing strategy discussions",
    "unfiltered discussions online"
  ],
  metadataBase: new URL("https://www.asklo.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AskLo.Online | The World's Anonymous Living Room",
    description: "What question would you ask if your name wasn't attached? Join professional conversations on a secure knowledge sharing platform.",
    url: "https://www.asklo.online",
    siteName: "AskLo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "AskLo.Online Premium Anonymous Knowledge Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AskLo.Online | Anonymous Q&A Platform & Forum",
    description: "What question would you ask if your name wasn't attached to it? Start blogging anonymously.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HVE82D63F5"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HVE82D63F5');
          `}
        </Script>
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {/* ♿️ Fixes Skip Navigation Link warning (image_3a9cc9.png) */}
        <a href="#main-content" className="sr-only focus:not-sr-only absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-xl z-50">
          Skip to content
        </a>
        <Navbar />
        {/* Wrap content in main with matching id */}
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
