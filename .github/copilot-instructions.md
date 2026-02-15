# Copilot Instructions – NextLaBIS

NextLaBIS is a **schema-driven web frontend for openBIS ELN/LIMS**, built with Next.js App Router, React Server Components, and Mantine 7. This document guides AI agents in being immediately productive.

---

## Project Context & Phase

- **Project**: NextLaBIS – Web UI for openBIS Electronic Lab Notebook / Laboratory Information Management System
- **Current Phase**: **Phase 0 – Foundations** (visual-first, mock-data-driven UI development)
- **Stack**: Next.js 16 (with Turbopack), React 19, TypeScript 5, Mantine 7, @tabler/icons-react, mantine-react-table
- **Key Architecture**: Server-first data flow + schema-driven property renderers
- **Location**: All code in `nextapp/` folder; configuration files in root (`docs/`, `.github/`)

**Phase 0 Constraints** – Do NOT implement these (Phase 1+):

- ❌ openBIS API client (`lib/openbis/` — reserved but empty)
- ❌ Authentication or session management
- ❌ `/app/api/*` route handlers
- ✅ UI scaffolding, mock data, property renderers, dashboard views

---

## AI Agent Constraints (Critical)

**Documentation Language**

- All documentation must be written in **English only**, regardless of the language used in requests or prompts
- Exception: Code comments may reflect variable/function names in any language; documentation (READMEs, guides, instructions) must be English

**Documentation File Creation Policy**

- **Only create new documentation files if:**
  - Explicitly requested by the user, OR
  - Absolutely necessary for the project (e.g., architectural gaps that block development)
- **Never** auto-generate summary documents, changelogs, or similar artifacts
- **Prefer** updating existing documentation over creating new files
- Keep documentation minimal and focused; avoid redundancy with existing docs

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

| Folder                       | Rules & Current Use                                                                                               | Examples                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `src/app/`                   | Pages, layouts, routes. **Server Components by default** (no `"use client"`). Fetch data, pass props to children. | `(misc)/dashboard/page.tsx`, `layout.tsx`              |
| `src/app/api/`               | API endpoints. **Empty in Phase 0**. Phase 1: openBIS API proxies.                                                | (Reserved for Phase 1+)                                |
| `src/app/(entities)/`        | Dynamic routes for openBIS entities: `space/[spaceCode]`, `project/[projectPermId]`, etc. Server Components.      | `space/[spaceCode]/page.tsx`                           |
| `src/app/(misc)/`            | Dashboard, search, inventory, user settings. Grouped routes for non-entity pages.                                 | `dashboard/page.tsx`, `search/page.tsx`                |
| `src/components/dashboard/`  | Dashboard overview cards. **Server Components** (`.server.tsx` suffix). Accept data via props.                    | `SpacesOverviewCard.server.tsx`                        |
| `src/components/spaces/`     | Space-specific UI (tables, metadata panels). Mix of Server Components (`.server.tsx`) and Client Components.      | `ProjectsTable.client.tsx`, `MetadataPanel.server.tsx` |
| `src/components/masterdata/` | **Property-type renderers** (schema-driven). Map openBIS property kinds → form components. Use `"use client"`.    | `boolean.tsx`, `varchar.tsx`, `integer.tsx`            |
| `src/components/shell/`      | App shell layout, nav, breadcrumbs. **Client Components** (`.client.tsx`). Manages state, routing.                | `AppShellRoot.client.tsx`, `TopNav.client.tsx`         |
| `src/components/shared/`     | Reusable UI patterns (tables, pills, selectors). Used across components.                                          | `AdvancedTable/`, `TagPill/`, `RightsPill/`            |
| `src/lib/spaces/`            | Data fetching logic & mock providers. **Server-side only**. Transforms mock data to component props.              | `getSpaceOverview.ts`, `mockProvider.ts`               |
| `src/lib/mocks/`             | Mock data fixtures for Phase 0 development. Replace in Phase 1.                                                   | `mockSpace.ts`                                         |
| `src/lib/utils/`             | Utility functions (dates, user formatting). Language agnostic, reusable.                                          | `datetimeFunctions.ts`, `userFunctions.ts`             |
| `src/types/`                 | Global TypeScript types and interfaces.                                                                           | `openbis.ts` (shared types)                            |

### Schema-Driven Pattern (Core Concept)

Each openBIS property kind has a component in `src/components/masterdata/`:

```
PropertyKind (e.g., "BOOLEAN", "INTEGER", "VARCHAR")
  ├── Renderer component (current)
  └── (Future: separate View + Edit components)
```

**Current Pattern** (`src/components/masterdata/boolean.tsx`):

