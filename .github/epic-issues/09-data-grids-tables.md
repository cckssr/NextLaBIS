---
name: "§9 Data Grids & Tables"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:grids", "status:backlog"]
---

# Overview

**Checklist section:** 9. Data Grids & Tables
**Phase target:** phase 1, phase 2
**Domain:** domain:grids

## Goal

Build a reusable, configurable data grid component used across the entire application for displaying entity lists, search results, and tabular data with sorting, filtering, column management, selection, pagination, and export.

## Scope

### In Scope

- Sortable data grids (single and multi-column sorting)
- Column management (show/hide, reorder, resize, save preferences)
- Filtering (per-column, multi-criteria, global filter, save preferences)
- Row selection (single, multi, select all, bulk operations)
- Pagination (configurable page size, navigation, total count)
- Export (CSV, TSV, filtered/sorted data, all/visible columns)
- Grid settings persistence per user and entity type

### Out of Scope (deferred)

- Inline editing within grids (handled by entity forms)
- Virtual scrolling for 10k+ rows (performance optimisation)

## Feature Breakdown

- [ ] Display entities in sortable data grids
- [ ] Column management:
  - [ ] Show/hide columns
  - [ ] Reorder columns
  - [ ] Resize columns
  - [ ] Save column preferences per user
- [ ] Filtering:
  - [ ] Filter by column values
  - [ ] Multi-criteria filtering
  - [ ] Global filter across all visible columns
  - [ ] Save filter preferences
- [ ] Sorting:
  - [ ] Sort by any column
  - [ ] Multi-column sorting
  - [ ] Ascending/descending toggle
- [ ] Selection:
  - [ ] Single row selection
  - [ ] Multi-row selection (checkboxes)
  - [ ] Select all
  - [ ] Bulk operations on selected rows
- [ ] Pagination:
  - [ ] Configurable page size
  - [ ] Page navigation
  - [ ] Total count display
- [ ] Export grid data:
  - [ ] Export to CSV
  - [ ] Export to TSV
  - [ ] Export filtered/sorted data
  - [ ] Export all columns or visible only
- [ ] Grid settings persistence (per user, per entity type)

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Grid component is reusable across all entity list views
- [ ] Column preferences persist in local storage or user settings
- [ ] Export produces valid CSV/TSV files
- [ ] Grid handles 1000+ rows without visible lag

## Dependencies

- §2 Navigation & Layout (grid rendered within content area)

## Notes

- Evaluate Mantine DataTable, TanStack Table, or AG Grid for base implementation
- This is a foundational component — invest in thorough testing and Storybook stories
- Grid component will be used by: entity lists, search results, query results, history views, admin tables
