const STORAGE_KEY = "tt_visitor_id";

/**
 * Returns a stable per-browser visitor id, creating one on first use.
 * Returns "" when localStorage is unavailable (SSR / privacy mode).
 */
export function getVisitorId(): string {
  if (typeof window === "undefined" || !window.localStorage) return "";
  try {
    let id = window.localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `v_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}
