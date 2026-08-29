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
  className?: string;
  inputClassName?: string;
  "aria-label"?: string;
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
