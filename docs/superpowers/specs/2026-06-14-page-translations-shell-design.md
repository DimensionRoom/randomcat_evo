# Shared i18n page setup (`useTranslations` + `PageShell`) — Design

**Date:** 2026-06-14
**Status:** Approved (design), pending spec review
**Scope:** Pilot — build the shared abstraction and migrate 3–5 representative
pages. Remaining ~35 pages roll out in a later phase.

## Context

~40 page components repeat the same client-side i18n boilerplate: three
`useState`s (`t`, `resources`, `loading`), a `useEffect` that calls
`initTranslations(locale, namespaces)`, a loading guard that renders a Lottie
animation, and a `<TranslationsProvider>` wrapper. `TranslationsProvider` is used
in 45 files. This duplication is the project's biggest consolidation
opportunity. Goal: collapse the boilerplate into a shared hook + component,
**keeping pages client-rendered with no behavior change** (SSR migration is out of
scope for this work).

## Approach

**Chosen: a `useTranslations` hook + a `<PageShell>` component.** The hook owns
the fetch/state; `PageShell` owns the loader + provider chrome. Pages keep using
`t` from the hook in the same component (no body extraction), so descendant
components still receive the i18next context through the provider exactly as
today.

Rejected: a render-prop `PageShell` (forces wrapping the whole body in a function
— large structural change per page) and a `withTranslations` HOC (more magic,
prop-drills `t`).

## Components

### 1. `hooks/useTranslations.ts`

```ts
import { useEffect, useState } from "react";
import initTranslations from "@/app/[locale]/i18n";

export function useTranslations(locale: string, namespaces: string[]) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);

  useEffect(() => {
    let active = true;
    initTranslations(locale, namespaces).then(({ t, resources }) => {
      if (!active) return;
      setT(() => t);
      setResources(resources);
    });
    return () => {
      active = false;
    };
    // namespaces is a stable module-level constant per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return { t, resources, ready: !!t };
}
```

Replaces the three `useState`s + `useEffect` in each page. (Note: `@/i18n`
resolves to `app/[locale]/i18n.ts` via the path alias.)

### 2. `components/PageShell/PageShell.tsx` ("use client")

Props: `locale`, `namespaces`, `resources`, `ready`, `loaderAnimation?` (Lottie
JSON; defaults to `mainload.json`), `children`.

- While `!ready`: render the standard centered loader
  (`<LottieAnimation animationData={loaderAnimation} />` in the existing flex-
  centered wrapper).
- When `ready`: render
  `<TranslationsProvider namespaces locale resources>{children}</TranslationsProvider>`.
- The artificial `setTimeout(..., 1000)` loader delay (present on ~2 pages) is
  dropped — the loader hides as soon as translations resolve (slightly faster,
  no other behavior change).

### 3. Pilot migration (3–5 pages)

Pick pages covering the pattern variations (with/without `useSearchParams`,
different loader animations): `templates`, `showcase`, `onlineleaning`,
`products`. Each page changes from the hand-rolled boilerplate to:

```tsx
const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
return (
  <PageShell
    locale={locale}
    namespaces={i18nNamespaces}
    resources={resources}
    ready={ready}
    loaderAnimation={mainLoad}
  >
    <MainNavigationTopBar locale={locale} />
    {/* existing content, still using t */}
  </PageShell>
);
```

`MainNavigationTopBar`, footers, and all other page logic stay in `children`
(PageShell only owns the i18n chrome, for flexibility).

## Data Flow

Page calls `useTranslations` → hook fetches via `initTranslations` → page passes
`resources`/`ready` to `PageShell` → PageShell shows loader until ready, then
mounts `TranslationsProvider` around `children`. Page uses `t` directly;
descendants use `useTranslation()` through the provider.

## Error Handling

Unchanged from today: `initTranslations` failures leave `ready` false (loader
stays), matching current behavior. No new error surfaces.

## Testing / Verification

No test runner (project convention). Verify by:
1. `npm run build` → "✓ Compiled successfully"; `document is not defined` count
   stays at the **128** baseline (no new SSR regressions).
2. Dev smoke test: each migrated page returns 200 and renders (loader →
   content), with translated strings showing for both `en` and `th`.
3. Diff review: migrated pages lose the boilerplate but render identically.

## Notes / scope

- Pilot only: 2 new files + 3–5 page migrations. The remaining ~35 pages are a
  follow-up rollout once the pattern is validated.
- Keeps pages client-rendered; does not address the `useSearchParams` SSR deopt
  (separate item).
- Short feature branch → `dev`, same flow as prior work.
