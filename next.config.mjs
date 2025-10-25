/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photos.zillowstatic.com",
      },
      {
        protocol: "http",
        hostname: "10.10.12.51",
      }
    ],
  },
}
export default nextConfig
