import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:lang/trilha",
        destination: "/:lang/orientacao",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
