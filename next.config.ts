import type { NextConfig } from "next";
import { i18n } from './next-i18next.config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kpf-backpanel-production.up.railway.app",
        port: "",
        pathname: "/**", // Mengizinkan semua path dari domain ini
      },
      {
        protocol: "https",
        hostname: "rfbdev.newsmaker.id",
        port: "",
        pathname: "/**", // Mengizinkan semua path dari domain ini
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**", // Untuk development local
      },
    ],
    unoptimized: process.env.NODE_ENV !== "production", // Nonaktifkan optimasi di development
  },
};

export default nextConfig;
