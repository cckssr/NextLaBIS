# Storybook Setup & Best Practices

## Overview

Storybook serves two purposes in NextLaBIS:

1. **Living documentation** – Visual reference for all components & their states
2. **Visual regression testing** – Catch unintended design changes early
3. **Design hand-off** – Developers & designers review components in isolation

---

## Setup (When Ready)

### Step 1: Initialize Storybook in `nextapp/`

```bash
cd nextapp
npx storybook@latest init
```

Choose:

- **React** (framework)
- **Vite** (builder, matches Next.js Turbopack philosophy)

### Step 2: Install Mantine Theme Addon

```bash
npm install --save-dev @storybook/addon-themes
```

### Step 3: Configure Storybook (`.storybook/main.ts`)

```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-themes",
    "@storybook/addon-essentials", // already included
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
```

### Step 4: Configure Mantine Theme (`.storybook/preview.tsx`)

```typescript
import type { Preview } from "@storybook/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../src/app/styles/theme";
import "@mantine/core/styles.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <MantineProvider theme={theme}>
        <Story />
      </MantineProvider>
    ),
  ],
  parameters: {
    layout: "padded",
  },
};

export default preview;
```

### Step 5: Add npm Scripts (`nextapp/package.json`)

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### Step 6: Run Storybook

```bash
npm run storybook
# Opens http://localhost:6006
```

---

## Story Convention

Create one `.stories.tsx` file per component (or per folder for shared components).

### Basic Story Template

```typescript
// src/components/masterdata/boolean.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BooleanForm } from "./boolean";

const meta: Meta<typeof BooleanForm> = {
  component: BooleanForm,
  title: "Masterdata/Boolean",
  tags: ["autodocs"], // Auto-generate docs
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default happy path
export const Default: Story = {
  args: {
    code: "IS_ACTIVE",
    name: "Is Active",
    description: "Whether this object is active in the system",
    editable: true,
    mandatory: false,
  },
};

// Mandatory field (shows asterisk)
export const Mandatory: Story = {
  args: { ...Default.args, mandatory: true },
};

// Readonly (disabled state)
export const Readonly: Story = {
  args: { ...Default.args, editable: false, pastValue: true },
};

// With validation error
export const WithError: Story = {
  args: { ...Default.args, error: "This field is required" },
};

// Long description (tests text wrapping)
export const LongDescription: Story = {
  args: {
    ...Default.args,
    description:
      "This is a very long description that explains the purpose and usage of this boolean field in great detail. It may wrap across multiple lines on smaller screens.",
  },
};
```

### Dashboard Component Story

```typescript
// src/components/dashboard/SpacesOverviewCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SpacesOverviewCard } from "./SpacesOverviewCard.server";
import { MOCK_SPACES } from "@/app/dashboard/mock/spaces";

const meta: Meta<typeof SpacesOverviewCard> = {
  component: SpacesOverviewCard,
  title: "Dashboard/SpacesOverview",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // Full page layout
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spaces: MOCK_SPACES,
  },
};

export const Empty: Story = {
  args: {
    spaces: [],
  },
};

export const SingleSpace: Story = {
  args: {
    spaces: [MOCK_SPACES[0]],
  },
};

export const ManySpaces: Story = {
  args: {
    spaces: MOCK_SPACES.concat(MOCK_SPACES), // 8 spaces
  },
};

export const ReadOnlyUser: Story = {
  args: {
    spaces: MOCK_SPACES.map((space) => ({
      ...space,
      spaceRights: "user" as const, // Limited permissions
    })),
  },
};
```

### Shared Component Story

```typescript
// src/components/shared/RightsPill/RightsPill.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { RightsPill } from "./RightsPill";

const meta: Meta<typeof RightsPill> = {
  component: RightsPill,
  title: "Shared/RightsPill",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Admin: Story = {
  args: { role: "admin" },
};

export const PowerUser: Story = {
  args: { role: "power_user" },
};

export const User: Story = {
  args: { role: "user" },
};

export const Observer: Story = {
  args: { role: "observer" },
};
```

---

