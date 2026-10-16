import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getVisitorId } from "./visitor";

/**
 * The ISO country code set by middleware in the tt_country cookie (e.g. "TH").
 *
 * Stored as the code itself: converting it to a name here used each visitor's
 * browser, and browsers word some places differently ("Hong Kong" vs "Hong
 * Kong SAR China"), splitting one country across several rows. The admin
 * dashboard turns codes and older stored names into one display name.
 */
function getCountry(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)tt_country=([^;]+)/);
  if (!match) return null;
  const code = decodeURIComponent(match[1]).trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : null;
}

/**
 * Only the deployed site is tracked. Local dev and `next start` on a laptop
 * write to the same database but have no geolocation, which once made test
 * runs the largest "unknown" country and inflated every total.
 */
function isTrackedEnvironment(): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  const host = window.location.hostname;
  return !(host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".local"));
}

/** Coarse device class from viewport width (privacy-friendly; no user-agent). */
function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
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
  if (!isTrackedEnvironment()) return;

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
      device: getDeviceType(),
    })
    .then(({ error }) => {
      if (error && process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.debug("usage track failed:", error.message);
      }
    });
}
