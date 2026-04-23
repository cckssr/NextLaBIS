---
name: "§26 Forms & Input Validation"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:api", "status:backlog"]
---

# Overview

**Checklist section:** 26. Forms & Input Validation
**Phase target:** phase 2
**Domain:** domain:api

## Goal

Build a comprehensive form system supporting view/edit/create modes, auto-save, real-time validation, conflict detection and resolution, unsaved changes warnings, and a reusable dialog system for confirmations and inputs.

## Scope

### In Scope

- View mode (read-only display), edit mode (inline editing), create mode
- Auto-save with dirty state detection
- Real-time form validation (required, data type, custom, regex, min/max)
- Concurrent edit conflict detection and resolution
- Unsaved changes warning on navigation
- Form reset/cancel
- Dialog system (confirmation, input, result, error, file management dialogs)

### Out of Scope (deferred)

- Multi-step wizard forms
- Form analytics / completion tracking

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Forms support all three modes (view, edit, create) with seamless transitions
- [ ] Validation errors display inline with clear messages
- [ ] Conflict detection warns users before overwriting concurrent changes
- [ ] Dialogs are consistent across the application (shared components)

## Dependencies

- §5 Property System (forms render properties)
- §27 Notifications (validation feedback)

## Notes

- Forms are a foundational component — invest in a shared `EntityForm` abstraction
- Use Mantine form hooks (`@mantine/form`) for validation
- Auto-save should debounce to avoid excessive API calls (Phase 1)
