# Open Suite TS

Document management dashboard built with React, TypeScript, Vite, React Router, React Query, and Zustand.

## Scripts

- `npm run dev` - start local development server
- `npm run lint` - run ESLint
- `npm run build` - run TypeScript build + Vite production build
- `npm run preview` - preview production build

## Architecture

This project uses a Bulletproof React-inspired, **feature-first** structure:

```text
src
├── app         # app-level orchestration (router, layout, route composition)
├── components  # shared reusable UI atoms/building blocks
├── config      # shared configuration (env, constants)
├── features    # independent feature modules
├── lib         # shared libraries/helpers
└── ...
```

Each feature exposes a small public API through `src/features/<feature>/index.ts`:

- exported components
- exported custom hooks

Internal modules like stores, API functions, feature-local types, and feature utils stay inside the feature folder and are not imported directly by the app.

### Composition rules

- Shared modules (including `src/components`) can be used by features and app.
- Features should not import from other features.
- Features should not import from app.
- App composes features.
- App imports from a feature's public API only (`src/features/<feature>`).

### Shared UI policy

- Put reusable atomic/design-system UI in `src/components`.
- `src/components` is globally importable by both `src/features` and `src/app`.
- Keep feature-specific UI inside each feature's `components` folder.

### UI and logic split

- Components are presentational and expose minimal props.
- Business logic, orchestration, and data wiring live in feature hooks.
- UI-only local state/handlers are allowed inside components when they are purely presentational.
- Pure logic (formatting, filtering, parsing, mapping) belongs in feature `utils`.
