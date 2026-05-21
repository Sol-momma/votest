import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "いついく？ — スマホで日程調整 | ご飯会・飲み会の候補日を投票で決定",
  description:
    "いついく？ は、ログイン不要でスマホから使える日程調整アプリ。候補日に◯🤔×を投票するだけで、出席率の高い順に自動集計。LINEで共有してご飯会・飲み会・歓送迎会の日程をサクッと決定。",
  openGraph: {
    title: "いついく？ — スマホで日程調整",
    description:
      "候補日を投票するだけで、出席率の高い順に自動集計。LINEで送ってみんなで決定。",
    type: "website",
    locale: "ja_JP",
    siteName: "いついく？",
  },
  twitter: {
    card: "summary",
    title: "いついく？ — スマホで日程調整",
    description: "候補日を投票するだけで、出席率順に自動集計。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-dvh">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
