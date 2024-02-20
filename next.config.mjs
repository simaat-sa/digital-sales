import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  `./src/shared/lib/Localization/i18Config.ts`
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "simaat.app",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
