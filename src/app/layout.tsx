import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Century Intelligence - ИИ и энергетические решения",
  description: "Ведущий провайдер AI решений и энергосистем для государственного сектора Узбекистана",
  keywords: ["AI", "Искусственный интеллект", "Энергосистемы", "Узбекистан", "Государственный сектор"],
  authors: [{ name: "Century Intelligence" }],
  icons: {
    icon: "/images/century_intelligence_logo.svg",
  },
  openGraph: {
    title: "Century Intelligence",
    description: "ИИ и энергетические решения для государственного сектора",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
