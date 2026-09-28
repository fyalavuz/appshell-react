---
"appshell-react": minor
---

Sidebar: `side` accepts `"start"` and `"end"`, which follow the writing direction set by `I18nProvider`, and now defaults to `"start"`. Under `dir="rtl"` the drawer opens from the right edge without extra configuration, and a docked sidebar keeps its border and safe-area padding on the correct side. `"left"` and `"right"` keep their physical meaning.
