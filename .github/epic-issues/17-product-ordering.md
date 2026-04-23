---
name: "§17 Product Ordering (LIMS)"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:advanced", "status:backlog"]
---

# Overview

**Checklist section:** 17. Product Ordering (LIMS)
**Phase target:** phase 2, phase 3
**Domain:** domain:advanced

## Goal

Implement a product ordering system for LIMS workflows, allowing users to browse a product catalog, create product entries, submit orders, and track their status.

## Scope

### In Scope

- Product catalog browsing
- Product entry creation (name, catalog number, provider/vendor, price, currency, quantity)
- Order submission and tracking
- Auto-generated product codes

### Out of Scope (deferred)

- Integration with external procurement systems
- Approval workflows for orders

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Product catalog is searchable and filterable
- [ ] Order submission creates trackable records
- [ ] Product codes are auto-generated correctly

## Dependencies

- §3 Core Entities (products are openBIS objects)
- §9 Data Grids (product catalog displayed in grid)

## Notes

- Product ordering is built on top of openBIS object types with specific property configurations
- Relatively small scope — consider bundling with other LIMS features
