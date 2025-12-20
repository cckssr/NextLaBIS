# Copilot Instructions – NextLaBIS

This repository uses Next.js App Router with a server-first, schema-driven architecture.

Copilot MUST follow the rules below.

⸻

Project Context
• Project: NextLaBIS – Web frontend for openBIS ELN/LIMS
• Current Phase: Phase 0 – Foundations
• Stack: Next.js (App Router), React Server Components, TypeScript, Mantine
• Key Idea: Schema-driven UI for openBIS object and property types

⸻

Golden Rules (Non-Negotiable)

Rendering & Components
• Pages and layouts are Server Components by default
• DO NOT add "use client" to pages or layouts
• Client Components are allowed only for interaction
• Client Components MUST be small and focused

openBIS Access
• openBIS is server-only
• NEVER call openBIS from the browser
• NEVER import openBIS clients into Client Components
• Client Components may call only /app/api/\* endpoints

Data Flow
• Fetch data on the server
• Pass data to Client Components via props
• Do not duplicate openBIS logic in UI code
• Do not use raw openBIS DTOs in components

⸻

Phase Awareness (Critical)

Phase 0 – Foundations (current)

Copilot MUST assume:
• ✅ UI scaffolding only
• ✅ Masterdata / property renderer components
• ❌ No openBIS API client yet
• ❌ No authentication/session logic
• ❌ No real data fetching
• ❌ No route handlers yet

Rule:
Do NOT import or reference modules that do not exist yet
(e.g. lib/openbis/server.ts, auth helpers, API handlers).

⸻

Schema-driven UI Rules
• UI is driven by schemas, not hard-coded pages
• openBIS property types map to UI components
• One renderer per property kind

Pattern:

PropertyKind
├── View component (Server)
└── Edit component (Client)

Examples:
• REAL/View.tsx → Server Component
• REAL/Edit.client.tsx → Client Component
• RICH_TEXT/Edit.client.tsx → Client-only (editor)

⸻

Folder Responsibilities (Respect These)

src/app/
• Routing, layouts, pages
• Server Components by default
• No low-level business logic

src/components/
• Rendering only
• No data fetching
• May contain Server or Client Components

src/components/masterdata/
• Property-type renderers
• Schema-driven
• No openBIS imports

src/lib/
• Reserved for business logic and API clients
• openBIS integration will live here in Phase 1

⸻

Styling Rules
• Use Mantine components and theme tokens
• Do NOT introduce Tailwind, shadcn, Radix, or raw CSS frameworks
• Custom styles only via Mantine theme or CSS Modules when necessary

⸻

File & Naming Conventions
• Components: PascalCase.tsx
• Client Components: \*.client.tsx
• Utilities: kebab-case.ts
• No mixed naming styles

⸻

What Copilot Should Do When Unsure 1. Check docs/ARCHITECTURE.md 2. Check the current phase (Phase 0) 3. Look at existing components in src/components/masterdata/ 4. Ask for clarification instead of inventing architecture

⸻

Common Mistakes to Avoid
• ❌ Adding "use client" to a page or layout
• ❌ Calling openBIS directly
• ❌ Importing non-existent modules
• ❌ Mixing UI libraries
• ❌ Writing logic based on raw openBIS DTOs
• ❌ Creating page-specific hacks instead of schema extensions

⸻

Summary for Copilot
• Server-first
• Schema-driven
• Strict layering
• Mantine-only UI
• Phase-aware
• Do not invent missing infrastructure

Follow these rules exactly.
