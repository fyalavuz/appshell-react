<p align="center">
  <strong>appshell-react</strong>
</p>

<p align="center">
  Mobile-first app shell components for React.<br/>
  Scroll-aware headers, auto-hiding footers, sidebars, tab bars, and safe-area handling.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/appshell-react"><img src="https://img.shields.io/npm/v/appshell-react?style=flat-square&color=blue" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/appshell-react"><img src="https://img.shields.io/npm/dm/appshell-react?style=flat-square" alt="npm downloads" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT License" /></a>
  <a href="https://github.com/fyalavuz/appshell-react/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/fyalavuz/appshell-react/ci.yml?style=flat-square&label=CI" alt="CI Status" /></a>
  <a href="https://bundlephobia.com/package/appshell-react"><img src="https://img.shields.io/bundlephobia/minzip/appshell-react?style=flat-square&label=bundle" alt="Bundle Size" /></a>
</p>

<p align="center">
  <a href="https://fyalavuz.github.io/appshell-react">Documentation</a> · <a href="https://fyalavuz.github.io/appshell-react/examples">Examples</a> · <a href="https://github.com/fyalavuz/appshell-react/issues">Issues</a>
</p>

---

## Install

```bash
npm install appshell-react
# or
pnpm add appshell-react
```

**Peer dependencies:** `react >=18`, `react-dom >=18`, `tailwindcss >=4`. Framer Motion is optional.

## Quick Start

```tsx
import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-nav"
        logo={<span className="font-bold">MyApp</span>}
      />
      <Content>
        <main className="p-4">Your content here</main>
      </Content>
      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}
```

## Optional Animations

AppShell works without any animation library. For smooth spring-based animations, add Framer Motion:

```bash
npm install framer-motion
```

```tsx
import { MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

<MotionProvider adapter={framerMotionAdapter}>
  <AppShell safeArea>{/* Your app */}</AppShell>
</MotionProvider>
```

## Features

- **Header** with 7 scroll behaviors: `fixed`, `static`, `sticky`, `reveal-all`, `reveal-nav`, `reveal-context`, `reveal-search`
- **Footer** with 3 variants: `tab-bar`, `floating`, `mini` and auto-hide on scroll
- **Sidebar** slide-out drawer with backdrop and keyboard dismiss
- **SafeArea** for mobile notch/gesture-bar insets
- **ScrollNav** horizontal pill navigation with scroll-spy
- **Dark mode** via CSS custom properties and shadcn/ui tokens
- **Animation speed** control: `slow`, `normal`, `fast`
- **Zero dependencies** — pure React, optional Framer Motion adapter
- **Tailwind CSS v4** styled with standard shadcn/ui design tokens
- **TypeScript** first with full type definitions
- **SSR-safe** with `"use client"` directives

## Components

| Component | Description |
|-----------|-------------|
| `AppShell` | Root wrapper with optional SafeArea |
| `Header` | Scroll-aware header with nav, context, and search rows |
| `HeaderNav` | Container for header navigation links |
| `HeaderNavItem` | Navigation link with dropdown support |
| `Content` | Main content area |
| `Footer` | Tab bar, floating button, or mini bar |
| `FooterItem` | Individual tab inside a tab-bar footer |
| `ScrollNav` | Horizontal scrollable pill navigation |
| `Sidebar` | Animated slide-out menu drawer |
| `SafeArea` | Mobile safe-area inset handler |

## Hooks

| Hook | Description |
|------|-------------|
| `useAppShell` | Access header/footer visibility and scroll direction |
| `useScrollDirection` | Detect scroll direction with configurable threshold |
| `useSafeArea` | Read safe area inset values programmatically |

## Examples

Browse interactive demos at [fyalavuz.github.io/appshell-react/examples](https://fyalavuz.github.io/appshell-react/examples):

| Example | Description |
|---------|-------------|
| Fixed Header | Always-visible fixed header |
| Reveal Header | Hides on scroll down, reveals on scroll up |
| Sticky Tabs | Header with sticky sub-navigation tabs |
| Tab Bar | Standard mobile bottom navigation with badges |
| Floating Footer | FAB-style floating action button |
| Sidebar Menu | Slide-out drawer with backdrop |
| Combined Reveal | Header reveal + auto-hide footer |
| Dark Mode | Live theme switching with shadcn tokens |
| Scroll Nav | Horizontal pill-style category filter |
| Desktop Nav | Responsive hamburger to horizontal nav |

## Documentation

Visit the full documentation site for API reference, guides, and live previews:

**[fyalavuz.github.io/appshell-react](https://fyalavuz.github.io/appshell-react)**

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

```bash
# Development
pnpm install
pnpm dev          # Start docs site
pnpm dev:all      # Start all apps

# Testing
pnpm test         # Run unit tests
pnpm lint         # Lint codebase
pnpm build        # Build everything
```

## License

[MIT](./LICENSE)
