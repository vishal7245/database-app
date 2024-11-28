import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;