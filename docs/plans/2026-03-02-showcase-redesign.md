# AppShell Showcase Redesign

**Date:** 2026-03-02
**Status:** Approved
**Approach:** Transform existing examples app into shadcn-style showcase

## Goal

Convert `apps/examples` from a basic demo collection into a polished, marketing-oriented showcase site with iPhone mockup previews, consistent shadcn design tokens, and fixed scroll navigation.

## Architecture

### Site Layout

```
┌──────────────────────────────────────────┐
│ Top Navbar: Logo │ Categories │ GitHub ⌘K│
├────────┬─────────────────────────────────┤
│Sidebar │ Main: Title + Description       │
│Nav     │        iPhone Mockup (iframe)   │
│        │        [View Code] [Open Full]  │
│        │        Code Block (collapsible) │
└────────┴─────────────────────────────────┘
```

- **Top navbar:** Logo + category links + GitHub + command palette
- **Sidebar:** Categorized example list, active state highlight
- **Main area:** Title, description, iPhone mockup, code block
- **Responsive:** Sidebar collapses to hamburger on mobile

### iPhone Mockup

- CSS-only phone frame (rounded corners, notch, home indicator)
- `<iframe>` renders actual example page inside frame
- Fixed dimensions: 393x852 (iPhone 15 aspect ratio)
- Scroll and touch work inside iframe

### Landing Page

- Hero: tagline + CTAs ("Get Started", "Browse Components")
- 3 featured examples in mini iPhone frames
- Category cards linking to each section
- Feature checklist (scroll-aware, zero deps, dark mode, etc.)

## Examples (12 total)

### Headers (4)
1. Fixed Header — pinned to viewport top
2. Static Header — scrolls with content
3. Reveal Header — shows on scroll up (merges reveal-top + reveal-all)
4. Sticky Tabs — fixed header + sticky tab bar below

### Footers (2)
5. Tab Bar — standard 5-item bottom nav
6. Floating Footer — FAB + mini variant combined

### Layout (4)
7. Sidebar — slide-out drawer with backdrop
8. Nested Scroll — Netflix-style horizontal carousels
9. Scroll Nav — horizontal pill navigation (currently broken, needs fix)
10. Desktop Nav — horizontal nav with dropdowns

### Patterns (2)
11. Combined (Reveal + Footer) — header reveals + footer auto-hides
12. Dark Mode — theme token toggle with live preview

### Removed
- `header-only`, `footer-only`, `content-only` — empty/meaningless
- `reveal-top` — merged into reveal header
- `responsive` — merged into desktop-nav
- `mini-footer` — shown as variant in floating-footer

## Bug Fixes

1. **ScrollNav broken** — fix event handlers and scroll logic
2. **Sticky tabs 112px hardcode** — use `var(--header-height)` properly
3. **HeaderNavItem hardcoded white** — use theme tokens instead
4. **NavItem group selector** — add parent group data attribute

## Content Consistency

Every example simulates a realistic mobile app:
- Header with app name + nav items (shadcn style)
- Card-based content with realistic placeholder data
- Footer with 4-5 tab items (Home, Search, Notifications, Profile)
- Colors from shadcn tokens (--background, --foreground, --primary, --muted)
- Icons from Lucide React

## New Shared Components

| Component | Purpose |
|-----------|---------|
| `PhoneMockup` | iPhone frame with notch + home indicator |
| `CodeBlock` | Syntax-highlighted, collapsible code viewer |
| `ExampleLayout` | Sidebar + main area + navbar wrapper |
| `CategoryCard` | Landing page category link card |

## Style System

- shadcn/ui compatible CSS tokens (existing OKLch system)
- Inter or system font stack
- shadcn `--radius` system
- `.dark` class toggle for dark mode
- Consistent spacing scale

## Technical Decisions

- Keep Next.js App Router (existing)
- iframe-based preview (isolation between showcase and examples)
- Existing example routes preserved (backwards compatible)
- Fumadocs docs app untouched (separate concern)
- No new dependencies required (CSS-only mockup, existing Lucide icons)
