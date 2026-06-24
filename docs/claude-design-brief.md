# NextLaBIS — Design Brief for Claude Design

> **Purpose of this document.** A self-contained prompt for Claude Design to perform a second-pass review and extension of the NextLaBIS UI. It captures the product, every feature the UI must cover (now and in the future), the existing design system, all current screens, and the explicit asks for the review. Read top to bottom; no other repo context is required.

---

## 1. The product in one paragraph

**NextLaBIS** is a modern web UI for **openBIS**, an open-source data-management system used by research labs (ELN — Electronic Lab Notebook — plus LIMS — Laboratory Information Management). openBIS today ships two dated UIs ("Admin UI" and "ELN-LIMS"); NextLaBIS replaces them with a fast, accessible, responsive interface. We are in **Phase 0**: visual-first development with mock data, no real API yet. Phase 1 wires the real openBIS API behind the same components. Phase 2 adds advanced modules (imaging, screening, Jupyter, publication).

**Users.** Lab researchers, lab managers, lab admins (configure types/properties/vocabularies), system admins (users/roles/server).

**Hierarchy that drives almost every screen:**
`Space → Project → Collection (formerly "Experiment") → Object (formerly "Sample") → Dataset (files)`
Every entity has: code, permId, type, properties, parents/children, container/components, tags, registrator, registration & modification dates, rights.

---

## 2. Design principles (non-negotiable)

1. **Simple.** Density is fine; visual noise is not. Prefer one strong action per region, calm typography, generous whitespace inside cards.
2. **Modern.** 2025-era: rounded corners (default radius ~10 px), soft borders, subtle shadows, OKLCH neutrals, monochrome primary with a few semantic accents only.
3. **Responsive.** Mobile (≥ 360 px), tablet, desktop (≥ 1200 px). Every screen has a defined mobile shape — no "desktop-only" patches.
4. **Shared.** Components and tokens are reused across the whole app. If two screens need a "metadata panel," it's one component, not two.
5. **Server-first.** UI must work with data passed as props from Server Components — no in-component fetching. Interactions live in client-only leaf components.
6. **Accessible.** WCAG AA contrast, keyboard navigation, ARIA labels, focus rings, dark mode parity, no color-only meaning.
7. **openBIS-faithful.** Vocabulary matches the domain (`Space`, `Project`, `Collection`, `Object`, `Dataset`, `permId`, `vocabulary`, `property type`, `space rights`).

---

## 3. Tech and visual constraints

- **Framework:** Next.js 16 (App Router), React 19, TypeScript strict.
- **UI library: Mantine 7 only.** No Tailwind components, shadcn, Radix, MUI, AntD, Chakra. CSS Modules for scoped overrides; Mantine theme for tokens.
- **Icons:** `@tabler/icons-react` (stroke 1.5, 16–24 px).
- **Tables:** `mantine-react-table` for advanced grids; a lighter `SortableTable` for simpler lists.
- **Charts (later):** Mantine Charts / Recharts.
- **No custom font stack yet** — keep the system/Mantine default.

### Existing design tokens (from `nextapp/src/app/styles/theme.ts` and `globals.css`)

| Token | Value |
|---|---|
| `primaryColor` | `"primary"` (monochrome grayscale 10-step, near-black `#030213` for emphasis) |
| `defaultRadius` | `lg` = `0.625rem` (≈ 10 px) |
| `radius.sm / md / lg / xl` | `0.375 / 0.5 / 0.625 / 0.75 rem` |
| `fontSizes.sm / md` | `14 px` (deliberately uniform) |
| `headings.fontWeight` | `500` (medium, not bold) |
| `headings.h1 / h2 / h3` | `2rem / 1.5rem / 1.25rem` |
| Sidebar palette | Custom `sidebar` scale, near-black for dark sidebar option |
| Semantic colors | `--destructive: #d4183d`, `--muted: #ececf0`, `--muted-foreground: #717182`, `--accent: #e9ebef`, `--border: rgba(0,0,0,0.1)` |
| Dark mode | Full token set via `.dark` class in `globals.css` — must be designed in parallel, not bolted on |

**Status badges (already in use):**
- `admin` → red pill
- `power_user` → orange pill
- `user` → blue pill
- `observer` → gray pill
- Status text `active / completed / archived` → soft green / blue / gray pills

---

## 4. Existing screens — what's already designed

Reference mockups live in `docs/images/`. Please open and analyse each:

