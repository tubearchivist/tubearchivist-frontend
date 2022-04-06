/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "tube.stiforr.tech"],
  },
  experimental: {
    runtime: "nodejs",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
