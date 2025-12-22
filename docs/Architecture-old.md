# Architecture

## Overview

NextLaBIS is a modern web frontend for **openBIS ELN/LIMS** built with Next.js, React, and Mantine.

**Core principle**: Server-first, schema-driven, strictly layered.

---

## 1. Purpose

Provide structured browsing, viewing, and editing of laboratory metadata and datasets defined in openBIS, without re-implementing openBIS business logic or bypassing access control.

### Architectural Goals

- Strong separation between data access, rendering, and interaction
- Server-side rendering by default (minimal client-side JavaScript)
- Zero direct openBIS access from browser
- Schema-driven UI based on openBIS object and property types
- Predictable, testable component hierarchy

### Non-goals

- Direct database access
- Duplication of openBIS permission or validation logic
- Client-side openBIS SDK usage
- Tight coupling to openBIS implementation

---

## 2. Technology Stack

- **Framework**: Next.js (App Router)
- **UI Library**: React (Server Components by default)
- **Language**: TypeScript
- **Component System**: Mantine
- **Icons**: Tabler Icons
- **API Integration**: openBIS API (server-side only)

---

## 3. Rendering Model

### Server Components (Default)

- Fetch data (from any source, including openBIS API)
- Render read-only views, layouts, and lists
- Handle authentication and authorization context
- Apply caching and revalidation

**Rule**: Every component is a Server Component unless it requires user interaction.

### Client Components (Opt-in)

- User interaction (forms, toggles, dropdowns)
- Local UI state
- Optimistic updates
- Call only `/app/api/*` endpoints

**Rule**: Client components are small, focused, and interactive-only. Never fetch data directly.

---

## 4. Data Flow

```
Browser (Client Components)
  ↓ HTTP
Next.js App Router
  ↓
Server Components / Route Handlers
  ↓
openBIS API (or other data sources)
```

**Rule**: The browser never communicates directly with openBIS. All API calls go through Next.js backend.

---

## 5. Component Structure

### Folder Organization

```
src/
├── app/
│   ├── (pages, layouts, route handlers)
│   └── api/
│       └── (route handlers only - mutations and data transformations)
├── components/
│   ├── shell/
│   │   └── (layout, navigation, app-level UI)
│   ├── masterdata/
│   │   └── (property-type renderers: View, Edit)
│   └── ui/
│       └── (reusable UI primitives)
├── lib/
│   ├── openbis/
│   │   ├── server.ts (API client, server-only)
│   │   ├── dto.ts (type definitions)
│   │   ├── model.ts (normalized UI models)
│   │   └── mapper.ts (DTO → model transformation)
│   └── (other utilities)
└── docs/
    └── (documentation)
```

### Responsibility Boundaries

| Folder                   | Responsibility             | Data Fetching?         | User Interaction?                  |
| ------------------------ | -------------------------- | ---------------------- | ---------------------------------- |
| `app/`                   | Pages, routing, layouts    | Server Components only | Server-rendered forms              |
| `app/api/`               | Mutations, transformations | YES (call openBIS)     | Entry point for client requests    |
| `components/shell/`      | Navigation, app chrome     | NO (receive props)     | Navigation handlers                |
| `components/masterdata/` | Property rendering         | NO (receive props)     | Edit components only               |
| `lib/openbis/`           | API abstraction            | YES (openBIS calls)    | N/A (never imported by components) |

---

## 6. Schema-driven UI

OpenBIS defines two abstractions:

- **Object Types**: What data exists (Sample, Dataset, etc.)
- **Property Types**: How properties behave (Real, Integer, Vocabulary, etc.)

NextLaBIS treats these as **schemas**, not hard-coded UI code.

### Property Rendering Pattern

For each property type, maintain:

- **View component**: Read-only display (Server Component)
- **Edit component**: Form input (Client Component)

```
PropertyType (e.g., VOCABULARY)
├── View.tsx          (Server Component)
│   └── Receives: { value, label, description }
│   └── Returns: rendered read-only display
│
└── Edit.tsx          (Client Component)
    └── Receives: { initialValue, onSave, mandatory }
    └── Returns: interactive form control
```

