# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Think Tool" (package name `randoncat`) — a Next.js 14 App Router site offering bilingual (English / Thai) online brainstorming tools, learning content, templates, and a web-elements UI gallery. Styling is SCSS Modules; deployment target is Vercel.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint (ESLint, eslint-config-next)
```

There is **no test runner configured** — no `test` script, no test framework in dependencies. Do not assume `npm test` exists; verify changes via `npm run build` / `npm run lint` and manual checks in the browser.

Note: a runtime error overlay showing `TypeError: ... 'addListener'` with a call stack pointing at a bare-UUID `localhost:3000/<uuid>` URL is almost always an injected **browser extension** content script, not app code. Reproduce in an incognito window to confirm before debugging app code.

## Architecture

### Routing & internationalization (read these together)
Everything lives under `app/[locale]/` and locale is a path segment (`en`, `th`; default `en`, set in `i18nConfig.ts`).

- `middleware.ts` runs `next-i18n-router` to redirect/prefix the locale on every non-asset request.
- `app/[locale]/i18n.ts` exports `initTranslations(locale, namespaces)` which builds an i18next instance, lazy-loading JSON from `locales/<lang>/<namespace>.json` via dynamic import.
- **The standard page pattern is:** a `"use client"` page that, in a `useEffect`, calls `initTranslations`, stores `t`/`resources` in state, shows a Lottie loader while `loading`, then renders its content wrapped in `<TranslationsProvider namespaces=… locale=… resources=…>` (`components/TranslationsProvider.tsx`). When adding a page, follow this pattern and reuse an existing namespace from `locales/` or add a new JSON file to **both** `locales/en/` and `locales/th/`.
- Most pages are Client Components (`"use client"`); `app/[locale]/layout.tsx` is the server root (sets `<html lang dir>`, fonts, Toast provider, Google Tag Manager).

### Path alias quirk (important)
`tsconfig.json` maps `@/*` to **three** roots in order: `./*`, `./app/[locale]/*`, and `./public/*`. So:
- `@/i18n` → `app/[locale]/i18n.ts`
- `@/components/…`, `@/utils/…`, `@/contexts/…`, `@/lib/…`, `@/i18nConfig` → repo root
- `@/json/…`, `@/svgs/…`, `@/data/…` → `public/…`
- `@/locales/…` → repo root `locales/`

When an import resolves "magically," check which of the three roots it came from.

### Tool sections
`app/[locale]/onlinetools/` groups tools by theme (`businessandinnovation`, `creativityandbrainskills`, `educationandparent`, `othertools`). Tool listing/metadata is data-driven from `locales/<lang>/toolsListData.json` (and related JSON), consumed by `onlinetools/page.tsx`; `onlinetools/details/[toolId]` and `onlineleaning/[contentId]` are dynamic detail routes that load their item from JSON in `public/json/` (via `require`) keyed by the route param.

### Canvas board tools (the drag-and-drop brainstorming feature)
Several tools (e.g. `pitchingdesign/board`, `gamificationinbusiness/board`) are thin route wrappers that render the shared `components/BoardPage/BoardPage.tsx` with three props: `cards`, `cardCategories`, and `title`.
- Card data is defined per tool in `public/data/<tool>/cards_en.ts`.
- `components/CanvasBoard/` holds the board UI (`CanvasBoard`, `BoardCard`, `CardItem`, `CategorySection`, `TextAnnotation`, `BrainstormNotes`); shared types are in `components/CanvasBoard/types/Card.ts`.
- `hooks/useCollaboration.ts` is the "multiplayer" layer but is **currently a mock** — an in-memory `Map` with simulated connection state, not a real backend. Treat its `broadcast*/subscribe*` API as the integration seam if real-time sync is ever added.
- PDF export of a board is handled by `utils/pdfExport.ts` (jspdf + html2canvas).

### Cross-cutting pieces
- **Fonts:** `lib/fonts.ts` exports `next/font` instances (e.g. `quicksand`, `kanit`, `mitr`); apply via `className`.
- **Toasts:** `contexts/ToastContext.tsx` provides `ToastProvider` / `useToast`, mounted in the root layout.
- **Analytics:** `utils/gtag.ts` holds `GA_TRACKING_ID` / `GTM_TRACKING_ID`; GTM is wired in `layout.tsx`.
- **Web elements gallery:** `app/[locale]/webelements/*` are standalone UI showcase pages (button, card, chart, modal, etc.), independent of the tool data model.

### Conventions
- Styling is **SCSS Modules** (`*.module.scss`) co-located with components; global styles in `app/Styles/`.
- A component folder typically pairs `Component.tsx` with `Component.module.scss`.
- `next.config.mjs` sets `experimental.missingSuspenseWithCSRBailout: false` to allow client-side bailout without a Suspense boundary — relevant because pages read translations/params client-side.
- `dist/` is a stale exported build artifact; do not edit it as source.
