import React from "react";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AskLo.Online | The World's Living Room — Anonymous Q&A Platform",
  description: "Ask questions, get expert answers, and share honest perspectives entirely anonymously. A premier knowledge network where curiosity overrides usernames.",
  keywords: ["anonymous Q&A", "ask questions online", "AskLo", "career advice forum", "anonymous confessions", "marketing strategy discussions"],
  metadataBase: new URL("https://www.asklo.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AskLo.Online | The World's Living Room",
    description: "What question would you ask if your name wasn't attached to it? Join the anonymous conversation safely.",
    url: "https://www.asklo.online",
    siteName: "AskLo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png", // Ensure a logo file sits directly inside your /public folder
        width: 1200,
        height: 630,
        alt: "AskLo.Online Premium Anonymous Knowledge Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AskLo.Online | Anonymous Q&A Platform",
    description: "What question would you ask if your name wasn't attached to it?",
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
        {/* LazyOnload effectively skips main thread blocking metrics */}
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
