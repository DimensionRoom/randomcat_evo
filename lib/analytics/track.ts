import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getVisitorId } from "./visitor";
import { isIgnoredReferrer } from "./sources";

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

const ENTRY_KEY = "tt_entry_recorded";

/**
 * Where this visit came from, returned once per browser tab session — on the
 * first page view — and null after that.
 *
 * Only the first page counts because client-side navigation keeps
 * document.referrer at whatever site first sent the visitor, so reading it on
 * every page would credit that site with the whole visit, again and again.
 * Only the referrer's host is kept (browsers usually send no more than that
 * anyway); referrers from this site, and from the sign-in round trip, are not
 * sources.
 */
function takeEntrySource(): {
  entry: true;
  referrer_host: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
} | null {
  try {
    if (sessionStorage.getItem(ENTRY_KEY)) return null;
    sessionStorage.setItem(ENTRY_KEY, "1");
  } catch {
    // Storage blocked: no way to tell the first page from the rest, so skip
    // the source rather than count it on every page.
    return null;
  }

  let host: string | null = null;
  try {
    const ref = document.referrer ? new URL(document.referrer).hostname : "";
    if (ref && ref !== window.location.hostname && !isIgnoredReferrer(ref)) host = ref;
  } catch {
    host = null;
  }
  const params = new URLSearchParams(window.location.search);
  const tag = (name: string) => params.get(name)?.trim().slice(0, 100) || null;
  return {
    entry: true,
    referrer_host: host,
    utm_source: tag("utm_source"),
    utm_medium: tag("utm_medium"),
    utm_campaign: tag("utm_campaign"),
  };
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

  const row = {
    event_type: input.eventType,
    path: input.path ?? null,
    locale: input.locale ?? null,
    user_id: input.userId ?? null,
    visitor_id: visitorId,
    country: getCountry(),
    device: getDeviceType(),
  };
  const source = input.eventType === "page_view" ? takeEntrySource() : null;

  const supabase = createClient();
  void supabase
    .from("usage_events")
    .insert(source ? { ...row, ...source } : row)
    .then(async ({ error }) => {
      // A database without migration 0012 rejects the source columns; keep the
      // page view itself rather than lose it.
      if (error && source) ({ error } = await supabase.from("usage_events").insert(row));
      if (error && process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.debug("usage track failed:", error.message);
      }
    });
}
