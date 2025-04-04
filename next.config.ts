// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['api.proxy.luxe'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.proxy.luxe',
        pathname: '/**',
      },
    ],
  },
};

// 👇 Apply next-intl plugin
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(baseConfig);
