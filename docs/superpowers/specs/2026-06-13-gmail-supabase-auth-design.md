# Gmail (Google) Authentication with Supabase — Phase 1 Design

**Date:** 2026-06-13
**Status:** Approved (design), pending spec review
**Scope:** Phase 1 only — authentication + per-user save/load of board work.
Deferred to later phases: free/paid module gating, public showcase, stats dashboard.

## Goal

Let users sign in with their Google account, then save and reload their own
brainstorming board work (cards, text annotations, notes). Establish a
cookie-based auth foundation that future server-side gating (free vs paid
modules) can build on without a rewrite.

## Non-Goals (Phase 1)

- No free/paid tier gating or paywall logic.
- No public showcase of user work.
- No replacement of the existing mock real-time `useCollaboration` hook — it
  stays as-is; persistence is a separate, additive layer.
- No email/password or other social providers — Google only.

## Approach

**Chosen: `@supabase/ssr` (cookie-based sessions).** Sessions live in cookies so
they are readable on the server (route handlers, server components, middleware).
This is required for the deferred server-side free/paid gating. Rejected
alternative: `@supabase/supabase-js` client-only with localStorage sessions —
simpler but has no server session, forcing a refactor when gating arrives.

## Architecture

### Packages & configuration

- Add dependencies: `@supabase/supabase-js`, `@supabase/ssr`.
- `.env.local` (git-ignored; repo already ignores `.env*`):
  - `NEXT_PUBLIC_SUPABASE_URL=https://zavwswetrdvaccjnrzuz.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<provided by user>`
- If env vars are missing, the Supabase client factories return a guarded state
  so the app shows a friendly "auth not configured" message instead of crashing.

### Supabase clients — `lib/supabase/`

- `client.ts` — `createBrowserClient(...)` for use inside client components.
- `server.ts` — `createServerClient(...)` that reads/writes Next.js cookies; for
  route handlers and any server component.
- `middleware.ts` — `updateSession(request)` helper that refreshes the auth
  cookie and returns a `NextResponse` carrying updated cookies.

### Middleware integration — `middleware.ts`

The existing middleware runs `i18nRouter` only. New behavior, in order:

1. Run `updateSession(request)` to refresh Supabase auth cookies.
2. Delegate routing to `i18nRouter(request, i18nConfig)`.
3. Ensure any auth cookies set in step 1 are copied onto the response that
   `i18nRouter` returns (redirect or pass-through), so the refreshed session is
   not lost.
4. Update the `matcher` to also exclude `auth` (the OAuth callback path) so the
   i18n router does not prepend a locale to `/auth/callback`.

### OAuth callback — `app/auth/callback/route.ts`

A route handler (outside `[locale]`) that:

- Reads `code` from the query string.
- Calls `supabase.auth.exchangeCodeForSession(code)` using the server client.
- Redirects to the `next` query param (default `/`) on success.
- On error, redirects to `/login?error=<reason>`.

The OAuth `redirectTo` sent to Google/Supabase is `<origin>/auth/callback?next=<path>`.

### Auth state & UI

- `contexts/AuthContext.tsx` — `AuthProvider` exposes
  `{ user, loading, signInWithGoogle, signOut }`. It hydrates the user via the
  browser client (`getUser`) and subscribes to `onAuthStateChange`. Mounted in
  `app/[locale]/layout.tsx` inside the existing `ToastProvider` (mirrors the
  existing context pattern).
  - `signInWithGoogle()` calls
    `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })`.
  - `signOut()` calls `supabase.auth.signOut()`.
- `components/NavigationBar/MainNavigationTopBar.tsx` — add an auth control:
  - Logged out: "Sign in with Google" button.
  - Logged in: avatar + name with a "Sign out" action.
- `app/[locale]/login/page.tsx` — a minimal page with the Google sign-in button,
  reachable by direct link and used to show OAuth `error` messages via toast.

### Database (run by user in Supabase SQL editor)

`profiles`
- `id uuid primary key references auth.users(id) on delete cascade`
- `email text`
- `full_name text`
- `avatar_url text`
- `created_at timestamptz not null default now()`
- Auto-populated on signup by trigger `handle_new_user` on `auth.users`.

