# Architecture – NextLaBIS

NextLaBIS is a **schema-driven web frontend for openBIS ELN/LIMS**, built with Next.js App Router, React Server Components, and Mantine. This document describes the current architecture, folder structure, and coding patterns.

---

## Project Context

- **Project**: NextLaBIS – Web UI for openBIS Electronic Lab Notebook / Laboratory Information Management System
- **Current Phase**: **Phase 0 – Foundations** (dashboard and object views with mock data; visual-first development approach)
- **Stack**: Next.js 16, React 19, TypeScript 5, Mantine 7, @tabler/icons-react
- **Key Architecture**: Server-first data flow + schema-driven property renderers
- **Location**: All code lives in `nextapp/` folder

---

## Development Approach: Visual-First with Mock Data

**Current Strategy** (Phase 0):

- Build dashboard and object views with **mock data first** for direct visual iteration
- Components developed independently of openBIS API integration
- Clear separation: mock data implementation → real API integration path
- All components designed to accept data via props (server-side injection ready)

**Transition Path** (Phase 1):

- Replace mock data with `/app/api/*` endpoints
- Implement openBIS client in `src/lib/openbis/` (does not yet exist)
- Components remain unchanged; only data flow switches from mock → API

---

## Golden Rules (Non-Negotiable)

### Rendering & Components

- Pages and layouts are **Server Components by default**
- **DO NOT** add `"use client"` to pages or layouts
- Client Components allowed **only for user interaction** (state, event handlers)
- Client Components **MUST be small and focused**
- Suffix convention: `.client.tsx` for client components, `.server.tsx` for clarity in dashboard

### Data Flow

- Fetch data on the **server** (currently mock, Phase 1: openBIS API)
- Pass data to Client Components via **props only**
- Do not duplicate openBIS logic in UI code
- Do not use raw openBIS DTOs in components; transform server-side

### openBIS Access (Phase 1+)

- openBIS will be **server-only**
- **NEVER** call openBIS from the browser
- **NEVER** import openBIS clients into Client Components
- Client Components may call only `/app/api/*` endpoints

---

## Folder Responsibilities

| Folder                       | Purpose                       | Rules                                                                       | Examples                                                |
| ---------------------------- | ----------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| `src/app/`                   | Routes, pages, layouts        | Server Components by default. No business logic.                            | `dashboard/page.tsx`, `layout.tsx`                      |
| `src/app/api/`               | API endpoints (Phase 1+)      | Currently empty. Will interface with openBIS.                               | `/api/spaces/[id]` (future)                             |
| `src/components/dashboard/`  | Dashboard-specific UI         | Server Components with `.server.tsx` suffix. Cards, summaries, overviews.   | `Header.server.tsx`, `SearchCard.server.tsx`            |
| `src/components/masterdata/` | Property-type renderers       | Schema-driven. One component per openBIS property kind. No openBIS imports. | `boolean.tsx`, `varchar.tsx`, `integer.tsx`, `real.tsx` |
| `src/components/shared/`     | Reusable UI primitives        | Used across multiple features (dashboard, object views, etc.).              | `RightsPill/`, `TagPill/`                               |
| `src/components/shell/`      | App shell & navigation        | Client Components (`.client.tsx`). Layout wrapper, sidebar, topnav.         | `AppShellRoot.client.tsx`, `TopNav.client.tsx`          |
| `src/lib/model/`             | Domain models & types         | Entity definitions, type schemas. No openBIS API yet.                       | `OpenBISModel.ts`                                       |
| `src/types/`                 | Shared TypeScript types       | Global type definitions (roles, enums, interfaces).                         | `openbis.ts`                                            |
| `src/lib/`                   | Utilities & future API client | Reserved for: openBIS client (Phase 1+), shared hooks, utilities.           | (Phase 1+)                                              |

---

## File & Naming Conventions

Enforced by `scripts/check-naming.js`:

| File Type         | Convention                   | Pattern                            | Examples                               |
| ----------------- | ---------------------------- | ---------------------------------- | -------------------------------------- |
| Components        | `PascalCase.tsx`             | `^[A-Z][a-zA-Z0-9]*\.tsx?$`        | `BooleanForm.tsx`, `Header.server.tsx` |
| Server Components | `.server.tsx` suffix         | Clarity in `components/dashboard/` | `Header.server.tsx`                    |
| Client Components | `.client.tsx` suffix         | Interactive components             | `AppShellRoot.client.tsx`              |
| Utilities         | `snake_case.ts`              | `^[a-z][a-z0-9_]*\.tsx?$`          | `common_functions.ts`                  |
| Type files        | Type definition files        | `openbis.ts`, `OpenBISModel.ts`    | `src/types/openbis.ts`                 |
| Default           | `kebab-case` or `snake_case` | `^[a-z][a-z0-9_-]*\.(tsx?│jsx?)$`  | Other files                            |

**Enforcement**: Run `npm run check-naming` locally before committing. CI will reject violations.

---

## Schema-Driven Pattern

Each openBIS property kind maps to a component in `src/components/masterdata/`:

**Current Implementation** (flat structure):

```shell
masterdata/
  boolean.tsx           → BooleanForm component
  integer.tsx           → IntegerForm component
  varchar.tsx           → VarcharForm component
  real.tsx              → RealForm component
  ... etc
```

**Component Interface** (`FormProps`):

```typescript
interface FormProps {
  code: string; // Property code (unique)
  name: string; // Display name
  description: string; // Long-form description
  pastValue?: string | boolean | number; // Previous value (for forms)
  editable?: boolean; // Readonly if false
  mandatory?: boolean; // Shows asterisk if true
  error?: string; // Validation error message
}
```

