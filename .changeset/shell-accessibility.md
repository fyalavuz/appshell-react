---
"appshell-react": minor
---

Accessibility and keyboard handling — the gaps a study of Ionic, Quasar, Carbon, Mantine and React Navigation turned up.

**Three of these are fixes, not features.** In the reveal behaviours the visible header copy was marked `aria-hidden` while it held the only menu button, and the scrolled-away original stayed focusable — so the same controls were offered twice and one of them from inside a hidden subtree. The visible copy is now the header, and the off-screen original is `inert`. The docked Sidebar's `<aside>` and `HeaderNav`'s `<nav>` had no accessible names, which on a page with both is a WCAG failure; each now takes one, defaulting through the labels. `FooterItem` rendered a bare `<button>` with no indication of which tab you were on; the active one now carries `aria-current="page"`, and an `href` renders it as a link through the LinkProvider.

**`useKeyboardInset()`** reports how much of the viewport the on-screen keyboard covers and publishes it as `--appshell-keyboard-inset-bottom`. Measured through `visualViewport` — the only mechanism iOS Safari supports. A modal `BottomSheet` and the `SearchModal` now keep their content clear of the keyboard, and `<Footer hideOnKeyboard>` steps out of the way like a native tab bar.

**`<AppShell skipToContent>`** renders a skip link as the first focusable thing on the page, jumping past the header and navigation to `Content` — which now carries `id="appshell-content"` and takes focus when it is the target. `SkipLink` is exported for shells you assemble yourself.

**`<AppShell routeKey={pathname}>`** moves focus to the top of each new screen — the Header's title, or `Content` when a screen has no heading. Without it a single-page app tells a screen reader nothing on navigation and leaves the keyboard inside the link the user just used. `focusOnRouteChange` picks the target or turns it off.

**Android's back gesture closes the topmost overlay.** The overlay stack uses `CloseWatcher` where the platform has it, which defines a close request as whatever the device means by one — Escape, the Android back button, the TalkBack back gesture — and falls back to the Escape listener everywhere else.

**Safe-area utilities**, at `appshell-react/safe-area.css`: `pt-safe`, `pb-safe`, `ps-safe`, `pe-safe`, `px-safe`, `py-safe`, the numeric `pt-safe-4` / `pb-safe-6` forms, `mt-safe`/`mb-safe`, `top-safe`/`bottom-safe`/`start-safe`/`end-safe`, and `pb-keyboard` / `pb-safe-keyboard`. Import once after `@import "tailwindcss"`. Until now the variables the components use were not reachable from your own markup without hand-writing the `var(…, env(…))` chain.

**`useBelowBreakpoint`** is exported. The docked Sidebar uses it to decide when the drawer takes over; consumers driving `open` had to re-derive that and risk disagreeing.
