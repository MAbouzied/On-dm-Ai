import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Hides the dev indicator when idle; reduces noise from the `nextjs-portal` host (dev only). */
  devIndicators: false,
  images: {
    // Disable server-side image optimization — the Next.js proxy fails to fetch
    // images from the backend container via SSL (Docker internal networking issue).
    // Images are served directly from their source URLs instead.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**", pathname: "/**" },
      { protocol: "http", hostname: "**", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "4000", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "api.on-dm.com", pathname: "/**" },
      { protocol: "https", hostname: "freeimage.host", pathname: "/**" },
      { protocol: "http", hostname: "ondm-backend", port: "4000", pathname: "/**" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
