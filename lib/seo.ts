import type { Metadata } from "next";

/** Canonical production origin — used for metadataBase, sitemap, canonical/hreflang. */
export const SITE_URL = "https://www.think-tool.com";

export const LOCALES = ["en", "th"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Map an internal path (no leading slash, "" = home) to its public URL path for a
 * locale. The default locale (en) is unprefixed; th is prefixed with /th.
 */
export function localizedPath(path: string, locale: string): string {
  const clean = path.replace(/^\/+/, "");
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return clean ? `${base}/${clean}` : base || "/";
}

/** Absolute URL for a path in a locale. */
export function absoluteUrl(path: string, locale: string): string {
  return `${SITE_URL}${localizedPath(path, locale)}`;
}

/** hreflang alternates map for a given internal path. */
export function altLanguages(path: string): Record<string, string> {
  return {
    en: absoluteUrl(path, "en"),
    th: absoluteUrl(path, "th"),
    "x-default": absoluteUrl(path, "en"),
  };
}

interface BuildMetadataInput {
  title: string;
  description: string;
  /** internal path without leading slash, "" = home */
  path: string;
  locale: string;
}

/**
 * Shared per-page metadata: canonical + hreflang alternates and OpenGraph/Twitter
 * text. The branded OG image is inherited from app/[locale]/opengraph-image.tsx.
 */
export function buildMetadata({
  title,
  description,
  path,
  locale,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path, locale);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: altLanguages(path),
    },
    openGraph: {
      type: "website",
      siteName: "Think Tool",
      locale: locale === "th" ? "th_TH" : "en_US",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Find a tool entry by its onlineLink (normalized) in a toolsListData JSON. */
function findTool(data: any, onlineLink: string): any | null {
  const target = onlineLink.replace(/^\/+/, "");
  const cats = data?.tools ?? {};
  for (const cat of Object.values<any>(cats)) {
    for (const tool of Object.values<any>(cat)) {
      if (String(tool?.onlineLink ?? "").replace(/^\/+/, "") === target) {
        return tool;
      }
    }
  }
  return null;
}

/**
 * Per-tool metadata built from toolsListData (title = "topic topic2", desc = "desc").
 * Pass the en + th JSON in; the layout supplies the matching onlineLink.
 */
export function toolMetadata(
  onlineLink: string,
  locale: string,
  enData: any,
  thData: any
): Metadata {
  const data = locale === "th" ? thData : enData;
  const tool = findTool(data, onlineLink) ?? findTool(enData, onlineLink);
  const topic = [tool?.topic, tool?.topic2].filter(Boolean).join(" ").trim();
  const title = topic || "Brainstorming Tool";
  const description =
    [tool?.desc, tool?.desc2].filter(Boolean).join(" ").trim() ||
    HOME_META[(locale as Locale)]?.description ||
    HOME_META.en.description;
  return buildMetadata({
    title,
    description,
    path: onlineLink.replace(/^\/+/, ""),
    locale,
  });
}

/** Localized title/description for the main section listing pages. */
export const SECTION_META: Record<
  string,
  Record<Locale, { title: string; description: string }>
> = {
  onlinetools: {
    en: {
      title: "Online Brainstorming Tools",
      description:
        "Explore Think Tool's online brainstorming tools for innovation, creativity, business and education.",
    },
    th: {
      title: "เครื่องมือระดมความคิดออนไลน์",
      description:
        "สำรวจเครื่องมือระดมความคิดออนไลน์ของ Think Tool สำหรับนวัตกรรม ความคิดสร้างสรรค์ ธุรกิจ และการศึกษา",
    },
  },
  onlineleaning: {
    en: {
      title: "Online Learning",
      description:
        "Learn creativity, innovation and design thinking with Think Tool's online learning content.",
    },
    th: {
      title: "บทเรียนออนไลน์",
      description:
        "เรียนรู้ความคิดสร้างสรรค์ นวัตกรรม และการคิดเชิงออกแบบกับเนื้อหาบทเรียนออนไลน์ของ Think Tool",
    },
  },
  templates: {
    en: {
      title: "Templates",
      description:
        "Ready-to-use brainstorming and design templates from Think Tool.",
    },
    th: {
      title: "เทมเพลต",
      description: "เทมเพลตระดมความคิดและออกแบบพร้อมใช้งานจาก Think Tool",
    },
  },
  webelements: {
    en: {
      title: "Web Elements",
      description: "A gallery of reusable UI elements and components.",
    },
    th: {
      title: "Web Elements",
      description: "แกลเลอรีของ UI element และคอมโพเนนต์ที่นำกลับมาใช้ใหม่ได้",
    },
  },
  products: {
    en: {
      title: "Products",
      description: "Think Tool products and card decks for creative thinking.",
    },
    th: {
      title: "สินค้า",
      description: "สินค้าและชุดการ์ดของ Think Tool สำหรับการคิดสร้างสรรค์",
    },
  },
  showcase: {
    en: {
      title: "Showcase",
      description: "See how people use Think Tool to brainstorm and create.",
    },
    th: {
      title: "ผลงาน",
      description: "ดูตัวอย่างการใช้ Think Tool เพื่อระดมความคิดและสร้างสรรค์ผลงาน",
    },
  },
};

/** Localized home title/description used by the root layout. */
export const HOME_META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Think Tool — Generate Innovation and Education Ideas",
    description:
      "Think Tool enables you to generate fresh innovation and education ideas. Spark creativity and transform learning with our online brainstorming tools.",
  },
  th: {
    title: "Think Tool — เครื่องมือระดมความคิดสร้างสรรค์ นวัตกรรม และการเรียนรู้",
    description:
      "Think Tool ช่วยให้คุณสร้างไอเดียใหม่ด้านนวัตกรรมและการศึกษา จุดประกายความคิดสร้างสรรค์และพลิกโฉมการเรียนรู้ด้วยเครื่องมือระดมความคิดออนไลน์",
  },
};
