---
name: "§16 ELN-Specific Features"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:entities", "status:backlog"]
---

# Overview

**Checklist section:** 16. ELN-Specific Features
**Phase target:** phase 2, phase 3
**Domain:** domain:entities

## Goal

Implement electronic lab notebook (ELN) specific features including the lab notebook browsing interface, rich text editing, comments system, templates, drawing board, free-form tables, dilution tables, and barcode/QR code support.

## Scope

### In Scope

- Lab notebook browsing mode (Space > Project > Collection hierarchy)
- Rich text editor (bold, italic, headers, lists, Greek chars, images, tables, code blocks, links)
- Comments system (timestamped, threaded, user attribution)
- Template types for entity creation
- Drawing board / sketches (canvas-based)
- Free-form tables (dynamic rows/columns, inline editing, JSON persistence)
- Dilution tables
- Barcode/QR code generation, display, and scanning

### Out of Scope (deferred)

- Real-time collaborative editing (covered by §39 Advanced Features)
- ELN master data initialization (deployment concern)

## Feature Breakdown

### 16.1 Lab Notebook Interface

- [ ] Dedicated lab notebook browsing mode
- [ ] Space > Project > Collection hierarchy for organizing notebooks
- [ ] Rich text editor for collection notes (CKEditor or equivalent)
  - [ ] Text formatting (bold, italic, headers, lists)
  - [ ] Greek character insertion (scientific notation)
  - [ ] Image embedding
  - [ ] Table creation
  - [ ] Code blocks
  - [ ] Link insertion
- [ ] Comments system on entities
  - [ ] Add timestamped comments
  - [ ] View comment thread
  - [ ] Delete comments
  - [ ] User attribution

### 16.2 Templates

- [ ] Template types for entity creation
- [ ] ELN master data initialization
- [ ] Pre-defined object type configurations for common lab workflows

### 16.3 Drawing Board / Sketches

- [ ] Canvas-based drawing tool
- [ ] Create and save sketches/diagrams
- [ ] Attach drawings to collections/objects

### 16.4 Free-Form Tables

- [ ] Create custom tables within entities
- [ ] Dynamically add rows and columns
- [ ] Edit cell values inline
- [ ] Mini view and detailed view modes
- [ ] JSON-based persistence
- [ ] Spreadsheet-like editing (JExcel integration)

### 16.5 Dilution Tables

- [ ] Dilution series calculation and management
- [ ] Concentration tracking

### 16.6 Barcode / QR Code Support

- [ ] Generate barcodes/QR codes for entities
- [ ] Display barcodes in data grids
- [ ] Scan barcodes with physical scanner (keyboard input)
- [ ] Scan QR codes with camera
- [ ] Look up entities by barcode scan

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Rich text editor supports all listed formatting options
- [ ] Comments display correctly with timestamps and user attribution
- [ ] Free-form tables persist correctly as JSON
- [ ] Barcode generation produces scannable codes

## Dependencies

- §3 Core Entities (collections and objects that notebooks are built on)
- §5 Property System (rich text stored as MULTILINE_VARCHAR)
- §2 Navigation (notebook browsing mode within navigation)

## Notes

- Rich text editor: evaluate TipTap for Phase 0 (modern, extensible, React-native)
- Free-form tables: consider Handsontable or JExcel equivalent
- Barcode generation: use a library like `react-barcode` or `qrcode.react`
