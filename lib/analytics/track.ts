import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getVisitorId } from "./visitor";

/** Reads the ISO country code set by middleware from the tt_country cookie. */
function getCountry(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)tt_country=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export interface TrackEventInput {
  eventType: "page_view" | "sign_in";
  path?: string;
  locale?: string;
  userId?: string | null;
}

/**
 * Fire-and-forget insert of one usage event. Never throws into the UI:
 * all failures (config missing, SSR, network) are swallowed.
 */
export function trackEvent(input: TrackEventInput): void {
  if (!isSupabaseConfigured || typeof window === "undefined") return;

  const visitorId = getVisitorId();
  if (!visitorId) return;

  const supabase = createClient();
  void supabase
    .from("usage_events")
    .insert({
      event_type: input.eventType,
      path: input.path ?? null,
      locale: input.locale ?? null,
      user_id: input.userId ?? null,
      visitor_id: visitorId,
      country: getCountry(),
    })
    .then(({ error }) => {
      if (error && process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.debug("usage track failed:", error.message);
      }
    });
}
