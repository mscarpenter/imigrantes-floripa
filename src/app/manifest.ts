import type { MetadataRoute } from "next";
import { defaultLocale } from "@/i18n/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HIP - Florianópolis",
    short_name: "HIP",
    description: "Seu guia prático para começar em Florianópolis",
    start_url: `/${defaultLocale}`,
    id: `/${defaultLocale}`,
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fbf8f4",
    theme_color: "#2a4d9b",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["education", "navigation", "lifestyle"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