**Example** (`src/components/masterdata/boolean.tsx`):

```tsx
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

## Styling Rules

### Mantine Only

- **REQUIRED**: Use Mantine 7 components and theme tokens
- **FORBIDDEN**: Tailwind, shadcn, Radix, or custom CSS frameworks
- Layout: `Grid`, `GridCol`, `Stack`, `Flex` (responsive by design)
- Icons: `@tabler/icons-react` only
- Theme: defined in `src/app/styles/theme.ts`

### Responsive Design

- Mobile-first: `{ base: 12, sm: 6, lg: "content" }`
- Test on mobile, tablet, desktop
- Verify breakpoints match Mantine defaults

### CSS Modules

Only when Mantine is insufficient:

```tsx
// Component.module.css – scoped to Component.tsx
import styles from "./Component.module.css";
```

---

## Mock Data Strategy & API Integration Path

### Phase 0: Mock Data Development

- All data flows through props (no changes needed for Phase 1)
- Mock data stored alongside page components or in `src/lib/mock/` (future)
- Use realistic data structures that match openBIS entities
- Document mock data assumptions in comments

**Example** (`src/app/dashboard/page.tsx`):

```tsx
const MOCK_SPACES = [
  {
    code: "SPACE_ONE",
    modificationDate: new Date("2025-12-10"),
    // ... more fields
  },
  // ...
];

export default function DashboardPage() {
  return <SpacesOverviewCard spaces={MOCK_SPACES} />;
}
```

### Phase 1: Real API Integration

**No component changes required.** Only data source changes:

```tsx
// src/app/dashboard/page.tsx (Phase 1)
import { fetchSpaces } from "@/lib/openbis/server";

export default async function DashboardPage() {
  const spaces = await fetchSpaces(); // Real API
  return <SpacesOverviewCard spaces={spaces} />;
}
```

---

## Component Reusability & Preservation

Components developed with mock data remain **100% reusable**:

1. **Shared Components** (`src/components/shared/`) are feature-agnostic

   - Directly reuse in dashboard, object views, forms
   - No mock data embedded

2. **Masterdata Components** (`src/components/masterdata/`) are schema-driven

   - Input: `FormProps` interface (consistent across all property types)
   - Reuse in any form (object creation, editing, filtering)

3. **Dashboard Components** (`src/components/dashboard/`) accept data via props
   - Prop interface is your "contract"
   - Replace mock data source; components stay the same

**Best Practice**: Define prop interfaces early, treat them as contracts. Mock data becomes implementation detail.

---

## Storybook Documentation (Visual-First Workflow)

Storybook amplifies the visual-first approach by documenting component states and variations.

### Setup (when ready)

```bash
cd nextapp
npx storybook@latest init
npm install @storybook/addon-themes
```

### Story Convention

One `.stories.tsx` file per component (or per folder):

```tsx
// src/components/masterdata/boolean.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BooleanForm } from "./boolean";

const meta: Meta<typeof BooleanForm> = {
  component: BooleanForm,
  title: "Masterdata/Boolean",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: "BOOL_PROP",
    name: "Is Active",
    description: "Whether this object is active",
    editable: true,
    mandatory: false,
  },
};

export const Mandatory: Story = {
  args: { ...Default.args, mandatory: true },
};

export const Readonly: Story = {
  args: { ...Default.args, editable: false, pastValue: true },
};

export const WithError: Story = {
  args: { ...Default.args, error: "This field is required" },
};
```

### Benefits

- Visual regression testing (Percy, Chromatic)
- Live documentation of all component states
- Design hand-off to backend developers
- Easy to review design changes in PRs

---

## What NOT to Do (Phase 0)

- ❌ Import `lib/openbis/*` (doesn't exist yet)
- ❌ Create `/app/api/*` route handlers (Phase 1)
- ❌ Add state management beyond `useState` (Zustand/Context in Phase 1)
- ❌ Call `fetch()` from Client Components to external APIs
- ❌ Use raw openBIS DTOs; transform server-side
- ❌ Introduce new UI libraries (Tailwind, shadcn, Radix)

---

## Recommended Project Management Structure

To reduce git history noise and clarify your visual-first workflow:

### Branch Strategy

- **Feature branches per view/feature**:
  - `feature/dashboard-overview` → mock data + UI
  - `feature/object-view` → mock data + UI
  - `feature/property-renderers` → all masterdata components
- **Work-in-progress commits** (squash before merge):
  - Commit frequently while exploring UI
  - Squash into logical chunks before PR
  - Cleaner history, easier review

### Issue/Epic Structure (adapted to visual-first)

Instead of "Phase 0 → Phase 1":

```shell
Epic: Dashboard View
├── [x] Mock data structure
├── [x] UI scaffolding with mock
├── [ ] API integration point (Phase 1)
└── [ ] Real openBIS data (Phase 1)

Epic: Object View
├── [ ] Mock data structure
├── [ ] UI scaffolding with mock
├── [ ] API integration point (Phase 1)
└── [ ] Real openBIS data (Phase 1)
```

### Commit Message Strategy

```shell
[feature/dashboard] Add spaces overview card with mock data
[feature/dashboard] Fix responsive layout on mobile
[refactor/shared] Extract TagPill to shared components

// When ready for Phase 1:
[phase1/dashboard] Integrate real spaces API
```

This way, your commits reflect both the feature AND the development stage.

---

## Summary

- **Server-first** data flow (mock → API)
- **Schema-driven** property renderers
- **Strict naming** enforced by CI
- **Visual-first** with mock data (reusable components)
- **Clear Phase 0 → Phase 1** integration path
- **Storybook** for documentation & regression testing
- **Components are contracts** (define prop interfaces early)
