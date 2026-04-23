---
name: "§4 File Management"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:datastore", "status:backlog"]
---

# Overview

**Checklist section:** 4. File Management
**Phase target:** phase 1, phase 2
**Domain:** domain:datastore

## Goal

Enable users to browse, upload, download, and preview files within datasets, providing a complete file management experience including drag-and-drop upload, progress tracking, and rich file previews.

## Scope

### In Scope

- File browser (directory tree within datasets)
- File metadata display (size, type, date)
- Grid view and list view modes
- Single and bulk file download (ZIP)
- File upload with drag-and-drop and progress tracking
- File previews (images, PDF, text/code, CSV, video, audio)

### Out of Scope (deferred)

- HDF5 file content browsing (specialised viewer, Phase 2)
- Streaming download for very large files (performance optimisation)

## Feature Breakdown

### 4.1 File Browser

- [ ] Browse files within a dataset (directory tree)
- [ ] View file metadata (size, type, modification date)
- [ ] File type detection and icon display
- [ ] Grid view and list view modes
- [ ] Sort files by name, size, date, type
- [ ] Filter files within dataset

### 4.2 File Download

- [ ] Single file download
- [ ] Multiple file download as ZIP
- [ ] Download entire dataset as ZIP
- [ ] Download progress tracking
- [ ] Download cancellation
- [ ] Retry on failure
- [ ] Fast download (optimized bulk download)
- [ ] Streaming download for large files

### 4.3 File Upload

- [ ] Upload files to dataset
- [ ] Drag-and-drop upload
- [ ] Browse & select files
- [ ] Multiple file upload
- [ ] Upload progress tracking
- [ ] File conflict detection (overwrite confirmation)
- [ ] Session workspace (temporary upload area)
- [ ] Auto-upload on dataset creation

### 4.4 File Preview

Advanced feature for phase 3.

- [ ] Image preview (PNG, JPG, GIF, SVG, TIFF)
- [ ] PDF preview
- [ ] Text/code file preview with syntax highlighting
- [ ] CSV/TSV tabular preview
- [ ] HDF5 file content browsing
- [ ] Video preview (MP4, AVI, MOV)
- [ ] Audio preview (MP3, WAV)

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] File browser renders directory structures from mock data (Phase 0)
- [ ] Upload drag-and-drop works on Chrome, Firefox, Safari
- [ ] Preview components handle all listed file types gracefully (fallback for unsupported)
- [ ] Download progress accurately reflects transfer state

## Dependencies

- §3 Core Entities (datasets must exist to browse files)
- §1 Authentication (file access requires session)

## Notes

- Use Mantine file components where possible
- Consider using `react-dropzone` for drag-and-drop upload
- File preview components should be lazy-loaded to avoid bundle bloat
