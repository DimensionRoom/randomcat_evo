import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl, altLanguages } from "@/lib/seo";
import toolsListData from "@/locales/en/toolsListData.json";
import onlineLearningData from "@/public/json/onlineLearningData.json";

/** Collect every tool route from toolsListData (normalized, non-empty, unique). */
function toolPaths(): string[] {
  const paths = new Set<string>();
  const cats = (toolsListData as any)?.tools ?? {};
  for (const cat of Object.values<any>(cats)) {
    for (const tool of Object.values<any>(cat)) {
      const link = String(tool?.onlineLink ?? "").replace(/^\/+/, "");
      if (link) paths.add(link);
    }
  }
  return [...paths];
}

function learningPaths(): string[] {
  const content = (onlineLearningData as any)?.content ?? {};
  const n = Object.keys(content).length;
  return Array.from({ length: n }, (_, i) => `onlineleaning/${i + 1}`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "onlinetools",
    "onlineleaning",
    "templates",
    "webelements",
    "products",
    "showcase",
  ];

  const allPaths = Array.from(
    new Set([...staticPaths, ...toolPaths(), ...learningPaths()])
  );

  const now = new Date();

  return allPaths.map((path) => ({
    url: absoluteUrl(path, "en"),
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.includes("/") ? 0.6 : 0.8,
    alternates: { languages: altLanguages(path) },
  }));
}
