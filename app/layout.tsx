import "./globals.css";

export const metadata = {
  title: "RoyalSphere | Anonymous Discussion Forum",
  description: "The premium combined platform for anonymous questions and community curation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
