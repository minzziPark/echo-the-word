import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "echo the word",
  description: "대차교회 아웃리치 주제 말씀 암송 서비스",
  openGraph: {
    title: "echo the word",
    description: "대차교회 아웃리치 주제 말씀 암송 서비스",
    type: "website",
    url: "https://echo-the-word.vercel.app",
    images: [
      {
        url: "https://echo-the-word.vercel.app/bible.jpg",
        width: 1200,
        height: 630,
        alt: "Echo the Word",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "echo the word",
    description: "대차교회 아웃리치 주제 말씀 암송 서비스",
    images: ["https://echo-the-word.vercel.app/bible.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
