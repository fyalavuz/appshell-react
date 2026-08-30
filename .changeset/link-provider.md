---
"appshell-react": minor
---

New `LinkProvider`: the router integration point. Wrap your app once with your router's link component (`<LinkProvider component={Link}>`) and every href-rendering component — `NavItem`, `HeaderNavItem`, `UserMenuItem` — navigates through it (client-side transitions, prefetching) instead of a full-page `<a>` reload. Without a provider nothing changes: the default stays a plain `<a>`. Routers whose link takes `to` instead of `href` (React Router, TanStack Router) plug in via a one-line adapter; custom components can read the active link component with `useLinkComponent()`.
