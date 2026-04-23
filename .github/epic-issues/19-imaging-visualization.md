---
name: "§19 Imaging & Visualization"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 19. Imaging & Visualization
**Phase target:** phase 3
**Domain:** domain:entities

## Goal

Implement image gallery, screening/plate management, and data visualisation capabilities for browsing, viewing, and analysing image datasets including multi-channel microscopy data and plate-based screening experiments.

## Scope

### In Scope

- Image gallery (grid view, thumbnails, metadata, navigation, zoom, slideshow)
- Screening plate layout visualisation (wells, images per well, channels, resolutions)
- Feature vector analysis (load, visualise, reference datasets)
- Data visualisation (graphs, charts from tabular/image data)

### Out of Scope (deferred)

- 3D visualisation
- Advanced image analysis pipelines (covered by §29 Imaging Plugin)

## Feature Breakdown

### 19.1 Image Gallery

- [ ] Grid view of images in a dataset
- [ ] Thumbnail generation and display
- [ ] Image metadata display
- [ ] Navigate between images (next/previous)
- [ ] Image zoom controls
- [ ] Slideshow mode
- [ ] Editable image metadata
- [ ] Semantic annotations on images

### 19.2 Screening / Plate Management

- [ ] Plate listing (all plates, per collection)
- [ ] Plate layout visualization (grid of wells)
- [ ] Well detail view
- [ ] Plate-well-material mapping
- [ ] Image datasets per well
  - [ ] Load well images (base64)
  - [ ] Multiple image channels
  - [ ] Multiple resolutions
  - [ ] Thumbnail previews
  - [ ] Physical thumbnails
  - [ ] Image representation format selection
- [ ] Feature vector analysis
  - [ ] List available feature codes
  - [ ] Load feature vectors for wells
  - [ ] Feature vector visualization
  - [ ] Feature dataset references
- [ ] Collection-level image metadata

### 19.3 Data Visualization

- [ ] Tabular data graph rendering
- [ ] Image analysis graph reporting
- [ ] Dataset image overview
- [ ] Chart/graph generation from data

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Image gallery handles common formats (PNG, JPG, TIFF)
- [ ] Plate layout accurately renders well positions and contents
- [ ] Feature vector data displays in tabular and chart form
- [ ] Charts are interactive (zoom, hover tooltips)

## Dependencies

- §3 Core Entities (datasets containing images)
- §4 File Management (image file access)

## Notes

- Image-heavy features — consider lazy loading and progressive image rendering
- Plate visualisation may need a custom grid component
- Chart library: evaluate Recharts, Chart.js, or Plotly for data visualisation
