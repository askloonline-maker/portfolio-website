import React from "react";
import "./globals.css";

export const metadata = {
  title: "Asklo.Online | The World's Living Room",
  description: "The premium anonymous combined platform for free-flowing conversation, questions, and community curation.",
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
    </html>
  );
}
