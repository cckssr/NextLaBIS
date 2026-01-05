# Project Management

NextLaBIS tracks work using GitHub issues organized by **features** and **development phases**. This document explains how to navigate and contribute to the roadmap.

## Terminology

- **Feature** – A user-facing capability (e.g., "Dashboard Overview", "Object View"). Each feature has its own GitHub issue with subtasks.
- **Phase** – A development stage for each feature:
  - **Phase 0 (Visual-First)**: Build UI with mock data, define prop interfaces, document in Storybook
  - **Phase 1 (API Integration)**: Replace mock data with real openBIS API, implement backend integration
- **Epic** – A large initiative spanning multiple features (e.g., "Dashboard & Related Views").
- **Sub-issue** – A granular task within a feature (e.g., "Implement SpacesOverviewCard component").

## Issue Organization

### Feature Issue Template

```markdown
# Feature: Dashboard Overview

## Phase 0: Visual-First (In Progress)

- [ ] Define prop interfaces
- [ ] Create mock data structure
- [ ] Build SpacesOverviewCard component
- [ ] Add responsive design
- [ ] Add Storybook documentation
- [ ] Code review & merge

## Phase 1: API Integration (Future)

- [ ] Implement openBIS.getSpaces()
- [ ] Create API response mapper
- [ ] Replace mock data
- [ ] Test with real openBIS

## Definition of Done (Phase 0)

- [ ] Reusable component (prop interface)
- [ ] Storybook stories added
- [ ] Responsive (mobile, tablet, desktop)
- [ ] TypeScript strict
- [ ] All CI checks pass
```

### Current Features (Phase 0)

1. **Dashboard Overview** (Phase 0: mock data + UI)

   - Spaces overview card
   - Activities overview card
   - Search functionality

2. **Object View** (Phase 0: mock data + UI)

   - Object properties display
   - Property editing interface
   - Related objects/datasets

3. **Masterdata Components** (Phase 0: complete)
   - Property renderers (Boolean, Integer, Varchar, etc.)
   - Shared UI primitives (RightsPill, TagPill)

### Planned Features (Phase 1+)

- Project/Collection hierarchy explorer
- Dataset browser
- Sample/Object creation wizard
- Advanced search & filtering

## Labels

| Label                     | Purpose                          |
| ------------------------- | -------------------------------- |
| `phase:0-visual-first`    | Phase 0 work (UI with mock data) |
| `phase:1-api-integration` | Phase 1 work (real API)          |
| `feature:dashboard`       | Related to dashboard             |
| `feature:object-view`     | Related to object views          |
| `feature:masterdata`      | Related to property renderers    |
| `type:epic`               | High-level feature/initiative    |
| `type:sub-issue`          | Executable task                  |
| `type:bug`                | Defect or regression             |
| `type:refactor`           | Code organization/cleanup        |
| `type:docs`               | Documentation                    |
| `status:in-progress`      | Currently being worked on        |
| `status:ready-for-review` | Ready for PR review              |
| `status:blocked`          | Waiting on dependencies          |
| `good first issue`        | Beginner-friendly                |

## Linking Issues

- Every sub-issue must reference its parent epic via GitHub's issue linking feature.
- Epics should contain checklists of sub-issues with status updates.
- When a phase is complete, close the associated tracking issue and archive a summary in the release notes.

## Workflow

1. **Plan** – During planning, maintainers select epics for the active phase and label them accordingly.
2. **Break Down** – Convert epic checklist items into individual sub-issues using the templates.
3. **Execute** – Contributors pick up sub-issues, create branches, and submit PRs referencing the issue.
4. **Review** – Maintain alignment with phase goals during code review. Update issue status labels (`status:in-progress`, `status:blocked`, `status:ready-for-review`) as work advances.
5. **Close** – Merge the PR, ensure acceptance criteria are met, and close the sub-issue. Update the epic checklist and phase summary.

## Documentation

- Each phase should have a short summary in the epic describing scope, dependencies, and success criteria.
- When scope changes, comment on the epic and adjust labels/documentation accordingly.
- Use GitHub Discussions or RFC documents for architectural decisions that cut across epics.

Keeping issues well-structured ensures the roadmap remains actionable and transparent for all contributors.
