---
name: "§3 Entity Management – Core Entities"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 3. Entity Management – Core Entities
**Phase target:** phase 1, phase 2
**Domain:** domain:entities

## Goal

Implement full CRUD and relationship management for all core openBIS entities (Spaces, Projects, Collections, Objects, Datasets) so users can browse, create, edit, delete, and relate entities through the new UI.

## Scope

### In Scope

- Spaces: list, create, edit, delete, freeze, search
- Projects: list, create, edit, delete, move between spaces, search
- Collections: list, create, edit, delete, move, freeze, search, pagination
- Objects: list, create, edit, delete, move, parent/child relationships, container/component relationships, freeze, batch operations, auto-save forms
- Datasets: list, create, edit, delete, parent/child, container/component, archive/unarchive, lock/unlock, freeze, search

### Out of Scope (deferred)

- Materials (§3.6 — legacy, struck through in checklist)
- File browsing within datasets (covered by §4 File Management)
- Property rendering (covered by §5 Property System)

## Feature Breakdown

### 3.1 Spaces

- [ ] List all spaces
- [ ] Create space (code, description)
- [ ] Edit space (description)
- [ ] Delete space (with confirmation) (power user)
- [ ] View space details (projects, objects, metadata)
- [ ] Freeze space (make immutable) (admin)
  - [ ] Freeze for projects
  - [ ] Freeze for objects
- [ ] Search spaces

### 3.2 Projects

- [ ] List projects (within space or globally)
- [ ] Create project (code, description, space assignment)
- [ ] Edit project (description, space reassignment)
- [ ] Delete project (with confirmation) (power user)
- [ ] View project details (collections, objects, metadata)
- [ ] Move project between spaces (rights check)
- [ ] Search projects

### 3.3 Collections

- [ ] List collections (within project or globally)
- [ ] Create collection (code, type, project assignment)
- [ ] Edit collection properties
- [ ] Delete collection (trackable, goes to trash)
- [ ] View collection details (objects, datasets, properties)
- [ ] Move collection between projects
- [ ] Freeze collection (admin)
  - [ ] Freeze for objects
  - [ ] Freeze for datasets
- [ ] Search collections by type, properties, project, space
- [ ] Pagination through collection tables

### 3.4 Objects / Samples

- [ ] List objects (within collection, project, space, or globally)
- [ ] Create object (code, type, space/project/collection assignment)
- [ ] Edit object properties
- [ ] Delete object (trackable, goes to trash)
- [ ] View object details (properties, datasets, parents, children, components)
- [ ] Move object between spaces/projects/collections
- [ ] Manage parent-child relationships
  - [ ] Add/remove parents
  - [ ] Add/remove children
  - [ ] View parent hierarchy
  - [ ] View child hierarchy
- [ ] Manage container-component relationships
  - [ ] Assign object to container
  - [ ] Add components to object
  - [ ] Remove components
- [ ] Relationship annotations (quality, metadata on links)
- [ ] Freeze object (admin)
  - [ ] Freeze for components
  - [ ] Freeze for children
  - [ ] Freeze for parents
  - [ ] Freeze for datasets
- [ ] Search objects by type, properties, relationships, space, project
- [ ] Batch object operations
- [ ] Pagination through object tables
- [ ] Object form with sections and dynamic property layout
- [ ] Auto-save support on object forms
- [ ] Show in project overview toggle

### 3.5 Datasets

- [ ] List datasets (within object, collection, or globally)
- [ ] Create dataset (code, type, object/collection assignment)
- [ ] Edit dataset properties
- [ ] Delete dataset (trackable, goes to trash)
- [ ] View dataset details (properties, files, metadata)
- [ ] Dataset kinds:
  - [ ] Physical datasets (files stored in DSS)
  - [ ] Link datasets (external references)
  - [ ] Container datasets (grouping)
- [ ] Manage parent-child relationships for datasets
- [ ] Manage container-component relationships for datasets
- [ ] Archive dataset
- [ ] Unarchive dataset
- [ ] Lock/unlock dataset
- [ ] View archive status (available, archived, archive pending, unarchive pending)
- [ ] Freeze dataset
  - [ ] Freeze for children
  - [ ] Freeze for parents
  - [ ] Freeze for components
  - [ ] Freeze for containers
- [ ] Search datasets by type, properties, object, collection
- [ ] View dataset registration/modification metadata

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] All entity types have list, detail, create, edit, delete views
- [ ] Relationship management (parent/child, container/component) works bidirectionally
- [ ] Freeze operations are admin-only and properly guarded
- [ ] All views paginated for large datasets
- [ ] Mock data fixtures exist for all entity types (Phase 0)

## Dependencies

- §1 Authentication (access control)
- §2 Navigation & Layout (entity views rendered within layout)
- §5 Property System (entity forms use property rendering)

## Notes

- This is the largest epic. Consider splitting into sub-epics per entity type if needed.
- Use dynamic routing: `/spaces/[code]`, `/projects/[id]`, etc.
- Object/Sample terminology: always use "Object" in UI, never "Sample".
- Collection terminology: always use "Collection", never "Experiment".
