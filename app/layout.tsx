import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: "Asklo.Online - The World's Living Room",
  description: "A premium hybrid Q&A and discussion platform open to everyone.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-[#0f172a] min-h-screen flex flex-col antialiased font-sans">
        <Navbar />
        <div className="max-w-7xl mx-auto w-full px-4 py-6 flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="hidden md:block self-start sticky top-20">
            <Sidebar />
          </aside>
          <main className="md:col-span-2 space-y-4">
            {children}
          </main>
          <aside className="hidden md:block self-start sticky top-20">
            <RightSidebar />
          </aside>
        </div>
        <Footer />
      </body>
    </html>
  );
}
