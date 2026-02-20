import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  generateEtags: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "img.commerce.web.id"
      }
    ]
  }
};

export default nextConfig;
