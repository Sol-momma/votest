import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteSidebar } from "@/components/SiteSidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "いついく？ — 候補日10件でも30秒で答えられる、スマホ日程調整",
  description:
    "候補日が多くてもラクに集計できる、スマホ特化の日程調整アプリ。「全部◯」+「行けない日だけ×」の2タップで完了。ログイン不要、URLを送るだけ。出席率の高い順に自動集計。",
  openGraph: {
    title: "いついく？ — 候補日10件でも30秒で答えられる",
    description:
      "候補日が多くてもラク。2タップで投票完了、出席率順に自動集計。ログイン不要・無料。",
    type: "website",
    locale: "ja_JP",
    siteName: "いついく？",
  },
  twitter: {
    card: "summary",
    title: "いついく？ — 候補日10件でも30秒",
    description: "候補日が多くてもラク。2タップで投票、出席率順に自動集計。",
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
        <SiteSidebar />
        <div className="md:pl-64">{children}</div>
      </body>
    </html>
  );
}
