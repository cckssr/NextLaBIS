# Project Management

NextLaBIS tracks work using GitHub issues organised into phases, epics, and sub-issues. This document explains how to navigate and contribute to the roadmap.

## Terminology

- **Phase** – A time-bound milestone representing a major objective (e.g., "Phase 0 – Foundations"). Phases provide context for prioritisation.
- **Epic** – A large body of work within a phase. Epics describe features or initiatives and are tracked as GitHub issues with the `type:epic` label.
- **Sub-issue** – A granular task derived from an epic. Sub-issues carry the implementation details and should be small enough to complete within a single PR.

## Current Phases

1. **Phase 0 – Foundations** (in progress)
   - Goals: establish the Next.js project, Mantine theming, masterdata component scaffolding, and documentation baseline.
   - Representative epics: `#1 App Shell`, `#2 Masterdata component library`, `#3 Documentation & developer experience`.
2. **Phase 1 – Core Data Interactions** (upcoming)
   - Goals: implement authentication flows, integrate with openBIS APIs, build project/sample browsing experiences.
   - Planned epics: `Authentication & session management`, `Project hierarchy explorer`, `Dataset visualisation`.
3. **Phase 2 – Advanced ELN Features** (backlog)
   - Goals: offer template builders, workflow automation, and reporting dashboards.
   - Planned epics: `Template designer`, `Workflow orchestration`, `Analytics & reporting`.

> _Note_: Issue numbers above are illustrative until created. Update this document as phases evolve.

## Labels

| Label | Purpose |
| ----- | ------- |
| `phase:0-foundations` | Issues contributing to Phase 0 goals. |
| `phase:1-core-data` | Issues scheduled for Phase 1. |
| `phase:2-eln-features` | Future backlog items. |
| `type:epic` | High-level issue describing a significant body of work. |
| `type:sub-issue` | Executable task linked to an epic. |
| `type:bug` | Defect or regression. |
| `status:needs-scoping` | Requires clarification before implementation. |
| `good first issue` | Beginner-friendly entry points. |

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
