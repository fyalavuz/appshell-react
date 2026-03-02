# Contributing to appshell-react

Thanks for your interest in contributing! This guide will help you get set up and familiar with the project workflow.

## Prerequisites

- Node.js 20+
- pnpm 9+
- Git

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/appshell-dev/appshell.git
cd appshell
```

2. Install dependencies:

```bash
pnpm install
```

3. Build all packages:

```bash
pnpm build
```

4. Start the development servers:

```bash
pnpm dev
```

This starts the library in watch mode and the examples app on `http://localhost:3001`.

## Project Structure

```
appshell/
  packages/react/    # appshell-react library
  apps/examples/     # Next.js examples app
  apps/docs/         # Fumadocs documentation site
  e2e/               # Playwright E2E tests
```

## Running Tests

**Unit tests** (vitest):

```bash
pnpm test
```

**E2E tests** (Playwright):

```bash
cd e2e && pnpm test
```

**Type checking**:

```bash
pnpm typecheck
```

**Linting**:

```bash
pnpm lint
```

## Making Changes

1. Create a new branch from `main`:

```bash
git checkout -b feat/my-feature
```

2. Make your changes in `packages/react/src/`.

3. Add or update tests for your changes.

4. Ensure all checks pass:

```bash
pnpm build && pnpm test && pnpm lint
```

5. Commit your changes following the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add new header variant
fix: resolve scroll flicker on iOS
docs: update API reference for Footer
chore: update dependencies
```

## Pull Request Guidelines

- Keep PRs focused on a single change.
- Include a clear description of what the PR does and why.
- Add tests for new features or bug fixes.
- Ensure CI passes before requesting review.
- Update documentation if the public API changes.

## Code Style

- TypeScript strict mode.
- Functional components with hooks.
- `"use client"` directive on all client components.
- Tailwind CSS v4 for styling.
- Export all public types from `src/types.ts`.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
