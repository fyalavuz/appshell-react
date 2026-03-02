# AppShell Showcase Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform `apps/examples` into a polished shadcn-style showcase with iPhone mockup previews, sidebar navigation, and 12 curated examples.

**Architecture:** Next.js App Router with a new layout system — `ExampleLayout` wraps all example pages with sidebar nav + top navbar. Individual examples render inside `PhoneMockup` (CSS-only iPhone frame with iframe). Landing page gets hero + category cards.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, @appshell/react, Lucide React. No new dependencies.

---

## Phase 1: Shared Showcase Components

### Task 1: Create PhoneMockup component

**Files:**
- Create: `apps/examples/app/_components/phone-mockup.tsx`

**Step 1: Write the PhoneMockup component**

```tsx
"use client";

import { cn } from "@appshell/react";

interface PhoneMockupProps {
  src: string;
  className?: string;
}

export function PhoneMockup({ src, className }: PhoneMockupProps) {
  return (
    <div className={cn("relative mx-auto", className)} style={{ width: 280, height: 572 }}>
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[2.5rem] border-[8px] border-foreground/90 bg-foreground/90 shadow-xl shadow-black/20 overflow-hidden">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-7 w-[120px] rounded-b-2xl bg-foreground/90" />
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-background">
          <iframe
            src={src}
            title="Example preview"
            className="h-full w-full border-0"
            style={{ pointerEvents: "auto" }}
          />
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 h-1 w-[100px] rounded-full bg-background/60" />
      </div>
    </div>
  );
}
```

**Step 2: Verify it renders**

Run: `cd /Users/firat/projects/appshell && pnpm dev --filter=examples`
Navigate to a test page and import the component to verify it renders correctly.

**Step 3: Commit**

```bash
git add apps/examples/app/_components/phone-mockup.tsx
git commit -m "feat(examples): add PhoneMockup component for iPhone frame preview"
```

---

### Task 2: Create CodeBlock component

**Files:**
- Create: `apps/examples/app/_components/code-block.tsx`

**Step 1: Write the CodeBlock component**

```tsx
"use client";

import { useState } from "react";
import { cn } from "@appshell/react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-xl border bg-zinc-950 text-zinc-50 overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-xs text-zinc-400 font-mono">{language}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
      <pre className={cn(
        "overflow-x-auto p-4 text-sm leading-relaxed font-mono transition-all",
        !expanded && "max-h-48"
      )}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add apps/examples/app/_components/code-block.tsx
git commit -m "feat(examples): add CodeBlock component with copy and collapse"
```

---

### Task 3: Create ExampleLayout (sidebar + navbar + main)

**Files:**
- Create: `apps/examples/app/_components/example-layout.tsx`
- Create: `apps/examples/app/_components/sidebar-nav.tsx`
- Create: `apps/examples/app/_components/example-data.ts`

**Step 1: Create the example data registry**

File: `apps/examples/app/_components/example-data.ts`

