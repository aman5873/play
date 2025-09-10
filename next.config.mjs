/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "playhubbucket.s3.eu-west-1.amazonaws.com",
      },
    ],
  },
  webpack(config) {
    // Add SVGR for SVG imports
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/, // applies to .js, .ts, .jsx, .tsx
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
