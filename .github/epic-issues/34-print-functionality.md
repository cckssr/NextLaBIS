---
name: "§34 Print Functionality"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:shell", "status:backlog"]
---

# Overview

**Checklist section:** 34. Print Functionality
**Phase target:** phase 3
**Domain:** domain:shell

## Goal

Implement print functionality for entity details, object lists, storage labels, and barcodes/QR codes with print-friendly formatting.

## Scope

### In Scope

- Print entity details
- Print object lists
- Print storage labels
- Print barcodes/QR codes
- Print-friendly formatting (CSS @media print)

### Out of Scope (deferred)

- PDF generation for offline sharing (partially covered by §10 Export)
- Custom print templates

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Print output is clean and well-formatted (no navigation, no sidebar)
- [ ] Barcodes/QR codes print at scannable resolution
- [ ] Storage labels print at correct dimensions for label printers

## Dependencies

- §3 Core Entities (entity details to print)
- §15 Storage Management (storage labels)
- §16 ELN Features (barcodes/QR codes)

## Notes

- Implement using CSS `@media print` styles and `window.print()`
- Consider a dedicated print preview component
- Relatively small epic — may be combined with other UI polish work
