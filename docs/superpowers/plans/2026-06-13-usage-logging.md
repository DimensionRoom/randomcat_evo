# Usage Logging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Record `page_view` and `sign_in` events to a Supabase `usage_events` table (logged-in and anonymous) for internal statistics.

**Architecture:** A client `PageTracker` component fires a `page_view` on every route change via the Supabase browser client; `AuthContext` fires a `sign_in` on the `SIGNED_IN` auth event. Anonymous visitors are identified by a `localStorage` UUID. RLS allows inserts but blocks public reads; the owner reads two reporting views in Supabase.

**Tech Stack:** Next.js 14.2.4 (App Router), `@supabase/ssr` browser client, TypeScript. Reuses Phase 1 `lib/supabase/client.ts`, `lib/supabase/config.ts`, and `contexts/AuthContext.tsx`.

> **Testing note:** This project has **no test runner**. Per the spec, verification per task is: (a) `npm run build` compiles with no *new* errors — baseline is **128** pre-existing `document is not defined` prerender warnings, which must not increase — and (b) manual checks where noted. Do **not** add a test framework.

> **Branch:** Work on a feature branch off `dev` (e.g. `feat/usage-logging`). Commit after each task.

---

## File Structure

**Create:**
- `lib/analytics/visitor.ts` — localStorage visitor-id getter
- `lib/analytics/track.ts` — `trackEvent` fire-and-forget insert
- `components/Analytics/PageTracker.tsx` — route-change page-view emitter
- `supabase/migrations/0002_usage_events.sql` — table + RLS + reporting views

**Modify:**
- `app/[locale]/layout.tsx` — mount `<PageTracker />` inside `AuthProvider`
- `contexts/AuthContext.tsx` — fire `sign_in` on `SIGNED_IN`

---

## Task 1: Visitor id helper

**Files:**
- Create: `lib/analytics/visitor.ts`

- [ ] **Step 1: Write the helper**

Create `lib/analytics/visitor.ts`:
```ts
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
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add lib/analytics/visitor.ts
git commit -m "feat(analytics): add localStorage visitor id helper"
```

---

## Task 2: trackEvent

**Files:**
- Create: `lib/analytics/track.ts`

- [ ] **Step 1: Write trackEvent**

Create `lib/analytics/track.ts`:
```ts
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getVisitorId } from "./visitor";

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
    })
    .then(({ error }) => {
      if (error && process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.debug("usage track failed:", error.message);
      }
    });
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add lib/analytics/track.ts
git commit -m "feat(analytics): add fire-and-forget trackEvent"
```

---

## Task 3: PageTracker component

**Files:**
- Create: `components/Analytics/PageTracker.tsx`

- [ ] **Step 1: Write the component**

Create `components/Analytics/PageTracker.tsx`:
```tsx
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
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add components/Analytics/PageTracker.tsx
git commit -m "feat(analytics): add PageTracker route-change emitter"
```

---

## Task 4: Mount PageTracker in the layout

**Files:**
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Add the import**

In `app/[locale]/layout.tsx`, add after the `AuthProvider` import line:
```tsx
import PageTracker from "@/components/Analytics/PageTracker";
```

- [ ] **Step 2: Render it inside AuthProvider**

Change:
```tsx
          <AuthProvider>{children}</AuthProvider>
```
to:
```tsx
          <AuthProvider>
            <PageTracker />
            {children}
          </AuthProvider>
```

- [ ] **Step 3: Verify build + baseline**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

Run: `npm run build 2>&1 | grep -ciE "document is not defined"`
Expected: `128`

- [ ] **Step 4: Commit**

```bash
git add "app/[locale]/layout.tsx"
git commit -m "feat(analytics): mount PageTracker in layout"
```

---

## Task 5: Sign-in event in AuthContext

**Files:**
- Modify: `contexts/AuthContext.tsx`

- [ ] **Step 1: Import trackEvent**

In `contexts/AuthContext.tsx`, add after the existing `@/lib/supabase/config` import:
```tsx
import { trackEvent } from "@/lib/analytics/track";
```

- [ ] **Step 2: Fire on SIGNED_IN**

In the `onAuthStateChange` callback, replace:
```tsx
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
```
with:
```tsx
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN") {
        trackEvent({ eventType: "sign_in", userId: session?.user?.id ?? null });
      }
    });
```

- [ ] **Step 3: Verify build + baseline**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

Run: `npm run build 2>&1 | grep -ciE "document is not defined"`
Expected: `128`

