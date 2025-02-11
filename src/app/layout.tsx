import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minesweeper Game",
  description: "A classic minesweeper game built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
