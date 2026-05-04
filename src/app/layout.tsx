import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deutsch Lernen",
  description: "Learn German vocabulary and phrases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
