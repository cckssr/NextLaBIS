---
name: "§29 Plugin-Specific Features"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:advanced", "status:backlog"]
---

# Overview

**Checklist section:** 29. Plugin-Specific Features
**Phase target:** phase 3
**Domain:** domain:advanced

## Goal

Implement UI support for openBIS-specific plugins including XLS Import, Imaging Technology, Nanonis (SPM) Imaging, Dataset Uploader, Dataset File Search, and OpenBIS Sync plugins.

## Scope

### In Scope

- XLS Import plugin UI (upload, parse, validate, map, bulk create)
- Imaging Technology plugin (analysis pipeline, feature extraction, processing services)
- Nanonis (SPM) Imaging plugin (SPM data import, format support, analysis, visualisation)
- Dataset Uploader plugin (dedicated upload API/workflow)
- Dataset File Search plugin (full-text search within files, content indexing)
- OpenBIS Sync plugin (cross-instance sync, resource-sync protocol, status monitoring)

### Out of Scope (deferred)

- Custom plugin development framework
- Third-party plugin marketplace

## Feature Breakdown

### 29.1 XLS Import Plugin

- [ ] Upload Excel files for bulk data import
- [ ] Parse and validate spreadsheet data
- [ ] Map spreadsheet columns to openBIS properties
- [ ] Bulk create entities from spreadsheet

### 29.2 Imaging Technology Plugin

- [ ] Image analysis pipeline
- [ ] Feature extraction from images
- [ ] Image processing services
- [ ] Imaging-specific object/dataset handling

### 29.3 Nanonis (SPM) Imaging Plugin

- [ ] Import scanning probe microscopy data
- [ ] SPM file format support (Nanonis)
- [ ] SPM data analysis tools
- [ ] SPM data visualization

### 29.4 Dataset Uploader Plugin

- [ ] Dedicated dataset upload API/service
- [ ] File upload workflow

### 29.5 Dataset File Search Plugin

- [ ] Full-text search within dataset files
- [ ] File content indexing

### 29.6 OpenBIS Sync Plugin

- [ ] Cross-instance data synchronization
- [ ] Resource-sync protocol support
- [ ] Sync status monitoring

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] XLS import correctly creates entities from uploaded spreadsheets
- [ ] Imaging plugins handle their respective data formats
- [ ] Sync plugin shows accurate cross-instance synchronisation status

## Dependencies

- §10 Import & Export (XLS import builds on import infrastructure)
- §19 Imaging & Visualization (imaging plugins extend imaging capabilities)
- §4 File Management (file upload/search)

## Notes

- These are specialised features — each plugin may be its own sub-epic
- Phase 2 — requires all core infrastructure to be in place first
- Some plugins may not be needed for all openBIS deployments — consider lazy loading
