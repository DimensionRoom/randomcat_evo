import { i18nRouter } from "next-i18n-router";
import { NextRequest } from "next/server";
import i18nConfig from "./i18nConfig";
import { refreshSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // i18nRouter decides locale redirect/rewrite and owns the response object.
  const response = i18nRouter(request, i18nConfig);

  // Attach refreshed Supabase auth cookies to that same response.
  await refreshSession(request, response);

  // Surface Vercel's edge geolocation (ISO country code) to the client so the
  // analytics tracker can record it. Absent on localhost/non-Vercel -> skipped.
  const country = request.headers.get("x-vercel-ip-country");
  if (country) {
    response.cookies.set("tt_country", country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days; country rarely changes
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  // Exclude api, auth (OAuth callback), static assets and _next.
  matcher: "/((?!api|auth|static|.*\\..*|_next).*)",
};
