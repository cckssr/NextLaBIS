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

## Feature Breakdown

### 8.1 Global Search

- [ ] Global search bar (search across all entity types)
- [ ] Full-text search across all indexed entities
- [ ] Search result grouping by entity type
- [ ] Navigate to search results
- [ ] Search suggestions / autocomplete

### 8.2 Advanced Search

- [ ] Search by entity type (space, project, collection, object, dataset)
- [ ] Search by code / permId / identifier
- [ ] Search by property values (any property, specific property)
- [ ] Search by string, numeric (comparison operators), boolean, date (range), controlled vocabulary, object reference properties
- [ ] Search by registration/modification date range
- [ ] Search by registrator/modifier
- [ ] Search by parent/child relationships
- [ ] Search by container/component relationships
- [ ] Search by collection/project/space
- [ ] Search by tag
- [ ] Combine criteria with AND/OR operators
- [ ] Negate criteria (NOT)
- [ ] Saved searches
- [ ] Search history

### 8.3 Search Domain Services

- [ ] Execute search domain services (external search integrations)
- [ ] Display search domain results

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
