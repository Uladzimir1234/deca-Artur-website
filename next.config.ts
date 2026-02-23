import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gealanwindows.com",
        pathname: "/app/uploads/**",
      },
      {
        protocol: "https",
        hostname: "assets.brogawindows.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
