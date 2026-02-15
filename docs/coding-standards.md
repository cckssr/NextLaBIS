# Coding Standards

Consistent code enables contributors to collaborate effectively. The following conventions apply to all code in the `nextapp/` project.

## General Principles

- Write small, composable components and functions.
- Prefer clarity over cleverness—optimise for readability first.
- Maintain TypeScript strictness by fixing type errors rather than suppressing them.
- Document assumptions via comments or ADRs when behaviour is non-obvious.

## TypeScript & React

- Use functional components with explicit `React.FC` types only when children typing is required—otherwise rely on inferred return types.
- Type props and state explicitly. Avoid `any`; use `unknown` or generics when necessary.
- Destructure props at the top of the component body.
- Use hooks (e.g., `useMemo`, `useCallback`) judiciously; reach for them only when there is a demonstrated performance need.
- Keep components focused. Move domain logic into hooks or utility modules under `src/`.

## Styling

- Prefer Mantine components and theme tokens for layout, spacing, and typography.
- When custom styles are required, use CSS modules (`*.module.css`) scoped to the component. Keep global CSS limited to resets and tokens.
- Follow a mobile-first approach and verify responsive behaviour at common breakpoints.
- Provide accessible colour contrast and focus states. Lean on Mantine defaults where available.

## Accessibility

- Ensure interactive elements are keyboard accessible and labelled with `aria-` attributes when semantic elements are not sufficient.
- Use semantic HTML tags (`header`, `main`, `section`, etc.) within layouts.
- Provide alt text for images and text alternatives for icon-only buttons.

## State Management

- Use local component state (`useState`) for UI-only concerns.
- Introduce shared state solutions (Context, Zustand, React Query) only when multiple components require the same data.
- Keep network calls abstracted into dedicated service modules when API integration begins.

## Data Fetching

- Use Next.js Server Components for data fetching where possible; fall back to Client Components when user interaction requires it.
- Gracefully handle loading and error states with user-friendly messaging.

## Testing

- Prioritise tests that reflect user behaviour (React Testing Library).
- When adding or refactoring components, include tests that cover critical states (empty, error, success).
- Keep test files alongside their implementation (e.g., `component.test.tsx`).

## Git & Commits

- Follow the [branching strategy](branching-strategy.md).
- Commit frequently to capture logical steps. Avoid committing generated files.
- Use Conventional Commits format for all commit messages:

```text
<type>(<scope>): <short summary>

Types:  feat | fix | docs | style | refactor | perf | test | chore
Scope:  domain label value — auth | navigation | entities | files |
        properties | types | users | search | grids | shell | infra
```

Examples:

```text
feat(entities): add ObjectPropertiesPanel component with mock data
fix(shell): correct navbar collapse on mobile breakpoint
refactor(grids): extract column config to shared helper
docs(infra): update CI check instructions in copilot-instructions
```

- PR titles and squash commits follow `type(scope): summary (#PR)`.
- Keep the summary under 72 characters; add a body for non-obvious changes.

## Documentation & Comments

- Update README or docs when behaviour changes.
- Use comments to explain intent, not obvious code.
- Include JSDoc/TSDoc for complex functions or hooks.

By adhering to these standards, we ensure the codebase remains maintainable as the project grows.

## Phase-Aware Development

Code must respect the current development phase. Phase constraints are enforced by CI and code review.

| Phase | Allowed | Forbidden |
| --- | --- | --- |
| **Phase 0** (current) | UI components, mock data, Storybook stories | openBIS API calls, auth, `/app/api/*` routes |
| **Phase 1** | API integration, real data fetching, route handlers | Direct DOM manipulation, non-Mantine UI libs |
| **Phase 2** | Advanced ELN features, rich text, file upload | Skipping Phase 1 patterns |

- Tag every new file mentally with its phase: is it UI-only (Phase 0) or does it touch real data (Phase 1+)?
- Mock data lives in `src/lib/<domain>/mockProvider.ts`. Never import mock providers from Phase 1 code.
- Phase 1 integration means replacing the `mockProvider` call in `get<Entity>.ts` only — components are unchanged.

## openBIS Terminology

Use current openBIS terminology exclusively. Old API names exist only in type definitions.

| Use | Avoid |
| --- | --- |
| Object | Sample |
| Collection | Experiment |
| Space | (unchanged) |
| Dataset | (unchanged) |

These terms appear in: component names, prop names, route segments, issue titles, and comments.
