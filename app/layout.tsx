import React from "react";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Asklo.Online | The World's Living Room",
  description: "A royal-blue anonymous questions and answers platform where everyone can post freely without an account.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Swapped to lazyOnload to fix PageSpeed thread blocking alerts */}
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
      {/* 🧼 Removed 'pb-16' since the mobile navigation footer bar is gone */}
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        
        {/* Global Desktop & Mobile Navigation Header */}
        <Navbar />

        {/* Core Main Web Feed Content */}
        {children}

        {/* ❌ Mobile Sticky Navigation Footer Bar has been completely removed from here */}

      </body>
    </html>
  );
}
