# NextLaBIS Frontend

This directory contains the Next.js application for NextLaBIS. It is scaffolded with the App Router and TypeScript, and uses Mantine as the component system.

## Prerequisites

- Node.js 20 or newer
- npm 10+

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) while the dev server is running.

## Available Scripts

- `npm run dev` – Start the development server with Turbopack for fast refresh.
- `npm run build` – Create an optimised production build.
- `npm run start` – Serve the production build locally.
- `npm run lint` – Run ESLint with the Next.js recommended rules.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout and metadata
│   ├── page.tsx        # Home page shell
│   └── globals.css     # Global styles and Mantine normalise imports
└── components/
    └── masterdata/     # Masterdata component prototypes
```

## Styling

- Mantine components are preferred for layout and theming.
- Use CSS modules (`*.module.css`) for component-specific overrides.
- Keep shared tokens in `globals.css`.

## Development Notes

- Follow the shared [coding standards](../docs/coding-standards.md).
- Components under `components/masterdata/` prototype openBIS property types; keep them self-contained and well-documented.
- Update the relevant documentation when adding new features or changing behaviour.

## Testing

Testing infrastructure is being defined. When adding logic, include unit or interaction tests and document any manual verification steps in the PR.

## Further Reading

- [Project README](../README.md)
- [Contribution guide](../CONTRIBUTING.md)
- [Tech stack](../docs/tech-stack.md)