- [ ] **Step 4: Commit**

```bash
git add contexts/AuthContext.tsx
git commit -m "feat(analytics): log sign_in events"
```

---

## Task 6: Database migration (user runs in Supabase)

**Files:**
- Create: `supabase/migrations/0002_usage_events.sql`

- [ ] **Step 1: Write the migration SQL**

Create `supabase/migrations/0002_usage_events.sql`:
```sql
-- Usage events: page views and sign-ins, logged-in and anonymous.
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('page_view', 'sign_in')),
  path text,
  locale text,
  user_id uuid references auth.users (id) on delete set null,
  visitor_id text not null,
  created_at timestamptz not null default now()
);

create index if not exists usage_events_created_at_idx
  on public.usage_events (created_at);
create index if not exists usage_events_path_idx
  on public.usage_events (path);
create index if not exists usage_events_user_id_idx
  on public.usage_events (user_id);

alter table public.usage_events enable row level security;

-- Anyone (anon or authenticated) may INSERT, but a row's user_id must either be
-- null (anonymous) or equal the caller's own id (no spoofing).
create policy "Anyone can insert their own usage events"
  on public.usage_events for insert
  to anon, authenticated
  with check (
    (auth.uid() is null and user_id is null)
    or (auth.uid() = user_id)
  );

-- No SELECT policy: only the service role (Supabase dashboard) can read.

-- Reporting views (read via service role in the SQL editor).
create or replace view public.usage_daily as
select
  date_trunc('day', created_at) as day,
  count(*) as views,
  count(distinct visitor_id) as unique_visitors,
  count(distinct user_id) as unique_users
from public.usage_events
where event_type = 'page_view'
group by 1
order by 1 desc;

create or replace view public.usage_by_path as
select
  path,
  count(*) as views,
  count(*) filter (where user_id is not null) as logged_in_views,
  count(*) filter (where user_id is null) as anon_views
from public.usage_events
where event_type = 'page_view'
group by path
order by views desc;
```

- [ ] **Step 2: User runs the migration**

Supabase dashboard → SQL editor → paste the file contents → Run.
Expected: "Success. No rows returned." Confirm `usage_events` appears under Table
editor with RLS enabled, and `usage_daily` / `usage_by_path` under Database →
Views.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/0002_usage_events.sql
git commit -m "feat(analytics): add usage_events table, RLS, and reporting views"
```

---

## Task 7: End-to-end manual verification

**Prerequisite:** Task 6 migration run in Supabase; `.env.local` has the real
anon key (already set in Phase 1).

- [ ] **Step 1: Start dev server**

Run: `npm run dev` → open `http://localhost:3000/en`

- [ ] **Step 2: Anonymous page views**

While signed out, visit 3–4 different pages (home, a tool, login). In Supabase
→ Table editor → `usage_events`, expect `page_view` rows with `user_id` = null
and the same `visitor_id` across them.

- [ ] **Step 3: Sign-in + attributed views**

Sign in with Google. Expect one `sign_in` row (your `user_id`). Navigate a few
more pages; expect new `page_view` rows now carrying your `user_id` (same
`visitor_id` as before).

- [ ] **Step 4: Reporting views**

In the SQL editor run:
```sql
select * from usage_daily;
select * from usage_by_path;
```
Expect today's row in `usage_daily` with sensible `views` / `unique_visitors` /
`unique_users`, and per-path counts split into logged-in vs anon in
`usage_by_path`.

- [ ] **Step 5: Public cannot read**

Confirm the RLS read-block: a client `select` from `usage_events` (anon key)
returns zero rows even though inserts succeeded — only the service role reads.

---

## Self-Review Notes

- **Spec coverage:** schema + RLS + views (Task 6), visitor id (Task 1),
  trackEvent (Task 2), page-view tracking (Tasks 3–4), sign-in tracking
  (Task 5), verification incl. RLS read-block (Task 7). All spec sections map to
  a task.
- **Type consistency:** `TrackEventInput` (Task 2) field `eventType` with values
  `'page_view'`/`'sign_in'` is the exact shape called in Tasks 3 and 5.
  `getVisitorId()` (Task 1) is consumed in Task 2. Column names in Task 6
  (`event_type`, `path`, `locale`, `user_id`, `visitor_id`) match the insert
  payload in Task 2.
- **No test framework:** verification is `npm run build` + the 128 baseline +
  manual checks, by design.
