# Git Workflow & Project Management

## The Problem with Simultaneous Work

Current situation:

- Building dashboard + object view simultaneously
- Experimenting with masterdata components
- Storybook exploration
- Result: Messy git history, unclear what's "done"

## The Solution: Feature Branches + Strategic Commits

---

## Branch Strategy

### Branch Naming Convention

```shell
feature/<feature_name>     # New feature (visual-first + mock data)
refactor/<feature_name>    # Code cleanup, extraction
fix/<feature_name>         # Bug fixes
docs/<topic>               # Documentation only
phase1/<feature_name>      # Real API integration (Phase 1)
```

### Examples

```bash
# Phase 0: Visual-first work
feature/dashboard-overview
feature/object-view
feature/property-renderers
feature/shared-components

# Phase 1: API integration (later)
phase1/dashboard-overview
phase1/object-view-api

# Refactoring & cleanup
refactor/extract-shared-components
refactor/naming-consistency
```

### Branch Workflow

```bash
# Create feature branch
git checkout -b feature/dashboard-overview

# Make changes, commit frequently (messy is OK)
git add src/components/dashboard/SpacesOverviewCard.server.tsx
git commit -m "Add SpacesOverviewCard component"

git add src/app/dashboard/mock/spaces.ts
git commit -m "Add mock spaces data"

git add src/components/dashboard/SpacesOverviewCard.stories.tsx
git commit -m "Add Storybook stories for SpacesOverviewCard"

# ... more commits while exploring ...

# Before submitting PR: Clean up commits
git rebase -i main

# Force push to your branch (safe because it's your branch)
git push origin feature/dashboard-overview --force

# Create PR for review
# Squash commits in PR if necessary, or merge as clean history
```

---

## Commit Message Strategy

### During Development (Feature Branch)

Be verbose, honest, and specific:

```bash
git commit -m "Add SpacesOverviewCard component with responsive grid"
git commit -m "Extract RightsPill to shared components"
git commit -m "Add Storybook stories for SpacesOverviewCard"
git commit -m "Fix mobile layout spacing on dashboard"
git commit -m "Add MOCK_SPACES with realistic test data"
```

### Before PR: Squash or Reorder

Use interactive rebase to clean up:

```bash
git rebase -i main
```

Options:

- **Squash related commits**: Combine "Add component" + "Add stories" → "Add SpacesOverviewCard with documentation"
- **Keep logical chunks**: Separate "Add component" from "Extract RightsPill to shared"

### After Merge: Clean History

In `main` branch, commits should tell a story:

```shell
[feature/dashboard] Add dashboard overview with mock data
[feature/property-renderers] Implement all masterdata component types
[refactor/shared] Extract RightsPill and TagPill components
[docs/architecture] Update docs for visual-first workflow
```

---

## GitHub Issues & Epics (Adapted)

Instead of strict phases, organize by **feature + development stage**:

### Issue Template

```markdown
# Feature: Dashboard Overview

## Phase 0: Visual-First (In Progress)

- [ ] Define prop interfaces
- [ ] Create mock data structure
- [ ] Build SpacesOverviewCard component
- [ ] Add responsive design (mobile, tablet, desktop)
- [ ] Add Storybook documentation
- [ ] Test accessibility

## Phase 1: API Integration (Future)

- [ ] Implement openBIS.getSpaces() in lib/openbis/server.ts
- [ ] Create mapper: API response → SpacesOverviewCardProps
- [ ] Replace mock data in page component
- [ ] Test with real openBIS data

## Definition of Done

- [ ] Component is reusable (prop interface defined)
- [ ] Storybook stories added
- [ ] Responsive on mobile, tablet, desktop
- [ ] TypeScript types correct
- [ ] Tested with mock data
- [ ] PR reviewed and merged
```

### Labels

```shell
phase:0-visual-first     # Phase 0 UI work
phase:1-api-integration  # Phase 1 API work
feature:dashboard        # Related to dashboard
feature:object-view      # Related to object view
type:component           # New component
type:refactor            # Code organization
status:in-progress       # Currently being worked on
status:ready-for-review  # Ready for PR review
status:blocked           # Waiting on something
```

---

## Workflow: One Feature at a Time (Or Clear Boundaries)

### Option 1: Serial Features (Recommended)

```shell
Week 1-2: feature/dashboard-overview
├── Define interfaces
├── Build components
├── Mock data
├── Storybook stories
└── Merge to main

Week 3-4: feature/object-view
├── Similar workflow
└── Merge to main

Week 5: Refactor & prepare for Phase 1
├── Extract shared components
├── Consolidate mock data
├── Update documentation
└── Merge to main
```

**Advantages**:

- Clear git history
- One thing to review at a time
- Easy to understand what each PR does
- Easier to debug if something breaks

### Option 2: Parallel with Clear Separation

If working on multiple features simultaneously:

```shell
feature/dashboard-overview
  └── Only touches: src/app/dashboard/*, src/components/dashboard/*
  └── Changes: src/components/shared/RightsPill (extract)

feature/object-view
  └── Only touches: src/app/objects/*, src/components/object/*
  └── Changes: src/components/shared/TagPill (extract)

feature/shared-components
  └── Consolidates RightsPill & TagPill after feature PRs merge
```

