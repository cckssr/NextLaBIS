---
name: "§2 Navigation & Layout"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:nav", "status:backlog"]
---

# Overview

**Checklist section:** 2. Navigation & Layout
**Phase target:** phase 1
**Domain:** domain:nav

## Goal

Provide a complete navigation and layout system including sidebar/tab navigation, breadcrumbs, tree browser, multi-tab workspace, and responsive layout so users can efficiently navigate the openBIS entity hierarchy across all device sizes.

## Scope

### In Scope

- Main navigation structure (sidebar/tab-based)
- Breadcrumb navigation
- Browser history support (back/forward)
- Multi-tab workspace with unsaved-changes indicators
- Hierarchical tree browser (Space → Project → Collection → Object → Dataset)
- Tree lazy loading, filtering, context menus, drag-and-drop
- Responsive layout (desktop, tablet, mobile)
- Resizable panels and full-screen/focus mode

### Out of Scope (deferred)

- Entity CRUD operations (covered by §3 Core Entities epic)
- Search integration within tree (covered by §8 Search epic)

## Feature Breakdown

### 2.1 Main Navigation Structure

- [ ] Tab-based or sidebar navigation with major sections:
  - [ ] Lab Notebook (ELN)
  - [ ] Inventory / LIMS
  - [ ] Database browser (admin)
  - [ ] Types management (admin)
  - [ ] Users management (admin)
  - [ ] Tools / Utilities
- [ ] Breadcrumb navigation showing current hierarchy path
- [ ] Back/forward browser history support
- [ ] Multi-tab workspace (open multiple entities simultaneously)
  - [ ] Tab switching
  - [ ] Close tabs
  - [ ] Unsaved changes indicator per tab

### 2.2 Side Menu / Tree Browser

- [ ] Hierarchical tree navigation (Space > Project > Collection > Object > Dataset)
- [ ] Expand/collapse tree nodes
- [ ] Lazy loading of tree children
- [ ] Filter/search within tree
- [ ] Context menu on tree nodes (create, delete, move, etc.)
- [ ] Drag-and-drop in tree (move entities)

### 2.3 Responsive Layout

- [ ] Desktop layout (multi-column)
- [ ] Tablet layout adaptation
- [ ] Mobile layout adaptation
- [ ] Full-screen / focus mode
- [ ] Resizable panels (tree vs. content)

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Navigation works across all major browsers (Chrome, Firefox, Safari, Edge)
- [ ] Responsive layout passes Mantine breakpoint tests (base → sm → lg)
- [ ] Tree browser loads large hierarchies without performance degradation
- [ ] Keyboard navigation supported for all navigation elements

## Dependencies

- §1 Authentication & Session Management (user must be logged in)

## Notes

- Use Mantine AppShell for layout structure
- Tree component should use virtualisation for large lists
- Navigation state should persist across page refreshes (URL-driven routing)
