---
name: "§36 Identifier & Code Management"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 36. Identifier & Code Management
**Phase target:** phase 1
**Domain:** domain:entities

## Goal

Implement identifier and code management including auto-generation of permanent IDs and entity codes, hierarchical identifier display, clipboard copy, and navigation by identifier.

## Scope

### In Scope

- Auto-generate permanent IDs (permId)
- Auto-generate entity codes (with prefix)
- Hierarchical identifier display (/SPACE/PROJECT/SAMPLE)
- Copy identifier/permId to clipboard
- Navigate by identifier

### Out of Scope (deferred)

- Custom identifier format configuration
- Identifier migration tools

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Identifiers display correctly in hierarchical format
- [ ] Copy to clipboard works with a single click
- [ ] Navigation by identifier resolves to the correct entity

## Dependencies

- §3 Core Entities (entities that have identifiers)

## Notes

- Identifier display is used across all entity views — shared component
- Copy-to-clipboard: use `navigator.clipboard.writeText()` with toast feedback
- This is a small but cross-cutting epic
