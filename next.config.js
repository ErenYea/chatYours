/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com", "github.com"],
  },
  // experimental: {
  //   swcPlugins: [["next-superjson-plugin", {}]],
  // },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
