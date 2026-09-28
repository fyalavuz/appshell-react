# appshell-react

[![npm](https://img.shields.io/npm/v/appshell-react?color=0b7285)](https://www.npmjs.com/package/appshell-react)
[![CI](https://github.com/fyalavuz/appshell-react/actions/workflows/ci.yml/badge.svg)](https://github.com/fyalavuz/appshell-react/actions/workflows/ci.yml)
[![Bundle size](https://img.shields.io/bundlejs/size/appshell-react?label=bundle)](https://bundlejs.com/?q=appshell-react)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/fyalavuz/appshell-react/blob/main/LICENSE)

[Documentation](https://fyalavuz.github.io/appshell-react/docs/) ·
[Live examples](https://fyalavuz.github.io/appshell-react/examples/) ·
[Playground](https://fyalavuz.github.io/appshell-react/playground/) ·
[Changelog](https://github.com/fyalavuz/appshell-react/blob/main/packages/react/CHANGELOG.md)

Mobile-first app shell components for React. Scroll-aware headers, tab bars, drawers, bottom sheets, and safe-area handling, so a web app feels native without you writing a single scroll listener.

## Install

```bash
pnpm add appshell-react
```

Peer dependencies: `react` and `react-dom` (18+), `tailwindcss` (v4+). `framer-motion` is optional and only needed for the spring animation adapter. The package itself depends on `clsx` and `tailwind-merge` for class merging.

## Tailwind setup

Tailwind v4 does not scan `node_modules`, so tell it where the library's classes live, and give it the shadcn/ui-style tokens the components use. In your CSS entry:

```css
@import "tailwindcss";

/* Required: without this the shell renders unstyled. */
@source "../node_modules/appshell-react/dist";

/* Optional: safe-area utilities (pb-safe, pt-safe-4, …) for your own content. */
@import "appshell-react/safe-area.css";
```

Then define `--background`, `--foreground`, `--primary`, `--muted`, `--accent`, `--popover`, `--border`, `--ring` (and their `-foreground` pairs) and map them under `@theme inline`. The [Installation guide](https://fyalavuz.github.io/appshell-react/docs/installation/) has the complete block to copy.

## Quick start

```tsx
import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="reveal-nav" logo={<span className="font-bold">MyApp</span>} />
      <Content className="p-4">Your content here</Content>
      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}
```

Animations are CSS transitions by default. For spring physics, install `framer-motion` and wrap the shell:

```tsx
import { MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

<MotionProvider adapter={framerMotionAdapter}>
  <AppShell>…</AppShell>
</MotionProvider>;
```

## Features

- **Header** with 10 scroll behaviors: `fixed`, `static`, `sticky`, `reveal-all`, `reveal-nav`, `reveal-context`, `reveal-search`, and the combined `reveal-nav-context`, `reveal-nav-search`, `reveal-context-search`
- **Footer** in three variants (`tab-bar`, `floating`, `mini`) that can auto-hide on scroll and step aside for the on-screen keyboard
- **Sidebar** as a modal drawer, or a docked panel with a collapsible icon rail that falls back to a drawer on small screens
- **BottomSheet** with drag, snap points, and a non-modal map-style mode
- **One overlay stack**: drawers, sheets, search, and menus share Escape handling, the scroll lock, and stacking order, so nested overlays close one at a time
- **Safe areas and keyboard insets** via `env(safe-area-inset-*)` and the VisualViewport API
- **Accessibility**: focus traps, focus return, skip link, route-change focus, and arrow-key navigable tabs
- **i18n and RTL**: localize the library's own strings and flip layouts with `I18nProvider`
- **Router-agnostic links**: plug in Next.js, React Router, or any `Link` through `LinkProvider`
- **Theming** through standard shadcn/ui tokens, with `light`, `dark`, `primary`, and `none` header themes
- **SSR-safe** and tree-shakeable: every module ships with `"use client"`, one file per component

## Components

| Component | Description |
|-----------|-------------|
| `AppShell` | Root wrapper with optional SafeArea |
| `Header` | Scroll-aware header with nav, context, and search rows |
| `HeaderNav`, `HeaderNavItem` | Desktop navigation links with dropdown support |
| `Content` | Main content area; reserves room for the footer |
| `Footer`, `FooterItem` | Tab bar, floating action, or mini bar |
| `ScrollNav`, `ScrollNavItem` | Horizontal scrollable pill navigation |
| `Tabs`, `Tab` | Tab row that docks below the header |
| `Sidebar`, `NavGroup`, `NavItem` | Overlay drawer or docked panel with icon rail |
| `BottomSheet` | Draggable sheet with snap points, modal or map-style |
| `ContentHeader`, `Breadcrumbs`, `BreadcrumbItem` | Screen heading with breadcrumb trail, title, and actions |
| `SearchField` | Theme-aware search input, pill or full-width bar |
| `SearchModal` | Full search overlay: sheet on phones, palette on desktop |
| `UserMenu`, `UserMenuItem` | Avatar trigger with an account dropdown |
| `NotificationsMenu`, `NotificationItem` | Bell trigger with notification dropdown and unread badge |
| `Avatar` | Image-or-initials identity mark |
| `SafeArea` | Safe-area padding |
| `SkipLink` | "Skip to content" link for keyboard users |
| `LinkProvider` | Router integration for every `href`-rendering component |
| `I18nProvider` | Library strings and text direction |
| `MotionProvider` | Swap the CSS animation adapter for Framer Motion |

Hooks: `useScrollDirection`, `useSafeArea`, `useKeyboardInset`, `useBelowBreakpoint`, `useSearchShortcut`, `useAppShell`, `useHeaderTheme`, `useLabel`, `useDirection`, `useLinkComponent`.

## Examples

Explore every fullscreen demo at [fyalavuz.github.io/appshell-react/examples](https://fyalavuz.github.io/appshell-react/examples/), or mix every behavior, theme, speed, and footer variant live in the [Playground](https://fyalavuz.github.io/appshell-react/playground/).

## Contributing

See [CONTRIBUTING.md](https://github.com/fyalavuz/appshell-react/blob/main/CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](https://github.com/fyalavuz/appshell-react/blob/main/LICENSE)
