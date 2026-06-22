import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlueSpace - Knowledge & Community",
  description: "A platform like Quora and Reddit built with a royal blue theme.",
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
