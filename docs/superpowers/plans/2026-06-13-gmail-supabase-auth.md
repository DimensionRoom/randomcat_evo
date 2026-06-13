# Gmail/Supabase Authentication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Google sign-in via Supabase (cookie-based sessions) and let signed-in users save/load their own brainstorming board work.

**Architecture:** `@supabase/ssr` provides a browser client (for client components) and a server client (for the OAuth callback route and middleware). Auth cookies are refreshed in the existing i18n middleware. An `AuthProvider` exposes auth state to client components. Board work persists to a `board_projects` table guarded by Row Level Security.

**Tech Stack:** Next.js 14.2.4 (App Router), `@supabase/supabase-js`, `@supabase/ssr`, TypeScript, existing `next-i18n-router` middleware and `ToastContext`.

> **Testing note:** This project has **no test runner** (no `test` script, no framework). Per the design, verification per task is: (a) `npm run build` compiles with no *new* errors — baseline is **128** pre-existing `document is not defined` prerender warnings, which must not increase — and (b) manual checks where noted. Do **not** add a test framework; it is out of scope.

> **Branch:** Work on a feature branch off `dev` (e.g. `feat/supabase-auth`). Commit after each task.

---

## File Structure

**Create:**
- `lib/supabase/config.ts` — env presence helper (`isSupabaseConfigured`, url/key getters)
- `lib/supabase/client.ts` — browser client factory
- `lib/supabase/server.ts` — server client factory (cookies)
- `lib/supabase/middleware.ts` — `updateSession` cookie-refresh helper
- `lib/supabase/boardProjects.ts` — typed save/load/list/delete over `board_projects`
- `contexts/AuthContext.tsx` — `AuthProvider` + `useAuth`
- `components/Auth/AuthButton.tsx` — sign in / avatar+sign out control for the nav bar
- `app/auth/callback/route.ts` — OAuth code→session exchange
- `app/[locale]/login/page.tsx` — minimal login page
- `supabase/migrations/0001_auth_and_board_projects.sql` — DDL + RLS + trigger (user runs in Supabase)

**Modify:**
- `package.json` — add two dependencies
- `middleware.ts` — chain Supabase session refresh + exclude `auth` path
- `app/[locale]/layout.tsx` — mount `AuthProvider`
- `components/NavigationBar/MainNavigationTopBar.tsx` — render `AuthButton`
- `components/BoardPage/BoardPage.tsx` — add `tool` prop + Save/My-Projects UI
- `app/[locale]/onlinetools/businessandinnovation/pitchingdesign/board/page.tsx` — pass `tool`
- `app/[locale]/onlinetools/businessandinnovation/gamificationinbusiness/board/page.tsx` — pass `tool`

---

## Task 1: Install dependencies and env scaffolding

**Files:**
- Modify: `package.json` (via npm)
- Create: `.env.local` (git-ignored)

- [ ] **Step 1: Install packages**

Run:
```bash
npm install @supabase/supabase-js @supabase/ssr
```
Expected: both packages added to `package.json` dependencies, no peer-dep errors.

- [ ] **Step 2: Create `.env.local`**

Create `.env.local` (the anon key comes from the user; use a placeholder until provided):
```
NEXT_PUBLIC_SUPABASE_URL=https://zavwswetrdvaccjnrzuz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=REPLACE_WITH_ANON_KEY
```

- [ ] **Step 3: Confirm `.env.local` is ignored**

Run: `git check-ignore .env.local`
Expected: prints `.env.local` (already covered by the `.env*` rules in `.gitignore`).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: add supabase-js and supabase/ssr deps"
```

---

## Task 2: Supabase config helper

**Files:**
- Create: `lib/supabase/config.ts`

- [ ] **Step 1: Write the config helper**

Create `lib/supabase/config.ts`:
```ts
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * True only when both env vars are present and not the placeholder. Used to
 * short-circuit auth UI/clients so a missing config shows a friendly state
 * instead of throwing.
 */
