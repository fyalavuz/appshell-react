/**
 * Single source of truth for every prop table on the docs site.
 * Verified against packages/react/src/types.ts and component sources —
 * update BOTH when the library API changes.
 */

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface ApiDef {
  component: string;
  description: string;
  props: PropDef[];
}

export const appShellApi: ApiDef = {
  component: "AppShell",
  description:
    "Root wrapper. Provides the shell context, optionally applies safe-area padding, and hoists Header and docked Sidebar children into the layout.",
  props: [
    {
      name: "safeArea",
      type: "boolean",
      default: "false",
      description:
        "Pad the shell for device safe areas (notch, home indicator). Static headers stay inside the padded scroll container; pinned headers manage their own top inset.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes for the root element.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description:
        "Shell regions. A direct Header child and any direct <Sidebar variant=\"docked\"> children are detected by type and placed automatically; everything else flows into the content column.",
    },
  ],
};

export const headerApi: ApiDef = {
  component: "Header",
  description:
    "Scroll-aware header composed of up to four rows: nav (logo + links + actions), context (title/subtitle), search, and the mobile menu panel.",
  props: [
    {
      name: "behavior",
      type: "HeaderBehavior",
      default: '"fixed"',
      description:
        '"static" | "fixed" | "sticky" | "reveal-all" | "reveal-nav" | "reveal-context" | "reveal-search" | "reveal-nav-context" | "reveal-nav-search" | "reveal-context-search".',
    },
    {
      name: "theme",
      type: '"light" | "primary" | "dark" | "none"',
      default: '"light"',
      description:
        'Visual theme for all rows. "none" ships zero styles — bring your own via className.',
    },
    {
      name: "speed",
      type: '"slow" | "normal" | "fast"',
      default: '"normal"',
      description: "Duration preset for reveal and menu animations.",
    },
    {
      name: "logo",
      type: "ReactNode",
      description: "Brand element on the left of the nav row.",
    },
    {
      name: "nav",
      type: "ReactNode",
      description:
        "Navigation links (typically <HeaderNav>). Hidden below md, where the hamburger + mobileMenu take over.",
    },
    {
      name: "actions",
      type: "ReactNode",
      description: "Right-aligned controls on the nav row.",
    },
    {
      name: "title",
      type: "ReactNode",
      description: "Context row heading.",
    },
    {
      name: "subtitle",
      type: "ReactNode",
      description: "Context row supporting line.",
    },
    {
      name: "searchContent",
      type: "ReactNode",
      description: "Search row content — an input, filters, or a <ScrollNav>.",
    },
    {
      name: "mobileMenu",
      type: "ReactNode",
      description:
        "Content for the animated mobile menu panel. Providing it renders the hamburger button below md.",
    },
    {
      name: "onVisibilityChange",
      type: "(visible: boolean) => void",
      description: "Fires when a reveal behavior shows or hides the overlay.",
    },
    {
      name: "forceSafeAreaTop",
      type: "boolean",
      default: "false",
      description:
        "Keep the top safe-area padding on non-pinned behaviors. AppShell sets this automatically for pinned headers.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes for the header wrapper.",
    },
  ],
};

export const headerNavApi: ApiDef = {
  component: "HeaderNavItem",
  description:
    "A link inside <HeaderNav>. Pass children to turn it into a dropdown: the panel opens on hover or click and closes on Escape or an outside click.",
  props: [
    {
      name: "label",
      type: "string",
      required: true,
      description: "Link text.",
    },
    { name: "href", type: "string", description: "Destination URL." },
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Highlight as the current section.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Dropdown panel content. Presence enables the dropdown.",
    },
    { name: "className", type: "string", description: "Extra classes." },
  ],
};

export const footerApi: ApiDef = {
  component: "Footer",
  description:
    "Bottom bar in three shapes: a tab bar, a floating slot for pills and FABs, or a slim mini bar.",
  props: [
    {
      name: "variant",
      type: '"tab-bar" | "floating" | "mini"',
      default: '"tab-bar"',
      description: "Which footer shape to render.",
    },
    {
      name: "behavior",
      type: '"static" | "auto-hide"',
      default: '"static"',
      description:
        '"auto-hide" slips the footer away on scroll down and returns it on scroll up.',
    },
    {
      name: "position",
      type: '"center" | "left" | "right"',
      default: '"center"',
      description: "Horizontal docking for the floating variant.",
    },
    {
      name: "speed",
      type: '"slow" | "normal" | "fast"',
      default: '"normal"',
      description: "Duration preset for hide/show animations.",
    },
    { name: "className", type: "string", description: "Extra classes." },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "FooterItems for the tab bar, or arbitrary content otherwise.",
    },
  ],
};

export const footerItemApi: ApiDef = {
  component: "FooterItem",
  description: "One tab inside a tab-bar footer.",
  props: [
    { name: "icon", type: "ReactNode", required: true, description: "Tab icon." },
    { name: "label", type: "string", required: true, description: "Tab label." },
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Highlight as the current tab.",
    },
    {
      name: "badge",
      type: "number",
      description: "Count bubble. Values over 99 render as “99+”.",
    },
    { name: "onClick", type: "() => void", description: "Tap handler." },
    { name: "className", type: "string", description: "Extra classes." },
  ],
};

export const contentApi: ApiDef = {
  component: "Content",
  description:
    "The main content region — a semantic <main> that fills the remaining shell space. Add your own padding to clear fixed footers (e.g. pb-24 for a tab bar).",
  props: [
    { name: "className", type: "string", description: "Extra classes." },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Page content.",
    },
  ],
};

