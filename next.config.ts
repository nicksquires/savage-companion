import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 's3.amazonaws.com',
      //   port: '',
      //   pathname: '/my-bucket/**',
      //   search: '',
      // },

      // Google avatars
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",   
      },
      // Hosted images
      {
        protocol: "https",
        hostname: "savage-companion.vercel.app",
      },
    ],
  },
};

export default nextConfig;
