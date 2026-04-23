---
name: "§38 Object Kind Modification Tracking"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 38. Object Kind Modification Tracking
**Phase target:** phase 1
**Domain:** domain:entities

## Goal

Implement tracking of modifications by object kind (entity type) to support cache invalidation and incremental loading patterns.

## Scope

### In Scope

- Track modifications by object kind (entity type)
- Last modification timestamp per kind
- Use for cache invalidation / incremental loading

### Out of Scope (deferred)

- Real-time change notification (WebSocket push)
- Cross-tab synchronisation

## Feature Breakdown

- [ ] Track modifications by object kind (entity type)
- [ ] Last modification timestamp per kind
- [ ] Use for cache invalidation / incremental loading

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Modification timestamps update correctly when entities are modified
- [ ] Cache invalidation triggers data refresh for affected entity types
- [ ] Incremental loading reduces API calls for unchanged data

## Dependencies

- §3 Core Entities (entities being tracked)
- §24 Async Operations (cache invalidation patterns)

## Notes

- Infrastructure epic — primarily consumed by other features for performance
- openBIS V3 API provides `getObjectKindModificationTimestamp` — Phase 1 integration
- Small scope — consider combining with §24 Async Operations
