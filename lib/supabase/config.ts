export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Server-only. Never expose to the client (no NEXT_PUBLIC_ prefix).
export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * True only when both env vars are present and not the placeholder. Used to
 * short-circuit auth UI/clients so a missing config shows a friendly state
 * instead of throwing.
 */
export const isSupabaseConfigured =
  SUPABASE_URL.startsWith("http") &&
  SUPABASE_ANON_KEY.length > 0 &&
  SUPABASE_ANON_KEY !== "REPLACE_WITH_ANON_KEY";
