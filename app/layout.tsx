// @app/layout.tsx

// Description
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Types
import { ReactNode } from "react";

// CSS
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADRDE",
  description: "IT Management Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="h-screen w-screen">{children}</main>
      </body>
    </html>
  );
}
