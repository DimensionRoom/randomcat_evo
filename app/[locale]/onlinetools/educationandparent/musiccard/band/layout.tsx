import type { Metadata } from "next";
import type { ReactNode } from "react";
import { toolMetadata } from "@/lib/seo";
import enTools from "@/locales/en/toolsListData.json";
import thTools from "@/locales/th/toolsListData.json";

// Music Band lives under the registered musiccard tool entry.
const ONLINE_LINK = "onlinetools/educationandparent/musiccard";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return toolMetadata(ONLINE_LINK, locale, enTools, thTools);
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
