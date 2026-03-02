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

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
  side?: SidebarSide;
  className?: string;
  children: ReactNode;
}

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