| File | Screen | What it shows |
|---|---|---|
| `Dashboard-25_10.png` | `/dashboard` | Header, quick-search card, "Your Spaces" card grid (space code badge + role pill + count + registrator + relative date), right-side "Recent Activity" feed with entity-type icons |
| `Project_overview-25_10.png` | `/space/[code]` | Breadcrumbs, large title + code badge + status pill, description, inline metadata row (owner, created, modified, project count), action buttons (Settings, + New Project), framed projects table with search + Filter + Export, status pills per row |
| `Object_example-25_10.png` | `/object/[permId]` | Breadcrumbs of full hierarchy, title row with code badge + status + Export/Edit buttons, metadata row, tab strip (Properties / Files & Datasets / Relationships / History), two-column property layout with field labels + info icons + read-only field appearance |
| `Inventory-25_01.png` | `/inventory` | Same shell as dashboard, "Add Equipment" primary action, quick search, "Inventory Spaces" card grid, recent activity feed |
| `Navigation-27_01.png` | Side tree drawer | Collapsible tree (Space → Project → Collection → list of objects with counts), per-node "View X" affordance, external-link icon to open in new tab |
| `Create-27_01.png` | `/create` | Multi-step wizard: progress bar with 5 named steps (Object Type / Basic Info / Properties / Files / Review), step-1 grid of object-type cards (title + description + category), Cancel + Previous/Next |

**Established UI patterns from these screens:**
- App shell = thin top nav (logo + product name + main nav links + user identity + avatar). Burger toggle reveals the tree drawer on the left.
- Breadcrumbs sit between the top nav and the page title.
- "Title row" = big title (h1, weight 500) + entity code in a quiet pill + status pill, then a one-line description in muted color.
- "Metadata strip" = horizontal row of icon + label + value pairs (owner, created, modified, counts).
- Page-level primary action sits top-right of the title row.
- Tables live inside a framed card with their own title/description, right-aligned toolbar (search input + Filter + Export), zebra-free rows, hover highlight, dense but airy.

---

## 5. The complete feature surface

The UI must accommodate **every** feature openBIS exposes today plus headroom for new ones. The authoritative list is `docs/NEW_UI_FEATURE_CHECKLIST.md` (~600 features across 39 sections). For the design review, treat the groups below as the **screen-level inventory** Claude Design must cover.

### 5.1 Global / cross-cutting

- App shell: top nav (Dashboard, Inventory, Search, Create, Settings), tree drawer, user menu, theme switch
- Breadcrumbs of unbounded depth (Space → Project → Collection → Object → Dataset)
- Multi-tab workspace (open several entities side-by-side, unsaved indicator per tab)
- Global search bar with grouped autocomplete by entity type
- Notifications: toasts (success/error/warning/info), inline banners, progress overlays
- Dialogs: confirm, input, result, conflict-resolution, file-conflict
- Loading skeletons for tables, cards, detail headers
- Empty states (no results, no permission, not-yet-implemented stub)
- Light **and** dark theme parity
- Keyboard nav, focus rings, ARIA, high-contrast mode
- Print-friendly variants for entity details, labels, barcodes

### 5.2 Authentication

- Login (username/password, optional anonymous)
- Login-as-another-user (admin impersonation)
- Session info / keep-alive / expiry prompt
- Personal Access Tokens (list, create, edit, revoke, last-use)
- Active sessions overview (admin)

### 5.3 Entity hierarchy — list + detail for each

For **Space, Project, Collection, Object, Dataset**, design:
- List view (table + card variants, filter chips, bulk select)
- Detail view (title row, metadata strip, tab strip)
- Create / edit form (wizard for Object & Dataset, single-form for Space/Project/Collection)
- Delete-with-reason dialog + trashcan restore
- Freeze controls (sub-flags: for projects / for objects / for datasets / for parents / for children / for components / for containers)
- Move-between-parents flow
- Parent/child graph viewer; container/components view
- Relationship-annotation editor (metadata on the *link* itself)

Tabs that recur on entity detail pages:
**Properties · Files & Datasets · Relationships · History · Comments · Permissions**

### 5.4 Files & datasets

- File browser inside a dataset (tree + grid + list)
- Drag-and-drop upload, progress, conflict prompt, cancel/retry
- Single + multi + whole-dataset ZIP download, streaming, fast-download
- Preview: image, PDF, code with highlighting, CSV/TSV table, HDF5 browse, video, audio
- Dataset kinds: Physical / Link / Container
- Archive / unarchive / lock / archive-status badge

