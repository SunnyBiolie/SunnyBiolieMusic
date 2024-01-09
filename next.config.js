const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cavkfwwrkhusmjwuwcba.supabase.co",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
