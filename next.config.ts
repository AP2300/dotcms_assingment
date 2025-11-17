import type { NextConfig } from "next";

const host = process.env.NEXT_PUBLIC_DOTCMS_HOST;
if (!host) {
  throw new Error("Environment variable NEXT_PUBLIC_DOTCMS_HOST is not set");
}
const url = new URL(host);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || undefined,
      },
    ],
    loader: "custom",
    loaderFile: "./src/utils/imageLoader.ts",
  },
  async rewrites() {
    return [
      {
        source: "/dA/:path*",
        destination: `${process.env.NEXT_PUBLIC_DOTCMS_HOST}/dA/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*/index",
        destination: "/:path*/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
