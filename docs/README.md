# NextLaBIS Documentation

Welcome to the NextLaBIS documentation. This folder contains guides for developers, designers, and project managers.

---

## Quick Start

**New to the project?** Read these in order:

1. [architecture.md](./architecture.md) – How the project is structured and why
2. [visual-first-workflow.md](./visual-first-workflow.md) – How we build with mock data first
3. [git-workflow.md](./git-workflow.md) – How to manage branches and commits
4. [storybook-guide.md](./storybook-guide.md) – How to document components

---

## For Different Roles

### 👨‍💻 Frontend Developers

1. **Start here**: [architecture.md](./architecture.md)
   - Folder structure
   - Component patterns
   - Naming conventions
2. **Building a feature**: [visual-first-workflow.md](./visual-first-workflow.md)

   - Define prop interfaces
   - Create mock data
   - Build components with Mantine
   - Document in Storybook

3. **Contributing code**: [git-workflow.md](./git-workflow.md)

   - Branch strategy
   - Commit hygiene
   - PR workflow

4. **Code standards**: [coding-standards.md](./coding-standards.md)
   - TypeScript practices
   - React patterns
   - Testing approach

### 🎨 Designers

1. **Component library**:

   - View Storybook (`npm run storybook`) for all component states
   - Reference: [storybook-guide.md](./storybook-guide.md)

2. **System overview**: [tech-stack.md](./tech-stack.md)

   - Mantine 7 components
   - Color theme
   - Responsive breakpoints

3. **Design hand-off**:
   - Components live in Figma (visual mockups)
   - Storybook shows actual implementation
   - See [storybook-guide.md](./storybook-guide.md) for integration

### 🗂️ Project Managers

1. **Roadmap & tracking**: [project-management.md](./project-management.md)

   - How issues are organized
   - Feature vs. phase structure
   - Labels and status tracking

2. **Development approach**: [visual-first-workflow.md](./visual-first-workflow.md)

   - Phase 0 (mock data) → Phase 1 (real API)
   - Why components don't waste

3. **Timeline planning**: [git-workflow.md](./git-workflow.md)
   - Branch strategy clarifies work boundaries
   - Parallel vs. serial feature development

---

## File Reference

| File                                                   | Purpose                                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [architecture.md](./architecture.md)                   | Project structure, folder responsibilities, naming conventions, schema-driven patterns |
| [visual-first-workflow.md](./visual-first-workflow.md) | How to build features with mock data; Phase 0 → Phase 1 integration path               |
| [git-workflow.md](./git-workflow.md)                   | Branch strategy, commit hygiene, PR workflow, issue organization                       |
| [storybook-guide.md](./storybook-guide.md)             | Component documentation, testing, design hand-off                                      |
| [coding-standards.md](./coding-standards.md)           | TypeScript, React, accessibility, state management                                     |
| [tech-stack.md](./tech-stack.md)                       | Dependencies, versions, tooling                                                        |
| [project-management.md](./project-management.md)       | Issue tracking, labels, phases, features                                               |

---

## Key Concepts

### Visual-First Development

Build UI with mock data first, replace mock data with real API later. **Components never change.**

```shell
Phase 0: Component + Mock Data
  ↓
Define prop interface
  ↓
Phase 1: Same Component + Real API
```

### Schema-Driven Components

Each openBIS property type has a component. Components accept data via props, not hardcoded.

```shell
src/components/masterdata/
  ├── boolean.tsx       → BooleanForm component
  ├── integer.tsx       → IntegerForm component
  └── varchar.tsx       → VarcharForm component
```

### Strict Naming Conventions

Enforced by CI:

- **Components**: `PascalCase.tsx` (e.g., `BooleanForm.tsx`)
- **Utilities**: `snake_case.ts` (e.g., `common_functions.ts`)
- **Server components**: `.server.tsx` suffix (e.g., `Header.server.tsx`)
- **Client components**: `.client.tsx` suffix (e.g., `AppShellRoot.client.tsx`)

### Phase 0 → Phase 1

**Phase 0** (now):

- UI scaffolding with mock data
- Component development
- Storybook documentation

**Phase 1** (upcoming):

- Real openBIS API integration
- Authentication flows
- Advanced features

---

## Common Tasks

### "How do I build a new dashboard card?"

1. Read [visual-first-workflow.md](./visual-first-workflow.md#workflow-phase-0--phase-1)
2. Define prop interface
3. Create mock data
4. Build component with Mantine
5. Add Storybook story
6. Create PR

### "How do I integrate with the openBIS API?"

Wait for Phase 1 or read [visual-first-workflow.md](./visual-first-workflow.md#phase-1-real-api-integration) for the pattern.

### "How do I keep my git history clean?"

Read [git-workflow.md](./git-workflow.md#commit-message-strategy).

### "How do I document a component?"

Read [storybook-guide.md](./storybook-guide.md#story-convention).

### "What files can I touch and when?"

Read [architecture.md](./architecture.md#folder-responsibilities).

---

## Getting Help

1. **Check the docs** – Most answers are here
2. **Look at existing code** – `src/components/masterdata/` has examples
3. **Ask in issues** – GitHub issues are for discussion
4. **Read copilot instructions** – `.github/copilot-instructions.md`

---

## Contributing

When making changes:

1. Follow [architecture.md](./architecture.md) folder structure
2. Follow [coding-standards.md](./coding-standards.md) for code quality
3. Follow [git-workflow.md](./git-workflow.md) for commits
4. Update relevant docs (don't leave stale docs)

---

## Document Index

- **Overview**: This file (START HERE)
- **Architecture**: [architecture.md](./architecture.md)
- **Development**: [visual-first-workflow.md](./visual-first-workflow.md), [storybook-guide.md](./storybook-guide.md)
- **Git & Collaboration**: [git-workflow.md](./git-workflow.md)
- **Standards**: [coding-standards.md](./coding-standards.md), [tech-stack.md](./tech-stack.md)
- **Management**: [project-management.md](./project-management.md)