`board_projects`
- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `tool text not null` — tool slug, e.g. `pitchingdesign`, `gamificationinbusiness`
- `title text not null`
- `board_cards jsonb not null default '[]'`
- `text_annotations jsonb not null default '[]'`
- `brainstorm_notes text not null default ''`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

**Row Level Security:** enabled on both tables.
- `profiles`: a user may `select`/`update` only the row where `id = auth.uid()`.
- `board_projects`: a user may `select`/`insert`/`update`/`delete` only rows
  where `user_id = auth.uid()`.

The complete SQL (table DDL, RLS policies, trigger) ships as a copy-paste block
in the implementation plan.

### Persistence layer — `lib/supabase/boardProjects.ts`

Typed functions over `board_projects`, reusing the existing `BoardCard` and
`TextAnnotation` types from `components/CanvasBoard/types/Card.ts`:

- `saveProject(input): Promise<BoardProject>` — insert or update by id.
- `listProjects(tool): Promise<BoardProjectSummary[]>` — current user's projects
  for a given tool (id, title, updated_at).
- `loadProject(id): Promise<BoardProject>` — full row.
- `deleteProject(id): Promise<void>`.

RLS enforces ownership; these functions do not filter by user_id themselves
beyond what RLS guarantees.

### Save/Load in BoardPage — `components/BoardPage/BoardPage.tsx`

- Add a **Save** control: prompts for a title (or reuses the loaded project's
  title), then upserts current `boardCards` / `textAnnotations` / `brainstormNotes`
  for the page's `tool`.
- Add a **My Projects** panel/modal: lists the signed-in user's projects for the
  current tool; selecting one loads it into the existing component state.
- When signed out, these controls show "Sign in to save" and route to sign-in.
- `tool` slug is passed into `BoardPage` (new prop) by each board route wrapper
  (e.g. `pitchingdesign/board/page.tsx`).

## Data Flow

1. User clicks **Sign in** → `signInWithOAuth` → Google consent screen.
2. Google redirects to `/auth/callback?code=...` → route handler exchanges the
   code for a session and sets auth cookies → redirects back.
3. Middleware refreshes the session cookie on each subsequent request.
4. Client components read the user through `AuthProvider`.
5. **Save:** client calls `boardProjects.saveProject(...)` → Supabase insert/update
   (RLS enforces ownership).
6. **Load:** `listProjects(tool)` → user picks one → `loadProject(id)` →
   `BoardPage` sets its state.

## Error Handling

- OAuth failure → callback redirects to `/login?error=...`; login page surfaces
  it via the existing `ToastContext`.
- Save/load/delete failure → toast with a readable message; board state is left
  unchanged.
- Missing Supabase env vars → guarded client returns "not configured"; UI hides
  auth controls and shows a friendly notice rather than throwing.

## Testing / Verification

The project has no test runner (no `test` script, no framework). Verification is:

1. `npm run build` compiles with no new errors (baseline: 128 pre-existing
   `document is not defined` prerender warnings — must not increase).
2. Manual end-to-end flow on `localhost:3000`:
   - Sign in with Google → redirected back, nav shows avatar/name.
   - Drag cards + type notes → **Save** with a title.
   - Reload page → open **My Projects** → load the saved project → board restores.
   - **Sign out** → controls revert to "Sign in".
   - Confirm a second Google account cannot see the first account's projects
     (RLS check).

## User-Side Setup Checklist (blocker — cannot be done from code)

1. **Google Cloud Console** → create OAuth 2.0 Client ID (type: Web application).
   - Authorized redirect URI: `https://zavwswetrdvaccjnrzuz.supabase.co/auth/v1/callback`
   - Authorized JavaScript origins: `http://localhost:3000` (+ production domain).
2. **Supabase → Authentication → Providers → Google** → enable; paste the OAuth
   Client ID + Secret.
3. **Supabase → Authentication → URL Configuration** → Site URL
   `http://localhost:3000` (+ prod); add redirect URL `http://localhost:3000/auth/callback`
   (+ prod equivalent).
4. **Supabase → SQL editor** → run the migration (tables, RLS, trigger) from the
   implementation plan.
5. Send the project **anon (publishable) key** so it can be placed in `.env.local`.
