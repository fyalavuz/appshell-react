import {
  PanelTop,
  Minus,
  Layers,
  StickyNote,
  Navigation,
  MousePointer2,
  PanelLeft,
  Box,
  Columns,
  Layout,
  Moon,
  TableOfContents,
  type LucideIcon,
} from "lucide-react";

export interface Example {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  tags: string[];
}

export interface ExampleCategory {
  id: string;
  title: string;
  description: string;
  examples: Example[];
}

export const categories: ExampleCategory[] = [
  {
    id: "headers",
    title: "Headers",
    description: "Header components with various behaviors like fixed, reveal, and sticky.",
    examples: [
      {
        slug: "fixed-header",
        title: "Fixed Header",
        description:
          "A header that stays pinned to the top of the viewport as the user scrolls through content.",
        icon: PanelTop,
        category: "headers",
        tags: ["header", "fixed", "sticky", "navigation"],
      },
      {
        slug: "static-header",
        title: "Static Header",
        description:
          "A header that scrolls naturally with the page content, disappearing as the user scrolls down.",
        icon: Minus,
        category: "headers",
        tags: ["header", "static", "scroll"],
      },
      {
        slug: "reveal-all",
        title: "Reveal Header",
        description:
          "The header hides on scroll down and reveals all rows when the user scrolls back up.",
        icon: Layers,
        category: "headers",
        tags: ["header", "reveal", "animation", "scroll"],
      },
      {
        slug: "sticky-tabs",
        title: "Sticky Tabs",
        description:
          "A fixed header with a secondary tab bar that sticks below it using CSS variable syncing.",
        icon: StickyNote,
        category: "headers",
        tags: ["header", "tabs", "sticky", "navigation"],
      },
    ],
  },
  {
    id: "footers",
    title: "Footers",
    description: "Footer components including tab bars and floating action buttons.",
    examples: [
      {
        slug: "tab-bar",
        title: "Tab Bar",
        description:
          "A standard mobile bottom navigation with 5 items, badges, and auto-hide on scroll.",
        icon: Navigation,
        category: "footers",
        tags: ["footer", "tab-bar", "navigation", "mobile"],
      },
      {
        slug: "floating-footer",
        title: "Floating Action",
        description:
          "An elevated floating action button for primary actions like cart, compose, or create.",
        icon: MousePointer2,
        category: "footers",
        tags: ["footer", "floating", "fab", "action"],
      },
    ],
  },
  {
    id: "layout",
    title: "Layout",
    description: "Layout components including sidebars, navigation, and responsive patterns.",
    examples: [
      {
        slug: "sidebar",
        title: "Sidebar Menu",
        description:
          "A slide-out drawer with backdrop overlay, keyboard dismiss, and smooth animations.",
        icon: PanelLeft,
        category: "layout",
        tags: ["sidebar", "drawer", "menu", "navigation"],
      },
      {
        slug: "scroll-nav",
        title: "Scroll Navigation",
        description:
          "Horizontal pill-style scrollable tabs for category filtering and section navigation.",
        icon: Box,
        category: "layout",
        tags: ["navigation", "scroll", "tabs", "filter"],
      },
      {
        slug: "in-page-nav",
        title: "In-Page Navigation",
        description:
          "Anchor-based section navigation with scroll-spy highlighting and reveal-nav header behavior.",
        icon: TableOfContents,
        category: "layout",
        tags: ["navigation", "anchor", "scroll-spy", "toc"],
      },
      {
        slug: "desktop-nav",
        title: "Desktop Nav",
        description:
          "Horizontal navigation with dropdown menus that adapts from mobile hamburger to desktop layout.",
        icon: Columns,
        category: "layout",
        tags: ["navigation", "desktop", "responsive", "dropdown"],
      },
    ],
  },
  {
    id: "patterns",
    title: "Patterns",
    description: "Common UI patterns combining multiple components together.",
    examples: [
      {
        slug: "reveal-combined",
        title: "Combined Reveal",
        description:
          "The most complex pattern: header reveals on scroll up while footer auto-hides on scroll down.",
        icon: Layout,
        category: "patterns",
        tags: ["pattern", "reveal", "header", "footer"],
      },
      {
        slug: "dark-mode",
        title: "Dark Mode",
        description:
          "Live theme switching using CSS custom properties and the shadcn token system.",
        icon: Moon,
        category: "patterns",
        tags: ["theme", "dark-mode", "customization"],
      },
    ],
  },
];

export function getAllExamples(): Example[] {
  return categories.flatMap((c) => c.examples);
}

export function getExampleBySlug(slug: string): Example | undefined {
  return getAllExamples().find((e) => e.slug === slug);
}

export function getCategoryById(id: string): ExampleCategory | undefined {
  return categories.find((c) => c.id === id);
}

export function getExamplesByCategory(categoryId: string): Example[] {
  const category = getCategoryById(categoryId);
  return category?.examples ?? [];
}

// Navigation structure for docs sidebar
export const docsNavigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "AppShell", href: "/docs/components/app-shell" },
      { title: "Header", href: "/docs/components/header" },
      { title: "Footer", href: "/docs/components/footer" },
      { title: "Content", href: "/docs/components/content" },
      { title: "Sidebar", href: "/docs/components/sidebar" },
      { title: "SafeArea", href: "/docs/components/safe-area" },
      { title: "ScrollNav", href: "/docs/components/scroll-nav" },
    ],
  },
  {
    title: "Hooks",
    items: [
      { title: "useAppShell", href: "/docs/hooks/use-app-shell" },
      { title: "useScrollDirection", href: "/docs/hooks/use-scroll-direction" },
    ],
  },
  {
    title: "Examples",
    items: [
      { title: "All Examples", href: "/examples" },
      ...categories.flatMap((cat) =>
        cat.examples.slice(0, 2).map((ex) => ({
          title: ex.title,
          href: `/examples/${ex.slug}`,
        }))
      ),
    ],
  },
];
