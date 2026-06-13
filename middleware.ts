import { i18nRouter } from "next-i18n-router";
import { NextRequest } from "next/server";
import i18nConfig from "./i18nConfig";
import { refreshSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // i18nRouter decides locale redirect/rewrite and owns the response object.
  const response = i18nRouter(request, i18nConfig);

  // Attach refreshed Supabase auth cookies to that same response.
  await refreshSession(request, response);

  return response;
}

export const config = {
  // Exclude api, auth (OAuth callback), static assets and _next.
  matcher: "/((?!api|auth|static|.*\\..*|_next).*)",
};