**Key Rule**:

- If two branches touch the same files, merge one before starting the other
- Minimize file overlap to reduce merge conflicts

---

## Pull Request Workflow

### Before Creating a PR

```bash
# 1. Ensure latest main
git fetch origin
git rebase origin/main

# 2. Run all local checks
cd nextapp
npm run check-naming
npm run lint
npx tsc --noEmit
npm run build

# 3. Clean up commits (optional)
git rebase -i origin/main

# 4. Force push if you've rebased
git push origin feature/dashboard-overview --force
```

### PR Description Template

```markdown
## What This PR Does

Adds the dashboard overview feature with mock data.

## Changes

- Add `SpacesOverviewCard` component
- Create mock spaces data
- Add responsive grid layout
- Add Storybook stories

## Phase Status

**Phase 0**: ✅ Visual-first with mock data

- Prop interface defined
- Components built and tested
- Storybook documented

**Phase 1**: ⏳ Ready for API integration

- Can replace mock data with `fetchSpaces()` call
- No component changes required

## Checklist

- [x] Naming conventions verified (`npm run check-naming`)
- [x] ESLint passes (`npm run lint`)
- [x] TypeScript strict mode (`npx tsc --noEmit`)
- [x] Build successful (`npm run build`)
- [x] Responsive design tested (mobile, tablet, desktop)
- [x] Storybook stories added
- [x] Commits are clean and logical

## Related Issues

Closes #15 (Feature: Dashboard Overview)
```

### Code Review Checklist (For Reviewers)

- [ ] Prop interfaces well-defined (no `any`)
- [ ] No hardcoded data (or only in `/mock/`)
- [ ] Naming conventions followed (`npm run check-naming` passes)
- [ ] Responsive design looks good (check Storybook)
- [ ] TypeScript strict (no suppressions)
- [ ] No API calls in components (server-side only)
- [ ] Storybook stories cover main states
- [ ] Commit history is clean

---

## Phase 1 Migration Checklist

When ready to integrate real APIs:

```bash
# For each feature:

# 1. Create phase1 branch
git checkout -b phase1/dashboard-overview

# 2. Implement API client
# src/lib/openbis/server.ts
# - Add fetchSpaces() function
# - Add mapper to convert API response to prop interface

# 3. Update page component
# src/app/dashboard/page.tsx
# - Replace MOCK_SPACES with await fetchSpaces()
# - Keep component unchanged

# 4. Verify
npm run build  # Should work without component changes

# 5. Create PR
# Title: "[phase1/dashboard] Integrate real openBIS API"
# Description should reference original Phase 0 PR

git push origin phase1/dashboard-overview
```

---

## Keeping Main Branch Clean

### Merge Strategy

Recommend **Squash & Merge** for cleaner history:

```shell
Before:
  ├─ [feature/dashboard] Add SpacesOverviewCard
  ├─ [feature/dashboard] Add mock data
  ├─ [feature/dashboard] Add Storybook stories
  └─ [feature/dashboard] Fix mobile layout

After squash:
  └─ [feature/dashboard] Add dashboard overview with mock data
```

Or use **Rebase & Merge** if commits are already clean:

```shell
Before:
  ├─ Add SpacesOverviewCard component
  ├─ Add mock spaces data
  └─ Add Storybook stories

After rebase:
  ├─ Add SpacesOverviewCard component
  ├─ Add mock spaces data
  └─ Add Storybook stories  # Linear history
```

### GitHub Actions Integration

CI should run on every PR:

```yaml
# .github/workflows/ci.yml (existing)
- npm run check-naming
- npm run lint
- npx tsc --noEmit
- npm run build
```

All must pass before merge is allowed.

---

## Tips for Clean Git History

### 1. Use Descriptive Branch Names

```bash
❌ feature/foo
✅ feature/dashboard-overview

❌ fix/bug
✅ fix/spacing-issue-mobile
```

### 2. Commit Logically

```bash
❌ git add . && git commit -m "stuff"
✅ git add src/components/dashboard/ && git commit -m "Add SpacesOverviewCard component"
✅ git add src/app/dashboard/mock/ && git commit -m "Add mock spaces data"
```

### 3. Use `.gitignore` Properly

Ensure no build artifacts or IDE files:

```shell
# .gitignore
node_modules/
.next/
.storybook/
dist/
*.log
.DS_Store
.env.local
```

### 4. Review Your Own PR

Before asking for review:

```bash
git log main..feature/your-feature --oneline
# Review each commit message
```

If any look weird, rebase interactively:

```bash
git rebase -i main
# Reorder, squash, or reword commits
```

---

## Summary

| Practice                              | Benefit                                      |
| ------------------------------------- | -------------------------------------------- |
| Feature branches                      | Isolate work, easy to abandon if needed      |
| Frequent commits                      | Don't lose work, can revert specific changes |
| Squash before merge                   | Clean main history                           |
| Clear commit messages                 | Easy to understand what changed and why      |
| Storybook stories                     | Document component states alongside code     |
| Phase 0 → Phase 1 naming              | Clear when work transitions from UI to API   |
| Serial features (or clear boundaries) | Reduce merge conflicts, cleaner reviews      |

This workflow turns simultaneous work into a **clean, reviewable history** while keeping you free to explore in feature branches.
