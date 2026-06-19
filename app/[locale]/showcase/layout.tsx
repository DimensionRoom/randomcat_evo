import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata, SECTION_META, type Locale } from "@/lib/seo";

const KEY = "showcase";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const m = SECTION_META[KEY][(locale as Locale)] ?? SECTION_META[KEY].en;
  return buildMetadata({ ...m, path: KEY, locale });
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
