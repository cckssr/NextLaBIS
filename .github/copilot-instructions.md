# Copilot Instructions – NextLaBIS

NextLaBIS is a schema-driven web frontend for openBIS ELN/LIMS, built with Next.js App Router, React Server Components, and Mantine. This document guides AI agents in being productive immediately.

---

## Project Context & Phase

- **Project**: NextLaBIS – Web UI for openBIS Electronic Lab Notebook / Laboratory Information Management System
- **Current Phase**: **Phase 0 – Foundations** (UI scaffolding, masterdata components, documentation only)
- **Stack**: Next.js 16, React 19, TypeScript 5, Mantine 7, @tabler/icons-react
- **Key Architecture**: Server-first data flow + schema-driven property renderers
- **Location**: All work happens in `nextapp/` folder

**Phase 0 Reality Check** – Do NOT import or reference modules that don't exist yet:

- ❌ No openBIS API client (`lib/openbis/server.ts`)
- ❌ No authentication helpers
- ❌ No database integration
- ✅ Only UI scaffolding and property renderer components

---

## Architecture at a Glance

### Data Flow (Non-Negotiable)

```
Server Component (app/ or components/)
  ↓ fetches data (Phase 1: from openBIS)
  ↓ passes props
Client Component (only for user interaction)
  ↓ setState, onChange handlers
  ↓ calls /app/api/* endpoints (Phase 1)
```

**The Golden Rule**: Data fetching and openBIS logic **never** leave the server.

### Folder Responsibilities

| Folder                       | Rules                                                                                                                | Examples                                     |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `src/app/`                   | Routes, layouts, pages. Server Components by default. NO low-level logic.                                            | `dashboard/page.tsx`, `layout.tsx`           |
| `src/app/api/`               | API endpoints (Phase 1). Currently empty.                                                                            | `/api/spaces/[id]` (future)                  |
| `src/components/dashboard/`  | Dashboard UI cards. Server Components with `.server.tsx` suffix.                                                     | `Header.server.tsx`, `SearchCard.server.tsx` |
| `src/components/masterdata/` | Property-type renderers (schema-driven). Uses `BooleanForm`, `IntegerForm`, etc. Names match openBIS property kinds. | `boolean.tsx`, `varchar.tsx`, `real.tsx`     |
| `src/components/shell/`      | App shell layout and navigation. Client Components with `.client.tsx` suffix.                                        | `AppShellRoot.client.tsx`                    |
| `src/lib/`                   | Reserved for future: openBIS client, hooks, utilities. Currently empty.                                              | (Phase 1+)                                   |

### Schema-Driven Pattern (Core Concept)

Each openBIS property kind has a component in `src/components/masterdata/`:

```
PropertyKind (e.g., "BOOLEAN", "INTEGER", "VARCHAR")
  ├── Renderer component (current)
  └── (Future: separate View + Edit components)
```

**Current Pattern** (`src/components/masterdata/boolean.tsx`):

- Interface: `FormProps` with `code`, `name`, `description`, `editable`, `mandatory`, `error`
- Uses `GridCol` with responsive spans: `{ base: 12, sm: 6, lg: "content" }`
- Mantine `Checkbox`, `TextInput`, etc.
- `"use client"` only when state needed (e.g., `useState` in boolean editor)

---

## Styling & UI Rules

### Mantine Only

- **REQUIRED**: Use Mantine 7 components and theme tokens
- **FORBIDDEN**: Tailwind, shadcn, Radix, raw CSS frameworks
- Layout: `Grid`, `GridCol`, `Stack`, `Flex` (not div hacks)
- Icons: `@tabler/icons-react` (not custom SVGs)
- Theme: defined in `src/app/styles/theme.ts`

### CSS Modules

Only for component-scoped styles when Mantine is insufficient:

```tsx
// MyComponent.module.css → scoped to MyComponent.tsx
import styles from "./MyComponent.module.css";
```

### Responsive Design

- Mobile-first: start with `base:`, then `sm:`, `lg:`
- Example: `gridSpan = { base: 12, sm: 6, lg: "content" }`
- Verify breakpoints: Mantine defaults, test on common screen sizes

---

## Naming & File Conventions

| Item              | Convention                                           | Examples                                         |
| ----------------- | ---------------------------------------------------- | ------------------------------------------------ |
| Components        | `PascalCase.tsx`                                     | `BooleanForm.tsx`, `SearchCard.server.tsx`       |
| Server Components | Suffix `.server.tsx` or no suffix (if context clear) | `Header.server.tsx`                              |
| Client Components | Suffix `.client.tsx`                                 | `AppShellRoot.client.tsx`                        |
| Utilities         | `kebab-case.ts`                                      | `common_functions.tsx` (⚠️ inconsistent—improve) |
| Types             | `PascalCase` in file or inline                       | `interface FormProps`, `type User`               |
| Folders           | `kebab-case`                                         | `src/components/masterdata/`                     |

---

## Component Patterns & Real Examples

### Server Component (Dashboard Page)

