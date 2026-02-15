# Project Management

NextLaBIS tracks work through a three-level hierarchy — **Epic → Feature → Task** — using GitHub Issues and GitHub Projects. This document is the single source of truth for labels, workflows, and project board setup.

---

## Hierarchy

```text
Epic  (type:epic)
  └── Feature  (type:feature)
        └── Task / Sub-issue  (type:task)
```

| Level       | Definition                                                                                                                                            | Example                                        |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Epic**    | A major initiative mapping to one section of the [feature checklist](NEW_UI_FEATURE_CHECKLIST.md). Spans multiple features; may span multiple phases. | §1 Authentication & Session Management         |
| **Feature** | A single user-facing capability within an epic. Has clear Phase 0 (UI) and Phase 1 (API) task lists.                                                  | Personal Access Token (PAT) management         |
| **Task**    | A focused implementation step: one component, one API call, one refactor. Assigned to a single contributor.                                           | Build `PATListTable.client.tsx` with mock data |
| **Bug**     | A defect or regression. Linked to the domain and phase where it was found.                                                                            | PAT creation form crashes on empty input       |

---

## Labels

All labels follow a `namespace:value` pattern. **Every issue must have one label from each of the first three namespaces** (type, phase, domain).

### Type

| Label           | Colour           | Use                                     |
| --------------- | ---------------- | --------------------------------------- |
| `type:epic`     | `#0052CC` blue   | Large multi-feature initiative          |
| `type:feature`  | `#0075CA` blue   | Single user-facing capability           |
| `type:task`     | `#E4E669` yellow | Focused implementation step or chore    |
| `type:bug`      | `#D73A4A` red    | Defect or regression                    |
| `type:docs`     | `#0075CA` blue   | Documentation-only change               |
| `type:refactor` | `#E4E669` yellow | Code restructuring, no behaviour change |

### Phase

| Label                 | Colour               | Use                          |
| --------------------- | -------------------- | ---------------------------- |
| `phase:0-foundations` | `#0E8A16` green      | Visual UI with mock data     |
| `phase:1-api`         | `#5319E7` purple     | openBIS API integration      |
| `phase:2-eln`         | `#B60205` dark red   | Advanced ELN / LIMS features |
| `phase:backlog`       | `#C5DEF5` light blue | Not yet assigned to a phase  |

### Domain (maps to checklist sections)

| Label                  | Colour          | Checklist section(s)           |
| ---------------------- | --------------- | ------------------------------ |
| `domain:auth`          | `#F9D0C4` peach | §1 Authentication & Sessions   |
| `domain:navigation`    | `#F9D0C4` peach | §2 Navigation & Layout         |
| `domain:entities`      | `#F9D0C4` peach | §3 Core Entity CRUD            |
| `domain:files`         | `#F9D0C4` peach | §4 File Management             |
| `domain:properties`    | `#F9D0C4` peach | §5 Property System             |
| `domain:types`         | `#F9D0C4` peach | §6 Type Management             |
| `domain:users`         | `#F9D0C4` peach | §7 User & Access Management    |
| `domain:search`        | `#F9D0C4` peach | §8 Search & Discovery          |
| `domain:grids`         | `#F9D0C4` peach | §9 Data Grids & Tables         |
| `domain:import-export` | `#F9D0C4` peach | §10 Import & Export            |
| `domain:eln`           | `#F9D0C4` peach | §16 ELN-Specific Features      |
| `domain:admin`         | `#F9D0C4` peach | §25 Server Administration      |
| `domain:shell`         | `#F9D0C4` peach | App shell, nav, breadcrumbs    |
| `domain:infra`         | `#F9D0C4` peach | CI/CD, tooling, infrastructure |

### Priority

| Label               | Colour                 | Use                             |
| ------------------- | ---------------------- | ------------------------------- |
| `priority:critical` | `#B60205` red          | Blocks current phase or release |
| `priority:high`     | `#E4E669` orange       | Core phase goal                 |
| `priority:medium`   | `#FEF2C0` light yellow | Should be done in phase         |
| `priority:low`      | `#FFFFFF` white        | Nice to have                    |

### Status

| Label                  | Colour               | Use                                 |
| ---------------------- | -------------------- | ----------------------------------- |
| `status:backlog`       | `#E1E4E8` grey       | Not ready to start                  |
| `status:ready`         | `#C2E0C6` green      | Scoped, unblocked, ready to pick up |
| `status:in-progress`   | `#0075CA` blue       | Actively being worked on            |
| `status:needs-review`  | `#8256D0` purple     | PR open, awaiting review            |
| `status:blocked`       | `#D93F0B` red-orange | Blocked by dependency or question   |
| `status:needs-scoping` | `#FEF2C0` yellow     | Needs further design/planning       |

### Utility

| Label              | Colour           | Use                           |
| ------------------ | ---------------- | ----------------------------- |
| `good first issue` | `#7057FF` purple | Suitable for new contributors |
| `help wanted`      | `#008672` teal   | Extra attention needed        |

---

## GitHub Projects Setup

### Board: "NextLaBIS Roadmap"

Create one GitHub Project (Projects v2) for the repository. Recommended configuration:

#### Custom Fields