export const isSupabaseConfigured =
  SUPABASE_URL.startsWith("http") &&
  SUPABASE_ANON_KEY.length > 0 &&
  SUPABASE_ANON_KEY !== "REPLACE_WITH_ANON_KEY";
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile"`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add lib/supabase/config.ts
git commit -m "feat(auth): add supabase config helper"
```

---

## Task 3: Browser and server Supabase clients

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`

- [ ] **Step 1: Browser client**

Create `lib/supabase/client.ts`:
```ts
import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
```

- [ ] **Step 2: Server client**

Create `lib/supabase/server.ts`. Note: on Next 14.2.4 `cookies()` is synchronous.
```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component where cookies are read-only.
          // Middleware refreshes the session, so this is safe to ignore.
        }
      },
    },
  });
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add lib/supabase/client.ts lib/supabase/server.ts
git commit -m "feat(auth): add supabase browser and server clients"
```

---

## Task 4: Middleware session refresh

**Files:**
- Create: `lib/supabase/middleware.ts`
- Modify: `middleware.ts`

- [ ] **Step 1: Add the updateSession helper**

Create `lib/supabase/middleware.ts`:
```ts
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
```

- [ ] **Step 2: Chain it into the existing middleware**

Replace the entire contents of `middleware.ts` with:
```ts
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
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Verify no new prerender regressions**

Run: `npm run build 2>&1 | grep -ciE "document is not defined"`
Expected: `128` (unchanged baseline).

- [ ] **Step 5: Commit**

```bash
git add lib/supabase/middleware.ts middleware.ts
git commit -m "feat(auth): refresh supabase session in middleware"
```

---

## Task 5: OAuth callback route

**Files:**
- Create: `app/auth/callback/route.ts`

- [ ] **Step 1: Write the callback handler**

Create `app/auth/callback/route.ts`:
```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/en/login?error=auth`);
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add app/auth/callback/route.ts
git commit -m "feat(auth): add oauth callback route"
```

---

## Task 6: Auth context provider

**Files:**
- Create: `contexts/AuthContext.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Write the AuthProvider**

Create `contexts/AuthContext.tsx`:
```tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  // One client instance for the provider's lifetime.
  const supabase = useMemo(
    () => (isSupabaseConfigured ? createClient() : null),
    []
  );

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const signInWithGoogle = async () => {
    if (!supabase) return;
    const next = window.location.pathname;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        configured: isSupabaseConfigured,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
```

- [ ] **Step 2: Mount AuthProvider in the layout**

In `app/[locale]/layout.tsx`, add the import near the other context import:
```tsx
import { AuthProvider } from "@/contexts/AuthContext";
```
Then wrap the children: change
```tsx
        <ToastProvider>
        {/* <MainNavigationTopBar ... /> */}
        {children}
        </ToastProvider>
```
to
```tsx
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
```
(Keep the commented-out `MainNavigationTopBar` block exactly as it was; only the children wrapping changes.)

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add contexts/AuthContext.tsx "app/[locale]/layout.tsx"
git commit -m "feat(auth): add AuthProvider and mount in layout"
```

---

## Task 7: Auth button + login page

**Files:**
- Create: `components/Auth/AuthButton.tsx`
- Create: `app/[locale]/login/page.tsx`
- Modify: `components/NavigationBar/MainNavigationTopBar.tsx`

- [ ] **Step 1: Write the AuthButton**

Create `components/Auth/AuthButton.tsx`:
```tsx
"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthButton() {
  const { user, loading, configured, signInWithGoogle, signOut } = useAuth();

  if (!configured) return null;
  if (loading) return null;

  if (!user) {
    return (
      <button
        type="button"
        onClick={signInWithGoogle}
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        Sign in with Google
      </button>
    );
  }

  const name =
    (user.user_metadata?.full_name as string) || user.email || "Account";
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {avatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar}
          alt=""
          width={28}
          height={28}
          style={{ borderRadius: "50%" }}
        />
      )}
      <span style={{ fontSize: 14, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {name}
      </span>
      <button
        type="button"
        onClick={signOut}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        Sign out
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Render AuthButton in the nav bar**

In `components/NavigationBar/MainNavigationTopBar.tsx`, add the import after the existing component imports:
```tsx
import AuthButton from "@/components/Auth/AuthButton";
```
Then render `<AuthButton />` in the top bar's right-hand controls, next to the language flags (place it immediately before or after the `THFlag`/`ENFlag` controls in the returned JSX). Use the existing container/markup style of the nav — wrap as needed so it sits inline with the flags.

- [ ] **Step 3: Write the login page**

Create `app/[locale]/login/page.tsx`:
```tsx
"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export default function LoginPage() {
  const { user, configured, signInWithGoogle } = useAuth();
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      showToast("Sign-in failed. Please try again.", "error");
    }
  }, [searchParams, showToast]);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 24 }}>Sign in</h1>
      {!configured ? (
        <p>Authentication is not configured yet.</p>
      ) : user ? (
        <p>You are signed in as {user.email}.</p>
      ) : (
        <button
          type="button"
          onClick={signInWithGoogle}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          Sign in with Google
        </button>
      )}
    </main>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add components/Auth/AuthButton.tsx "app/[locale]/login/page.tsx" components/NavigationBar/MainNavigationTopBar.tsx
