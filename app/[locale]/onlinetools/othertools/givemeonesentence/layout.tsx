import type { Metadata } from "next";
import type { ReactNode } from "react";
import { toolMetadata } from "@/lib/seo";
import enTools from "@/locales/en/toolsListData.json";
import thTools from "@/locales/th/toolsListData.json";

const ONLINE_LINK = "onlinetools/othertools/givemeonesentence";

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
