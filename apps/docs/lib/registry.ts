import {
  Command,
  Dock,
  PanelLeftClose,
  PanelTop,
  Minus,
  Layers,
  StickyNote,
  Navigation,
  MousePointer2,
  PanelLeft,
  PanelBottom,
  Moon,
  Palette,
  TableOfContents,
  Search,
  MessageSquare,
  ListMusic,
  GalleryHorizontal,
  Columns3,
  Frame,
  Rows3,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

export interface Example {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  tags: string[];
  /** The fictional app rendered in the fullscreen preview. */
  appName: string;
  /** Headline prop combination the demo exercises. */
  props: string;
  /** Short interaction hints shown next to the live preview. */
  tryHints: string[];
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
    description:
      "Every scroll behavior the Header supports, from pinned to multi-row reveal.",
    examples: [
      {
        slug: "fixed-header",
        title: "Fixed Header",
        description:
          "The header stays pinned to the top of the viewport while content scrolls beneath it.",
        icon: PanelTop,
        category: "headers",
        tags: ["header", "fixed", "navigation"],
        appName: "Atlas — travel planner",
        props: 'behavior="fixed"',
        tryHints: [
          "Scroll down — the header never moves",
          "Content slides under the pinned bar",
        ],
      },
      {
        slug: "static-header",
        title: "Static Header",
        description:
          "The header scrolls away naturally with the page, giving content the full viewport.",
        icon: Minus,
        category: "headers",
        tags: ["header", "static", "scroll"],
        appName: "Journal — reading app",
        props: 'behavior="static"',
        tryHints: [
          "Scroll down — the header leaves with the page",
          "Scroll back to the top to bring it back",
        ],
      },
      {
        slug: "sticky-header",
        title: "Sticky Header",
        description:
          "A single sticky bar that stays pinned — the lightest always-visible header.",
        icon: StickyNote,
        category: "headers",
        tags: ["header", "sticky", "messages"],
        appName: "Chirp — messages",
        props: 'behavior="sticky"',
        tryHints: [
          "Scroll the thread — the bar stays put",
          "Compare with fixed: same pin, simpler layout",
        ],
      },
      {
        slug: "reveal-all",
        title: "Reveal All Rows",
        description:
          "Title and search rows tuck away on scroll down — the full header glides back the moment you scroll up.",
        icon: Layers,
        category: "headers",
        tags: ["header", "reveal", "animation"],
        appName: "Pulse — social feed",
        props: 'behavior="reveal-all"',
        tryHints: [
          "Scroll down — title and search tuck away",
          "Nudge upward — the full header returns",
        ],
      },
      {
        slug: "reveal-nav",
        title: "Reveal Nav Row",
        description:
          "The slim nav bar stays pinned while the heavier rows scroll away — scroll up and it floats back with a shadow.",
        icon: Rows3,
        category: "headers",
        tags: ["header", "reveal", "nav"],
        appName: "Wire — news reader",
        props: 'behavior="reveal-nav"',
        tryHints: [
          "Scroll down past the headlines",
          "Scroll up — just the nav bar floats back",
        ],
      },
      {
        slug: "reveal-search",
        title: "Reveal Search Row",
        description:
          "Scrolling up brings back the search row, keeping discovery one gesture away.",
        icon: Search,
        category: "headers",
        tags: ["header", "reveal", "search"],
        appName: "Market — storefront",
        props: 'behavior="reveal-search"',
        tryHints: [
          "Scroll deep into the product grid",
          "Scroll up — the search row comes right back",
        ],
      },
      {
        slug: "sticky-tabs",
        title: "Sticky Sub-navigation",
        description:
          "A tab row that docks below the header using the --header-height CSS variable.",
        icon: TableOfContents,
        category: "headers",
        tags: ["header", "tabs", "css-variable"],
        appName: "Orbit — profile",
        props: 'top: "var(--header-height)"',
        tryHints: [
          "Scroll down — tabs hitch below the header",
          "Switch tabs while everything stays docked",
        ],
      },
    ],
  },
  {
    id: "footers",
    title: "Footers",
    description:
      "Every footer variant: the tab bar, the floating action, the glass dock, and the mini bar.",
    examples: [
      {
        slug: "tab-bar",
        title: "Tab Bar",
        description:
          "Five-item bottom navigation with badges that hides on scroll down and returns on scroll up.",
        icon: Navigation,
        category: "footers",
        tags: ["footer", "tab-bar", "auto-hide"],
        appName: "Feedflow — timeline",
        props: 'variant="tab-bar" behavior="auto-hide"',
        tryHints: [
          "Scroll down — the tab bar slips away",
          "Scroll up to summon it back, badges intact",
        ],
      },
      {
        slug: "floating-footer",
        title: "Floating Action",
        description:
          "An elevated pill for the primary action, with left, center, and right positioning.",
        icon: MousePointer2,
        category: "footers",
        tags: ["footer", "floating", "fab", "position"],
        appName: "Crate — record shop",
        props: 'variant="floating" position="center"',
        tryHints: [
          "Add records — the cart pill updates live",
          "Move the pill left, center, or right",
        ],
      },
      {
        slug: "floating-dock",
        title: "Liquid Glass Dock",
        description:
          "A translucent floating dock that condenses to a pill on scroll and magnifies under the pointer.",
        icon: Dock,
        category: "footers",
        tags: ["footer", "floating", "glass", "dock"],
        appName: "Aura — wallpapers",
        props: 'variant="floating" + glass',
        tryHints: [
          "Scroll down — the dock condenses into a pill",
          "Sweep the pointer across it — icons magnify",
        ],
      },
      {
        slug: "mini-footer",
        title: "Mini Bar",
        description:
          "A slim contextual strip above the safe area — perfect for a now-playing bar.",
        icon: ListMusic,
        category: "footers",
        tags: ["footer", "mini", "player"],
        appName: "Tempo — music player",
        props: 'variant="mini"',
        tryHints: [
          "Tap a track — the mini player appears",
          "Play and skip without leaving the list",
        ],
      },
    ],
  },
  {
    id: "layout",
    title: "Layout & Navigation",
    description:
      "Drawers, pill navigation, scroll-spy anchors, desktop dropdowns, and safe areas.",
    examples: [
      {
        slug: "sidebar",
        title: "Sidebar Drawer",
        description:
          "A slide-out drawer with backdrop, collapsible groups, and left or right placement.",
        icon: PanelLeft,
        category: "layout",
        tags: ["sidebar", "drawer", "menu"],
        appName: "Console — admin",
        props: 'side="left" | side="right"',
        tryHints: [
          "Open the drawer from either edge",
          "Dismiss with the backdrop or Escape",
        ],
      },
      {
        slug: "docked-sidebar",
        title: "Docked Sidebar",
        description:
          "A persistent sidebar with search pinned at its top that collapses to an icon rail on desktop and becomes the drawer on phones.",
        icon: PanelLeftClose,
        category: "layout",
        tags: ["sidebar", "docked", "rail", "responsive", "search", "shortcut"],
        appName: "Terra — project tracker",
        props: 'variant="docked" collapsible topContent',
        tryHints: [
          "Press ⌘K — or click the search at the panel's top",
          "Collapse to a rail — search becomes an icon",
          "Phone: the same nav and search open as a drawer",
        ],
      },
      {
        slug: "search-command",
        title: "Search, Notifications & User Menu",
        description:
          "Tapping search opens a full search overlay seeded with what you typed; the bell and the avatar each open their own menu — never both at once.",
        icon: Command,
        category: "layout",
        tags: ["search", "modal", "notifications", "user-menu", "avatar"],
        appName: "Nimbus — knowledge base",
        props: "<SearchModal> + <NotificationsMenu> + <UserMenu>",
        tryHints: [
          "Tap the search field — the modal opens with your text",
          "Open the bell — unread items, mark all read",
          "Open the avatar menu — the bell menu closes itself",
        ],
      },
      {
        slug: "scroll-nav",
        title: "Scroll Navigation",
        description:
          "Horizontally scrollable pill tabs inside the header's search row for filtering.",
        icon: GalleryHorizontal,
        category: "layout",
        tags: ["scroll-nav", "pills", "filter"],
        appName: "Lens — photo gallery",
        props: "<ScrollNav> in searchContent",
        tryHints: [
          "Swipe the pills sideways",
          "Pick a category — the grid filters instantly",
        ],
      },
      {
        slug: "in-page-nav",
        title: "In-Page Navigation",
        description:
          "Anchor navigation with scroll-spy highlighting, docked below a reveal-nav header.",
        icon: TableOfContents,
        category: "layout",
        tags: ["anchors", "scroll-spy", "toc"],
        appName: "Handbook — field guide",
        props: 'behavior="reveal-nav" + anchors',
        tryHints: [
          "Scroll — the active section follows you",
          "Jump between sections from the pill row",
        ],
      },
      {
        slug: "desktop-nav",
        title: "Desktop Navigation",
        description:
          "HeaderNav with dropdown panels that collapses into a mobile drawer menu.",
        icon: Columns3,
        category: "layout",
        tags: ["desktop", "dropdown", "responsive"],
        appName: "Nimbus — product site",
        props: "<HeaderNav> + mobileMenu",
        tryHints: [
          "Open the Products dropdown (desktop view)",
          "Shrink the window — nav folds into a menu",
        ],
      },
      {
        slug: "safe-area",
        title: "Safe Area",
        description:
          "Visualize how AppShell pads content around notches, islands, and home indicators.",
        icon: Frame,
        category: "layout",
        tags: ["safe-area", "notch", "insets"],
        appName: "Inset — visualizer",
        props: "safeArea + <SafeArea edges>",
        tryHints: [
          "Toggle the highlighted inset overlays",
          "See header and footer respect each edge",
        ],
      },
    ],
  },
  {
    id: "patterns",
    title: "Patterns & Theming",
    description:
      "Component combinations and the theming system: reveal pairs, header themes, dark mode.",
    examples: [
      {
        slug: "reveal-combined",
        title: "Combined Reveal",
        description:
          "The full choreography: header reveals on scroll up while the tab bar auto-hides.",
        icon: PanelBottom,
        category: "patterns",
        tags: ["pattern", "reveal", "auto-hide"],
        appName: "Pulse — social feed",
        props: '"reveal-all" + "auto-hide"',
        tryHints: [
          "Scroll down — both bars clear the screen",
          "Scroll up — they return in sync",
        ],
      },
      {
        slug: "header-themes",
        title: "Header Themes",
        description:
          "Cycle the header through its light, primary, dark, and unstyled themes live.",
        icon: Palette,
        category: "patterns",
        tags: ["theme", "header", "variants"],
        appName: "Chroma — theme lab",
        props: 'theme="light | primary | dark | none"',
        tryHints: [
          "Cycle through all four header themes",
          "Watch text and borders adapt per theme",
        ],
      },
      {
        slug: "dark-mode",
        title: "Dark Mode",
        description:
          "Live theme switching with CSS custom properties across every shell component.",
        icon: Moon,
        category: "patterns",
        tags: ["dark-mode", "tokens", "css"],
        appName: "Nocturne — notes",
        props: ".dark class + tokens",
        tryHints: [
          "Flip the toggle in the header",
          "Every component re-themes instantly",
        ],
      },
    ],
  },
];

