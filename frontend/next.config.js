/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: `${process.env.SERVER_URL}/:path*`, // Proxy
        },
      ],
    };
  },
};

module.exports = nextConfig;
