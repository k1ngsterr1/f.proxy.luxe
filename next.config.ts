import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
