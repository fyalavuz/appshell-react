# appshell-react

Mobile-first app shell components for React. Scroll-aware headers, auto-hiding footers, sidebars, tab bars, and safe-area support — built with shadcn-compatible tokens and zero runtime dependencies.

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

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span>My App</span>} />
      <Content>
        <p>Your content here</p>
      </Content>
      <Footer variant="tab-bar">
        <FooterItem icon={<HomeIcon />} label="Home" active />
        <FooterItem icon={<SearchIcon />} label="Search" />
      </Footer>
    </AppShell>
  );
}
```

## Optional Framer Motion

```tsx
import { MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

<MotionProvider adapter={framerMotionAdapter}>
  <AppShell>...</AppShell>
</MotionProvider>
```

## Features

- **Scroll-aware headers** — fixed, sticky, reveal-on-scroll-up (7 behaviors)
- **Auto-hiding footers** — tab bar, floating, and mini variants
- **Sidebar** — slide-out drawer with backdrop and keyboard dismiss
- **Safe area** — proper inset handling for notched devices
- **ScrollNav** — horizontal scrollable pill navigation
- **Zero dependencies** — pure React, optional Framer Motion adapter
- **shadcn compatible** — uses standard CSS variable tokens
- **Dark mode** — full OKLCh color space support
- **TypeScript** — full type definitions included

## Documentation

[https://fyalavuz.github.io/appshell-react](https://fyalavuz.github.io/appshell-react)

## License

MIT
