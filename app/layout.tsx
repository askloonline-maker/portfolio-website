import "./globals.css";

export const metadata = {
  title: "Asklo.online",
  description: "The World's Living Room"
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
  <html lang="en">
   <body>
    {children}
   </body>
  </html>
 );
}
