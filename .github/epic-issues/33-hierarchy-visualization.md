---
name: "§33 Hierarchy Visualization"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 33. Hierarchy Visualization
**Phase target:** phase 3
**Domain:** domain:entities

## Goal

Implement parent-child relationship tree views with expandable/collapsible hierarchy, entity type filtering, depth control, and entity navigation for visualising complex entity relationships.

## Scope

### In Scope

- Parent-child relationship tree view
- Expandable/collapsible hierarchy
- Filter by entity type
- Hierarchy depth control
- Navigate to any entity in hierarchy

### Out of Scope (deferred)

- Graph-based visualisation (network diagram)
- Relationship strength / weight visualisation

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Tree view renders multi-level parent-child hierarchies
- [ ] Entity type filter correctly narrows displayed nodes
- [ ] Depth control limits tree expansion levels
- [ ] Clicking any node navigates to the entity detail view

## Dependencies

- §3 Core Entities (parent-child relationships)
- §2 Navigation (entity navigation)

## Notes

- This complements the tree browser in §2 but focuses specifically on relationship visualisation
- Consider using a dedicated tree library for deep hierarchies
- Phase 0: prototype with mock relationship data
