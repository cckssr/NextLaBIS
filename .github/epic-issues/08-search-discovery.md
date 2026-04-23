---
name: "§8 Search & Discovery"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:search", "status:backlog"]
---

# Overview

**Checklist section:** §8 Search & Discovery
**Phase target:** phase 2, phase 3
**Domain:** domain:search

## Goal

Provide global and advanced search capabilities so users can find any entity across the entire openBIS instance using full-text search, property-based filters, relationship criteria, and boolean operators.

## Scope

### In Scope

- Global search bar with full-text search
- Search result grouping by entity type
- Autocomplete / suggestions
- Advanced search (by entity type, code, permId, properties, dates, relationships, tags)
- Boolean operators (AND, OR, NOT)
- Saved searches and search history
- Search domain services (external search integrations)

### Out of Scope (deferred)

- Elasticsearch/Lucene indexing configuration (infrastructure)
- AI-powered semantic search (§31 AI Assistant)

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Global search returns results from all entity types
- [ ] Advanced search supports all listed property types and criteria
- [ ] Search results are paginated and sortable
- [ ] Saved searches persist across sessions

## Dependencies

- §3 Core Entities (entities to search)
- §5 Property System (property-based search criteria)
- §9 Data Grids (search results displayed in grids)

## Notes

- Phase 0: search UI with mock data / client-side filtering
- Phase 1: integrate with openBIS search API (V3 SearchCriteria)
- Consider keyboard shortcut (Cmd/Ctrl+K) for global search
