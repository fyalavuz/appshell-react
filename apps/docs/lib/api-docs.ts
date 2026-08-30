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
    { name: "href", type: "string", description: "Destination URL — rendered through the LinkProvider component (plain <a> by default)." },
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
    {
      name: "topContent",
      type: "ReactNode",
      description:
        "Pinned above the scrolling nav — a SearchField, a workspace switcher. Safe-area padded in the drawer.",
    },
    {
      name: "bottomContent",
      type: "ReactNode",
      description:
        "Pinned below the scrolling nav — settings, about, a theme toggle, a UserMenu.",
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
    {
      name: "topContent",
      type: "ReactNode",
      description:
        "Pinned above the scrolling nav in both the docked panel and the drawer fallback — the desktop home for a SearchField, filling the space a docked panel usually leaves empty.",
    },
    {
      name: "bottomContent",
      type: "ReactNode",
      description:
        "Pinned below the scrolling nav in both the docked panel and the drawer fallback — settings, about, a theme toggle, a UserMenu.",
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
    { name: "href", type: "string", description: "Renders as a link, through the LinkProvider component (plain <a> by default)." },
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
    "Pads its children by the device safe-area insets, read from the platform standard env(safe-area-inset-*) (viewport-fit=cover required). Mockups and tests can simulate insets via --appshell-safe-area-inset-* overrides.",
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

export const searchFieldApi: ApiDef = {
  component: "SearchField",
  description:
    "Ready-made search input for the Header's search row (usable anywhere). Adapts its surface to the active header theme.",
  props: [
    {
      name: "variant",
      type: '"pill" | "full"',
      default: '"pill"',
      description:
        '"pill" is the rounded inset field; "full" spans the row edge to edge as a flat bar.',
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Search"',
      description: "Placeholder and default accessible name.",
    },
    { name: "value", type: "string", description: "Controlled value." },
    {
      name: "defaultValue",
      type: "string",
      description: "Uncontrolled initial value.",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Fires on every keystroke with the new value.",
    },
    {
      name: "onSubmit",
      type: "(value: string) => void",
      description: "Fires with the current value when Enter is pressed.",
    },
    {
      name: "onClick",
      type: "() => void",
      description:
        "Click/tap passthrough — the natural place to open a SearchModal (a click, unlike focus, can't retrigger when the modal restores focus on close).",
    },
    {
      name: "onFocus",
      type: "() => void",
      description: "Focus passthrough on the input.",
    },
    {
      name: "shortcutHint",
      type: "ReactNode",
      description:
        'Keyboard-shortcut chip at the right edge — "⌘K", "Ctrl K". Hidden below the sm breakpoint; pair with useSearchShortcut.',
    },
    {
      name: "inset",
      type: "boolean",
      default: "true",
      description:
        "Pill only. Header-row insetting (padding + centered max width). Set false when the pill lives somewhere already padded — a Sidebar's topContent slot, a card.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes for the field surface.",
    },
    {
      name: "inputClassName",
      type: "string",
      description: "Extra classes for the inner input element.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible name override (defaults to the placeholder).",
    },
  ],
};

export const searchModalApi: ApiDef = {
  component: "SearchModal",
  description:
    "A full search experience in an overlay: sheet-style on phones, centered palette on larger screens. Owns its input; the results area is yours.",
  props: [
    {
      name: "open",
      type: "boolean",
      required: true,
      description: "Whether the modal is visible.",
    },
    {
      name: "onClose",
      type: "() => void",
      required: true,
      description: "Called on Escape, backdrop click, or the cancel button.",
    },
    {
      name: "query",
      type: "string",
      description: "Controlled query. Omit for uncontrolled.",
    },
    {
      name: "defaultQuery",
      type: "string",
      default: '""',
      description:
        "Seeds the input every time the modal opens — pass the text typed into a triggering SearchField to continue the search seamlessly.",
    },
    {
      name: "onQueryChange",
      type: "(value: string) => void",
      description: "Fires on every keystroke.",
    },
    {
      name: "onSubmit",
      type: "(value: string) => void",
      description: "Fires with the current query when Enter is pressed.",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Search"',
      description: "Input placeholder and default accessible name.",
    },
    {
      name: "children",
      type: "ReactNode | (query: string) => ReactNode",
      description:
        "Results area. A render function receives the live query; plain nodes work for static content (recents, suggestions).",
    },
    {
      name: "closeLabel",
      type: "string",
      default: '"Cancel"',
      description: "Label of the dismiss button.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes for the modal panel.",
    },
    {
      name: "overlayClassName",
      type: "string",
      description: "Extra classes for the backdrop.",
    },
  ],
};

export const avatarApi: ApiDef = {
  component: "Avatar",
  description:
    "A round identity mark: an image when one loads, initials otherwise.",
  props: [
    {
      name: "src",
      type: "string",
      description: "Image URL. Falls back to initials while missing or on load error.",
    },
    { name: "alt", type: "string", description: "Image alt text." },
    {
      name: "initials",
      type: "string",
      description: "Shown when no image renders — keep it to 1–2 characters.",
    },
    {
      name: "size",
      type: "string",
      default: '"2rem"',
      description: "Diameter as a CSS length.",
    },
    { name: "className", type: "string", description: "Extra classes." },
  ],
};

export const userMenuApi: ApiDef = {
  component: "UserMenu",
  description:
    "Avatar trigger + dropdown with the signed-in user's identity and account actions. Standalone; adapts to the Header theme when placed in one.",
  props: [
    {
      name: "username",
      type: "string",
      required: true,
      description: "Display name shown in the menu's info header.",
    },
    {
      name: "detail",
      type: "string",
      description: "Secondary line under the name — an email, role, or tenant.",
    },
    {
      name: "src",
      type: "string",
      description: "Avatar image URL for the trigger and info header.",
    },
    { name: "initials", type: "string", description: "Avatar initials fallback." },
    {
      name: "trigger",
      type: "ReactNode",
      description: "Replace the default avatar button entirely.",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state. Omit for uncontrolled.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Open-state change requests.",
    },
    {
      name: "align",
      type: '"start" | "end"',
      default: '"end"',
      description: "Horizontal alignment of the panel relative to the trigger.",
    },
    {
      name: "children",
      type: "ReactNode",
      description:
        "Menu content — UserMenuItem elements or anything else. Clicks on role=\"menuitem\" elements close the menu.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes for the dropdown panel.",
    },
    {
      name: "triggerClassName",
      type: "string",
      description: "Extra classes for the default trigger button.",
    },
  ],
};

export const userMenuItemApi: ApiDef = {
  component: "UserMenuItem",
  description: "One action row inside a UserMenu.",
  props: [
    { name: "label", type: "string", required: true, description: "Row text." },
    { name: "icon", type: "ReactNode", description: "Leading 16px icon." },
    {
      name: "href",
      type: "string",
      description: "Renders the row as a link (through the LinkProvider component) instead of a button.",
    },
    { name: "onClick", type: "() => void", description: "Action handler." },
    {
      name: "destructive",
      type: "boolean",
      default: "false",
      description: "Style as a destructive action — log out, delete account.",
    },
    { name: "className", type: "string", description: "Extra classes." },
  ],
};

export const notificationsMenuApi: ApiDef = {
  component: "NotificationsMenu",
  description:
    "Bell trigger + notification dropdown for the header corner. Standalone like UserMenu — and built to coexist with it: opening one closes the other.",
  props: [
    {
      name: "unreadCount",
      type: "number",
      default: "0",
      description:
        "Unread notifications shown as a badge on the bell (caps at 99+). 0 hides the badge.",
    },
    {
      name: "trigger",
      type: "ReactNode",
      description: "Replace the default bell button content entirely.",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state. Omit for uncontrolled.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Open-state change requests.",
    },
    {
      name: "align",
      type: '"start" | "end"',
      default: '"end"',
      description: "Horizontal alignment of the panel relative to the trigger.",
    },
    {
      name: "title",
      type: "ReactNode",
      default: '"Notifications"',
      description: "Panel heading.",
    },
    {
      name: "action",
      type: "ReactNode",
      description:
        "Rendered at the right of the heading — a \"Mark all read\" button. Clicks here keep the menu open.",
    },
    {
      name: "footer",
      type: "ReactNode",
      description: "Pinned row under the list — a \"View all notifications\" link.",
    },
    {
      name: "emptyState",
      type: "ReactNode",
      description: "Shown instead of the built-in empty state when there are no items.",
    },
    {
      name: "children",
      type: "ReactNode",
      description:
        "The list — NotificationItem elements or anything else. Clicks on role=\"menuitem\" elements close the menu.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes for the dropdown panel.",
    },
    {
      name: "triggerClassName",
      type: "string",
      description: "Extra classes for the default trigger button.",
    },
  ],
};

export const notificationItemApi: ApiDef = {
  component: "NotificationItem",
  description: "One notification row inside a NotificationsMenu.",
  props: [
    { name: "title", type: "string", required: true, description: "Main line." },
    {
      name: "description",
      type: "string",
      description: "Secondary line — clamps to two lines.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Leading visual — a 16px icon or a small Avatar.",
    },
    {
      name: "time",
      type: "string",
      description: 'Short timestamp — "2m", "yesterday".',
    },
    {
      name: "unread",
      type: "boolean",
      default: "false",
      description: "Marks the row unread: bolder title plus a dot.",
    },
    {
      name: "href",
      type: "string",
      description: "Renders the row as a link (through the LinkProvider component) instead of a button.",
    },
    { name: "onClick", type: "() => void", description: "Action handler." },
    { name: "className", type: "string", description: "Extra classes." },
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
      "Current safe-area inset values in pixels, resolved from env(safe-area-inset-*) (or a simulated --appshell-safe-area-inset-* override).",
  },
  {
    name: "useHeaderTheme",
    signature: 'useHeaderTheme(): "light" | "primary" | "dark" | "none"',
    description:
      "The active Header theme, for custom components rendered inside header rows that need to adapt their colors.",
  },
  {
    name: "useSearchShortcut",
    signature:
      "useSearchShortcut(onTrigger, { key = 'k', slash = false, enabled = true }?)",
    description:
      "Binds the desktop search shortcut — ⌘K on macOS, Ctrl+K elsewhere — to a handler, typically opening a SearchModal. Opt into a bare “/” trigger (ignored while typing) with slash: true.",
  },
];

export const bottomSheetApi: ApiDef = {
  component: "BottomSheet",
  description:
    "A draggable bottom sheet with snap points — content layered over a map, a player, or a feed. CSS-transform motion, portaled, SSR-safe.",
  props: [
    {
      name: "open",
      type: "boolean",
      required: true,
      description: "Whether the sheet is visible.",
    },
    {
      name: "onClose",
      type: "() => void",
      required: true,
      description:
        "Called on Escape / backdrop tap (modal) and when dragged below the lowest snap.",
    },
    {
      name: "snapPoints",
      type: "number[]",
      default: "[0.45, 0.9]",
      description:
        "Resting heights as viewport fractions, ascending. Dragging moves between them.",
    },
    {
      name: "defaultSnap",
      type: "number",
      default: "0",
      description: "Index into snapPoints the sheet opens at.",
    },
    {
      name: "onSnapChange",
      type: "(index: number) => void",
      description: "Fires when a drag settles on a different snap point.",
    },
    {
      name: "modal",
      type: "boolean",
      default: "true",
      description:
        "Modal: backdrop, scroll lock, Escape, focus trap. false keeps the page behind interactive — the map pattern.",
    },
    { name: "className", type: "string", description: "Extra classes for the panel." },
    {
      name: "aria-label",
      type: "string",
      default: '"Sheet"',
      description: "Accessible dialog name.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Sheet content — scrolls internally below the grabber.",
    },
  ],
};

export const tabsApi: ApiDef = {
  component: "Tabs",
  description:
    "A tab row that docks below a pinned Header via --header-height. tablist semantics with ArrowLeft/ArrowRight roving focus.",
  props: [
    { name: "value", type: "string", description: "Controlled selected value." },
    {
      name: "defaultValue",
      type: "string",
      description: "Uncontrolled initial value. Defaults to the first Tab.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Selection handler.",
    },
    {
      name: "sticky",
      type: "boolean",
      default: "true",
      description:
        "Dock below the Header via --header-height. false renders an inline row.",
    },
    { name: "className", type: "string", description: "Extra classes for the row." },
    {
      name: "aria-label",
      type: "string",
      default: '"Tabs"',
      description: "Accessible tablist name.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Tab elements.",
    },
  ],
};

export const tabApi: ApiDef = {
  component: "Tab",
  description: "One tab inside a <Tabs> row.",
  props: [
    {
      name: "value",
      type: "string",
      required: true,
      description: "Identifies this tab in value/onValueChange.",
    },
    { name: "label", type: "string", required: true, description: "Tab text." },
    { name: "badge", type: "ReactNode", description: "Trailing count or dot." },
    { name: "className", type: "string", description: "Extra classes." },
  ],
};

export const breadcrumbsApi: ApiDef = {
  component: "BreadcrumbItem",
  description:
    "One crumb inside a <Breadcrumbs> trail. Separators between crumbs are automatic.",
  props: [
    { name: "label", type: "string", required: true, description: "Crumb text." },
    {
      name: "href",
      type: "string",
      description:
        "Renders as a link, through the LinkProvider component (plain <a> by default).",
    },
    {
      name: "current",
      type: "boolean",
      default: "false",
      description: "Marks the current page: aria-current, no link styling.",
    },
    { name: "onClick", type: "() => void", description: "Click handler (renders a button when no href)." },
    { name: "className", type: "string", description: "Extra classes." },
  ],
};

export const contentHeaderApi: ApiDef = {
  component: "ContentHeader",
  description:
    "The heading block of a screen: optional breadcrumb trail, title with supporting line, right-aligned actions.",
  props: [
    { name: "title", type: "ReactNode", required: true, description: "Screen title." },
    { name: "subtitle", type: "ReactNode", description: "Supporting line under the title." },
    {
      name: "breadcrumbs",
      type: "ReactNode",
      description: "Typically a <Breadcrumbs> — rendered above the title.",
    },
    {
      name: "actions",
      type: "ReactNode",
      description: "Right-aligned controls — buttons, menus.",
    },
    { name: "className", type: "string", description: "Extra classes." },
  ],
};
