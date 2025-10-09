# Branching Strategy

The repository uses a lightweight Git workflow that keeps `main` stable while enabling parallel work.

## Branch Types

- **`main`** – Always deployable. Only merge PRs that pass checks and reviews.
- **Feature branches** – Named `feature/<issue-number>-short-description`. Used for new features, enhancements, or sizeable refactors tied to an issue.
- **Bugfix branches** – Named `bugfix/<issue-number>-short-description`. Used for urgent fixes.
- **Phase branches (optional)** – For large initiatives spanning multiple PRs within the same phase. Named `phase/<phase-name>` and short lived.

## Workflow

1. Create a branch from `main` using the appropriate prefix.
2. Commit work incrementally following the [coding standards](coding-standards.md).
3. Rebase on top of `main` before opening or updating a PR to maintain a linear history.
4. Open a pull request referencing the related issue or epic. Ensure automated checks pass.
5. After approval, squash merge into `main` unless the commit history adds explicit value.

## Release Tags

- When a phase milestone is achieved, tag `main` with `phase-x.y` to capture the snapshot.
- Use semantic versioning once releases target production environments.

## Hotfixes

- Branch from the release tag or `main` if the issue exists there.
- Use the `bugfix/` prefix and document the reason in the PR.
- After merging, ensure deployments are updated and communicate the fix in release notes.

## Best Practices

- Keep branches focused—open a new branch for unrelated work.
- Push work-in-progress branches to GitHub early to back up work and allow async reviews.
- Delete branches after merging to keep the repository tidy.

By following this strategy we maintain clarity over what is shipped and ensure smoother collaboration across phases.
