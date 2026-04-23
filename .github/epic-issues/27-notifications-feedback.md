---
name: "§27 Notifications & Feedback"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:api", "status:backlog"]
---

# Overview

**Checklist section:** 27. Notifications & Feedback
**Phase target:** phase 3
**Domain:** domain:api

## Goal

Implement a unified notification and feedback system including toast notifications, loading spinners, progress bars, blocking overlays, and error/success messages used consistently across the entire application.

## Scope

### In Scope

- Toast notifications (success, error, warning, info)
- Auto-dismiss and persistent notification modes
- Loading spinners for async operations
- Progress bars for file uploads/downloads
- Blocking overlay during critical operations
- Error messages with details/stack traces
- Operation success confirmation

### Out of Scope (deferred)

- Push notifications (browser notifications)
- Notification history / inbox
- Email notifications

## Feature Breakdown

- [ ] Toast notifications (success, error, warning, info)
- [ ] Auto-dismiss or persistent notifications
- [ ] Loading spinners for async operations
- [ ] Progress bars for file uploads/downloads
- [ ] Blocking overlay during critical operations
- [ ] Error messages with details/stack traces
- [ ] Operation success confirmation

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Notifications are consistent in style across the application
- [ ] Toast auto-dismiss timeout is configurable
- [ ] Error messages include sufficient detail for debugging
- [ ] Progress bars accurately reflect operation progress

## Dependencies

- None (foundational component)

## Notes

- Use Mantine notifications system (`@mantine/notifications`)
- This is a foundational epic — its components are consumed by all other epics
- Consider a global notification context/provider