/** Standalone playground covering every prop combination. */
export const playground = {
  slug: "playground",
  title: "Playground",
  description:
    "Mix every header behavior, theme, speed, and footer variant live — and copy the code.",
  icon: SlidersHorizontal,
};

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

// Navigation structure for docs sidebar.
// Every href here MUST have a matching page under apps/docs/app.
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
      { title: "Overview", href: "/docs/components" },
      { title: "AppShell", href: "/docs/components/app-shell" },
      { title: "Header", href: "/docs/components/header" },
      { title: "HeaderNav", href: "/docs/components/header-nav" },
      { title: "Footer", href: "/docs/components/footer" },
      { title: "Content", href: "/docs/components/content" },
      { title: "Sidebar", href: "/docs/components/sidebar" },
      { title: "SafeArea", href: "/docs/components/safe-area" },
      { title: "ScrollNav", href: "/docs/components/scroll-nav" },
      { title: "SearchField", href: "/docs/components/search-field" },
      { title: "SearchModal", href: "/docs/components/search-modal" },
      { title: "UserMenu", href: "/docs/components/user-menu" },
      { title: "NotificationsMenu", href: "/docs/components/notifications-menu" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "Hooks", href: "/docs/hooks" },
      { title: "Motion", href: "/docs/motion" },
      { title: "Routing", href: "/docs/routing" },
    ],
  },
  {
    title: "Explore",
    items: [
      { title: "All Examples", href: "/examples" },
      { title: "Playground", href: "/playground" },
    ],
  },
];
