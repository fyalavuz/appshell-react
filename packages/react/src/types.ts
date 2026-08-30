import type { ReactNode } from "react";

export type ScrollDirection = "up" | "down" | null;

export type AnimationSpeed = "slow" | "normal" | "fast";

export type HeaderBehavior =
  | "static"
  | "fixed"
  | "sticky"
  | "reveal-all"
  | "reveal-nav"
  | "reveal-context"
  | "reveal-search"
  | "reveal-nav-context"
  | "reveal-nav-search"
  | "reveal-context-search";

export type HeaderTheme = "light" | "primary" | "dark" | "none";

export type FooterVariant = "tab-bar" | "floating" | "mini";

export type FooterBehavior = "static" | "auto-hide";

export type FooterPosition = "center" | "left" | "right";

export type SafeAreaEdge = "top" | "bottom" | "left" | "right";

export interface AppShellContextValue {
  headerVisible: boolean;
  footerVisible: boolean;
  scrollDirection: ScrollDirection;
  setHeaderVisible: (visible: boolean) => void;
  setFooterVisible: (visible: boolean) => void;
}

export interface HeaderProps {
  logo?: ReactNode;
  actions?: ReactNode;
  nav?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  searchContent?: ReactNode;
  theme?: HeaderTheme;
  behavior?: HeaderBehavior;
  speed?: AnimationSpeed;
  mobileMenu?: ReactNode;
  onVisibilityChange?: (visible: boolean) => void;
  forceSafeAreaTop?: boolean;
  className?: string;
}

export interface FooterProps {
  variant?: FooterVariant;
  behavior?: FooterBehavior;
  position?: FooterPosition;
  speed?: AnimationSpeed;
  className?: string;
  children: ReactNode;
}

export interface FooterItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  className?: string;
}

export interface SafeAreaProps {
  edges?: SafeAreaEdge[];
  className?: string;
  children: ReactNode;
}

export interface ContentProps {
  className?: string;
  children: ReactNode;
}

export interface AppShellProps {
  safeArea?: boolean;
  className?: string;
  children: ReactNode;
}

export type SidebarSide = "left" | "right";

export type SidebarVariant = "overlay" | "docked";

export type SidebarBreakpoint = "sm" | "md" | "lg" | "none";

