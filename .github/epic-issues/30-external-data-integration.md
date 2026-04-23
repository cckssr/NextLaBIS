---
name: "§30 External Data & Integration"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 30. External Data & Integration
**Phase target:** phase 3
**Domain:** domain:entities

## Goal

Implement support for external data repositories, git-backed dataset management, and research collection publication features including Zenodo integration and DOI assignment.

## Scope

### In Scope

- External data repository links and management
- External DMS management
- Content copy tracking
- Git integration (git-backed datasets, git-annex support, repo init/config, clone/sync)
- Research collection management (submission types, retention periods, Zenodo publication, DOI assignment)

### Out of Scope (deferred)

- Custom external repository connectors
- Multi-DOI management

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] External dataset links resolve correctly
- [ ] Git integration supports clone and sync operations
- [ ] Zenodo publication workflow completes end-to-end

## Dependencies

- §3 Core Entities (datasets and collections)
- §25 Server Administration (external DMS setup)

## Notes

- Phase 2 feature — requires external service integrations
- Git integration depends on the obis CLI tool
- Zenodo integration requires API credentials
