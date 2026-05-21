import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Votest - スマホで日程調整 | ご飯会・飲み会の候補日を投票で決定",
  description:
    "Votest（ヴォウテスト）は、ログイン不要でスマホから使える日程調整アプリ。候補日に◯🤔×を投票するだけで、出席率の高い順に自動集計。LINEで共有してご飯会・飲み会・歓送迎会の日程をサクッと決定。",
  openGraph: {
    title: "Votest - スマホで日程調整",
    description: "候補日を投票するだけで、出席率の高い順に自動集計。LINEで送ってみんなで決定。",
    type: "website",
    locale: "ja_JP",
    siteName: "Votest",
  },
  twitter: {
    card: "summary",
    title: "Votest - スマホで日程調整",
    description: "候補日を投票するだけで、出席率順に自動集計。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-dvh bg-zinc-100">{children}</body>
    </html>
  );
}
