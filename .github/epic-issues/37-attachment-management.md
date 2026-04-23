---
name: "§37 Attachment Management (Legacy)"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 37. Attachment Management (Legacy)
**Phase target:** phase 1
**Domain:** domain:entities

## Goal

Implement legacy attachment support for uploading, downloading, viewing, deleting, and versioning attachments on collections, objects, and projects.

## Scope

### In Scope

- Upload attachments to entities (collections, objects, projects)
- Download attachments
- View attachment list
- Delete attachments
- Attachment versioning

### Out of Scope (deferred)

- Migration from attachments to datasets
- Attachment preview (covered by §4 File Preview)

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Attachments can be uploaded and downloaded for all supported entity types
- [ ] Attachment versions are listed and individually downloadable
- [ ] Delete operation has confirmation dialog

## Dependencies

- §3 Core Entities (entities that have attachments)
- §4 File Management (upload/download infrastructure)

## Notes

- Attachments are a legacy openBIS feature — datasets are the modern replacement
- Still required for backward compatibility with existing data
- Consider adding a deprecation notice in the UI
