import type { MetadataRoute } from "next";
import { HOME_META } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Think Tool",
    short_name: "Think Tool",
    description: HOME_META.en.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5b2cbc",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
