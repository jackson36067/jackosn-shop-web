import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "jackson1.oss-cn-beijing.aliyuncs.com",
      },
    ],
  },
  output: "export",
};

export default nextConfig;
