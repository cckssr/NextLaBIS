---
name: "§22 Semantic Annotations"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 22. Semantic Annotations
**Phase target:** phase 3
**Domain:** domain:entities

## Goal

Implement semantic annotation capabilities on entity types and property assignments, supporting ontology predicates/descriptors and schema.org integration for FAIR data compliance.

## Scope

### In Scope

- Add/edit/delete semantic annotations on entity types
- Add/edit/delete semantic annotations on property assignments
- Ontology predicate and descriptor fields
- Annotation management interface
- Display annotations on type definitions and entity forms
- Schema.org integration support

### Out of Scope (deferred)

- Ontology browser / lookup service
- Automated annotation suggestions

## Feature Breakdown

- [ ] Add semantic annotations to entity types
- [ ] Add semantic annotations to property assignments
- [ ] Ontology predicate and descriptor fields
- [ ] Annotation management interface (add, edit, delete)
- [ ] Display annotations on type definitions
- [ ] Display annotations on entity forms
- [ ] Schema.org integration support

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Annotations can be added to any entity type and property assignment
- [ ] Annotations display correctly on type definition and entity form views
- [ ] Schema.org predicates are supported

## Dependencies

- §6 Type Management (annotations on types)
- §5 Property System (annotations on property assignments)

## Notes

- Semantic annotations support FAIR data principles
- Phase 2 feature — requires understanding of ontology standards
- Consider a toggle to show/hide annotations in entity forms (user preference)
