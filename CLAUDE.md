# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

All application code lives inside `nextapp/`. Run every `npm` command from that directory.

```
NextLaBIS/
├── nextapp/          # Next.js app — work here
│   └── src/
│       ├── app/      # Routes (App Router)
│       ├── components/
│       ├── lib/      # Data fetching, mock providers, models
│       └── types/
├── docs/             # Architecture & coding-standards docs
└── .github/          # CI, copilot-instructions.md, issue templates
```

## Commands

```bash
cd nextapp

npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run check-naming # Enforce file naming conventions (also runs in CI)
npx tsc --noEmit     # Type-check without building
```

There are no tests yet. CI runs `check-naming → lint → tsc → build` on PRs targeting `main` or `develop`.

## Architecture

### Server-first rendering

Pages and layouts are **Server Components by default** — never add `"use client"` to them. Data is fetched on the server and passed as props to Client Components. Client Components handle only interactivity (state, event handlers, browser APIs).

```
app/page.tsx (Server)
  └─ getData()           ← lib/<domain>/getData.ts (async, server-only)
       └─ mockProvider   ← lib/<domain>/mockProvider.ts (Phase 0)
  └─ <ClientComponent data={...} />   ← "use client"
```

### Phase 0 constraint

**No real openBIS API calls.** All data comes from `src/lib/mocks/` or `src/lib/<domain>/mockProvider.ts`. The `src/lib/openbis/` directory is reserved but intentionally empty — do not create files there yet. No `/app/api/*` routes, no authentication.

The data-fetching functions in `src/lib/<domain>/getData.ts` are the single swap point for Phase 1 API integration; components must not change.

### UI: Mantine only

Use `@mantine/core`, `@mantine/hooks`, `mantine-react-table`, and `@tabler/icons-react`. Do not introduce Tailwind, shadcn, Radix, or custom CSS frameworks. The custom Mantine theme is in `src/app/styles/theme.ts`.

### Routing

Dynamic entity routes follow the pattern `src/app/(entities)/<entityType>/[permId]/page.tsx`. Page `params` are a `Promise` in Next.js 16:

```tsx
export interface PageProps { params: Promise<{ permId: string }> }
export default async function Page({ params }: PageProps) {
  const { permId } = await params;
  ...
}
```

## Naming conventions (enforced by CI)

| Artifact | Convention | Example |
|---|---|---|
| React components | `PascalCase.tsx` | `ProjectsTable.client.tsx` |
| Server Components | `.server.tsx` suffix | `Header.server.tsx` |
| Client Components | `.client.tsx` suffix | `AppShellContent.client.tsx` |
| Utilities / hooks | `camelCase.ts` | `datetimeFunctions.ts` |
| Types | `PascalCase.ts` | `OpenBISModel.ts` |

`npm run check-naming` will fail the CI if these rules are violated.

## TypeScript

Strict mode is on (`strict: true`, `noUnusedLocals`, `noUnusedParameters`). Fix type errors; do not suppress with `any` — use `unknown` or generics instead. Path alias `@/*` maps to `src/*`.

## Git workflow

- All PRs target `develop`, not `main`
- Feature branches: `feature/<domain>-<short-name>`
- `main` receives only stable releases (end of a phase)
- Commits on `develop` are squash-merged from PRs