```tsx
"use client";
interface FormProps {
  name: string;
  description: string;
  pastValue?: boolean;
  editable?: boolean;
  mandatory?: boolean;
}

export function BooleanForm({
  name,
  description,
  pastValue = false,
  editable = true,
}: FormProps) {
  const [checked, setChecked] = useState(pastValue);
  const gridSpan = { base: 12, sm: 6, lg: 4 };

  return (
    <GridCol span={gridSpan}>
      <Checkbox
        label={name}
        checked={checked}
        onChange={(e) => setChecked(e.currentTarget.checked)}
        disabled={!editable}
        description={description}
      />
    </GridCol>
  );
}
```

**Key characteristics**:

- Use `"use client"` (state needed for interactivity)
- Accept `FormProps` interface with property metadata
- Responsive `GridCol` with mobile-first spans: `{ base: 12, sm: 6, lg: 4 }`
- Use Mantine form components only

---

## Dynamic Routing & Data Fetching (Phase 0 Pattern)

### Route Structure

**Entity Routes** (dynamic):

```
src/app/(entities)/space/[spaceCode]/page.tsx
src/app/(entities)/project/[projectPermId]/page.tsx
src/app/(entities)/collection/[collectionPermId]/page.tsx
src/app/(entities)/dataset/[datasetPermId]/page.tsx
src/app/(entities)/object/[objectPermId]/page.tsx
```

**Misc Routes** (grouped, static):

```
src/app/(misc)/dashboard/page.tsx
src/app/(misc)/search/page.tsx
src/app/(misc)/inventory/page.tsx
src/app/(misc)/create/page.tsx
src/app/(misc)/settings/page.tsx
src/app/(misc)/user/page.tsx
```

### Server Component with Dynamic Parameters

Use async Server Components to handle dynamic parameters:

```tsx
// src/app/(entities)/space/[spaceCode]/page.tsx
export interface SpaceOverviewPageProps {
  params: Promise<{ spaceCode: string }>;
}

export default async function SpaceOverviewPage({
  params,
}: SpaceOverviewPageProps) {
  const { spaceCode } = await params;
  const spaceOverview = await getSpaceOverview(spaceCode);

  return (
    <Stack>
      <Header spaceName={spaceOverview.space.code} />
      <MetadataPanel {...spaceOverview.space} />
      <ProjectsTable projects={spaceOverview.projects} />
    </Stack>
  );
}
```

**Key**: Always `await params` (Next.js 16 change). Pass data to child components via props.

### Mock Data in Server Functions

Store mock data in `src/lib/spaces/` (or similar) alongside data-fetching functions:

```tsx
// src/lib/spaces/mockProvider.ts
export function getSpaceOverviewMock(spaceCode: string): SpaceOverview | null {
  const mockData = {
    /* ... */
  };
  return mockData;
}

// src/lib/spaces/getSpaceOverview.ts
export async function getSpaceOverview(
  spaceCode: string,
): Promise<SpaceOverview> {
  // Phase 0: mock
  const spaceOverview = getSpaceOverviewMock(spaceCode);
  if (!spaceOverview) throw new Error(`Space not found: ${spaceCode}`);
  return spaceOverview;

  // Phase 1: replace with API call
  // const response = await fetch(`/api/spaces/${spaceCode}`);
  // if (!response.ok) throw new Error(`Space not found: ${spaceCode}`);
  // return response.json();
}
```

**Transition to Phase 1**: Update `getSpaceOverview()` function only; components remain unchanged.

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

### Server Component (Dynamic Route Page)

```tsx
// src/app/(entities)/space/[spaceCode]/page.tsx
export interface SpaceOverviewPageProps {
  params: Promise<{ spaceCode: string }>;
}

export default async function SpaceOverviewPage({
  params,
}: SpaceOverviewPageProps) {
  const { spaceCode } = await params;
  const spaceOverview = await getSpaceOverview(spaceCode);

  return (
    <Stack>
      <Header spaceName={spaceOverview.space.code} />
      <MetadataPanel registrationDate={spaceOverview.space.registrationDate} />
      <ProjectsTable projects={spaceOverview.projects} />
    </Stack>
  );
}
```

**Key**: No `"use client"`, async function, pass data via props to child components.

### Dashboard Server Component with Mock Data

```tsx
// src/app/(misc)/dashboard/page.tsx
export default function DashboardPage() {
  const MOCK_SPACES = [
    /* ... */
  ];

  return (
    <Grid>
      <GridCol span={{ base: 12, lg: 8 }}>
        <Header title="Dashboard" />
      </GridCol>
      <GridCol span={{ base: 12, lg: 4 }}>
        <SpacesOverviewCard spaces={MOCK_SPACES} />
      </GridCol>
    </Grid>
  );
}
```