### 5.5 Property system

- Property types: VARCHAR, MULTILINE_VARCHAR, BOOLEAN, INTEGER, REAL, TIMESTAMP, CONTROLLEDVOCABULARY, OBJECT (reference), HYPERLINK, XML, JSON (+ legacy MATERIAL)
- Property-type CRUD with constraints (min/max/regex)
- Property assignment to entity types (mandatory, show-in-edit, section, ordinal, semantic annotation)
- Form renderers per type — must all share one design language (label, info-icon, error state, read-only state, disabled state, mandatory marker)
- Sections (grouped, collapsible) + dynamic property layout
- Rich-text renderer (CKEditor/TipTap class) with Greek characters, images, tables, code blocks
- JSON / XML editors with syntax highlighting

### 5.6 Type management (admin)

- Object Types, Collection Types, Dataset Types: CRUD + assigned-properties editor + section layout preview
- Type Groups: CRUD + assign types
- Vocabularies + vocabulary terms: CRUD, reorder, official/internal flags
- Validation plugins, dynamic-property plugins (Jython editor, test runner)

### 5.7 Users & access

- Users: CRUD, deactivate, group memberships, role assignments, password reset, self-service profile
- Authorization Groups: CRUD, members
- Role Assignments: roles × scopes (Instance / Space / Project) × users/groups, effective-permissions viewer

### 5.8 Search & discovery

- Global search bar with grouped results
- Advanced search builder: per-property criteria, comparison operators, AND/OR/NOT, date ranges, registrator filter, parent/child filter, tag filter
- Saved searches, search history
- Search-domain services (external search backends)

### 5.9 Data grids

- Column show/hide, reorder, resize, persisted per user per entity type
- Multi-column filtering + global filter + saved filter sets
- Multi-column sort
- Row selection (single, multi, select-all-across-pages) → bulk actions
- Pagination + page-size selector + total count
- Export selection / page / all → CSV, TSV, JSON
- Inline editing for select fields

### 5.10 Import / export

- General import (modes: ignore / update / fail), validation report
- XLS / CSV import with column mapping
- Dropbox-based async import
- Hierarchical export (PDF, XLSX, JSON), email delivery, depth selector
- RO-Crate import + export with async progress
- Zenodo publication flow, DOI assignment, retention period

### 5.11 Trash, history, audit

- Trashcan: filter, restore, permanent-delete (with cascade), empty-all
- Entity history: properties (old → new), relationships, assignments, with timestamps and authors
- Deletion log + Freezing log + Event log

### 5.12 Plugins & services (admin)

- Custom AS services, aggregation, reporting, processing — list, run with parameter form, result table, async status
- Query system: saved queries, SQL editor with syntax highlighting, parameter input, paginated/sortable result grid, export

### 5.13 LIMS

