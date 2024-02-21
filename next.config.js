const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cavkfwwrkhusmjwuwcba.supabase.co",
        protocol: "https",
      },
      {
        hostname: "firebasestorage.googleapis.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
