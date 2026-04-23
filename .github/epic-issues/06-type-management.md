---
name: "§6 Type Management"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 6. Type Management
**Phase target:** phase 1, phase 2
**Domain:** domain:entities

## Goal

Provide admin interfaces for managing all openBIS entity types (Object Types, Collection Types, Dataset Types), type groups, and vocabularies, including property assignment, section management, and form layout preview.

## Scope

### In Scope

- Object type CRUD with property assignment and section management
- Collection type CRUD with property assignment
- Dataset type CRUD with property assignment
- Type groups management
- Vocabulary management (terms CRUD, reordering, official/deprecated flags)
- Form layout preview

### Out of Scope (deferred)

- Material types (§6.4 — legacy, struck through in checklist)
- Semantic annotations on types (covered by §22)

## Feature Breakdown

### 6.1 Object Types

- [ ] List all object types
- [ ] Create object type (code, description, validation plugin, auto-generated codes)
- [ ] Edit object type
- [ ] Delete object type
- [ ] Manage assigned properties (add, remove, reorder, configure)
- [ ] Manage sections (group properties into visual sections)
- [ ] Preview form layout
- [ ] Semantic annotations on object type
- [ ] Assign to type group

### 6.2 Collection Types

- [ ] List all collection types
- [ ] Create collection type
- [ ] Edit collection type
- [ ] Delete collection type
- [ ] Manage assigned properties
- [ ] Semantic annotations

### 6.3 Dataset Types

- [ ] List all type groups
- [ ] Create type group
- [ ] Edit type group
- [ ] Delete type group
- [ ] Assign/unassign entity types to groups

### 6.5 Type Groups

- [ ] List all type groups
- [ ] Create type group
- [ ] Edit type group
- [ ] Delete type group
- [ ] Assign/unassign entity types to groups

### 6.6 Vocabulary Management

- [ ] List all vocabularies
- [ ] Create vocabulary (code, description)
- [ ] Edit vocabulary
- [ ] Delete vocabulary
- [ ] Manage vocabulary terms:
  - [ ] Add term (code, label, description)
  - [ ] Edit term
  - [ ] Delete term
  - [ ] Reorder terms
  - [ ] Mark term as official
  - [ ] Mark term as internal (deprecated)
  - [ ] View term registrator and registration date

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Type CRUD forms work for all three entity type categories
- [ ] Property assignment supports drag-and-drop reordering
- [ ] Vocabulary term management supports all CRUD operations
- [ ] Form layout preview accurately reflects property sections and ordering

## Dependencies

- §5 Property System (types define property assignments)
- §1 Authentication (admin-only operations)

## Notes

- Type management is admin-facing — consider gating behind admin role check
- Vocabulary terms are used heavily by property dropdowns (§5.3)
- "Object Type" — never use "Sample Type" in the UI
