"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { trackEvent } from "@/lib/analytics/track";

const LOCALES = ["en", "th"];

export default function PageTracker() {
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    if (!pathname) return;
    const first = pathname.split("/")[1];
    const locale = LOCALES.includes(first) ? first : "";
    trackEvent({
      eventType: "page_view",
      path: pathname,
      locale,
      userId: user?.id ?? null,
    });
    // Intentionally keyed only on pathname: one event per navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
