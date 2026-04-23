---
name: "§35 Theming & Accessibility"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:nav", "status:backlog"]
---

# Overview

**Checklist section:** 35. Theming & Accessibility
**Phase target:** phase 1
**Domain:** domain:nav

## Goal

Implement consistent theming (light/dark mode), keyboard navigation, screen reader support, focus management, and high contrast mode to ensure the application is accessible and visually consistent.

## Scope

### In Scope

- Consistent component library (Mantine-based)
- Light mode
- Dark mode
- Keyboard navigation support
- Screen reader support (ARIA labels)
- Focus management
- High contrast mode

### Out of Scope (deferred)

- Custom theme builder / branding per instance
- Internationalisation (i18n) — separate concern

## Feature Breakdown

- [ ] Material Design / consistent component library
- [ ] Light mode
- [ ] Dark mode
- [ ] Keyboard navigation support
- [ ] Screen reader support (ARIA labels)
- [ ] Focus management
- [ ] High contrast mode

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Dark mode toggle works across all pages without visual artifacts
- [ ] All interactive elements are keyboard-accessible
- [ ] ARIA labels present on all form inputs, buttons, and navigation elements
- [ ] Focus indicators are visible and follow logical tab order
- [ ] WCAG 2.1 AA compliance for colour contrast

## Dependencies

- None (foundational — should be established early)

## Notes

- Mantine provides built-in dark mode support via `MantineProvider`
- Accessibility testing: use axe-core and Lighthouse audits
- This is a cross-cutting concern — all other epics should follow these standards
