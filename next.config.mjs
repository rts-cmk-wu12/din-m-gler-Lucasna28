/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionSourceMaps: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
