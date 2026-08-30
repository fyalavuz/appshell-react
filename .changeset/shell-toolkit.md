---
"appshell-react": minor
---

Four new building blocks plus accessibility and RTL groundwork:

- `BottomSheet`: a draggable bottom sheet with viewport-fraction `snapPoints`, drag-to-dismiss, `onSnapChange`, and a `modal` switch — modal by default (backdrop, scroll lock, Escape, focus trap), or `modal={false}` for the map pattern where the page behind stays interactive. Pure CSS-transform motion, portaled, SSR-safe, safe-area padded.
- `Tabs`/`Tab`: a tab row that docks below a pinned Header via `--header-height`, with real `tablist` semantics, `aria-selected`, roving focus and ArrowLeft/ArrowRight navigation; controlled or uncontrolled; `sticky={false}` for inline rows.
- `Breadcrumbs`/`BreadcrumbItem`: an `aria-label="Breadcrumb"` trail with automatic separators; `href` items render through the LinkProvider component, `current` marks the page with `aria-current`.
- `ContentHeader`: the workspace heading block — breadcrumbs, title, subtitle, right-aligned actions.
- Focus traps everywhere they belong: the open SearchModal, the Sidebar drawer (which now also restores focus to its trigger on close), and modal BottomSheets keep Tab/Shift+Tab cycling inside and pull focus in on the first Tab.
- RTL groundwork: directional utilities inside components now use CSS logical properties (`text-start`, `ms-*`, `ps-*`, `start-0`, logical badge offsets), so `dir="rtl"` layouts mirror correctly. The Sidebar `side` prop remains physical by design.

Bundle size: the package now ships unbundled, module-per-file (`"sideEffects": false` + real import extensions), so bundlers tree-shake it properly — importing one component no longer pulls the whole library (an Avatar-only bundle drops from ~66 KB to ~28 KB, the remainder being the class-merging utilities). `clsx` and `tailwind-merge` moved from inlined code to regular dependencies accordingly.
