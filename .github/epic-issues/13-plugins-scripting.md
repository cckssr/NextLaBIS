---
name: "§13 Plugins & Scripting"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:admin", "status:backlog"]
---

# Overview

**Checklist section:** 13. Plugins & Scripting
**Phase target:** phase 2, phase 3
**Domain:** domain:admin

## Goal

Provide interfaces for managing and executing openBIS server-side plugins including dynamic property plugins, entity validation plugins, custom AS services, aggregation services, reporting services, and processing services.

## Scope

### In Scope

- Dynamic property plugin CRUD (list, create, edit script, delete, test/evaluate)
- Entity validation plugin CRUD
- Custom AS service execution with parameters
- Aggregation service execution with tabular results
- Reporting service execution with tabular results
- Processing service execution on selected datasets (async)
- Jython code editor with syntax highlighting

### Out of Scope (deferred)

- Plugin development environment / debugging tools
- Plugin marketplace / sharing

## Dependencies

- §1 Authentication (admin access required)
- §3 Core Entities (plugins operate on entities)
- §5 Property System (dynamic property plugins)

## Notes

- Plugins require server-side execution — this is a Phase 1 feature
- Consider Monaco editor for the Jython code editor
