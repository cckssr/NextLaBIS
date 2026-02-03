# AGENTS.md - GitHub Copilot Coding Agent Instructions

This file provides instructions for GitHub Copilot coding agent when working on the NextLaBIS repository.

---

## Project Overview

**NextLaBIS** is a schema-driven web frontend for openBIS ELN/LIMS (Electronic Lab Notebook / Laboratory Information Management System).

| Aspect          | Details                                                  |
| --------------- | -------------------------------------------------------- |
| Stack           | Next.js 16, React 19, TypeScript 5, Mantine 7            |
| Architecture    | Server-first data flow, schema-driven property renderers |
| Current Phase   | Phase 0 – Visual-first with mock data                    |
| Source Location | All code in `nextapp/` folder                            |

---

## Build & Validation Commands

Always run these commands from the `nextapp/` directory:

```bash
cd nextapp

# Install dependencies (required before first build)
npm install

# Development server
npm run dev

# Production build (validates all code)
npm run build

# Linting
npm run lint

# Type checking
npx tsc --noEmit

# File naming conventions check
npm run check-naming
```

### Validation Before Committing

Run these checks before any commit:

```bash
cd nextapp && npm run check-naming && npm run lint && npx tsc --noEmit && npm run build
```

---

## Project Structure

```
nextapp/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (entities)/         # Dynamic entity routes (space, project, etc.)
│   │   ├── (misc)/             # Static pages (dashboard, search, etc.)
│   │   ├── api/                # API routes (empty in Phase 0)
│   │   └── styles/             # Global CSS and theme
│   ├── components/
│   │   ├── dashboard/          # Dashboard cards (Server Components)
│   │   ├── masterdata/         # Property type renderers (schema-driven)
│   │   ├── objects/            # Object view components
│   │   ├── shared/             # Reusable UI patterns
│   │   ├── shell/              # App shell, navigation
│   │   └── spaces/             # Space-related components
│   ├── lib/
│   │   ├── collections/        # Collection data fetching
│   │   ├── mocks/              # Mock data for Phase 0
│   │   ├── model/              # TypeScript type definitions
│   │   ├── objects/            # Object data fetching
│   │   ├── projects/           # Project data fetching
│   │   ├── spaces/             # Space data fetching
│   │   └── utils/              # Utility functions
│   └── types/                  # Global TypeScript types
├── scripts/                    # Build and automation scripts
└── public/                     # Static assets
```

---

## Coding Standards

### File Naming

| Location          | Convention              | Example                    |
| ----------------- | ----------------------- | -------------------------- |
| Components        | PascalCase.tsx          | `SpaceCard.server.tsx`     |
| Server Components | `.server.tsx` suffix    | `Header.server.tsx`        |
| Client Components | `.client.tsx` suffix    | `ProjectsTable.client.tsx` |
| Utilities         | camelCase or snake_case | `datetimeFunctions.ts`     |

### Component Patterns

**Server Components (default):**

```tsx
// No "use client" directive
export default async function Page({ params }: Props) {
  const data = await fetchData();
  return <Component data={data} />;
}
```

**Client Components (only when needed):**

```tsx
"use client";
import { useState } from "react";

export function InteractiveComponent() {
  const [state, setState] = useState();
  // ...
}
```

### UI Framework

- **REQUIRED:** Mantine 7 components and theme tokens
- **FORBIDDEN:** Tailwind, shadcn, Radix, raw CSS frameworks
- **Icons:** @tabler/icons-react only

---

## Phase 0 Constraints

Do NOT implement these (reserved for Phase 1+):

- ❌ openBIS API client (`lib/openbis/`)
- ❌ Authentication or session management
- ❌ `/app/api/*` route handlers for openBIS
- ❌ State management beyond useState (no Zustand/Context)

✅ Focus on:

- UI scaffolding with mock data
- Property renderers in `components/masterdata/`
- Dashboard and entity views

---

## Custom Agents

### TODO-to-Issues Agent

Location: `.github/agents/todo-to-issues.md`

This agent enhances the `todo-issues.json` file with detailed issue descriptions. It does NOT create PRs.

**Workflow:**

```bash
# 1. Scan codebase and generate JSON
npm run sync-todos

# 2. Ask Copilot to enhance the JSON
# "Enhance the todo-issues.json with detailed descriptions"

# 3. Create issues from the enhanced JSON
npm run sync-todos:create
```

**What the Agent Does:**

- Reads `nextapp/todo-issues.json`
- Analyzes code context for each TODO
- Writes detailed descriptions, implementation suggestions, acceptance criteria
- Adds appropriate labels based on analysis

**Trigger Phrases:**

- "Enhance the todo-issues.json with detailed descriptions"
- "Analyze the TODOs and write better issue descriptions"
- "Fill in the TODO issue details"

---

## Labels Reference

### Type Labels

- `type:tech-debt` - Technical debt items
- `type:bug` - Bug fixes
- `type:epic` - Large features
- `type:sub-issue` - Parts of an epic

### Phase Labels

- `phase:0-foundations` - Current phase (visual-first)
- `phase:1-api-integration` - API integration
- `phase:2-eln-features` - Advanced features

### Feature Labels

- `feature:dashboard`
- `feature:object-view`
- `feature:masterdata`
- `feature:spaces`
- `feature:type-system`

### Status Labels

- `status:needs-scoping`
- `status:in-progress`
- `status:ready-for-review`

---

## Common Tasks

### Adding a New Property Renderer

1. Create file in `nextapp/src/components/masterdata/`
2. Follow pattern from existing renderers (e.g., `BooleanRenderer.tsx`)
3. Export from `index.ts`
4. Add case in `PropertyRenderer.tsx`

### Adding a New Entity View

1. Create route in `nextapp/src/app/(entities)/[entity]/[id]/page.tsx`
2. Create Server Component for data fetching
3. Add mock data in `lib/[entity]/mockProvider.ts`
4. Create data fetching function in `lib/[entity]/get[Entity]Overview.ts`

### Running the TODO Scanner

```bash
cd nextapp

# Step 1: Scan codebase and generate todo-issues.json
npm run sync-todos

# Step 2: Ask Copilot to enhance the JSON (optional)
# "Enhance the todo-issues.json with detailed descriptions"

# Step 3: Create issues from the JSON (requires GITHUB_TOKEN)
npm run sync-todos:create

# Dry run (preview without creating issues)
npm run sync-todos:dry-run
```

---

## Git Workflow

- **Default branch:** `main` (protected)
- **Integration branch:** `develop`
- **Feature branches:** `feature/*` → merge to `develop`
- **All PRs** target `develop`, not `main`

---

## Documentation

For detailed information, see:

- [docs/architecture.md](docs/architecture.md) - Project structure
- [docs/coding-standards.md](docs/coding-standards.md) - Code quality
- [docs/visual-first-workflow.md](docs/visual-first-workflow.md) - Phase 0 approach
- [docs/git-workflow.md](docs/git-workflow.md) - Branch strategy
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - Detailed Copilot instructions
