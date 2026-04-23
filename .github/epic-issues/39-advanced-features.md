---
name: "§39 Advanced Features"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:advanced", "status:backlog"]
---

# Overview

**Checklist section:** 39. Advanced Features
**Phase target:** phase 3
**Domain:** domain:advanced

## Goal

Implement advanced features including a modern rich text editor with real-time collaborative editing, history checkpoints, and quick data visualisations (charts, graphs).

## Scope

### In Scope

- TipTap / modern rich text editor with collaboration
- Real-time collaborative editing
- Saving / history checkpoints / versioning
- Quick data visualisations (charts, graphs)

### Out of Scope (deferred)

- Custom visualisation plugin framework
- Offline collaborative editing (CRDT-based)

## Feature Breakdown

- [ ] TipTap / modern rich text editor with collaboration
- [ ] Real-time collaborative editing
- [ ] Saving / history checkpoints / enabling
- [ ] Quick data visualisations (charts, graphs)

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Collaborative editing works with multiple concurrent users
- [ ] History checkpoints allow reverting to previous versions
- [ ] Data visualisations render correctly from tabular data

## Dependencies

- §16 ELN Features (rich text editor baseline)
- §12 History & Audit (history checkpoints)
- §19 Imaging & Visualization (chart library shared)

## Notes

- TipTap with Hocuspocus for real-time collaboration (WebSocket-based)
- History checkpoints integrate with the openBIS entity history system
- Phase 2 — requires stable ELN features as foundation
- This is the most forward-looking epic — scope may evolve significantly