git commit -m "feat(auth): add sign-in button and login page"
```

---

## Task 8: Database migration (user runs in Supabase)

**Files:**
- Create: `supabase/migrations/0001_auth_and_board_projects.sql`

- [ ] **Step 1: Write the migration SQL**

Create `supabase/migrations/0001_auth_and_board_projects.sql`:
```sql
-- Profiles: one row per auth user, auto-created on signup.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Board projects: per-user saved board work.
create table if not exists public.board_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tool text not null,
  title text not null,
  board_cards jsonb not null default '[]'::jsonb,
  text_annotations jsonb not null default '[]'::jsonb,
  brainstorm_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists board_projects_user_tool_idx
  on public.board_projects (user_id, tool);

alter table public.board_projects enable row level security;

create policy "Board projects are selectable by owner"
  on public.board_projects for select
  using (auth.uid() = user_id);

create policy "Board projects are insertable by owner"
  on public.board_projects for insert
  with check (auth.uid() = user_id);

create policy "Board projects are updatable by owner"
  on public.board_projects for update
  using (auth.uid() = user_id);

create policy "Board projects are deletable by owner"
  on public.board_projects for delete
  using (auth.uid() = user_id);
```

- [ ] **Step 2: User runs the migration**

In the Supabase dashboard → SQL editor → paste the file contents → Run.
Expected: "Success. No rows returned." Confirm `profiles` and `board_projects`
appear under Table editor with RLS enabled.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/0001_auth_and_board_projects.sql
git commit -m "feat(auth): add profiles and board_projects schema with RLS"
```

---

## Task 9: Board projects persistence layer

**Files:**
- Create: `lib/supabase/boardProjects.ts`

- [ ] **Step 1: Write the persistence functions**

Create `lib/supabase/boardProjects.ts`:
```ts
import { createClient } from "./client";
import type {
  BoardCard,
  TextAnnotation,
} from "@/components/CanvasBoard/types/Card";

export interface BoardProject {
  id: string;
  user_id: string;
  tool: string;
  title: string;
  board_cards: BoardCard[];
  text_annotations: TextAnnotation[];
  brainstorm_notes: string;
  created_at: string;
  updated_at: string;
}

export interface BoardProjectSummary {
  id: string;
  title: string;
  updated_at: string;
}

export interface SaveProjectInput {
  id?: string;
  tool: string;
  title: string;
  boardCards: BoardCard[];
  textAnnotations: TextAnnotation[];
  brainstormNotes: string;
}

export async function saveProject(
  input: SaveProjectInput
): Promise<BoardProject> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error("Not signed in");

  const row = {
    ...(input.id ? { id: input.id } : {}),
    user_id: userId,
    tool: input.tool,
    title: input.title,
    board_cards: input.boardCards,
    text_annotations: input.textAnnotations,
    brainstorm_notes: input.brainstormNotes,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("board_projects")
    .upsert(row)
    .select()
    .single();

  if (error) throw error;
  return data as BoardProject;
}

export async function listProjects(
  tool: string
): Promise<BoardProjectSummary[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("board_projects")
    .select("id,title,updated_at")
    .eq("tool", tool)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as BoardProjectSummary[];
}

export async function loadProject(id: string): Promise<BoardProject> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("board_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as BoardProject;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("board_projects").delete().eq("id", id);
  if (error) throw error;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add lib/supabase/boardProjects.ts
git commit -m "feat(auth): add board_projects persistence layer"
```

