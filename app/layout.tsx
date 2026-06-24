import React from "react";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
      {/* 🟢 REPLACE G-XXXXXXXXXX WITH YOUR ACTUAL MEASUREMENT ID FROM GOOGLE ANALYTICS */}
      <GoogleAnalytics gaId="G-HVE82D63F5" />
    </html>
  );
}
