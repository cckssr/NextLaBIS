# Visual-First Development Workflow

## Overview

This document describes how NextLaBIS uses a **visual-first, mock-data-driven approach** to reduce complexity and enable rapid iteration during Phase 0.

---

## The Challenge

Traditional approaches separate concerns too early:

- **Problem**: Decide API structure → build backend → build frontend
- **Result**: Long feedback loops, components misaligned with design intent, wasted motion

## Our Solution: Visual-First

- **Build UI first** with realistic mock data
- **Keep components independent** of data source
- **Define contracts (prop interfaces) early**
- **Replace mock data in Phase 1** with zero component changes

---

## Workflow: Phase 0 → Phase 1

### Phase 0: Visual-First Development

**Goal**: Build reusable, testable components with mock data.

#### 1. **Design the Component Interface** (Prop Contract)

Before writing a single JSX line, define what data the component needs:

```typescript
// src/components/dashboard/SpacesOverviewCard.server.tsx
interface SpacesOverviewCardProps {
  spaces: Array<{
    code: string;
    description: string;
    numberOfProjects: number;
    numberOfCollections: number;
    modificationDate: Date;
    modifiedBy: string;
    tags: string[];
    spaceRights: "admin" | "power_user" | "user" | "observer";
  }>;
}
```

**Key**: This interface becomes your **contract** between UI and data source.

#### 2. **Create Realistic Mock Data**

```typescript
// src/app/dashboard/mock/spaces.ts (or inline in page.tsx)
const MOCK_SPACES: SpacesOverviewCardProps["spaces"] = [
  {
    code: "SPACE_ONE",
    description: "High-energy physics lab",
    numberOfProjects: 5,
    numberOfCollections: 2,
    modificationDate: new Date("2025-12-10"),
    modifiedBy: "Dr. Alice",
    tags: ["Research", "Active"],
    spaceRights: "admin",
  },
  // ... more spaces
];
```

**Best Practices**:

- Mirror real openBIS entity structure
- Include edge cases (long descriptions, many tags, empty collections)
- Document assumptions in comments

#### 3. **Build the Component**

```typescript
// src/components/dashboard/SpacesOverviewCard.server.tsx
import { Card, Grid, GridCol, Text, Badge, Flex } from "@mantine/core";

export function SpacesOverviewCard({ spaces }: SpacesOverviewCardProps) {
  return (
    <Grid>
      {spaces.map((space) => (
        <GridCol key={space.code} span={{ base: 12, sm: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md">
            <Flex justify="space-between">
              <Text fw={500}>{space.code}</Text>
              <Badge>{space.spaceRights}</Badge>
            </Flex>
            <Text size="sm" c="dimmed" mt="xs">
              {space.description}
            </Text>
            {/* ... more fields */}
          </Card>
        </GridCol>
      ))}
    </Grid>
  );
}
```

**Key Properties**:

- ✅ Data comes via props (reusable)
- ✅ No async logic (fast iteration)
- ✅ Presentational (pure JSX)

#### 4. **Use in Page with Mock Data**

```typescript
// src/app/dashboard/page.tsx
import { SpacesOverviewCard } from "@/components/dashboard/SpacesOverviewCard.server";
import { MOCK_SPACES } from "./mock/spaces";

export default function DashboardPage() {
  return <SpacesOverviewCard spaces={MOCK_SPACES} />;
}
```

#### 5. **Document in Storybook** (when ready)

```typescript
// src/components/dashboard/SpacesOverviewCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SpacesOverviewCard } from "./SpacesOverviewCard.server";
import { MOCK_SPACES } from "./mock/spaces";

const meta: Meta<typeof SpacesOverviewCard> = {
  component: SpacesOverviewCard,
  title: "Dashboard/SpacesOverview",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { spaces: MOCK_SPACES },
};

export const Empty: Story = {
  args: { spaces: [] },
};

export const SingleSpace: Story = {
  args: { spaces: [MOCK_SPACES[0]] },
};
```

---

### Phase 1: Real API Integration

**No component changes needed.** Only the data source changes:

#### Step 1: Create openBIS Client

```typescript
// src/lib/openbis/server.ts (new file, Phase 1+)
import { ApiClient } from "@/lib/openbis/client";

export async function fetchSpaces() {
  const client = new ApiClient();
  const response = await client.getSpaces();
  // Transform API response to match SpacesOverviewCardProps
  return response.data.spaces.map((space) => ({
    code: space.code,
    description: space.description || "",
    numberOfProjects: space.projects.length,
    numberOfCollections: space.collections.length,
    modificationDate: new Date(space.modificationDate),
    modifiedBy: space.modifiedBy.name,
    tags: space.tags || [],
    spaceRights: mapRights(space.rights), // admin | power_user | user | observer
  }));
}
```