```ts
import {
  PanelTop, Minus, Layers, StickyNote,
  Navigation, MousePointer2,
  PanelLeft, GalleryHorizontal, Box, Columns,
  Layout, Moon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ExampleEntry {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  code: string;
}

export interface ExampleCategory {
  id: string;
  title: string;
  examples: ExampleEntry[];
}

export const categories: ExampleCategory[] = [
  {
    id: "headers",
    title: "Headers",
    examples: [
      {
        slug: "fixed-header",
        title: "Fixed Header",
        description: "A header that stays pinned to the top of the viewport as the user scrolls through content.",
        icon: PanelTop,
        code: `<AppShell>\n  <Header behavior="fixed" logo={...} nav={...} />\n  <Content>...</Content>\n</AppShell>`,
      },
      {
        slug: "static-header",
        title: "Static Header",
        description: "A header that scrolls naturally with the page content, disappearing as the user scrolls down.",
        icon: Minus,
        code: `<AppShell>\n  <Header behavior="static" logo={...} />\n  <Content>...</Content>\n</AppShell>`,
      },
      {
        slug: "reveal-all",
        title: "Reveal Header",
        description: "The header hides on scroll down and reveals all rows when the user scrolls back up.",
        icon: Layers,
        code: `<AppShell>\n  <Header behavior="reveal-all" logo={...} title="..." />\n  <Content>...</Content>\n</AppShell>`,
      },
      {
        slug: "sticky-tabs",
        title: "Sticky Tabs",
        description: "A fixed header with a secondary tab bar that sticks below it using CSS variable syncing.",
        icon: StickyNote,
        code: `<Header behavior="fixed" />\n{/* Tabs use var(--header-height) for sticky offset */}\n<div style={{ top: "var(--header-height)" }} className="sticky" />`,
      },
    ],
  },
  {
    id: "footers",
    title: "Footers",
    examples: [
      {
        slug: "tab-bar",
        title: "Tab Bar",
        description: "A standard mobile bottom navigation with 5 items, badges, and auto-hide on scroll.",
        icon: Navigation,
        code: `<Footer variant="tab-bar" behavior="auto-hide">\n  <FooterItem icon={<Home />} label="Home" active />\n  <FooterItem icon={<Search />} label="Search" />\n</Footer>`,
      },
      {
        slug: "floating-footer",
        title: "Floating Action",
        description: "An elevated floating action button for primary actions like cart, compose, or create.",
        icon: MousePointer2,
        code: `<Footer variant="floating" position="center">\n  <button className="rounded-full bg-primary px-7 py-3.5">\n    Show Cart\n  </button>\n</Footer>`,
      },
    ],
  },
  {
    id: "layout",
    title: "Layout",
    examples: [
      {
        slug: "sidebar",
        title: "Sidebar Menu",
        description: "A slide-out drawer with backdrop overlay, keyboard dismiss, and smooth animations.",
        icon: PanelLeft,
        code: `<Sidebar open={open} onClose={() => setOpen(false)}>\n  <NavGroup label="Navigation">\n    <NavItem label="Home" icon={<Home />} />\n  </NavGroup>\n</Sidebar>`,
      },
      {
        slug: "nested-scroll",
        title: "Nested Scroll",
        description: "Netflix-style layout with horizontal carousels nested inside vertical scrolling content.",
        icon: GalleryHorizontal,
        code: `<Content>\n  {sections.map(section => (\n    <div className="overflow-x-auto snap-x snap-mandatory">\n      {section.items.map(item => <Card />)}\n    </div>\n  ))}\n</Content>`,
      },
      {
        slug: "scroll-nav",
        title: "Scroll Navigation",
        description: "Horizontal pill-style scrollable tabs for category filtering and section navigation.",
        icon: Box,
        code: `<Header searchContent={\n  <ScrollNav>\n    <ScrollNavItem label="All" active />\n    <ScrollNavItem label="Tech" />\n  </ScrollNav>\n} />`,
      },
      {
        slug: "desktop-nav",
        title: "Desktop Nav",
        description: "Horizontal navigation with dropdown menus that adapts from mobile hamburger to desktop layout.",
        icon: Columns,
        code: `<Header\n  nav={<HeaderNav>\n    <HeaderNavItem label="Products" dropdown={...} />\n  </HeaderNav>}\n  mobileMenu={<NavGroup>...</NavGroup>}\n/>`,
      },
    ],
  },
  {
    id: "patterns",
    title: "Patterns",
    examples: [
      {
        slug: "reveal-combined",
        title: "Combined Reveal",
        description: "The most complex pattern: header reveals on scroll up while footer auto-hides on scroll down.",
        icon: Layout,
        code: `<AppShell>\n  <Header behavior="reveal-all" />\n  <Content>...</Content>\n  <Footer behavior="auto-hide" />\n</AppShell>`,
      },
      {
        slug: "dark-mode",
        title: "Dark Mode",
        description: "Live theme switching using CSS custom properties and the shadcn token system.",
        icon: Moon,
        code: `// Toggle .dark class on <html>\ndocument.documentElement.classList.toggle("dark");\n\n// All components use --background, --foreground tokens`,
      },
    ],
  },
];