- Storage browser (freezers / racks / shelves / boxes) — hierarchical visualisation
- Grid-based rack / box layout — click well to navigate, drag-and-drop placement, conflict warnings
- Multi-storage-group per object
- Product ordering: catalog browse, create product (name, catalog #, vendor, price, currency, quantity), submit order, track status
- Barcode/QR: generate, display in grids, scan via keyboard or camera, look-up

### 5.14 ELN

- Dedicated lab-notebook browsing mode (organised by Space → Project → Collection)
- Rich-text editor for collection notes (formatting, Greek, images, tables, code, links)
- Comments thread on entities (timestamped, attributed)
- Templates for entity creation
- Free-form / spreadsheet-like tables with inline editing
- Dilution-series helper
- Drawing board / sketches canvas

### 5.15 Imaging & screening

- Image gallery (thumbnails, zoom, slideshow, prev/next, editable metadata)
- Plate browser (grid of wells), well detail, plate-well-material map
- Multi-channel, multi-resolution image viewer per well
- Feature-vector viewer + chart
- Tabular data charts and image-analysis reports

### 5.16 Integrations

- Jupyter: launch from openBIS, template-based create, copy, inject parameters, embedded viewer, session manager
- Dropbox monitoring: dashboard, per-dropbox logs, errors
- Archiving: queue, request, status
- Git / obis CLI: repo init, dataset clone, sync status
- External DMS management

### 5.17 Settings & admin

- User preferences (grid prefs, default search, editor prefs, notifications, semantic-annotation visibility, inventory space)
- Instance settings, group settings, space-specific settings, feature flags
- Server info, data-store info, active-users report

### 5.18 Cross-cutting micro-features

- Tags / metaprojects (create, assign, filter, search)
- Async operation tracker (list, status, cancel, results)
- Semantic annotations (ontology predicate + descriptor) on types and assignments, toggle visibility on forms
- Move dialogs (object/collection/project), bulk move
- Hierarchy graph viewer (parent/child tree, expand/collapse, filter by type, depth)
- Identifier helpers (copy permId, copy hierarchical identifier, navigate by identifier)
- Attachment manager (legacy)
- Contextual AI assistant (chat side-panel, session-based)

---

## 6. Shared components Claude Design should specify

Treat these as the **component library**. Each should have variants (size, state), light + dark spec, and a defined responsive behaviour. Anything not on this list should justify its existence.

**Layout & navigation**
1. `AppShell` — header + collapsible tree drawer + content area; mobile bottom-nav variant
2. `TopNav` — logo lockup, primary nav links, global search, create-quick-action, user menu
3. `SideTree` — hierarchical, lazy-loaded, context menu, drag-and-drop, search-within-tree
4. `Breadcrumbs` — unbounded depth, truncates middle, copy-path action
5. `TabStrip` — entity-detail tabs with optional badge counts and unsaved dot
6. `PageHeader` — title + code-pill + status-pill + description + metadata strip + actions; collapsible on scroll
7. `EmptyState`, `ErrorState`, `LoadingSkeleton` variants per surface (card, table, detail)

**Display primitives**
8. `Card` — bordered, padded, header (icon + title + subtitle), optional toolbar; the workhorse
9. `MetadataStrip` — icon + label + value pairs, responsive wrap
10. `RightsPill`, `StatusPill`, `TagPill`, `CodeBadge` — all unified pill family
11. `EntityIcon` — Space / Project / Collection / Object / Dataset / User glyphs
12. `Avatar` + `AvatarStack` for multi-registrator displays
13. `RelativeTime` (tooltip with absolute)
14. `PermIdChip` with copy action
15. `InfoTooltip` (the small `(i)` icon next to property labels)

**Data & forms**
16. `DataGrid` (advanced) — column manager, filter chips, multi-sort, selection, bulk-action bar, pagination, export menu
17. `SortableTable` (light) — for simple listings
18. `PropertyForm` — section header, two-column grid, field group with label + info + value + error + mandatory-marker
19. `PropertyField` variants — Text, Multiline, RichText, Boolean, Integer, Real, Timestamp, VocabularySelect, EntityReferenceSelect, Hyperlink, JsonEditor, XmlEditor — **all share one chrome**
20. `Wizard` — progress bar + step labels + Previous/Next + Cancel; multi-step create flow
21. `FilterBar` — chip-based filters with overflow menu
22. `BulkActionBar` — appears on selection, sticky at table bottom
23. `FileBrowser` — tree + list/grid; row = icon + name + size + modified; preview pane
24. `FileUpload` — drag-and-drop dropzone, queue, per-file progress, conflict prompt

**Feedback & overlays**
25. `Toast`, `Banner`, `ConfirmDialog`, `InputDialog`, `ResultDialog`, `Drawer` (right-side detail), `ContextMenu`
26. `CommandPalette` — Cmd-K, fuzzy-search entities/actions/pages
27. `AsyncOperationTracker` — global pill in header showing running async ops

**Specialised**
28. `RelationshipGraph` — parent/child tree, zoomable, filterable
29. `PlateGrid` — wells grid with click + status colors
30. `StorageGrid` — rack/box visualisation, drag-and-drop placement
31. `BarcodeView` — render + scan
32. `RichTextEditor` (CKEditor/TipTap wrapper)
33. `JupyterEmbed`, `ImageViewer`, `PdfViewer`, `CsvViewer`, `Hdf5Viewer`

---

## 7. Responsive rules

- **Mobile (< 768 px):** AppShell collapses to top-nav-only with hamburger → tree as full-screen drawer; metadata strips stack; tables collapse to **card-per-row** with primary fields + expandable details; tabs become a horizontal scroller; wizard steps stack vertically.
- **Tablet (768–1199 px):** tree drawer is push (not overlay); metadata strip wraps to 2–3 columns; tables become horizontally scrollable inside their card; primary action stays in the title row.
- **Desktop (≥ 1200 px):** persistent tree drawer; max content width ~1200 px centered on dashboard, full-width on entity details; sticky `PageHeader` on scroll; multi-column property forms (2 col default, 3 col on XL).

Touch targets ≥ 44 px on mobile. Tables must remain usable without horizontal-scroll-lock on tablet.

---

## 8. Accessibility checklist

- WCAG AA contrast on both light and dark themes (the current `#030213` primary on white passes; verify status-pill backgrounds)
- All interactive elements reachable by Tab in source order; visible focus ring
- ARIA roles on tabs, dialogs, menus, tree, grid; live regions for toasts and async-op status
- Color is never the sole signal (status pills use icon + text, not just hue)
- Respect `prefers-reduced-motion` for the wizard progress bar, drawers, toasts
- Form errors announced; required fields marked with both asterisk and `aria-required`

---

## 9. What I want from Claude Design

Treat this as a thorough **second pass**. I am NOT asking for net-new visual style — I want sharper components and surfaces grounded in what's already there.

Please return **all six** deliverables below, in this order, in a single document.

**A. Critique of the existing mockups** (`docs/images/*.png`)
- For each of the six screens: what works, what's weak, what's missing, what won't scale to the full feature surface. Be specific (spacing, hierarchy, affordances, density, mobile collapse, dark-mode risk).
- Call out anything that would block sharing components across screens.

**B. Refined design tokens**
- Final token table: color (light + dark), spacing scale, radius, type ramp, elevation, motion durations, semantic colors (success / warning / danger / info / neutral).
- Justify any change to the current values in §3 — bias toward keeping them.

**C. Component library spec**
- For each component in §6: purpose, anatomy (labelled parts), states (default / hover / focus / active / disabled / loading / error / empty), variants (size, density, emphasis), responsive behaviour, light + dark notes, accessibility notes.
- Identify shared "molecules" (e.g. `PageHeader` = `Breadcrumbs` + title + `CodeBadge` + `StatusPill` + description + `MetadataStrip` + actions) so we never re-design the same composition twice.

**D. Screen blueprints**
- A wireframe-level description (text is fine; ASCII or mermaid if helpful) for every screen group in §5 we don't already have mockups for: Object list, Dataset detail, File browser, Search results + advanced search builder, Property/Type/Vocabulary admin, Users/Groups/Roles, Plugins + Queries, Storage browser + Plate browser, Trash, History, Settings, Login + PAT manager, Command palette, multi-tab workspace.
- Each blueprint: layout, key components reused from §6, primary/secondary actions, empty state, loading state, mobile shape.

**E. Interaction & motion language**
- Drawer / dialog / toast / menu open/close
- Wizard step transition
- Table row selection + bulk-action bar reveal
- Drag-and-drop in tree, file upload, storage grid
- Inline-edit affordance and save/cancel feedback
- Keep it restrained (≤ 200 ms, ease-out) and respect `prefers-reduced-motion`.

**F. Open questions for me**
- Anything ambiguous in §5 or §6 — list it instead of guessing. Examples I expect: "Should `Dataset` be a top-level nav item?" / "How does multi-tab workspace coexist with browser tabs?" / "Where do tags live on a detail page?"

### Output constraints

- Stay inside the Mantine 7 component vocabulary (no shadcn primitives).
- Reference token names, not hex codes, after section B is set.
- Treat dark mode as a first-class citizen in every spec, not a footnote.
- Don't propose anything that requires throwing away the existing token set, the Mantine choice, or the openBIS vocabulary.
- It's fine — encouraged — to push back on choices in this brief if you can argue the alternative.

---

## 10. Pointers (for grounding only — do not need to be read line by line)

- Architecture & server-first rules: `docs/architecture.md`
- Visual-first workflow & mock-data contract: `docs/visual-first-workflow.md`
- Full feature checklist (~600 items): `docs/NEW_UI_FEATURE_CHECKLIST.md`
- Tech stack: `docs/tech-stack.md`
- Coding standards (naming, conventions): `docs/coding-standards.md`
- Theme tokens: `nextapp/src/app/styles/theme.ts`, `nextapp/src/app/styles/globals.css`
- Domain types: `nextapp/src/types/openbis.ts`, `nextapp/src/lib/model/OpenBISModel.ts`
- Existing components: `nextapp/src/components/{shell,dashboard,shared,spaces}/`
- Mockups: `docs/images/{Dashboard,Project_overview,Object_example,Inventory,Navigation,Create}-*.png`

— end of brief —