### Normalization Layer

**Rule**: openBIS DTOs are never passed directly to UI components.

Flow:

1. openBIS DTOs fetched on server
2. DTOs transformed to normalized UI models (via `lib/openbis/mapper.ts`)
3. UI components receive only normalized models

This isolates the UI from openBIS API instability and allows UI evolution independent of backend changes.

---

## 7. Authentication & Authorization

**Rule**: Handled entirely server-side.

- Session information resolved before rendering pages
- UI permissions derived from openBIS responses
- Client components never decide authorization
- Authorization enforced on server before returning data

**Never**: Duplicate openBIS access control logic in the UI.

---

## 8. Caching Strategy

**Rule**: Caching is applied only on the server.

- Object type schemas: Cache aggressively (rarely change)
- Object instances: Cache by modification timestamp or revalidate on mutation
- Mutations: Trigger revalidation of affected cache tags

---

## 9. Page Types

### Read-only Pages

- Fully server-rendered
- Minimal JavaScript shipped
- Example: object view, inventory listing

### Edit/Create Pages

- Server renders initial state (schema + current values)
- Client component handles editing UI
- Save via `POST /app/api/*`

---

## 10. Invariant Rules

These rules hold regardless of phase or implementation details.

**Component Scope**

- ❌ No `"use client"` at page or layout level (pages are Server Components by default)
- ❌ No openBIS client imports in client components
- ❌ No shared mutable state between server and client

**Data Flow**

- ❌ No direct browser → openBIS API calls
- ❌ No UI logic based on raw openBIS DTOs
- ✅ Server fetches, transforms, and passes props to client

**Consistency**

- ❌ No duplication of openBIS business logic in the UI
- ✅ Use normalized models from `lib/openbis/mapper.ts`

**Abstraction**

- ❌ No openBIS knowledge in shell components (nav, layout, etc.)
- ✅ Shell components receive data as plain props, never import openBIS

---

## 11. Extension Philosophy

To add new functionality:

1. **Extend schemas, not pages** – Add property-type renderers, not special-case pages
2. **Prefer composition over conditionals** – Combine smaller, reusable components
3. **Keep the server authoritative** – Never replicate openBIS logic on client
4. **Maintain separation of concerns** – Each folder has one responsibility

---

## 12. Phase-Agnostic Design

This architecture is designed to work across all project phases:

- **Phase 0**: UI scaffolding with mock data
- **Phase 1**: openBIS API integration (fills `lib/openbis/`, connects `app/api/`)
- **Phase 2**: Advanced features (templates, workflows, dashboards)

The structure, constraints, and invariants above do **not** change between phases.

---

## 13. Decision Log

### Why Server Components by Default?

- Reduces JavaScript shipped to browser
- Keeps authentication/authorization server-side
- Simplifies data fetching and caching
- Encourages separation of concerns

### Why Normalize DTOs?

- Isolates UI from backend API volatility
- Allows independent UI/backend evolution
- Makes components testable (no external dependencies)
- Enables consistent UI behavior

### Why Route Handlers Only for Mutations?

- Enforces data flow: Server → Client → Server
- Keeps business logic server-side
- Prevents accidental data exposure
- Makes authorization straightforward

### Why Mantine?

- Component library with accessible defaults
- Theme tokens enable consistent styling
- No vendor lock-in to CSS framework
- Good TypeScript support

---

## 14. References

For additional guidance by topic:

| Topic                                              | Document                                                     |
| -------------------------------------------------- | ------------------------------------------------------------ |
| **Coding standards** (naming, formatting, testing) | [Coding Standards](coding-standards.md)                      |
| **Phase roadmap and milestones**                   | [Project Management](project-management.md)                  |
| **Tech stack details**                             | [Tech Stack](tech-stack.md)                                  |
| **How to contribute**                              | [Contributing Guide](../CONTRIBUTING.md)                     |
| **Current implementation status**                  | [Project Management](project-management.md) → Current Phases |

---

**Last Updated**: December 2025  
**Audience**: Architects, senior developers, and new contributors
