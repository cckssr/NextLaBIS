---
name: "§23 Tags / Metaprojects"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 23. Tags / Metaprojects
**Phase target:** phase 3
**Domain:** domain:entities

## Goal

Implement a tagging system allowing users to create tags, assign them to entities (objects, datasets, collections), browse/filter entities by tag, and search by tag.

## Scope

### In Scope

- Tag CRUD (create, delete)
- Assign/remove tags on entities
- Browse/filter entities by tag
- Search by tag

### Out of Scope (deferred)

- Tag-based access control
- Tag hierarchies or categories

## Feature Breakdown

- [ ] Create tags
- [ ] Assign tags to entities (objects, datasets, collections)
- [ ] Remove tags from entities
- [ ] Browse/filter entities by tag
- [ ] Delete tags
- [ ] Search by tag

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Tags can be assigned to and removed from any supported entity type
- [ ] Entity list views support filtering by tag
- [ ] Tag search integrates with §8 Search & Discovery

## Dependencies

- §3 Core Entities (entities to tag)
- §8 Search (search by tag)

## Notes

- Tags are the modern replacement for the legacy "metaprojects" concept
- Relatively small epic — may be combined with entity management work