interface SidebarBaseProps {
  side?: SidebarSide;
  /**
   * Pinned at the top of the panel, above the scrolling nav — the desktop
   * spot for a SearchField or a workspace switcher, filling the space a
   * docked sidebar usually leaves empty.
   */
  topContent?: ReactNode;
  /**
   * Pinned at the bottom of the panel, below the scrolling nav — the spot
   * for infrastructural actions that don't navigate: settings, about,
   * a theme toggle, a UserMenu.
   */
  bottomContent?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Modal drawer — the default variant and the library's original behavior. */
export interface SidebarOverlayProps extends SidebarBaseProps {
  variant?: "overlay";
  open: boolean;
  onClose: () => void;
}

/**
 * Persistent panel that lives in the shell layout. Sticky below the Header,
 * optionally collapsible to an icon rail, and automatically degrades to the
 * overlay drawer below the given breakpoint.
 */
export interface SidebarDockedProps extends SidebarBaseProps {
  variant: "docked";
  /** Drives the mobile drawer fallback below the breakpoint. Default false. */
  open?: boolean;
  onClose?: () => void;
  /** Render the built-in collapse-to-rail toggle. Default false. */
  collapsible?: boolean;
  /** Controlled collapse state. */
  collapsed?: boolean;
  /** Uncontrolled initial collapse state. Default false. */
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Below this viewport width the docked panel hides and the drawer takes over. Default "md". */
  breakpoint?: SidebarBreakpoint;
  /** Expanded width. Default "16rem". */
  width?: string;
  /** Collapsed rail width. Default "3.25rem". */
  railWidth?: string;
}

export type SidebarProps = SidebarOverlayProps | SidebarDockedProps;

export interface NavGroupProps {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}

export interface NavItemProps {
  href?: string;
  icon?: ReactNode;
  label: string;
  active?: boolean;
  badge?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface HeaderNavProps {
  className?: string;
  children: ReactNode;
}

export interface HeaderNavItemProps {
  label: string;
  href?: string;
  active?: boolean;
  className?: string;
  children?: ReactNode;
}

export type SearchFieldVariant = "pill" | "full";

export interface SearchFieldProps {
  /** "pill" (default): rounded inset field. "full": edge-to-edge flat field. */
  variant?: SearchFieldVariant;
  placeholder?: string;
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called with the current value when Enter is pressed. */
  onSubmit?: (value: string) => void;
  /** Focus/click passthroughs — wire these to open a SearchModal. */
  onFocus?: () => void;
  onClick?: () => void;
  /**
   * Keyboard-shortcut chip at the right edge of the field — "⌘K",
   * "Ctrl K". Hidden below the sm breakpoint; pair with useSearchShortcut.
   */
  shortcutHint?: ReactNode;
  /**
   * Pill only. Header-row insetting: horizontal padding plus a centered
   * max width on large screens. Set false when the pill lives somewhere
   * already padded — a Sidebar's topContent slot, a card. Default true.
   */
  inset?: boolean;
  className?: string;
  inputClassName?: string;
  "aria-label"?: string;
}

export interface SearchShortcutOptions {
  /** Letter combined with ⌘ (mac) or Ctrl. Default "k". */
  key?: string;
  /** Also trigger on a bare "/" pressed outside editable fields. Default false. */
  slash?: boolean;
  /** Set false to suspend the binding without unmounting. Default true. */
  enabled?: boolean;
}

export interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  /** Controlled query. Omit for uncontrolled. */
  query?: string;
  /**
   * Seeds the modal's input every time it opens — pass the text already
   * typed into a triggering SearchField to continue the search seamlessly.
   */
  defaultQuery?: string;
  onQueryChange?: (value: string) => void;
  /** Called with the current query when Enter is pressed. */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /**
   * Results area. Pass a render function to build results from the live
   * query, or plain nodes for static content (recents, suggestions).
   */
  children?: ReactNode | ((query: string) => ReactNode);
  /** Label of the dismiss button. Default "Cancel". */
  closeLabel?: string;
  /** Extra classes for the modal panel. */
  className?: string;
  /** Extra classes for the backdrop. */
  overlayClassName?: string;
  "aria-label"?: string;
}

export interface AvatarProps {
  /** Image URL. Falls back to initials while missing or on load error. */
  src?: string;
  alt?: string;
  /** Shown when no image renders — keep it to 1–2 characters. */
  initials?: string;
  /** Diameter as a CSS length. Default "2rem". */
  size?: string;
  className?: string;
}

export interface UserMenuProps {
  /** Display name, shown in the menu's info header. */
  username: string;
  /** Secondary line under the name — an email, role, or tenant. */
  detail?: string;
  /** Avatar image URL for the default trigger and the info header. */
  src?: string;
  /** Avatar initials fallback. */
  initials?: string;
  /** Replace the default avatar button entirely. */
  trigger?: ReactNode;
  /** Controlled open state. Omit for uncontrolled. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Horizontal alignment of the panel relative to the trigger. Default "end". */
  align?: "start" | "end";
  /** Menu content — UserMenuItem elements, separators, anything. */
  children?: ReactNode;
  /** Extra classes for the dropdown panel. */
  className?: string;
  /** Extra classes for the default trigger button. */
  triggerClassName?: string;
  "aria-label"?: string;
}

export interface UserMenuItemProps {
  icon?: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  /** Style as a destructive action — log out, delete account. */
  destructive?: boolean;
  className?: string;
}

export interface NotificationsMenuProps {
  /** Unread notifications shown as a badge on the bell. 0 hides the badge. */
  unreadCount?: number;
  /** Replace the default bell button content entirely. */
  trigger?: ReactNode;
  /** Controlled open state. Omit for uncontrolled. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Horizontal alignment of the panel relative to the trigger. Default "end". */
  align?: "start" | "end";
  /** Panel heading. Default "Notifications". */
  title?: ReactNode;
  /**
   * Rendered at the right of the heading — a "Mark all read" button, a
   * settings link. Clicks here keep the menu open (no role="menuitem").
   */
  action?: ReactNode;
  /** Pinned row under the list — a "View all notifications" link. */
  footer?: ReactNode;
  /** Shown instead of the built-in empty state when there are no items. */
  emptyState?: ReactNode;
  /** The list — NotificationItem elements, separators, anything. */
  children?: ReactNode;
  /** Extra classes for the dropdown panel. */
  className?: string;
  /** Extra classes for the default trigger button. */
  triggerClassName?: string;
  "aria-label"?: string;
}

export interface NotificationItemProps {
  /** Leading visual — an icon or a small Avatar. */
  icon?: ReactNode;
  /** Main line of the notification. */
  title: string;
  /** Secondary line — clamps to two lines. */
  description?: string;
  /** Short timestamp — "2m", "yesterday". */
  time?: string;
  /** Marks the item unread: bolder title plus a dot. */
  unread?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface ScrollNavProps {
  className?: string;
  children: ReactNode;
}

export interface ScrollNavItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}