#### Step 2: Update Page (Same Signature!)

```typescript
// src/app/dashboard/page.tsx (Phase 1)
import { SpacesOverviewCard } from "@/components/dashboard/SpacesOverviewCard.server";
import { fetchSpaces } from "@/lib/openbis/server";

export default async function DashboardPage() {
  const spaces = await fetchSpaces(); // Real API (same prop interface)
  return <SpacesOverviewCard spaces={spaces} />;
}
```

**That's it.** The component remains unchanged. The contract (prop interface) was designed correctly.

---

## Git & Commit Strategy

### During Phase 0: Commit Frequently

Work in feature branches and commit often:

```bash
git checkout -b feature/dashboard-overview
git commit -m "[feature/dashboard] Add mock spaces data"
git commit -m "[feature/dashboard] Build SpacesOverviewCard component"
git commit -m "[feature/dashboard] Fix responsive grid on mobile"
git commit -m "[feature/dashboard] Add space rights badge styling"
```

### Before PR: Squash or Rebase

Clean up commits before merging:

```bash
git rebase -i main        # Interactive rebase to squash commits
# OR
git reset main --soft     # Keep changes, reset to main
git commit -m "Add dashboard overview with mock data"
git push origin feature/dashboard-overview --force
```

This keeps the main branch history clean while allowing you to explore in branches.

### Commit Message Format

```shell
[feature/FEATURE_NAME] Brief description
[refactor/FEATURE_NAME] Brief description
[fix/FEATURE_NAME] Brief description

Example:
[feature/dashboard] Add SpacesOverviewCard with mock data
[refactor/shared] Extract RightsPill to shared components
[fix/object-view] Fix date formatting in timestamp field
```

---

## Component Reusability Checklist

Before merging a component to main, ensure:

- [ ] **Prop interface is well-defined** (no `any` types)
- [ ] **No hardcoded data** (all dynamic via props)
- [ ] **No API calls inside component** (data passed as props)
- [ ] **Accessible** (ARIA labels, semantic HTML)
- [ ] **Responsive** (tested on mobile, tablet, desktop)
- [ ] **Storybook story added** (at least one happy path + edge cases)
- [ ] **Types exported** (other components can import the prop interface)

---

## Handling Phase 1 Integration

### Checklist When openBIS API Becomes Available

- [ ] Implement `src/lib/openbis/server.ts` with fetch functions
- [ ] Create mapper functions to transform API responses to component prop interfaces
- [ ] Add error handling and loading states (optional, may add in Phase 1)
- [ ] Update all pages to call fetch functions instead of using mock data
- [ ] Delete mock data files (or keep for tests)
- [ ] Update Storybook to use real API data (optional)

### Testing Transition

Use the same prop interfaces for testing:

```typescript
// __tests__/SpacesOverviewCard.test.tsx
import { SpacesOverviewCard } from "@/components/dashboard/SpacesOverviewCard.server";
import { MOCK_SPACES } from "../mock/spaces";

it("renders spaces correctly", () => {
  render(<SpacesOverviewCard spaces={MOCK_SPACES} />);
  expect(screen.getByText("SPACE_ONE")).toBeInTheDocument();
});
```

Whether data comes from mock or API, the test is identical.

---

## Example: Dashboard → Object View

### Phase 0: Build Object View with Mock Data

```shell
[feature/object-view]
  ├── Define prop interface (ObjectViewProps)
  ├── Create mock object data (OpenBIS object structure)
  ├── Build ObjectView component (server-side rendering)
  ├── Add property renderers (masterdata components)
  ├── Test responsive layout
  └── Add Storybook stories

[feature/property-renderers]
  ├── BooleanForm.tsx
  ├── IntegerForm.tsx
  ├── VarcharForm.tsx
  └── ... etc (all accept FormProps interface)
```

### Phase 1: Swap Mock Data for Real API

```shell
[phase1/object-view]
  ├── Implement openBIS.getObject(permId) in lib/openbis/server.ts
  ├── Create mapper: API response → ObjectViewProps
  ├── Update src/app/objects/[permId]/page.tsx to call API
  ├── Delete mock data
  └── ✓ ObjectView component stays the same
```

---

## Summary: Visual-First Guarantees

| Aspect               | What You Get                                                             |
| -------------------- | ------------------------------------------------------------------------ |
| **No waste**         | Components built in Phase 0 work in Phase 1 (prop interface is contract) |
| **Fast feedback**    | Mock data = instant iteration, no API roundtrips                         |
| **Clear transition** | Data source change is isolated to pages & lib/, not components           |
| **Testability**      | Same prop interface used in tests, mock data, and real API               |
| **Reusability**      | Components indifferent to mock vs. real data (props only)                |
| **Git hygiene**      | Feature branches + squash = clean history                                |
