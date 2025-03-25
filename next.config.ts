// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// 👇 This is your base config
const baseConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// 👇 Apply next-intl plugin
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(baseConfig);
