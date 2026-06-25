import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@react-three/drei", "@react-three/fiber", "gsap", "three"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
