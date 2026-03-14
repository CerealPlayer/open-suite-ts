# Copilot instructions for `open-suite-ts`

## Build, lint, and test commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Build (TypeScript project refs + Vite): `npm run build`
- Preview production build: `npm run preview`

## High-level architecture

This project follows a feature-first, Bulletproof React-inspired structure where the app layer composes feature public APIs.

- Entry: `src/main.tsx` mounts router inside `AppProvider`.
- App composition:
  - `src/app/router.tsx` defines routes under `AppLayout`.
  - Route files in `src/app/pages/*` act as orchestration wrappers.
  - App pages import features from `src/features/<feature>` only.
- Features (`src/features/{documents,upload,home}`):
  - Each feature exports a small public API through `index.ts` (components + hooks).
  - Internal modules (`api`, `stores`, `types`, `utils`) stay feature-local.
- Shared UI: `src/components/*` provides reusable primitives (`Panel`, `PanelLink`, `Notice`, `TextInput`) used by app/features.
- Data/state split:
  - Server state via React Query in feature hooks (`useQuery`, `useMutation`).
  - Local cross-route UI state via Zustand feature stores.
  - Example: upload feature stores `lastSelectedDocxName`; home feature reads it via `useLastSelectedDocxName`.

## Key repository conventions

- Import boundaries are enforced by ESLint (`eslint.config.js`):
  - Features cannot import from other features.
  - Features cannot import from `src/app`.
  - App cannot import feature internals; use public API only.
  - `src/components`, `src/config`, `src/lib`, `src/types`, `src/utils`, `src/hooks` are shared layers.
- Keep orchestration in hooks, not presentational components:
  - Components in features/shared folders are mostly UI + typed props.
  - UI-only local state/handlers are acceptable in presentational components.
  - Hooks perform data fetching, navigation, mutation, and store wiring.
  - Keep pure logic (formatting/filtering/parsing/mapping) in feature `utils`.
- Shared UI placement:
  - Reusable atomic/design-system UI belongs in `src/components`.
  - Feature-specific UI belongs in `src/features/<feature>/components`.
- API integration pattern:
  - Read `API_BASE_URL` from `src/config/env.ts` (`VITE_API_BASE_URL` with fallback `http://localhost:3000`).
  - API modules use an `ensureSuccess` helper and throw detailed errors from response text.
  - API response mapping is explicit (e.g., `file_name`/`updated_at` -> `title`/`edited_at` in documents types mapper).
- Current route contract:
  - `/documents/:documentId` exists and is currently a placeholder details page.
- Styling:
  - Tailwind CSS v4 via `@tailwindcss/postcss`.
  - Base styles in `src/index.css` include a Tailwind v3 border-color compatibility layer; keep this unless intentionally migrating styles.

## Architecture (Current Source of Truth)

The codebase follows a Bulletproof React-inspired, feature-first architecture.

```text
src
├── app         # application orchestration (layout, routes, feature composition)
├── components  # global reusable atomic/design-system UI
├── config      # shared configuration
├── features    # independent feature modules
└── ...
```

### Layer Direction

Use a unidirectional flow:

- shared (`components`, `config`, `lib`, `types`, `utils`) -> features -> app

Rules:

- Features must not import from other features.
- Features must not import from `src/app`.
- App composes features and may import from feature public APIs.
- App should import from `src/features/<feature>` only (not internal files).

## Feature Module Contract

Each feature exposes a public API via `src/features/<feature>/index.ts`.

Allowed public exports:

- components
- custom hooks

Keep these internal to each feature unless there is a very strong reason:

- stores
- api modules
- types
- utils

## Component and Hook Responsibilities

Components:

- Keep presentational.
- Expose minimal prop APIs.
- Avoid business/data orchestration logic.
- UI-only local state/handlers are allowed (for visual concerns only).

Hooks:

- Own business logic, orchestration, and feature wiring.
- Encapsulate access to feature-local store internals.
- Coordinate data fetching/mutations and callbacks used by components.

Utilities:

- Put pure logic (formatting, parsing, filtering, mapping) in feature-local `utils`.

## Shared UI Policy (`src/components`)

`src/components` is globally importable by both features and app.

Use it for reusable atomic/design-system style elements (current examples):

- `Panel`
- `PanelLink`
- `Notice`
- `TextInput`

Do not place feature-specific UI in `src/components`; keep feature-specific components under `src/features/<feature>/components`.

## Editing Guidance for Future Changes

- Prefer adding/modifying code inside existing feature boundaries.
- If new reusable UI appears in multiple places, extract it to `src/components`.
- Preserve app-level orchestration in `src/app`.
- Keep feature public APIs small and intentional.
- Maintain import-boundary lint rules when adding new features.
