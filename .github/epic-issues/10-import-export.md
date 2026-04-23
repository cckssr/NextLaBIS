---
name: "§10 Import & Export"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:exim", "status:backlog"]
---

# Overview

**Checklist section:** 10. Import & Export
**Phase target:** phase 2, phase 3
**Domain:** domain:exim

## Goal

Provide comprehensive data import and export capabilities including Excel/CSV import, hierarchical export (PDF, XLSX, JSON), RO-Crate support, and Zenodo integration for publishing research data.

## Scope

### In Scope

- General import (ImportData API) with update mode selection
- Excel/XLS import (parse, preview, map columns, bulk create)
- CSV import
- Custom import (dropbox-based)
- General export (ExportData API)
- Hierarchical export (PDF, XLSX, JSON) with depth control
- RO-Crate export and import
- Grid/table data export
- Query results export
- Research collection export
- Zenodo integration (API token, publish, export metadata)

### Out of Scope (deferred)

- Custom dropbox plugin development
- Advanced RO-Crate schema customisation

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Excel import correctly maps columns to openBIS properties
- [ ] Export produces valid PDF, XLSX, and JSON files
- [ ] RO-Crate packages conform to specification
- [ ] Import validation catches and reports errors before committing

## Dependencies

- §3 Core Entities (entities to import/export)
- §5 Property System (property mapping for imports)
- §9 Data Grids (grid export functionality)
- §14 Query System (query results export)

## Notes

- Import/export is primarily a Phase 1 feature (requires API integration)
- Phase 0 can prototype the UI (upload forms, column mapping preview) with mock data
- Zenodo integration requires external API credentials
