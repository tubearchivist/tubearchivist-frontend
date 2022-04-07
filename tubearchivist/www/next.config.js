const { withPlaiceholder } = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "tube.stiforr.tech"],
  },
  reactStrictMode: true,
};

module.exports = withPlaiceholder(nextConfig);
