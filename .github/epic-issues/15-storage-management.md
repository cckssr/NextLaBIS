---
name: "§15 Storage Management (LIMS)"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 15. Storage Management (LIMS)
**Phase target:** phase 2, phase 3
**Domain:** domain:entities

## Goal

Implement a visual storage management system for LIMS workflows, allowing users to define storage units (freezers, racks, shelves, boxes), visualise grid-based layouts, and assign objects to specific storage positions.

## Scope

### In Scope

- Storage browser (hierarchical storage visualisation)
- Storage unit definitions (freezers, racks, shelves, boxes)
- Grid-based storage layout visualisation
- Object assignment to storage positions (drag-and-drop)
- Position validation (conflict/duplicate detection)
- Multiple storage property groups per object
- Box management
- User assignment and label printing

### Out of Scope (deferred)

- Barcode scanning for storage placement (covered by §16.6)
- Storage capacity analytics / reporting

## Feature Breakdown

- [ ] Storage browser (hierarchical storage visualization)
- [ ] Define storage units (freezers, racks, shelves, boxes)
- [ ] Grid-based storage layout visualization (rack positions, box positions)
- [ ] Assign objects to storage positions
- [ ] Drag-and-drop object placement in storage grid
- [ ] View object at position (click to navigate)
- [ ] Storage position validation (detect conflicts/duplicates)
- [ ] Multiple storage property groups per object
- [ ] Box management within storage units
- [ ] User assignment to storage positions
- [ ] Print storage labels

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Storage hierarchy renders correctly (freezer → rack → shelf → box)
- [ ] Grid layout accurately represents physical storage positions
- [ ] Drag-and-drop placement updates storage assignments
- [ ] Conflict detection prevents duplicate position assignments

## Dependencies

- §3 Core Entities (objects placed in storage)
- §5 Property System (storage property groups)

## Notes

- Storage management is a core LIMS feature
- Grid visualisation requires a custom canvas or grid component
- Phase 0 can prototype with mock storage data
