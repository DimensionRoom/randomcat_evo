# Shared i18n page setup (useTranslations + PageShell) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the duplicated per-page i18n boilerplate with a shared `useTranslations` hook + `<PageShell>` component, and migrate 3–5 pilot pages.

**Architecture:** A client hook owns the `initTranslations` fetch/state; a client `PageShell` owns the loader + `TranslationsProvider` chrome. Pages keep using `t` from the hook in the same component (no body extraction); descendants still get i18next context via the provider. Pages stay client-rendered — no behavior change.

**Tech Stack:** Next.js 14 App Router, react-i18next via `app/[locale]/i18n.ts` + `components/TranslationsProvider.tsx`, `@/components/Loading/LottiePlayer`.

> **Testing note:** No test runner in this project. Verify per task with `npm run build` (baseline: **128** pre-existing `document is not defined` warnings — must not increase) plus a manual smoke check. Do not add a test framework.

> **Branch:** Work on `feat/page-translations-shell` off `dev`. Commit after each task.

---

## File Structure

- Create: `hooks/useTranslations.ts` — fetch translations + expose `{ t, resources, ready }`.
- Create: `components/PageShell/PageShell.tsx` — loader until ready, then `TranslationsProvider` around children.
- Modify (pilot): `app/[locale]/templates/page.tsx`, `app/[locale]/showcase/page.tsx`, `app/[locale]/onlineleaning/page.tsx`, `app/[locale]/products/page.tsx`.

---

## Task 1: `useTranslations` hook

**Files:**
- Create: `hooks/useTranslations.ts`

- [ ] **Step 1: Write the hook**

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

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add hooks/useTranslations.ts
git commit -m "feat(i18n): add useTranslations hook"
```

---

## Task 2: `PageShell` component

**Files:**
- Create: `components/PageShell/PageShell.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import React, { ReactNode } from "react";
import LottiePlayer from "@/components/Loading/LottiePlayer";
import TranslationsProvider from "@/components/TranslationsProvider";
import mainLoad from "@/public/json/mainload.json";