### Client Component for User Interaction

```tsx
// src/components/spaces/ProjectsTable.client.tsx
"use client";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { Project } from "@/types/openbis";

interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const columns: MRT_ColumnDef<Project>[] = [
    { accessorKey: "code", header: "Code" },
    { accessorKey: "description", header: "Description" },
  ];

  return <MantineReactTable columns={columns} data={projects} />;
}
```

### Masterdata Property Component (Client + State)

```tsx
// src/components/masterdata/boolean.tsx
"use client";
import { Checkbox, GridCol } from "@mantine/core";
import { useState } from "react";

interface FormProps {
  name: string;
  description: string;
  pastValue?: boolean;
  editable?: boolean;
  mandatory?: boolean;
}

export function BooleanForm({
  name,
  description,
  pastValue = false,
  editable = true,
}: FormProps) {
  const [checked, setChecked] = useState(pastValue);
  const gridSpan = { base: 12, sm: 6, lg: 4 };

  return (
    <GridCol span={gridSpan}>
      <Checkbox
        label={name}
        checked={checked}
        onChange={(e) => setChecked(e.currentTarget.checked)}
        disabled={!editable}
        description={description}
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
- **Docstrings**: For complex functions/types, use JSDoc style

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

### Pull Request Strategy

**All feature PRs target `develop` (not `main`)**:

1. Branch from `develop`: `git checkout -b feature/your-feature`
2. Commit frequently during exploration (messy is OK)
3. Before PR: Clean up with `git rebase -i origin/develop`
4. Push: `git push origin feature/your-feature`
5. Create PR: Base branch = **`develop`**, Compare = `feature/your-feature`
6. After merge: Commits squashed into develop

**Only `main` receives stable releases** (after Phase 0 complete):

- `develop` → `main` (tagged v0.1.0, v0.2.0, etc.)
- Direct commits to `main` prohibited

See `docs/git-workflow.md` for details.

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
2. **Read docs**:
   - `docs/architecture.md` – Folder structure, naming conventions, schema-driven patterns
   - `docs/visual-first-workflow.md` – Mock data strategy, Phase 0 → Phase 1 integration
   - `docs/storybook-guide.md` – Component documentation & regression testing
   - `docs/coding-standards.md` – Code quality, TypeScript, accessibility
   - `docs/tech-stack.md` – Dependencies, tooling roadmap
3. **Verify approach**: Are you building with mock data (Phase 0) or integrating real API (Phase 1)?
4. **Test Mantine first**: 99% of UI needs are solved by Mantine. Don't custom-code layouts.
5. **Use TypeScript**: Always define prop interfaces; let inference handle the rest.

---

## Project Management & Development Workflow

- **Phases**: Phase 0 (Foundations) → Phase 1 (API Integration) → Phase 2 (Advanced ELN)
- **Development approach**: Visual-first with mock data (Phase 0), real API integration (Phase 1+)
- **Issue hierarchy**: Epic → Feature → Task. Every issue needs `type:*`, `phase:*`, and `domain:*` labels.
- **Issue templates**: Use the correct template — `epic.md`, `feature_request.md`, `sub_issue.md`, or `bug_report.md`
- **Phase labels**: `phase:0-foundations`, `phase:1-api`, `phase:2-eln`, `phase:backlog`
- **Domain labels**: `domain:auth`, `domain:navigation`, `domain:entities`, `domain:files`, `domain:properties`, `domain:types`, `domain:users`, `domain:search`, `domain:grids`, `domain:import-export`, `domain:eln`, `domain:admin`, `domain:shell`, `domain:infra`
- **Branches**: `feature/<domain>-<short-name>` branched from `develop`, squash-merged via PR
- **Commits**: Conventional Commits — `feat(entities): add ObjectPanel component (#42)`
- **Testing**: Storybook stories (Phase 0+), unit tests with React Testing Library (Phase 1+)

See `docs/project-management.md` for the full label registry, GitHub Projects setup, and workflow.
See `docs/git-workflow.md` for detailed branch, commit, and PR strategies.

---

## Summary

- **Server-first**: Data fetching on server, Props to Client Components
- **Schema-driven**: Property renderers in `masterdata/` map to openBIS types
- **Mantine-only**: No other UI frameworks
- **Phase-aware**: Phase 0 = UI scaffolding only, no API/auth yet
- **Strict layering**: `app/` ≠ `components/` ≠ `lib/`
- **TypeScript strict**: Fix type errors, don't suppress

Follow these rules. They exist for maintainability at scale.