---

## Task 10: Save/Load UI in BoardPage + wire tool slug

**Files:**
- Modify: `components/BoardPage/BoardPage.tsx`
- Modify: `app/[locale]/onlinetools/businessandinnovation/pitchingdesign/board/page.tsx`
- Modify: `app/[locale]/onlinetools/businessandinnovation/gamificationinbusiness/board/page.tsx`

- [ ] **Step 1: Add `tool` to BoardPageProps**

In `components/BoardPage/BoardPage.tsx`, update the interface:
```tsx
interface BoardPageProps {
  locale: string;
  cards: Card[];
  cardCategories: Record<string, { name: string; color: string; icon: string }>;
  title: string;
  tool: string;
}
```
And destructure it in the component signature:
```tsx
export default function BoardPage({
  locale,
  cards,
  cardCategories,
  title,
  tool,
}: BoardPageProps) {
```

- [ ] **Step 2: Add imports and persistence state**

In `components/BoardPage/BoardPage.tsx`, add these imports below the existing ones:
```tsx
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import {
  saveProject,
  listProjects,
  loadProject,
  type BoardProjectSummary,
} from "@/lib/supabase/boardProjects";
```
Add this state and hooks inside the component, next to the other `useState` calls:
```tsx
  const { user, configured, signInWithGoogle } = useAuth();
  const { showToast } = useToast();
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState<BoardProjectSummary[]>([]);
  const [showProjects, setShowProjects] = useState(false);
```

- [ ] **Step 3: Add save / load / refresh-list handlers**

In `components/BoardPage/BoardPage.tsx`, add these `useCallback` handlers next to the other handlers:
```tsx
  const handleSaveProject = useCallback(async () => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    const projectName = window.prompt("Project name:", title)?.trim() || "";
    if (!projectName) return;
    try {
      const saved = await saveProject({
        id: currentProjectId ?? undefined,
        tool,
        title: projectName,
        boardCards,
        textAnnotations,
        brainstormNotes,
      });
      setCurrentProjectId(saved.id);
      showToast("Project saved", "success");
    } catch (e) {
      showToast("Could not save project", "error");
    }
  }, [
    user,
    signInWithGoogle,
    title,
    currentProjectId,
    tool,
    boardCards,
    textAnnotations,
    brainstormNotes,
    showToast,
  ]);

  const handleOpenProjects = useCallback(async () => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    try {
      const list = await listProjects(tool);
      setSavedProjects(list);
      setShowProjects(true);
    } catch (e) {
      showToast("Could not load your projects", "error");
    }
  }, [user, signInWithGoogle, tool, showToast]);

  const handleLoadProject = useCallback(
    async (id: string) => {
      try {
        const project = await loadProject(id);
        setBoardCards(project.board_cards ?? []);
        setTextAnnotations(project.text_annotations ?? []);
        setBrainstormNotes(project.brainstorm_notes ?? "");
        setCurrentProjectId(project.id);
        setShowProjects(false);
        showToast(`Loaded "${project.title}"`, "success");
      } catch (e) {
        showToast("Could not open that project", "error");
      }
    },
    [showToast]
  );
```

- [ ] **Step 4: Render the Save / My Projects controls**

