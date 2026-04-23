---
name: "§32 Move Operations"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 32. Move Operations
**Phase target:** phase 2
**Domain:** domain:entities

## Goal

Implement entity move operations allowing users to relocate objects, collections, and projects across the openBIS hierarchy with proper reference updates, confirmation dialogs, and bulk support.

## Scope

### In Scope

- Move object between spaces/projects/collections
- Move collection between projects
- Move project between spaces
- Cross-hierarchy relocation
- Parent reference update on move
- Move confirmation dialog
- Bulk move operations

### Out of Scope (deferred)

- Undo move operations
- Move history / audit trail (covered by §12)

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Move operations update all references correctly
- [ ] Confirmation dialog shows source and destination
- [ ] Bulk move handles errors gracefully (partial success reporting)

## Dependencies

- §3 Core Entities (entities to move)
- §26 Forms & Validation (move dialogs)

## Notes

- Move operations require API integration — Phase 1 feature
- Consider implementing move via drag-and-drop in the tree browser (§2)
- Permissions must be checked for both source and destination
