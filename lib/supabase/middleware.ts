import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/**
 * Refreshes the Supabase auth session and writes any refreshed cookies onto the
 * given response. Call AFTER i18nRouter has produced the response, so the auth
 * cookies ride along with whatever it returns (redirect or pass-through).
 */
export async function refreshSession(
  request: NextRequest,
  response: NextResponse
): Promise<void> {
  if (!isSupabaseConfigured) return;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: getUser() triggers token refresh and the setAll callback above.
  await supabase.auth.getUser();
}
