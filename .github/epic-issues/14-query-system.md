---
name: "§14 Query System"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:admin", "status:backlog"]
---

# Overview

**Checklist section:** 14. Query System
**Phase target:** phase 2, phase 3
**Domain:** domain:admin

## Goal

Implement the openBIS query system allowing users to create, save, and execute SQL queries against the openBIS database with parameterised inputs, result grids, and export capabilities.

## Scope

### In Scope

- Query CRUD (list, create, edit, delete)
- SQL editor with syntax highlighting
- Query parameter definition and input forms
- Query execution with result display in data grid
- Result pagination, sorting, and export (CSV, TSV)
- Direct SQL execution (admin only)

### Out of Scope (deferred)

- Query scheduling / automated execution
- Query sharing between users

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] SQL editor supports syntax highlighting and basic autocompletion
- [ ] Parameterised queries render dynamic input forms
- [ ] Results display in the shared data grid component
- [ ] Admin-only SQL execution is properly role-gated

## Dependencies

- §9 Data Grids (results displayed in grid)
- §1 Authentication (admin role for direct SQL)

## Notes

- Query system operates on the openBIS database — requires Phase 1 API integration
- Security: SQL injection prevention is handled server-side, but UI should still sanitise inputs