In `components/BoardPage/BoardPage.tsx`, inside the returned JSX, add a toolbar right after the opening `<div className={styles.notesHeaderWrapper}>` that contains the `Creative Board` heading (i.e. just below the `<p className={styles.subtext}>Drag cards ...</p>`). Insert:
```tsx
            {configured && (
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={handleSaveProject}
                  style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 13 }}
                >
                  {user ? "Save" : "Sign in to save"}
                </button>
                {user && (
                  <button
                    type="button"
                    onClick={handleOpenProjects}
                    style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 13 }}
                  >
                    My Projects
                  </button>
                )}
              </div>
            )}
            {showProjects && (
              <div style={{ marginTop: 8, border: "1px solid #eee", borderRadius: 8, padding: 8, maxHeight: 200, overflow: "auto" }}>
                {savedProjects.length === 0 ? (
                  <p style={{ fontSize: 13, color: "#666" }}>No saved projects yet.</p>
                ) : (
                  savedProjects.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleLoadProject(p.id)}
                      style={{ display: "block", width: "100%", textAlign: "left", padding: "6px 8px", border: "none", background: "transparent", cursor: "pointer", fontSize: 13 }}
                    >
                      {p.title}
                    </button>
                  ))
                )}
              </div>
            )}
```

- [ ] **Step 5: Pass `tool` from the board route wrappers**

In `app/[locale]/onlinetools/businessandinnovation/pitchingdesign/board/page.tsx`, add `tool="pitchingdesign"` to the `<BoardPage ... />` props:
```tsx
    <BoardPage
      locale={locale}
      cards={cards}
      cardCategories={cardCategories}
      title="Pitching Design"
      tool="pitchingdesign"
    />
```
In `app/[locale]/onlinetools/businessandinnovation/gamificationinbusiness/board/page.tsx`, add `tool="gamificationinbusiness"` to its `<BoardPage ... />` props the same way (keep its existing `title`/`cards`/`cardCategories`).

- [ ] **Step 6: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 7: Verify no new prerender regressions**

Run: `npm run build 2>&1 | grep -ciE "document is not defined"`
Expected: `128`.

- [ ] **Step 8: Commit**

```bash
git add components/BoardPage/BoardPage.tsx "app/[locale]/onlinetools/businessandinnovation/pitchingdesign/board/page.tsx" "app/[locale]/onlinetools/businessandinnovation/gamificationinbusiness/board/page.tsx"
git commit -m "feat(auth): save/load board projects per user"
```

---

## Task 11: End-to-end manual verification

**Prerequisites:** User-side setup complete (Google OAuth client created, Google
provider enabled in Supabase, Site/redirect URLs set, migration run, real anon
key in `.env.local`).

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Open: `http://localhost:3000`

- [ ] **Step 2: Sign-in flow**

Click "Sign in with Google" in the nav → complete Google consent → land back on
the app. Expected: nav shows avatar + name; no console errors about Supabase.

- [ ] **Step 3: Save flow**

Open a board tool (e.g. `/en/onlinetools/businessandinnovation/pitchingdesign/board`),
drag a few cards, type a note, click **Save**, enter a name. Expected: "Project
saved" toast.

- [ ] **Step 4: Load flow**

Reload the page → click **My Projects** → click the saved project. Expected:
board cards, annotations, and notes are restored; "Loaded ..." toast.

- [ ] **Step 5: RLS isolation**

Sign out, sign in with a *different* Google account, open **My Projects** on the
same tool. Expected: the first account's project is NOT listed.

- [ ] **Step 6: Sign out**

Click **Sign out**. Expected: nav reverts to "Sign in with Google"; board Save
button reverts to "Sign in to save".

---

## Self-Review Notes

- **Spec coverage:** packages/env (Task 1–2), clients (Task 3), middleware chain
  + auth exclusion (Task 4), callback (Task 5), AuthProvider + layout (Task 6),
  nav button + login page (Task 7), DB schema/RLS/trigger (Task 8), persistence
  layer (Task 9), BoardPage save/load + tool wiring (Task 10), verification
  (Task 11). All design sections map to a task.
- **Type consistency:** `BoardProject` / `BoardProjectSummary` / `SaveProjectInput`
  defined in Task 9 are the exact names imported in Task 10. `useAuth()` shape
  (`user`, `loading`, `configured`, `signInWithGoogle`, `signOut`) defined in
  Task 6 matches usage in Tasks 7 and 10. `createClient` names: server version
  used in Tasks 4–5 (callback/middleware), browser version in Tasks 6, 9.
- **No test framework:** verification is `npm run build` + the 128 baseline +
  manual E2E, by design.
