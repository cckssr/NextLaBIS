---
name: "§5 Property System"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:props", "status:backlog"]
---

# Overview

**Checklist section:** 5. Property System
**Phase target:** phase:1
**Domain:** domain:props

## Goal

Implement the full openBIS property type system including property type CRUD, assignment to entity types, and dynamic form rendering for all 12+ data types so that entity forms are driven by property configuration.

## Scope

### In Scope

- Property type CRUD (all 12 data types: VARCHAR, MULTILINE_VARCHAR, BOOLEAN, INTEGER, REAL, TIMESTAMP, CONTROLLEDVOCABULARY, MATERIAL, OBJECT, HYPERLINK, XML, JSON)
- Property assignment to entity types (mandatory/optional, sections, ordering)
- Dynamic form rendering based on property type
- All input components: text, multiline, rich text, date/time pickers, dropdowns, toggles, numeric, hyperlink, object/material pickers, JSON/XML editors

### Out of Scope (deferred)

- Semantic annotations on properties (covered by §22)
- Dynamic property plugins (covered by §13)

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] All 12 property data types render correctly in forms
- [ ] Property sections and ordering are respected in form layout
- [ ] Mandatory field validation works at form level
- [ ] Mock data covers all property types (Phase 0)

## Dependencies

- §6 Type Management (entity types define which properties are assigned)
- §3 Core Entities (properties are rendered on entity forms)

## Notes

- Property rendering is one of the most critical shared components — invest in reusable `PropertyField` component
- Rich text editor: evaluate TipTap vs CKEditor for Phase 0
- JSON editor: consider `@monaco-editor/react` or similar