## Story Organization (Folder Structure in Storybook UI)

Stories are organized by `title` in the `Meta`:

```
Masterdata/
  ├── Boolean
  ├── Integer
  ├── Varchar
  └── Real

Dashboard/
  ├── Header
  ├── SpacesOverview
  └── ActivitiesOverview

Shared/
  ├── RightsPill
  └── TagPill

Shell/
  ├── AppShellRoot
  └── TopNav
```

---

## Best Practices

### 1. **Cover All States**

For every component, create stories for:

- ✅ **Default** (happy path)
- ✅ **Mandatory** (if applicable)
- ✅ **Readonly/Disabled** (if applicable)
- ✅ **With Error** (validation states)
- ✅ **Edge Cases** (empty, long content, many items)

### 2. **Reuse Mock Data**

```typescript
import { MOCK_SPACES } from "@/app/dashboard/mock/spaces";

export const Default: Story = {
  args: { spaces: MOCK_SPACES },
};
```

This keeps mock data DRY and ensures consistency between Storybook and your app.

### 3. **Document Complex Interactions**

Use `play()` function for interactive testing:

```typescript
import { userEvent, within } from "@storybook/test";

export const InteractiveCheckbox: Story = {
  args: { ...Default.args },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await userEvent.click(checkbox);
  },
};
```

### 4. **Use `parameters` for Layout Control**

```typescript
export const FullPage: Story = {
  parameters: {
    layout: 'fullscreen', // No padding
  },
  args: { ... },
};

export const Centered: Story = {
  parameters: {
    layout: 'centered', // Centered in viewport
  },
  args: { ... },
};
```

### 5. **Tag for Filtering**

```typescript
const meta: Meta<typeof Component> = {
  component: Component,
  title: "Category/Component",
  tags: ["autodocs"], // Auto-generate docs page
};
```

### 6. **Viewport Testing**

```typescript
export const MobileView: Story = {
  args: { ... },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1', // iPhone 12
    },
  },
};

export const TabletView: Story = {
  args: { ... },
  parameters: {
    viewport: {
      defaultViewport: 'tablet', // iPad
    },
  },
};
```

---

## Integration with Development Workflow

### Phase 0: Stories as You Build

```bash
# Start Storybook alongside dev server
npm run storybook
# Open another terminal
npm run dev
```

- Build component → add story
- Test in browser → verify in Storybook
- Iterate design → update story

### Phase 1: Stories as Regression Tests

Use tools like **Chromatic** (cloud visual testing):

```bash
npm install --save-dev chromatic
npx chromatic --project-token=YOUR_TOKEN
```

This catches unintended design changes in PRs.

### CI Integration (GitHub Actions)

```yaml
# .github/workflows/storybook.yml
name: Storybook Build
on: [pull_request, push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run build-storybook
      - uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

---

## Storybook vs. Figma

| Aspect              | Storybook                              | Figma                    |
| ------------------- | -------------------------------------- | ------------------------ |
| **Purpose**         | Component library + regression testing | Visual design mockups    |
| **Audience**        | Developers                             | Designers & stakeholders |
| **Data**            | Real mock data from codebase           | Static mockups           |
| **States**          | All interactive states                 | Design variations        |
| **Version Control** | Git (code)                             | Design tool (cloud)      |

**For NextLaBIS**:

- Use **Figma** for design exploration & hand-off
- Use **Storybook** for component documentation & QA

They complement each other.

---

## Maintenance

### Keep Stories in Sync with Components

When a component's prop interface changes:

1. Update the component
2. Update the story args
3. Add new stories if new states are possible

```bash
# Find all stories referencing a component
grep -r "BooleanForm" src/**/*.stories.tsx
```

### Cleanup Unused Stories

Delete story files when their components are removed.

---

## Summary

| Phase       | Storybook Usage                                     |
| ----------- | --------------------------------------------------- |
| **Phase 0** | Document components as you build (design reference) |
| **Phase 1** | Add visual regression testing (Chromatic)           |
| **Phase 2** | Integrate with design system documentation          |

Storybook amplifies the visual-first development approach by making component states explicit and testable.
