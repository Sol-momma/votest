import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 旧来の /favicon.ico リクエスト (Chrome等の自動プロービング) を
  // 新しい /icon.svg に飛ばす
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon.svg",
      },
    ];
  },
};

export default nextConfig;
