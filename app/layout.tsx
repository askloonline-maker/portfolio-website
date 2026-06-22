import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asklo.Online - The World's Living Room",
  description: "A fast-paced knowledge sharing and community platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        {children}
      </body>
    </html>
  );
}
