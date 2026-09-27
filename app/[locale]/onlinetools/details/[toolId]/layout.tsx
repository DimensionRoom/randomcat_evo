import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { hasToolDetails } from "@/public/data/toolDetails";
import enCopy from "@/locales/en/toolDetailsScreen.json";

type Params = { params: { locale: string; toolId: string } };

export async function generateMetadata({
  params: { locale, toolId },
}: Params): Promise<Metadata> {
  if (!hasToolDetails(toolId)) return {};
  // Tool copy is English-only for now (Thai falls back to it on the page too).
  const copy = (enCopy.tools as Record<string, { title: string; subtitle: string }>)[toolId];
  return buildMetadata({
    title: copy.title,
    description: copy.subtitle,
    path: `onlinetools/details/${toolId}`,
    locale,
  });
}

export default function Layout({ children, params: { toolId } }: Params & { children: ReactNode }) {
  // A real 404 for unknown tools rather than an empty page.
  if (!hasToolDetails(toolId)) notFound();
  return <>{children}</>;
}
