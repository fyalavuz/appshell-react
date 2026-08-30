---
"appshell-react": minor
---

`I18nProvider`: localize the strings the library renders on its own, and set the writing direction.

The library still ships no translations and no i18n dependency — this is the seam yours plugs into. Pass `labels` to override any subset of the built-in strings (unspecified keys keep their English default), or pass `t` to route every key through your own catalogue; `t` receives the English default, so it works before those keys exist. Values interpolate `{token}` placeholders — `notificationsUnread` takes `{count}`, `badgeOverflow` takes `{max}` — and they are plain strings rather than functions so a server component can resolve them and hand them to the client provider. Precedence is component prop → provider → English default, so a one-off `aria-label` still wins locally.

Six strings had no escape hatch at all before this: the Sidebar drawer's landmark name and its rail expand/collapse buttons, the Header's mobile menu toggle, the Breadcrumbs landmark, and the `99+` badge cap in the Footer and NotificationsMenu. `Sidebar` and `Breadcrumbs` also gained an `aria-label` prop.

`dir` sets the writing direction and is deliberately explicit rather than inferred from a locale. It travels through context, not the DOM, because the SearchModal, BottomSheet and anchored menus render through portals — and a portal does not inherit `dir` from its React parent. `useLabel()` and `useDirection()` are exported for components of your own.
