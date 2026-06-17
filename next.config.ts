import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:lang/trilha",
        destination: "/:lang/orientacao",
        permanent: true,
      },
      {
        source: "/guia",
        destination:
          "https://www.figma.com/design/33yIdWdxUK2uc13Zipx7Xi/HIP-Floripa?node-id=56-2&t=VYzCBe8g9siUJaeA-1",
        permanent: false,
        basePath: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
