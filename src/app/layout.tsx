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
  title: "Leroux - Business Consulting Template",
  description: "Professional business consulting template with 27 unique pages. From strategy to delivery, we help your business succeed.",
  keywords: ["Business", "Consulting", "Strategy", "Leroux", "Template"],
  authors: [{ name: "Qode Interactive" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Leroux - Business Consulting",
    description: "Professional business consulting template",
    url: "https://leroux.qodeinteractive.com",
    siteName: "Leroux",
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
