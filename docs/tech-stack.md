# Tech Stack

The technology choices reflect the goal of building a responsive, component-driven interface for openBIS while keeping the development experience approachable.

## Application Framework

- **Next.js 16** - Next.js App Router for file-based routing, server components, and hybrid static & dynamic rendering.
- **React 19** – Core UI library powering reusable components and client interactions.
- **TypeScript 5** – Adds static typing and better tooling for a growing contributor base.

## UI and Stylin

- **Mantine 7** – Component library with accessible defaults, theming support, and rapid prototyping capabilities.
- **@tabler/icons-react** – Icon set used across layout and masterdata components.
- **CSS Modules & Global CSS** – Scoped styles for components and shared global tokens defined in `src/app/globals.css`.

## State & Data (Planned)

- **React Query or TanStack Query (planned)** – For server state synchronisation once openBIS APIs are integrated.
- **Zustand or Context modules (planned)** – For lightweight client state such as form drafts and UI preferences.

## Tooling

- **ESLint 9** – Linting configuration derived from `eslint-config-next` with plans for custom rules to enforce project standards.
- **TypeScript ESLint** – Ensures consistent typing practices and prevents common pitfalls.
- **npm** – Package manager used for scripts and dependency management.

## Testing (Roadmap)

Testing infrastructure will expand with the application:

- **Jest / Vitest** – Unit testing frameworks under evaluation.
- **React Testing Library** – Encouraged for component-level tests that mirror user interactions.
- **Playwright** – Considered for end-to-end regression coverage when core workflows are available.

## Infrastructure (Roadmap)

- **Vercel or Static Hosting** – For previews and production deployments.
- **GitHub Actions** – Planned for automated linting, testing, and preview builds on pull requests.

Refer back to this document as the stack evolves. Major changes should be proposed in an issue before implementation.
