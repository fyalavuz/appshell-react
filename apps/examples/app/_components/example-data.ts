import {
  PanelTop,
  Minus,
  Layers,
  StickyNote,
  Navigation,
  MousePointer2,
  PanelLeft,
  GalleryHorizontal,
  Box,
  Columns,
  Layout,
  Moon,
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
        description:
          "A header that stays pinned to the top of the viewport as the user scrolls through content.",
        icon: PanelTop,
        code: `<AppShell>\n  <Header behavior="fixed" logo={...} nav={...} />\n  <Content>...</Content>\n</AppShell>`,
      },
      {
        slug: "static-header",
        title: "Static Header",
        description:
          "A header that scrolls naturally with the page content, disappearing as the user scrolls down.",
        icon: Minus,
        code: `<AppShell>\n  <Header behavior="static" logo={...} />\n  <Content>...</Content>\n</AppShell>`,
      },
      {
        slug: "reveal-all",
        title: "Reveal Header",
        description:
          "The header hides on scroll down and reveals all rows when the user scrolls back up.",
        icon: Layers,
        code: `<AppShell>\n  <Header behavior="reveal-all" logo={...} title="..." />\n  <Content>...</Content>\n</AppShell>`,
      },
      {
        slug: "sticky-tabs",
        title: "Sticky Tabs",
        description:
          "A fixed header with a secondary tab bar that sticks below it using CSS variable syncing.",
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
        description:
          "A standard mobile bottom navigation with 5 items, badges, and auto-hide on scroll.",
        icon: Navigation,
        code: `<Footer variant="tab-bar" behavior="auto-hide">\n  <FooterItem icon={<Home />} label="Home" active />\n  <FooterItem icon={<Search />} label="Search" />\n</Footer>`,
      },
      {
        slug: "floating-footer",
        title: "Floating Action",
        description:
          "An elevated floating action button for primary actions like cart, compose, or create.",
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
        description:
          "A slide-out drawer with backdrop overlay, keyboard dismiss, and smooth animations.",
        icon: PanelLeft,
        code: `<Sidebar open={open} onClose={() => setOpen(false)}>\n  <NavGroup label="Navigation">\n    <NavItem label="Home" icon={<Home />} />\n  </NavGroup>\n</Sidebar>`,
      },

      {
        slug: "scroll-nav",
        title: "Scroll Navigation",
        description:
          "Horizontal pill-style scrollable tabs for category filtering and section navigation.",
        icon: Box,
        code: `<Header searchContent={\n  <ScrollNav>\n    <ScrollNavItem label="All" active />\n    <ScrollNavItem label="Tech" />\n  </ScrollNav>\n} />`,
      },
      {
        slug: "desktop-nav",
        title: "Desktop Nav",
        description:
          "Horizontal navigation with dropdown menus that adapts from mobile hamburger to desktop layout.",
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
        description:
          "The most complex pattern: header reveals on scroll up while footer auto-hides on scroll down.",
        icon: Layout,
        code: `<AppShell>\n  <Header behavior="reveal-all" />\n  <Content>...</Content>\n  <Footer behavior="auto-hide" />\n</AppShell>`,
      },
      {
        slug: "dark-mode",
        title: "Dark Mode",
        description:
          "Live theme switching using CSS custom properties and the shadcn token system.",
        icon: Moon,
        code: `// Toggle .dark class on <html>\ndocument.documentElement.classList.toggle("dark");\n\n// All components use --background, --foreground tokens`,
      },
    ],
  },
];

export function findExample(
  slug: string
): { category: ExampleCategory; example: ExampleEntry } | null {
  for (const category of categories) {
    const example = category.examples.find((e) => e.slug === slug);
    if (example) return { category, example };
  }
  return null;
}

export function getAllExamples(): ExampleEntry[] {
  return categories.flatMap((c) => c.examples);
}
