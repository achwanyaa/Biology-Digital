import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js ESM packages so Next.js can bundle them correctly
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Use empty turbopack config to satisfy Next.js 16's Turbopack-first mode
  turbopack: {},
};

export default nextConfig;
