# Branching Strategy

The repository uses a lightweight Git workflow that keeps `main` stable while enabling parallel work.

## Branch Types

- **`main`** – Always deployable. Only merge PRs that pass checks and reviews.
- **`develop`** – Integration branch for ongoing work. Syncs with `main` when ready and serves as the base for feature/bugfix branches.
- **Feature branches** – Named `feature/<issue-number>-short-description`. Used for new features, enhancements, or sizeable refactors tied to an issue.
- **Bugfix branches** – Named `bugfix/<issue-number>-short-description`. Used for urgent fixes.
- **Phase branches (optional)** – For large initiatives spanning multiple PRs within the same phase. Named `phase/<phase-name>` and short lived.

## Workflow

1. Create a branch from `develop` using the appropriate prefix.

   ```shell
    git checkout develop
    git pull origin develop
    git checkout -b feature/123-add-user-authentication
   ```

2. Commit work incrementally following the [coding standards](coding-standards.md).
3. Rebase on top of `develop` before opening or updating a PR to maintain a linear history.

   ```shell
    git fetch origin
    git checkout develop
    git pull origin develop
    git checkout feature/123-add-user-authentication
    git rebase develop
   ```

4. Open a pull request referencing the related issue or epic. Ensure automated checks pass.
5. After approval, squash merge into `develop` unless the commit history adds explicit value.

## Release Tags

- When a phase milestone is achieved, tag `develop` with `phase-x.y` to capture the snapshot.
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
