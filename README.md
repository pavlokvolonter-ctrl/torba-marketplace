# Torba Marketplace

Learning marketplace **Torba** (OLX-style: listings, catalog, product, cart, checkout).  
Monorepo so **frontend** and **backend** ship from one GitHub repo without stepping on each other.

Cursor agents load project rules from [`.cursor/rules/`](.cursor/rules/) (git flow, ownership, no Cursor co-author trailers).

## Links

| What           | URL                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Figma**      | [Marketplace — torba](https://www.figma.com/design/imQzlvJcm0EMhvUqr3kQFZ/Marketplace--torba?node-id=0-1&m=dev&t=qPg6j28l1Yd7lLL2-1) |
| **GitHub**     | [pavlokvolonter-ctrl/torba-marketplace](https://github.com/pavlokvolonter-ctrl/torba-marketplace)                                    |
| **Web deploy** | Vercel — Root Directory = `apps/web`                                                                                                 |
| **API deploy** | Later (separate host)                                                                                                                |

### Vercel (web)

In the project settings:

| Setting             | Value                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Root Directory**  | `apps/web` (not repo root)                                                                          |
| **Install / Build** | handled by `apps/web/vercel.json` (install from monorepo root, build `@torba/shared`, then Next.js) |
| **Framework**       | Next.js                                                                                             |

Include files outside the Root Directory in the Build Step should stay **enabled** (default for monorepos).

### Design workflow

| Figma tab         | Meaning                           |
| ----------------- | --------------------------------- |
| **Design / WIP**  | Still drafting — do not implement |
| **Ready for Dev** | Approved — safe to build          |

## Team

| Role                  | Who      | Works in          |
| --------------------- | -------- | ----------------- |
| Architecture / review | Pavlo    | whole repo        |
| Frontend              | Kateryna | `apps/web`        |
| Backend               | Bohdan   | `apps/api`        |
| Shared contracts      | FE + BE  | `packages/shared` |
| UI/UX                 | Maria    | Figma             |
| PM                    | Dilik    | tickets           |
| QA                    | Liuba    | testing           |

## MVP (v1)

**In scope:** Home · Catalog / Search · Product page · Cart sidebar · Checkout

**Out of scope:** seller dashboard

---

## Repository layout

```text
torba-marketplace/
  apps/
    web/                 Next.js UI (http://localhost:3000)
    api/                 NestJS API (http://localhost:4000/api)
  packages/
    shared/              Shared TypeScript types + helpers (FE ↔ BE)
  scripts/
    test-all.ts          Aggregated test runner + summary table
```

### `apps/web` (frontend)

```text
src/
  app/                   Next.js App Router pages
    (shop)/              Marketplace shell routes (stub pages for now)
  components/
    layout/              Header, Footer, AppShell
    ui/                  Small reusable UI pieces
  i18n/                  react-i18next (uk / en)
  shared/
    config/              Site + navigation config
    lib/                 Helpers (e.g. cn)
```

Current UI is a **shell only**: nav links to stub pages, search/cart controls are no-ops.  
Add `features/<name>/` only when real feature logic starts (cart, catalog, …).

### `apps/api` (backend)

```text
src/
  main.ts                Bootstrap, CORS, global /api prefix
  app.module.ts
  app.controller.ts      Health: GET /api/health
  app.service.ts
```

Prisma + PostgreSQL will live here when the API grows.

### `packages/shared`

Put **API contracts** here (DTOs / types both sides import), e.g. `Money`, `ProductSummary`, `formatMoney`.  
Rebuild after changes: `bun run build:shared` (also runs automatically before `dev`).

---

## Stack

| Layer           | Choice                                                                             |
| --------------- | ---------------------------------------------------------------------------------- |
| Web             | Next.js (App Router) · TypeScript strict · Tailwind · react-i18next · lucide-react |
| API             | NestJS · TypeScript · Prisma + PostgreSQL (planned)                                |
| Shared          | TypeScript package `@torba/shared`                                                 |
| Package manager | **Bun** (preferred)                                                                |
| Quality         | ESLint (web) · Oxlint (api) · Prettier · Vitest                                    |
| Later           | Husky · RTK Query · Vercel CI                                                      |

---

## Getting started

```bash
bun install
cp .env.example .env   # optional

bun run dev            # web + api together
bun run dev:web        # http://localhost:3000
bun run dev:api        # http://localhost:4000 → GET /api/health
```

### Scripts (from repo root)

| Command               | What it does                           |
| --------------------- | -------------------------------------- |
| `bun run dev`         | Start web + api                        |
| `bun run build`       | Build shared → api → web               |
| `bun run lint`        | Lint web + api                         |
| `bun run format`      | Prettier write                         |
| `bun run test`        | All packages + final Pass/Fail summary |
| `bun run test:web`    | Web only                               |
| `bun run test:api`    | API only                               |
| `bun run test:shared` | Shared only                            |
| `bun run test:watch`  | Web Vitest watch                       |

### Environment

See `.env.example`:

```bash
PORT=4000
WEB_ORIGIN=http://localhost:3000
# NEXT_PUBLIC_API_URL=http://localhost:4000/api   # when the web client is wired
```

---

## Testing

Write tests **next to the code** they cover:

| Package           | Files          | Tooling                  |
| ----------------- | -------------- | ------------------------ |
| `apps/web`        | `*.test.ts(x)` | Vitest + Testing Library |
| `apps/api`        | `*.spec.ts`    | Vitest + Nest testing    |
| `packages/shared` | `*.spec.ts`    | Vitest                   |

**Do test:** hooks, mappers, validators, money/format helpers, API handlers.  
**Skip:** pure layout / no-op shell controls.

`bun run test` prints a summary table (files / pass / fail / skip) at the end.

---

## Ownership rules

1. Frontend does not change `apps/api` (unless the ticket says so).
2. Backend does not change `apps/web`.
3. Shared contract changes go in `packages/shared` and must be agreed in the PR.
4. Prefer **two tickets / two branches** if FE and BE both change.

---

## Git flow (required)

`main` is the only stable branch. Land only via **PR + review**.  
One branch = one ticket.

### Branch

```text
feature/zetan01-<number>-<short-what-we-do>
```

English, kebab-case, lowercase. Jira key in lowercase right after `feature/` (`ZETAN01-7` → `zetan01-7`).

```text
feature/zetan01-8-home-page
feature/zetan01-15-product-page
feature/zetan01-16-cart-sidebar-state
```

Fix with **no new behavior** → `fix/` prefix:

```text
fix/share-extension
fix/cart-overlay-scroll-lock
```

### Commit

CI format:

```text
<type>(<folder>): <what changed>
```

- **Folder** — real path: `apps/web`, `apps/api`, `packages/shared`. Multi-area → omit parentheses.
- **Types:** `feat` · `fix` · `perf` · `refactor` · `chore` · `ci` · `docs` · `test` · `build` · `style` · `revert`
- After `:` — lowercase, describe the **outcome**, not files.
- Ticket in brackets when present: `[ZETAN01-15]`

```text
feat(apps/web): [ZETAN01-8] add the home page shell
fix(apps/web): [ZETAN01-16] keep cart sidebar state when the route changes
feat(apps/api): [ZETAN01-15] list products for the catalog page
feat(packages/shared): [ZETAN01-15] add ProductSummary and Money types
ci: skip PR CI work a change cannot affect
```

Local WIP commits may be simpler. What lands on `main` is the **PR title**.

### PR

**Title** — same format as a commit, because the PR title is what lands on `main`:

```text
feat(apps/web): [ZETAN01-8] add the home page blocks
feat(apps/api): [ZETAN01-7] add home page API (categories, banners, trending, locations)
```

**Size** — one ticket, one concern. Do not mix the feature with reformatting, dependency swaps,
font changes or rule changes — open a separate `chore` PR for those. If the diff passes ~500 lines
(without lock files and generated code), split it or stack PRs.

**Reviewers** — Pavlo always. Add the other side (FE ↔ BE) when `packages/shared` changes.

**Description** — use the template (`.github/pull_request_template.md` fills it in automatically).
Write it for a reviewer who has not seen your screen: what changed, why, where to look, how you checked it.

````markdown
Stacked on #12 ([ZETAN01-7], the home page API). Only the last commit is this PR.
<!-- remove the line above if the PR is based on main -->

## What
The home page between the header and the footer: banner slider, popular categories,
"Trending now" with "Show more", and the business banner. Data comes from mocks
typed with `@torba/shared`; switching to the API is one hook.

* Slider (`features/home/BannerSlider`): arrows, dots, autoplay paused on hover.
* Trending (`features/home/TrendingProducts`): `ProductCard` grid, "Show more" loads the next page
  and hides itself when `hasMore` is false.
* Strings in `uk` and `en` under `home.*`.

## Why
ZETAN01-8. Figma: <link to the frame on ✅ READY FOR DEV>

## Notes for review
* `ProductCard` lives in `components/ui` because the catalog page reuses it.
* Mocks are in `features/home/mocks.ts` — delete once ZETAN01-7 is merged.
* Not done here (separate ticket): favourites button does nothing yet.

## How to test
1. `bun install && bun run dev`
2. Open http://localhost:3000 — check desktop (1440) and mobile (375).
3. Click "Show more" until it disappears.

## Tests
* `features/home/useTrending.test.ts`: pagination and `hasMore` (6 tests).
* `bun run lint` and `bun run test` pass locally.

## Checklist
- [ ] Title is `<type>(<folder>): [ZETAN01-N] …`, branch is `feature/zetan01-N-…`
- [ ] Matches Figma (✅ READY FOR DEV only), desktop + mobile
- [ ] No changes outside my area (or explained above)
- [ ] `packages/shared` changes agreed with the other side
- [ ] Texts go through i18n (`uk` + `en`)
- [ ] `bun run lint` and `bun run test` pass
- [ ] Jira ticket moved to **Review**

## Screenshots
| Figma | Desktop | Mobile |
| --- | --- | --- |
| <img> | <img> | <img> |

<!-- UI changes: always Figma vs result, desktop + mobile, plus states (hover, open menu, empty, error).
     API changes: Swagger / Postman response, or terminal output of the tests. -->

Closes ZETAN01-8
````

**Screenshots are required.** Every PR ends with a **Screenshots** section:

| Change | What to attach |
| --- | --- |
| UI (`apps/web`) | Figma frame next to the result, desktop **and** mobile, plus states (hover, open menu, empty, error, loading). A short video/GIF for interactions. |
| API (`apps/api`) | Response from Swagger (`/api/docs`) or Postman for each new endpoint, and terminal output of `bun run test`. |
| Tooling / docs | Terminal output showing the command works. |

If a section does not apply, write `n/a` instead of deleting it, so the reviewer knows it was not forgotten.

**During review**

1. Reply in **every** thread: what you changed and in which commit (`Fixed in a1b2c3d — …`), or why you disagree / postpone (with a ticket). Do not fix silently.
2. Press **Resolve conversation** after you reply. The reviewer reopens it if something is still off.
3. When all threads are answered, press **Re-request review** next to the reviewer's name and move the Jira ticket to **Review**.
4. Do not merge your own PR. Pavlo merges after approval.

### Daily loop

```bash
git checkout main
git pull origin main
git checkout -b feature/zetan01-8-home-page

# work in your area only…

git add -A
git commit -m "feat(apps/web): [ZETAN01-8] add the home page shell"
git push -u origin HEAD
# → PR → main → review (Pavlo)
```

Sync with main:

```bash
git fetch origin
git merge origin/main
```