export const sidebarOverlayApi: ApiDef = {
  component: "Sidebar (overlay)",
  description:
    "The default variant: a modal drawer with a backdrop, Escape-to-close, and body scroll locking.",
  props: [
    {
      name: "open",
      type: "boolean",
      required: true,
      description: "Whether the drawer is visible.",
    },
    {
      name: "onClose",
      type: "() => void",
      required: true,
      description: "Called on backdrop click or Escape.",
    },
    {
      name: "side",
      type: '"left" | "right"',
      default: '"left"',
      description: "Which edge the drawer slides from.",
    },
    { name: "className", type: "string", description: "Extra classes for the panel." },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Drawer content — typically NavGroups and NavItems.",
    },
  ],
};

export const sidebarDockedApi: ApiDef = {
  component: 'Sidebar (variant="docked")',
  description:
    "A persistent panel that sticks below the Header, collapses to an icon rail, and degrades to the overlay drawer below a breakpoint. As a direct child of AppShell it is placed into a two-column layout automatically.",
  props: [
    {
      name: "variant",
      type: '"docked"',
      required: true,
      description: "Selects the docked presentation.",
    },
    {
      name: "breakpoint",
      type: '"sm" | "md" | "lg" | "none"',
      default: '"md"',
      description:
        'Below this viewport width the panel hides and open/onClose drive the overlay drawer instead. "none" keeps it docked everywhere and renders no drawer.',
    },
    {
      name: "collapsible",
      type: "boolean",
      default: "false",
      description: "Render the built-in collapse-to-rail toggle.",
    },
    {
      name: "collapsed",
      type: "boolean",
      description: "Controlled collapse state.",
    },
    {
      name: "defaultCollapsed",
      type: "boolean",
      default: "false",
      description: "Uncontrolled initial collapse state.",
    },
    {
      name: "onCollapsedChange",
      type: "(collapsed: boolean) => void",
      description: "Fires when the toggle flips the collapse state.",
    },
    {
      name: "width",
      type: "string",
      default: '"16rem"',
      description: "Expanded panel width.",
    },
    {
      name: "railWidth",
      type: "string",
      default: '"3.25rem"',
      description: "Collapsed rail width.",
    },
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Drives the mobile drawer fallback below the breakpoint.",
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Closes the mobile drawer fallback.",
    },
    {
      name: "side",
      type: '"left" | "right"',
      default: '"left"',
      description: "Which side of the content the panel docks to.",
    },
    { name: "className", type: "string", description: "Extra classes for the panel." },
  ],
};

export const navGroupApi: ApiDef = {
  component: "NavGroup",
  description:
    "Collapsible section inside a Sidebar. In a collapsed rail the header row hides and items render flat.",
  props: [
    { name: "title", type: "string", required: true, description: "Section heading." },
    { name: "icon", type: "ReactNode", description: "Heading icon." },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Start expanded.",
    },
    { name: "className", type: "string", description: "Extra classes." },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "NavItems.",
    },
  ],
};

export const navItemApi: ApiDef = {
  component: "NavItem",
  description:
    "A navigation row. Renders an anchor when href is set, otherwise a button. In a collapsed rail only the icon shows; the label becomes a tooltip.",
  props: [
    { name: "label", type: "string", required: true, description: "Row text (and rail tooltip)." },
    { name: "icon", type: "ReactNode", description: "Leading icon." },
    { name: "href", type: "string", description: "Renders as a link." },
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Highlight as the current page.",
    },
    { name: "badge", type: "ReactNode", description: "Trailing badge content." },
    { name: "onClick", type: "() => void", description: "Click handler." },
    { name: "className", type: "string", description: "Extra classes." },
  ],
};

export const safeAreaApi: ApiDef = {
  component: "SafeArea",
  description:
    "Pads its children by the device safe-area insets. Reads --sa-top/--sa-bottom/--sa-left/--sa-right with env(safe-area-inset-*) fallbacks, so mockups and tests can inject insets.",
  props: [
    {
      name: "edges",
      type: '("top" | "bottom" | "left" | "right")[]',
      default: '["top", "bottom", "left", "right"]',
      description: "Which edges to pad.",
    },
    { name: "className", type: "string", description: "Extra classes." },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Padded content.",
    },
  ],
};

export const scrollNavApi: ApiDef = {
  component: "ScrollNavItem",
  description: "One pill inside a horizontally scrollable <ScrollNav>.",
  props: [
    { name: "label", type: "string", required: true, description: "Pill text." },
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Highlight as the selected filter.",
    },
    { name: "onClick", type: "() => void", description: "Selection handler." },
    { name: "className", type: "string", description: "Extra classes." },
  ],
};

export const hooksApi: {
  name: string;
  signature: string;
  description: string;
}[] = [
  {
    name: "useAppShell",
    signature:
      "useAppShell(): { headerVisible, footerVisible, scrollDirection, setHeaderVisible, setFooterVisible }",
    description:
      "Shell context. scrollDirection is “up”, “down”, or null before the first scroll. Must be used inside <AppShell> (or <AppShellProvider>).",
  },
  {
    name: "useScrollDirection",
    signature: 'useScrollDirection(threshold = 10): "up" | "down" | null',
    description:
      "Window scroll direction with a movement threshold in pixels. Powers reveal headers and auto-hide footers; use it for your own scroll-aware UI.",
  },
  {
    name: "useSafeArea",
    signature: "useSafeArea(edges?): { top, bottom, left, right }",
    description:
      "Current safe-area inset values in pixels, resolved from the --sa-* variables or env().",
  },
  {
    name: "useHeaderTheme",
    signature: 'useHeaderTheme(): "light" | "primary" | "dark" | "none"',
    description:
      "The active Header theme, for custom components rendered inside header rows that need to adapt their colors.",
  },
];
