# Usage Logging — Design

**Date:** 2026-06-13
**Status:** Approved (design), pending spec review
**Scope:** Phase 2a — record usage events (page views + sign-ins) to Supabase for
internal statistics. Builds on the Phase 1 Supabase auth foundation.

## Goal

Record who uses the site and which pages they visit, so we can answer:
- Daily / per-page view counts.
- Logged-in vs anonymous traffic.
- Per-user behavior (which pages a signed-in user visits).

## Non-Goals

- No in-app analytics dashboard UI (data is read in the Supabase Table editor /
  SQL editor for now). A dashboard is a later phase.
- No IP address or user-agent capture (privacy-friendly by choice).
- No replacement of the existing GTM / react-ga4 analytics; this is an
  independent, self-owned event log.

## Approach

**Chosen: client-side logging via a browser-client hook.** A `PageTracker`
component fires a `page_view` event on every route change using the Supabase
browser client (anon key). Sign-ins are logged from the existing `AuthContext`.
Anonymous visitors are identified by a UUID stored in `localStorage`.

Rejected: middleware logging (adds latency to every request, no localStorage
access, counts prefetches/assets) and an API-route + service-role approach
(introduces a powerful secret to manage). The client-side approach is simplest,
has user/anonymous context already, and needs no new secret. Spam risk from a
public INSERT policy is acceptable for internal stats and can be hardened later.

## Architecture

### Database — `supabase/migrations/0002_usage_events.sql`

`usage_events`
- `id uuid primary key default gen_random_uuid()`
- `event_type text not null check (event_type in ('page_view', 'sign_in'))`
- `path text`
- `locale text`
- `user_id uuid references auth.users (id) on delete set null` — null = anonymous
- `visitor_id text not null` — UUID from localStorage
- `created_at timestamptz not null default now()`
- Indexes: `created_at`, `path`, `user_id`.

**Row Level Security:** enabled.
- INSERT policy for `anon` and `authenticated` roles, with check:
  `(auth.uid() is null and user_id is null) or (auth.uid() = user_id)`
  — anonymous rows must have a null `user_id`; signed-in rows must carry the
  caller's own id (no spoofing another user).
- No SELECT policy → only the service role (Supabase dashboard/SQL editor) can
  read the data; the public cannot read others' events.

**Reporting views** (read via service role):
- `usage_daily` — `day`, `views`, `unique_visitors`, `unique_users` grouped by
  `date_trunc('day', created_at)` over `page_view` rows.
- `usage_by_path` — `path`, `views`, `logged_in_views`, `anon_views` grouped by
  `path` over `page_view` rows.

### Client tracking — `lib/analytics/`

- `visitor.ts` — `getVisitorId(): string`. Reads `localStorage["tt_visitor_id"]`;
  if absent, generates `crypto.randomUUID()`, stores, and returns it. Returns an
  empty string if `window`/`localStorage` is unavailable (SSR guard).
- `track.ts` — `trackEvent(input: { eventType: 'page_view' | 'sign_in'; path?: string; locale?: string; userId?: string | null }): void`.
  - No-op when `!isSupabaseConfigured` or when running on the server.
  - Reads `getVisitorId()`, inserts one row via the Supabase browser client.
  - Fire-and-forget: the insert promise's errors are caught and swallowed
    (logging must never break the UX).

### Page-view tracking — `components/Analytics/PageTracker.tsx`

- Client component that renders `null`.
- Reads `usePathname()` (full path incl. locale), `useAuth().user`.
- On every pathname change (a `useEffect` keyed on pathname), calls
  `trackEvent({ eventType: 'page_view', path, locale, userId: user?.id ?? null })`.
- Derives `locale` from the first path segment.
- Mounted in `app/[locale]/layout.tsx` **inside** `AuthProvider`, so the current
  user (if any) is known.

### Sign-in tracking — `contexts/AuthContext.tsx`

- In the existing `onAuthStateChange` handler, when the event is `'SIGNED_IN'`,
  call `trackEvent({ eventType: 'sign_in', userId: session?.user?.id ?? null })`.
- Only the `'SIGNED_IN'` event triggers it (not `TOKEN_REFRESHED` etc.), so a
  page refresh does not double-count. (A duplicate on tab refocus is acceptable
  and does not affect the headline metrics.)

## Data Flow

1. App load / route change → `PageTracker` effect → `trackEvent('page_view')` →
   `usage_events` insert (anon key, RLS-checked).
2. Successful Google sign-in → `AuthContext` `SIGNED_IN` → `trackEvent('sign_in')`.
3. Owner reads `usage_daily` / `usage_by_path` in the Supabase SQL editor.

## Error Handling

- All inserts are fire-and-forget with a `.catch()` that swallows errors; no
  tracking failure can throw into the UI.
- SSR / missing-config / missing-`localStorage` paths short-circuit to a no-op.

## Testing / Verification

No test runner (by project convention). Verification:
1. `npm run build` compiles with no new errors (baseline: 128 pre-existing
   `document is not defined` prerender warnings — must not increase).
2. Manual:
   - While signed out, navigate several pages → `usage_events` gains
     `page_view` rows with `user_id` null and a stable `visitor_id`.
   - Sign in → one `sign_in` row appears; subsequent `page_view` rows carry the
     `user_id`.
   - `select * from usage_daily;` and `select * from usage_by_path;` return
     sensible counts.

## User-Side Setup

Run `supabase/migrations/0002_usage_events.sql` in the Supabase SQL editor
(table, RLS policies, two views). No Google/OAuth changes needed.