| Field          | Type          | Options                                                                                                                          |
| -------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `Phase`        | Single select | Phase 0 · Phase 1 · Phase 2 · Backlog                                                                                            |
| `Priority`     | Single select | Critical · High · Medium · Low                                                                                                   |
| `Domain`       | Single select | Auth · Navigation · Entities · Files · Properties · Types · Users · Search · Grids · Import/Export · ELN · Admin · Shell · Infra |
| `Sprint`       | Iteration     | 2-week iterations starting from project kick-off                                                                                 |
| `Story Points` | Number        | Fibonacci: 1, 2, 3, 5, 8, 13                                                                                                     |

#### Views

| View name     | Layout | Grouping                                                               |
| ------------- | ------ | ---------------------------------------------------------------------- |
| **Kanban**    | Board  | Grouped by `Status` (Backlog → Ready → In Progress → In Review → Done) |
| **By Phase**  | Table  | Grouped by `Phase`, sorted by `Priority`                               |
| **By Domain** | Table  | Grouped by `Domain`, sorted by `Priority`                              |
| **Sprint**    | Board  | Filtered to current `Sprint`, grouped by `Status`                      |

#### Automation (built-in GitHub Actions)

| Trigger                  | Action                       |
| ------------------------ | ---------------------------- |
| Issue opened             | Set status → **Backlog**     |
| Issue assigned           | Set status → **Ready**       |
| PR opened (linked issue) | Set status → **In Progress** |
| PR ready for review      | Set status → **In Review**   |
| PR merged & issue closed | Set status → **Done**        |

> Enable these in the project's **Workflows** tab (Auto-add items, Pull requests, Issues).

### Milestones

Use GitHub Milestones to group issues by phase completion target:

| Milestone                 | Goal                                                   |
| ------------------------- | ------------------------------------------------------ |
| `v0.1 – Phase 0 Complete` | All foundation UI views with mock data; Storybook docs |
| `v0.2 – Phase 1 Core`     | Spaces, Collections, Objects, Datasets with real API   |
| `v0.3 – Phase 1 Complete` | Auth, Users, Search, Grids fully integrated            |
| `v1.0 – Phase 2`          | Advanced ELN, File management, Import/Export           |

---

## Workflow

### 1. Planning an Epic

1. Create an **Epic** issue using the Epic template.
2. Reference the checklist section (`docs/NEW_UI_FEATURE_CHECKLIST.md §N`).
3. Label: `type:epic`, `phase:X`, `domain:Y`, `priority:Z`, `status:needs-scoping`.
4. Add to project board; set `Phase` and `Domain` custom fields.

### 2. Breaking Down Features

1. For each major item within the epic, create a **Feature** issue.
2. Link to the parent epic with "Part of #N" in the body.
3. Use the Feature template — fill in both Phase 0 and Phase 1 task lists.
4. Label: `type:feature`, matching phase/domain/priority labels.
5. The epic's issue body should list child features as `- [ ] #N Feature name`.

### 3. Executing Tasks

1. Break features into **Task/Sub-issue** issues for granular work.
2. One task = one PR. Tasks should be completable in 1–2 days.
3. Label: `type:task`, matching phase/domain labels.
4. Assign to a contributor and set `status:in-progress`.

### 4. Branch and PR

1. Branch from `develop`: `git checkout -b feature/domain-short-name`
2. Commit frequently (messy is fine during development).
3. Before PR: clean up with `git rebase -i origin/develop`.
4. Open PR against `develop`; fill in the PR template.
5. Reference the task: "Closes #N" in the PR body.
6. Maintainer squash-merges; the commit message becomes: `type(domain): summary (#PR)`.

### 5. Closing Out

1. Merge PR → task closes automatically via "Closes #N".
2. Update parent feature's checklist (tick off the completed task).
3. When all feature tasks are done, close the feature issue and tick it off in the epic.
4. When all features in an epic are done, close the epic.

---

## Issue Writing Guidelines

### Good issue titles

- `[Epic] Authentication & Session Management` — clear scope
- `[Feature] PAT management – create, list, revoke tokens` — clear deliverable
- `[Task] Build PATListTable.client.tsx with mock data` — specific, actionable
- `[Bug] PAT form crashes on empty validity input (domain:auth)` — includes domain

### Avoid

- Vague titles: "Fix auth stuff", "Update components"
- Scope creep: one feature per issue, one concern per task
- Missing labels: every issue must have type + phase + domain labels

---

## Phase 0 Active Epics

The following epics are in scope for Phase 0 (visual-first, mock data):

| #   | Epic                                                       | Checklist | Priority            |
| --- | ---------------------------------------------------------- | --------- | ------------------- |
| TBD | Navigation & App Shell                                     | §2        | `priority:critical` |
| TBD | Core Entity Views (Spaces, Collections, Objects, Datasets) | §3        | `priority:critical` |
| TBD | Data Grids & Tables                                        | §9        | `priority:high`     |
| TBD | Property Renderers (masterdata components)                 | §5        | `priority:high`     |
| TBD | Dashboard Overview                                         | §2.1      | `priority:medium`   |
| TBD | Forms & Input Validation (view/edit/create modes)          | §26       | `priority:medium`   |

---

## Keeping the Board Healthy

- **Weekly triage**: review `status:needs-scoping` issues, scope and move to `status:ready`.
- **Sprint planning**: pick issues from `status:ready`, assign contributors, move to `status:in-progress`.
- **Do not leave issues in `status:in-progress` without a linked PR** for more than 2 days — either open a draft PR or move the issue back to `status:ready`.
- **Stale issues** (no activity for 14 days): add `status:blocked` and comment with the blocker.
