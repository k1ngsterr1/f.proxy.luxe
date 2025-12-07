// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.proxy.luxe",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// 👇 Apply next-intl plugin
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(baseConfig);
