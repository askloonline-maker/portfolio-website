import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AskLo - Ask Anything Anonymously",
  description:
    "A Quora + Reddit inspired community where everyone posts as Anonymous Guest.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