```tsx
// src/app/dashboard/page.tsx – Server Component, no "use client"
import { Header } from "@/components/dashboard/Header.server";
import { Grid, GridCol, Stack } from "@mantine/core";

export default function DashboardPage() {
  // No state, no interactivity
  const mockData = [
    /* ... */
  ];
  return (
    <Grid>
      <GridCol span={{ base: 12, lg: 8 }}>
        <Header title="Dashboard" />
      </GridCol>
    </Grid>
  );
}
```

### Masterdata Property Component (Client + State)

```tsx
// src/components/masterdata/boolean.tsx – Client Component
"use client";
import { Checkbox, GridCol } from "@mantine/core";
import { useState } from "react";

interface FormProps {
  code: string;
  name: string;
  description: string;
  pastValue?: boolean;
  editable?: boolean;
  mandatory?: boolean;
  error?: string;
}

export function BooleanForm({
  code,
  name,
  description,
  pastValue = false,
  editable = true,
  mandatory = false,
  error = null,
}: FormProps) {
  const [checked, setChecked] = useState(pastValue);
  const gridSpan = { base: 12, sm: 6, lg: "content" };

  return (
    <GridCol span={gridSpan}>
      <Checkbox
        label={name}
        checked={checked}
        onChange={(e) => setChecked(e.currentTarget.checked)}
        disabled={!editable}
        withAsterisk={mandatory}
        description={description}
        error={error}
      />
    </GridCol>
  );
}
```

---

## TypeScript & Code Quality

- **Strict mode**: Fix type errors, don't suppress with `any`
- **Props**: Always define interfaces, even small ones
- **Return types**: Explicit on functions, inferred on components
- **Imports**: Use `@/` path alias for src imports (`@/components/...`, not `../../../`)
- **Comments**: Explain intent, not obvious code (e.g., "// GridCol span scales down on mobile")

### ESLint & Linting

```bash
npm run lint        # Check for linting errors
npm run check-naming  # Verify file naming conventions (custom script)
```

---

## Building & Running

```bash
cd nextapp
npm run dev         # Start dev server (turbopack enabled)
npm run build       # Production build
npm run start       # Run production server
npm run lint        # Run ESLint
npm run check-naming # Check file naming conventions
```

Open `http://localhost:3000` → redirects to `/dashboard` (see `src/app/page.tsx`).

### Running CI Checks Locally

Before pushing, run all CI checks locally to catch issues early:

```bash
cd nextapp
npm run check-naming  # Enforce PascalCase in components/, snake_case in utils/
npm run lint          # ESLint
npx tsc --noEmit      # TypeScript type checking
npm run build         # Full build (catches all errors)
```

**Naming Convention Enforcement** (automated by `scripts/check-naming.js`):

- Components: `PascalCase.tsx` (e.g., `BooleanForm.tsx`)
- Utilities: `snake_case.ts` or `camelCase.ts` (e.g., `common_functions.tsx`)
- Default: `kebab-case` or `snake_case` for non-component files

These same checks run in GitHub Actions on pull requests to `main` or `develop`.

---

## What NOT to Do (Phase 0)

- ❌ Import `lib/openbis/*` or auth modules (don't exist yet)
- ❌ Create `/app/api/*` route handlers for openBIS (Phase 1)
- ❌ Add state management beyond `useState` (no Zustand/Context yet)
- ❌ Call `fetch()` from Client Components to external APIs (Phase 1)
- ❌ Hardcode openBIS data types; use schemas instead
- ❌ Use raw DTOs in components; transform server-side
- ❌ Introduce new UI libraries (Tailwind, shadcn, Radix)

---

## When in Doubt

1. **Check existing patterns**: Look at `src/components/masterdata/*.tsx` – they're reference implementations
2. **Read docs**: `docs/architecture.md`, `docs/coding-standards.md`, `docs/tech-stack.md`
3. **Verify phase**: Is this Phase 0 work or Phase 1+? (Check GitHub issues / project-management.md)
4. **Test Mantine first**: 99% of UI needs are solved by Mantine. Don't custom-code layouts.
5. **Use TypeScript**: Always define prop interfaces; let inference handle the rest.

---

## Project Management & Development Workflow

- **Phases**: Phase 0 (Foundations) → Phase 1 (Core Data) → Phase 2 (Advanced ELN)
- **Issues**: Tracked as epics → sub-issues. Labels: `phase:0-foundations`, `type:epic`, `type:sub-issue`
- **Commits**: Imperative mood (e.g., "Add masterdata integer component")
- **Testing**: Not yet required; prepare test structure in Phase 1

---

## Summary

- **Server-first**: Data fetching on server, Props to Client Components
- **Schema-driven**: Property renderers in `masterdata/` map to openBIS types
- **Mantine-only**: No other UI frameworks
- **Phase-aware**: Phase 0 = UI scaffolding only, no API/auth yet
- **Strict layering**: `app/` ≠ `components/` ≠ `lib/`
- **TypeScript strict**: Fix type errors, don't suppress

Follow these rules. They exist for maintainability at scale.
