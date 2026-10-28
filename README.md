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

```text
prisma/                  schema.prisma, migrations, seed.ts
src/
  categories/ banners/ products/ locations/   controller + service + dto + spec
  prisma/                PrismaService (global)
```

Home page endpoints (Swagger UI: <http://localhost:4000/api/docs>):

| Endpoint                                  | Purpose                              |
| ----------------------------------------- | ------------------------------------ |
| `GET /api/categories`                     | Category tree with subcategories     |
| `GET /api/categories/popular`             | Popular categories block             |
| `GET /api/banners`                        | Slider banners + featured campaigns  |
| `GET /api/products/trending?page=&limit=` | "Trending" with Show more pagination |
| `GET /api/locations`                      | Regions / cities                     |

Set `DATABASE_URL` (see `.env.example`), then from `apps/api`:

```bash
bunx prisma migrate deploy   # apply migrations
bunx prisma db seed          # test data (re-runnable)
```

### `packages/shared`

Put **API contracts** here (DTOs / types both sides import), e.g. `Money`, `ProductSummary`, `formatMoney`.  
Rebuild after changes: `bun run build:shared` (also runs automatically before `dev`).

---

## Stack

| Layer           | Choice                                                                             |
| --------------- | ---------------------------------------------------------------------------------- |
| Web             | Next.js (App Router) · TypeScript strict · Tailwind · react-i18next · lucide-react |
| API             | NestJS · TypeScript · Prisma + PostgreSQL · Swagger                                |
| Shared          | TypeScript package `@torba/shared`                                                 |
| Package manager | **Bun** (preferred)                                                                |
| Quality         | ESLint (web) · Oxlint (api) · Prettier · Vitest                                    |
| Later           | Husky · RTK Query · Vercel CI                                                      |

---

## Getting started

```bash
bun install
cp .env.example .env   # API requires DATABASE_URL

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
feature/pe-<number>-<short-what-we-do>
```

English, kebab-case, lowercase. Ticket number right after `pe-`.

```text
feature/pe-10354-home-page
feature/pe-10342-product-page
feature/pe-10370-cart-sidebar-state
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
- Ticket in brackets when present: `[PE-10342]`

```text
feat(apps/web): [PE-10354] add the home page shell
fix(apps/web): [PE-10370] keep cart sidebar state when the route changes
feat(apps/api): [PE-10342] list products for the catalog page
feat(packages/shared): [PE-10342] add ProductSummary and Money types
ci: skip PR CI work a change cannot affect
```

Local WIP commits may be simpler. What lands on `main` is the **PR title**.

### PR

1. Branch: `feature/pe-10354-home-page`
2. Title: `feat(apps/web): [PE-10354] add the home page shell and header cart entry`  
   or: `[PE-10354] Add the home page shell and header cart entry`

### Daily loop

```bash
git checkout main
git pull origin main
git checkout -b feature/pe-10354-home-page

# work in your area only…

git add -A
git commit -m "feat(apps/web): [PE-10354] add the home page shell"
git push -u origin HEAD
# → PR → main → review (Pavlo)
```

Sync with main:

```bash
git fetch origin
git merge origin/main
```
