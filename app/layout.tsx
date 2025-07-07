// @/app/layout.tsx

// Description
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Types
import { ReactNode } from "react";

// Components
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/navigation/Index";
import { Header } from "@/components/header/Index";
import { Footer } from "@/components/footer/Index";

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
        <SidebarProvider>
          <NavigationSidebar />
          <main className="h-screen w-full overflow-x-hidden bg-black/[0.07]">
            <Header />
            {children}
            <Footer />
          </main>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