export default function PageShell({
  locale,
  namespaces,
  resources,
  ready,
  loaderAnimation = mainLoad,
  children,
}: {
  locale: string;
  namespaces: string[];
  resources: any;
  ready: boolean;
  loaderAnimation?: any;
  children: ReactNode;
}) {
  if (!ready) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: "60vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottiePlayer autoplay loop src={loaderAnimation} style={{ width: "25vh" }} />
      </div>
    );
  }

  return (
    <TranslationsProvider
      namespaces={namespaces}
      locale={locale}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add components/PageShell/PageShell.tsx
git commit -m "feat(i18n): add PageShell (loader + TranslationsProvider)"
```

---

## Migration recipe (applies to Tasks 3–6)

For each pilot page, apply this exact transformation:

1. **Add imports** (near the existing i18n imports):
   ```tsx
   import { useTranslations } from "@/hooks/useTranslations";
   import PageShell from "@/components/PageShell/PageShell";
   ```
2. **Remove** the three i18n state lines:
   ```tsx
   const [t, setT] = useState<any>(null);
   const [resources, setResources] = useState<any>(null);
   const [loading, setLoading] = useState<boolean>(true);
   ```
   and **add** in their place:
   ```tsx
   const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
   ```
   (Keep every *other* `useState` on the page unchanged.)
3. **Remove the translation fetch from the effect.** If the page has a
   `useEffect` whose body is only `fetchTranslations()` (calls
   `initTranslations` + `setT`/`setResources`/`setLoading`), delete that whole
   effect. If the effect *also* does other work (e.g. data transforms), delete
   only the translation lines (`initTranslations`, `setT`, `setResources`,
   `setLoading`/its `setTimeout`) and keep the rest.
4. **Remove the loading guard** block:
   ```tsx
   if (loading) { return ( ...loader... ); }
   ```
5. **Replace the wrapper**: change
   ```tsx
   return (
     <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
       ...content...
     </TranslationsProvider>
   );
   ```
   to
   ```tsx
   return (
     <PageShell
       locale={locale}
       namespaces={i18nNamespaces}
       resources={resources}
       ready={ready}
       loaderAnimation={<PAGE_LOADER_JSON>}
     >
       ...content...
     </PageShell>
   );
   ```
6. **Remove now-unused imports**: `TranslationsProvider`, and `initTranslations`
   (only if no longer referenced). Keep the page's loader-animation JSON import
   (it's now passed as `loaderAnimation`).
7. Per-page verify (build) + commit.

---

## Task 3: Migrate `templates`

**Files:**
- Modify: `app/[locale]/templates/page.tsx`

Page specifics: namespace `["templateScreen"]`; loader JSON `templateLoad`
(`@/public/json/templateload.json`, already imported); no per-page translation-
only effect interleaving beyond the standard.

- [ ] **Step 1:** Apply the migration recipe. Use `loaderAnimation={templateLoad}`.
- [ ] **Step 2: Verify build + baseline**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`
Run: `npm run build 2>&1 | grep -ciE "document is not defined"`
Expected: `128`

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/templates/page.tsx"
git commit -m "refactor(templates): use useTranslations + PageShell"
```

---

## Task 4: Migrate `showcase`

**Files:**
- Modify: `app/[locale]/showcase/page.tsx`

Page specifics: namespace `["showcaseScreen"]`; loader JSON `showcaseLoad`
(`@/public/json/showcaseLoad.json`, already imported); this page also uses
`useSearchParams()` — leave that and all non-i18n state/logic untouched.

- [ ] **Step 1:** Apply the migration recipe. Use `loaderAnimation={showcaseLoad}`.
- [ ] **Step 2: Verify build + baseline**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`
Run: `npm run build 2>&1 | grep -ciE "document is not defined"`
Expected: `128`

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/showcase/page.tsx"
git commit -m "refactor(showcase): use useTranslations + PageShell"
```

---

## Task 5: Migrate `onlineleaning`

**Files:**
- Modify: `app/[locale]/onlineleaning/page.tsx`

Page specifics: namespace `["onlinelearningScreen"]`; loader JSON
`onlinelearningLoad` (`@/public/json/onlinelearningLoad.json`, already imported).
**Care:** its `useEffect` interleaves the translation fetch with a data
transform and a `setTimeout(... setLoading ...)`. Per recipe step 3, delete only
the translation lines (`initTranslations`, `setT`, `setResources`,
`setLoading`/its `setTimeout` wrapper) and **keep** the data-transform call
(e.g. `transformJsonTemplateData()`); if that call sat inside the `setTimeout`,
call it directly in the effect instead. Leave `useSearchParams`, refs, and
`react-player` logic untouched.

- [ ] **Step 1:** Apply the migration recipe with the care note above. Use
  `loaderAnimation={onlinelearningLoad}`.
- [ ] **Step 2: Verify build + baseline**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`
Run: `npm run build 2>&1 | grep -ciE "document is not defined"`
Expected: `128`

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/onlineleaning/page.tsx"
git commit -m "refactor(onlineleaning): use useTranslations + PageShell"
```

---

## Task 6: Migrate `products`

**Files:**
- Modify: `app/[locale]/products/page.tsx`

Page specifics: read its `const i18nNamespaces = [...]` and its loader JSON
import at the top of the file, and use those exact values. Apply the migration
recipe with `loaderAnimation={<that page's loader JSON>}`. Keep all non-i18n
state/logic untouched.

- [ ] **Step 1:** Apply the migration recipe.
- [ ] **Step 2: Verify build + baseline**

Run: `npm run build 2>&1 | grep -iE "Compiled successfully|Failed to compile|Type error"`
Expected: `✓ Compiled successfully`
Run: `npm run build 2>&1 | grep -ciE "document is not defined"`
Expected: `128`

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/products/page.tsx"
git commit -m "refactor(products): use useTranslations + PageShell"
```

---

## Task 7: End-to-end smoke verification

- [ ] **Step 1: Start dev server**

Run: `npm run dev` (note the port; do not kill an existing user dev server — start only if none is running).

- [ ] **Step 2: Check each migrated page renders**

For `en` and `th`, load `/templates`, `/th/templates`, `/showcase`,
`/onlineleaning`, `/products`. Expected: each returns 200, shows the loader then
the content with translated strings — identical to before the refactor.

- [ ] **Step 3: Confirm no console errors** beyond the pre-existing
  `document is not defined` SSR warnings.

---

## Self-Review Notes

- **Spec coverage:** hook (Task 1), PageShell incl. dropped `setTimeout` delay
  and default `mainLoad` loader (Task 2), pilot migrations templates/showcase/
  onlineleaning/products (Tasks 3–6), verification (Task 7). All spec sections map
  to a task.
- **Type consistency:** `useTranslations(locale, namespaces)` returns
  `{ t, resources, ready }` (Task 1); `PageShell` props `locale, namespaces,
  resources, ready, loaderAnimation?, children` (Task 2) are exactly what the
  migrated pages pass (Tasks 3–6).
- **No test framework:** verification is build + 128 baseline + manual smoke, by
  design.
