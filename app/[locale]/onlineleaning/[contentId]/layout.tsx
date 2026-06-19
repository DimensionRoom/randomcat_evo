import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata, SECTION_META, type Locale } from "@/lib/seo";
import onlineLearningData from "@/public/json/onlineLearningData.json";

function truncate(s: string, n = 180): string {
  const clean = s.replace(/\s+/g, " ").trim();
  return clean.length > n ? `${clean.slice(0, n - 1)}…` : clean;
}

export async function generateMetadata({
  params: { locale, contentId },
}: {
  params: { locale: string; contentId: string };
}): Promise<Metadata> {
  const content = (onlineLearningData as any)?.content ?? {};
  const keys = Object.keys(content);
  const item = content[keys[parseInt(contentId, 10) - 1]] ?? null;
  const loc = locale as Locale;
  const path = `onlineleaning/${contentId}`;

  if (!item) {
    const m = SECTION_META.onlineleaning[loc] ?? SECTION_META.onlineleaning.en;
    return buildMetadata({ ...m, path, locale });
  }

  const title = item.topic?.[locale] ?? item.topic?.en ?? "Online Learning";
  const description = truncate(
    item.desc?.[locale] ??
      item.desc?.en ??
      SECTION_META.onlineleaning[loc]?.description ??
      SECTION_META.onlineleaning.en.description
  );
  return buildMetadata({ title, description, path, locale });
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
