---
"appshell-react": minor
---

Desktop search placement: Sidebar gains a `topContent` slot pinned above the scrolling nav (safe-area padded in the drawer) — the home for a SearchField when a docked panel would otherwise leave its top empty. SearchField gains `shortcutHint` (a ⌘K chip, hidden on small screens) and `inset={false}` for placement outside the header row. New `useSearchShortcut` hook binds ⌘K/Ctrl+K (optionally "/") to open a SearchModal.
