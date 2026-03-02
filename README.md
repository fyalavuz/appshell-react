# appshell-react

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![npm](https://img.shields.io/npm/v/appshell-react)](https://www.npmjs.com/package/appshell-react)

Mobile-first app shell components for React. Build native-feeling headers, footers, tab bars, and safe-area layouts with scroll-aware behaviors and smooth animations.

## Install

```bash
pnpm add appshell-react
```

Peer dependencies: `react`, `react-dom`, `framer-motion`, `tailwindcss` (v4+).

## Quick Start

```tsx
import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-nav"
        theme="light"
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

## Features

- **Header** with 7 scroll behaviors: `fixed`, `static`, `sticky`, `reveal-all`, `reveal-nav`, `reveal-context`, `reveal-search`
- **Animation Speed** control: `slow`, `normal`, `fast` durations for all transitions
- **Footer** with 3 variants: `tab-bar`, `floating`, `mini`
- **Auto-hide** footer behavior tied to scroll direction
- **Sticky Sub-navigation** support via dynamic `--header-height` CSS variable
- **SafeArea** for mobile notch/gesture-bar insets
- **Dark, light, and primary** header themes + `none` for custom styling
- **Mobile menu** support with animated drawer
- **Framer Motion** powered animations
- **Tailwind CSS v4** styling with standard shadcn/ui tokens
- **SSR-safe** with `"use client"` directives
- **Interactive Documentation** with live Storybook previews

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

## Documentation

Visit the [documentation site](https://fyalavuz.github.io/appshell-react) for full API reference, guides, and interactive examples.

## Examples

Explore 18+ fullscreen demos at [fyalavuz.github.io/appshell-react/examples](https://fyalavuz.github.io/appshell-react/examples):

- **Sticky Tabs** -- Header behavior with hitching sub-navigation
- **Combined Reveal** -- All-row header reveal + auto-hide footer
- **Fixed/Static/Reveal** -- Detailed header behavior permutations
- **Sidebar & Desktop Nav** -- Responsive menu patterns
- **Floating & Mini Footers** -- FABs and contextual toolbar patterns

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](./LICENSE)
