// @ts-check

const nextConfig = {
  // output: "export",
  experimental: {
    runtime: "edge",
  },
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      // {
      //   source: "/:all*(svg|jpg|png|css|js)", // Adjust the file types as needed
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable", // One year cache duration for immutable assets
      //     },
      //   ],
      // },
      // {
      //   source: "/:path*",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable", // for static assets
      //     },
      //   ],
      // },
      // {
      //   source: "/_next/static/:path*",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable",
      //     },
      //   ],
      // },
      // {
      //   source: "/static/:path*",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable",
      //     },
      //   ],
      // },
      // {
      //   source: "/:path*\\.html",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "no-cache",
      //     },
      //   ],
      // },
    ];
  },
};

module.exports = nextConfig;
