---
name: "§11 Trash & Deletion Management"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 11. Trash & Deletion Management
**Phase target:** phase 2, phase 3
**Domain:** domain:entities

## Goal

Implement a trashcan view for soft-deleted entities with restore, permanent delete, and cascade delete capabilities, providing a safety net for accidental deletions.

## Scope

### In Scope

- Trashcan view (all soft-deleted entities)
- Deletion details display (entity type, code, date, user, reason)
- Restore single deleted entity
- Permanently delete single entity
- Permanently delete with dependent entities (cascade)
- Empty entire trashcan
- Safety confirmation dialogs
- Search/filter within trash
- Deletion reason input on delete

### Out of Scope (deferred)

- Automatic trash cleanup (scheduled purge)

## Feature Breakdown

- [ ] View trashcan (all soft-deleted entities)
- [ ] Display deletion details (entity type, code, date, user, reason)
- [ ] Restore (revert) single deleted entity
- [ ] Permanently delete single entity
- [ ] Permanently delete with dependent entities (cascade)
- [ ] Empty entire trashcan
- [ ] Confirm permanent deletion with safety dialog
- [ ] Search/filter within trash
- [ ] Deletion reason input on delete

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Trashcan lists all soft-deleted entities with metadata
- [ ] Restore operation works correctly and entity reappears in original location
- [ ] Permanent deletion has double-confirmation safety dialog
- [ ] Cascade delete clearly communicates affected entities before proceeding

## Dependencies

- §3 Core Entities (entities that can be deleted)
- §9 Data Grids (trash view uses grid component)

## Notes

- Soft deletion is an openBIS core concept — entities are marked as deleted, not removed
- Permanent deletion is irreversible — UI should make this extremely clear
