---
name: Feature
about: A single user-facing capability within an epic
labels: ["type:feature", "status:backlog"]
---

## Summary

<!-- What does this feature do? Which checklist item(s) does it cover?
     Reference: docs/NEW_UI_FEATURE_CHECKLIST.md §[section].[subsection] -->

**Parent epic:** #<!-- epic issue number -->
**Phase target:** <!-- phase:0-foundations | phase:1-api | phase:2-eln -->
**Domain:** <!-- domain:auth | domain:entities | domain:navigation | ... -->
**Priority:** <!-- priority:critical | priority:high | priority:medium | priority:low -->

## User Story

<!-- As a [researcher / admin / power user], I want [goal], so that [benefit]. -->

## Phase 0 Tasks (Visual-First)

- [ ] Define TypeScript prop interfaces
- [ ] Create mock data fixture
- [ ] Build UI component(s) with mock data
- [ ] Responsive layout (base → sm → lg)
- [ ] Storybook story added
- [ ] CI checks pass

## Phase 1 Tasks (API Integration)

- [ ] Implement openBIS API call
- [ ] Create response mapper / data transformer
- [ ] Replace mock data with real API
- [ ] Handle loading and error states
- [ ] Test against real openBIS instance

## Acceptance Criteria

- [ ]
- [ ]
- [ ]

## Design Notes

<!-- Screenshots, mockups, component names, or UX notes. -->

## Dependencies

<!-- List blocking issues, APIs, or design assets. -->
