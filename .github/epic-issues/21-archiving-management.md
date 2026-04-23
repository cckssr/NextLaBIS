---
name: "§21 Archiving Management"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 21. Archiving Management
**Phase target:** phase 2, phase 3
**Domain:** domain:entities

## Goal

Implement archive and unarchive workflows for datasets, including request submission, status tracking, queue management, and bulk operations.

## Scope

### In Scope

- Archive helper workflow (submit requests, track status)
- Unarchive helper workflow (submit requests, track progress)
- Archive/unarchive queue view
- Bulk archive/unarchive operations

### Out of Scope (deferred)

- Archive storage backend configuration (infrastructure)
- Automatic archiving policies

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Users can submit archive/unarchive requests for selected datasets
- [ ] Status tracking shows current progress (pending, in progress, complete, failed)
- [ ] Bulk operations work for multiple datasets simultaneously

## Dependencies

- §3 Core Entities (datasets to archive)
- §9 Data Grids (queue displayed in grid)

## Notes

- Archiving is an async operation — UI needs polling or WebSocket updates for status
- Archive status is shown on dataset detail views (§3.5)
