import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/mangoes',
        destination: '/category/mangoes',
      },
      {
        source: '/pantry',
        destination: '/category/pantry',
      },
      {
        source: '/our-story',
        destination: '/about',
      },
      {
        source: '/corporate',
        destination: '/corporate-orders',
      },
    ]
  },
};

export default nextConfig;
