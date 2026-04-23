---
name: "§12 History & Audit"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 12. History & Audit
**Phase target:** phase 2, phase 3
**Domain:** domain:entities

## Goal

Provide comprehensive audit trail and history views for all entities, including property change history, relationship changes, deletion logs, freezing logs, and event search, enabling full traceability.

## Scope

### In Scope

- Entity change history (property changes with old/new values)
- Relationship change history
- Assignment change history (space/project/collection)
- User attribution and timestamps for all changes
- Version comparison
- Deletion history log
- Freezing history log
- Event log search

### Out of Scope (deferred)

- Compliance reporting / export of audit trails

## Feature Breakdown

### 12.1 Entity History

- [ ] View change history for any entity
- [ ] Property change history (old value -> new value)
- [ ] Relationship change history (parents, children, container)
- [ ] Space/project/collection assignment history
- [ ] User attribution for each change
- [ ] Timestamp for each change
- [ ] Version comparison

### 12.2 Deletion History

- [ ] View log of all deletion events
- [ ] Filter by entity type, date range, user
- [ ] Grid display with entity type, code, deletion date, user, reason

### 12.3 Freezing History

- [ ] View log of all freezing events
- [ ] Grid display with entity type, code, freeze date, user

### 12.4 Event Log

- [ ] Search events (deletion, movement, etc.)
- [ ] Event details (entity, type, timestamp, user, reason)

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Change history shows all property modifications with before/after values
- [ ] History views are paginated and filterable
- [ ] Version comparison clearly highlights differences

## Dependencies

- §3 Core Entities (entities whose history is tracked)
- §9 Data Grids (history displayed in grids)

## Notes

- History is read-only and requires API integration — primarily Phase 1
- Phase 0 can prototype the UI layout with mock history data