export function findExample(slug: string): { category: ExampleCategory; example: ExampleEntry } | null {
  for (const category of categories) {
    const example = category.examples.find((e) => e.slug === slug);
    if (example) return { category, example };
  }
  return null;
}

export function getAllExamples(): ExampleEntry[] {
  return categories.flatMap((c) => c.examples);
}
```

**Step 2: Create the sidebar nav**

File: `apps/examples/app/_components/sidebar-nav.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@appshell/react";
import { categories } from "./example-data";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {categories.map((category) => (
        <div key={category.id}>
          <h4 className="mb-2 px-2 text-sm font-semibold tracking-tight text-foreground">
            {category.title}
          </h4>
          <div className="space-y-0.5">
            {category.examples.map((example) => {
              const isActive = pathname === `/${example.slug}` || pathname === `/preview/${example.slug}`;
              return (
                <Link
                  key={example.slug}
                  href={`/preview/${example.slug}`}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <example.icon className="size-4 shrink-0" />
                  {example.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
```

**Step 3: Create the ExampleLayout**

File: `apps/examples/app/_components/example-layout.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@appshell/react";
import { PanelTop, Github, Menu, X, ExternalLink } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";
import { PhoneMockup } from "./phone-mockup";
import { CodeBlock } from "./code-block";
import type { ExampleEntry } from "./example-data";

interface ExampleLayoutProps {
  example: ExampleEntry;
  children?: React.ReactNode;
}

export function ExampleLayout({ example }: ExampleLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 sm:px-6">
          <button
            className="mr-3 rounded-md p-1.5 hover:bg-accent lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <div className="size-6 rounded bg-primary flex items-center justify-center">
              <PanelTop className="size-4 text-primary-foreground" />
            </div>
            <span>AppShell</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <a
              href="https://github.com/fyalavuz/react-appshell"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-5" />
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 top-14 z-40 w-64 border-r bg-background p-4 overflow-y-auto transition-transform lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarNav />
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-14 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-8 lg:px-12 lg:py-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">{example.title}</h1>
              <p className="mt-2 text-lg text-muted-foreground">{example.description}</p>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center gap-6 rounded-xl border bg-muted/30 p-8">
              <PhoneMockup src={`/${example.slug}`} />
              <div className="flex items-center gap-3">
                <Link
                  href={`/${example.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
                >
                  <ExternalLink className="size-3.5" />
                  Open Fullpage
                </Link>
              </div>
            </div>

            {/* Code */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold">Usage</h2>
              <CodeBlock code={example.code} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
```

**Step 4: Commit**

```bash
git add apps/examples/app/_components/
git commit -m "feat(examples): add ExampleLayout, SidebarNav, and example data registry"
```

---

## Phase 2: Routing & Page Structure

### Task 4: Create preview route for showcase pages

**Files:**
- Create: `apps/examples/app/preview/[slug]/page.tsx`

**Step 1: Create the dynamic preview route**

```tsx
import { notFound } from "next/navigation";
import { findExample, categories } from "../../_components/example-data";
import { ExampleLayout } from "../../_components/example-layout";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.flatMap((c) => c.examples.map((e) => ({ slug: e.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const result = findExample(slug);
  if (!result) return {};
  return {
    title: `${result.example.title} — AppShell`,
    description: result.example.description,
  };
}

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const result = findExample(slug);
  if (!result) notFound();
  return <ExampleLayout example={result.example} />;
}
```

**Step 2: Verify routing works**

Run: `pnpm dev --filter=examples`
Navigate to `/preview/fixed-header` — should show the ExampleLayout with the iPhone mockup loading the `/fixed-header` page in an iframe.

**Step 3: Commit**

```bash
git add apps/examples/app/preview/
git commit -m "feat(examples): add dynamic preview route with iPhone mockup"
```

---

### Task 5: Redesign the landing page

**Files:**
- Modify: `apps/examples/app/page.tsx`

**Step 1: Rewrite landing page**

Replace the entire content of `apps/examples/app/page.tsx` with a hero section + featured examples + category cards + feature grid. The landing page uses `Link` to navigate to `/preview/[slug]` routes.

Key sections:
- Hero: "Mobile-first App Shell for React" headline + "Get Started" / "Browse Components" CTAs
- 3 mini PhoneMockup previews of featured examples (fixed-header, tab-bar, sidebar)
- Category cards (Headers, Footers, Layout, Patterns) with example count
- Feature grid (Scroll-aware, Zero dependencies, Dark mode, TypeScript, Accessible, Framer Motion optional)
- Footer with GitHub + NPM links

**Step 2: Verify**

Navigate to `/` — should see the redesigned landing page.

**Step 3: Commit**

```bash
git add apps/examples/app/page.tsx
git commit -m "feat(examples): redesign landing page with hero, featured previews, and category cards"
```

---

## Phase 3: Bug Fixes

### Task 6: Fix ScrollNav scrollbar-hide

**Files:**
- Modify: `apps/examples/app/globals.css`

**Step 1: Add scrollbar-hide utility**

Add to `globals.css` after the `@layer base` block:

```css
@utility scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

@utility scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

**Step 2: Verify ScrollNav page works**

Navigate to `/scroll-nav` — the horizontal pill tabs should now scroll without visible scrollbar.

**Step 3: Commit**

```bash
git add apps/examples/app/globals.css
git commit -m "fix(examples): add scrollbar-hide utility for ScrollNav horizontal scroll"
```

---

### Task 7: Fix sticky tabs hardcoded height

**Files:**
- Modify: `apps/examples/app/sticky-tabs/page.tsx:68-70`

**Step 1: Remove hardcoded fallback**

In `apps/examples/app/sticky-tabs/page.tsx`, line 70, change:
```tsx
style={{ top: "var(--header-height, 112px)" }}
```
to:
```tsx
style={{ top: "var(--header-height, 0px)" }}
```

The `--header-height` CSS variable is set by the Header component's ResizeObserver (see `Header.tsx:82-84`), so a 0px fallback is safe — it only applies before the Header mounts.

**Step 2: Verify**

Navigate to `/sticky-tabs` — scroll down, tabs should stick directly below the header.

**Step 3: Commit**

```bash
git add apps/examples/app/sticky-tabs/page.tsx
git commit -m "fix(examples): remove hardcoded 112px fallback in sticky tabs"
```

---

### Task 8: Fix HeaderNavItem hardcoded theme colors

**Files:**
- Modify: `packages/react/src/HeaderNav.tsx`

**Step 1: Read the file and identify the issue**

In `HeaderNavItem`, the `primary` and `dark` theme styles hardcode white text. Change these to use theme tokens.

Look for lines like:
```tsx
"text-white/70 hover:text-white" // hardcoded
```
Replace with:
```tsx
"text-primary-foreground/70 hover:text-primary-foreground" // token-based
```

**Step 2: Run unit tests**

```bash
cd /Users/firat/projects/appshell && pnpm test --filter=@appshell/react
```

**Step 3: Commit**

```bash
git add packages/react/src/HeaderNav.tsx
git commit -m "fix(react): use theme tokens instead of hardcoded white in HeaderNavItem"
```

---

## Phase 4: Clean Up Examples

### Task 9: Remove unnecessary example pages

**Files:**
- Delete: `apps/examples/app/header-only/page.tsx`
- Delete: `apps/examples/app/footer-only/page.tsx`
- Delete: `apps/examples/app/content-only/page.tsx`
- Delete: `apps/examples/app/reveal-top/page.tsx`
- Delete: `apps/examples/app/responsive/page.tsx`
- Delete: `apps/examples/app/mini-footer/page.tsx`
- Delete: `apps/examples/app/reveal-header/page.tsx`
- Delete: `apps/examples/app/reveal-content/page.tsx`
- Delete: `apps/examples/app/reveal-bottom/page.tsx`
- Delete: `apps/examples/app/reveal-content-bottom/page.tsx`
- Delete: `apps/examples/app/reveal-top-content/page.tsx`

**Step 1: Remove the pages**

Delete all the page.tsx files listed above and their parent directories if empty.

**Step 2: Verify remaining pages**

After deletion, these 12 example routes should remain:
- `/fixed-header`
- `/static-header`
- `/reveal-all`
- `/sticky-tabs`
- `/tab-bar`
- `/floating-footer`
- `/sidebar`
- `/nested-scroll`
- `/scroll-nav`
- `/desktop-nav`
- `/reveal-combined`
- `/dark-mode`

**Step 3: Commit**

```bash
git add -A apps/examples/app/
git commit -m "chore(examples): remove 11 redundant example pages, keep 12 curated examples"
```

---

### Task 10: Remove IndicatorPill from all example pages

**Files:**
- Modify: all 12 remaining example `page.tsx` files

**Step 1: Remove IndicatorPill usage**

In each example page, remove:
- The `<IndicatorPill>` component JSX
- The import of `IndicatorPill`
- The import of `../\_shared/indicator-pill`

The IndicatorPill was a development/debug indicator showing current configuration. In the showcase, this info is shown in the ExampleLayout header and code block instead.

**Step 2: Run build**

```bash
cd /Users/firat/projects/appshell && pnpm build --filter=examples
```

**Step 3: Commit**

```bash
git add apps/examples/app/
git commit -m "chore(examples): remove IndicatorPill from all example pages"
```

---

## Phase 5: Content Polish

### Task 11: Ensure consistent content across all 12 examples

**Files:**
- Modify: all 12 example `page.tsx` files as needed

**Step 1: Review each example for consistency**

Every example should:
- Use shadcn design tokens (no hardcoded colors like `text-gray-500`)
- Use Lucide React icons (no inline SVGs for standard icons)
- Have realistic, high-quality demo content
- Work correctly with touch/scroll in iframe context

Review each and make targeted fixes. Focus on:
- `reveal-all` — ensure it demonstrates the reveal behavior clearly
- `scroll-nav` — verify filtering works after scrollbar fix
- `dark-mode` — ensure it toggles `.dark` class on its own document (not parent)
- `nested-scroll` — add snap-scroll CSS for smooth mobile feel

**Step 2: Run all tests**

```bash
cd /Users/firat/projects/appshell && pnpm test && pnpm build
```

**Step 3: Commit**

```bash
git add apps/examples/
git commit -m "polish(examples): ensure consistent shadcn tokens and content across all 12 examples"
```

---

## Phase 6: Final Integration

### Task 12: Update E2E tests for new routes

**Files:**
- Modify: `e2e/` test files as needed

**Step 1: Update tests**

E2E tests may reference removed pages (header-only, footer-only, etc.) or old routes. Update test navigation URLs and remove tests for deleted pages.

**Step 2: Run E2E tests**

```bash
cd /Users/firat/projects/appshell && pnpm test:e2e
```

**Step 3: Commit**

```bash
git add e2e/
git commit -m "test: update E2E tests for new showcase page structure"
```

---

### Task 13: Build verification and final commit

**Step 1: Run full build pipeline**

```bash
cd /Users/firat/projects/appshell && pnpm build && pnpm test && pnpm lint
```

**Step 2: Verify showcase works end-to-end**

- Navigate to `/` — landing page with hero, featured examples, categories
- Click a category card — navigates to `/preview/fixed-header`
- Sidebar navigation works — click through all 12 examples
- iPhone mockup shows live preview of each example
- Code block shows usage code with copy button
- "Open Fullpage" opens example in new tab
- Mobile responsive — sidebar collapses to hamburger

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete AppShell showcase redesign with iPhone previews and sidebar navigation"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-3 | Create PhoneMockup, CodeBlock, ExampleLayout components |
| 2 | 4-5 | Set up preview routing and redesign landing page |
| 3 | 6-8 | Fix ScrollNav, sticky tabs, and theme token bugs |
| 4 | 9-10 | Remove 11 redundant pages, clean up IndicatorPill |
| 5 | 11 | Polish content consistency across all examples |
| 6 | 12-13 | Update tests and verify full build |

**Total: 13 tasks, ~6 phases**
**Parallelizable:** Tasks 1-3 (Phase 1) can run in parallel. Tasks 6-8 (Phase 3) can run in parallel. Task 9-10 (Phase 4) can run in parallel.
