# Contributing to NextLaBIS

Thank you for considering a contribution! The following guidelines help us maintain a predictable and friendly development workflow.

## Table of Contents

1. [Before You Start](#before-you-start)
2. [Development Environment](#development-environment)
3. [Ways to Contribute](#ways-to-contribute)
4. [Workflow Overview](#workflow-overview)
5. [Submitting Code Changes](#submitting-code-changes)
6. [Documentation Improvements](#documentation-improvements)
7. [Issue Reporting](#issue-reporting)
8. [Review Process](#review-process)
9. [Community Expectations](#community-expectations)

## Before You Start

- Review the [Code of Conduct](CODE_OF_CONDUCT.md).
- Check the [project management guide](docs/project-management.md) to understand the current phase and active epics.
- Comment on an issue before starting work so everyone knows it is being handled. If no issue exists, open one using the appropriate template.

## Development Environment

The Next.js app lives in `nextapp/`. To set up the project locally:

```bash
cd nextapp
npm install
npm run dev
```

Refer to [`nextapp/README.md`](nextapp/README.md) for more detail, including linting, building, and available scripts.

## Ways to Contribute

- **Feature work**: Implement functionality scoped within an epic or sub-issue.
- **Bug fixes**: Reproduce the problem, add regression tests when possible, and deliver a fix.
- **Documentation**: Improve guides, READMEs, or comment inline to clarify complex logic.
- **Design feedback**: Share UX or accessibility recommendations through discussions or design issues.

## Workflow Overview

1. Pick an issue that belongs to the current phase (see labels `phase:x`) or a backlog epic.
2. Create a topic branch that follows the [branching strategy](docs/branching-strategy.md).
3. Make commits that are small, focused, and well-described.
4. Ensure linting, type checks, and relevant tests pass locally.
5. Open a pull request linking to the issue, describing the change, and including screenshots if UI elements are affected.

## Submitting Code Changes

- Follow the [coding standards](docs/coding-standards.md).
- Run `npm run lint` from `nextapp/` before opening a PR.
- Add tests where feasible. Even in early phases, aim to cover components with unit or visual regression tests once frameworks are in place.
- Update documentation and storybook entries (when introduced) to reflect new behaviour.
- Commit messages should be in the present tense and concise (e.g., `Add masterdata vocabulary component`).

## Documentation Improvements

- For small edits, open a PR directly. For larger restructuring, create an issue first to discuss the plan.
- Keep documentation in `docs/` focused on single topics. Link between documents for discoverability.

## Issue Reporting

- Use the templates in `.github/ISSUE_TEMPLATE/`.
- Include reproduction steps, expected vs. actual behaviour, screenshots or videos, and environment information for bug reports.
- For feature requests, describe the problem the feature solves, not just the solution.
- Epics and phases should remain high-level. Use sub-issues to track granular work items.

## Review Process

- Every pull request requires at least one approval before merging.
- Reviewers focus on correctness, readability, accessibility, and alignment with the roadmap.
- Address feedback promptly. If a request is unclear, start a conversation in the PR.

## Community Expectations

- Be kind, patient, and collaborative.
- Ask questions early—there are no “dumb” questions.
- Share learnings or helpful resources in discussions to help future contributors.

We appreciate your efforts to improve NextLaBIS!
