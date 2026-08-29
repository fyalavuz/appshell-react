export { AppShell } from "./AppShell";
export { Header } from "./Header";
export { Footer, FooterItem } from "./Footer";
export { SafeArea } from "./SafeArea";
export { Content } from "./Content";
export { AppShellProvider, useAppShell } from "./context";
export { HeaderProvider, useHeaderTheme } from "./HeaderContext";
export { useScrollDirection } from "./hooks/use-scroll-direction";
export { useSafeArea } from "./hooks/use-safe-area";
export { MotionProvider } from "./motion";
export { Sidebar } from "./Sidebar";
export { NavGroup } from "./NavGroup";
export { NavItem } from "./NavItem";
export { HeaderNav, HeaderNavItem } from "./HeaderNav";
export { ScrollNav, ScrollNavItem } from "./ScrollNav";
export { SearchField } from "./SearchField";
export { cn } from "./cn";

export type {
  HeaderBehavior,
  HeaderTheme,
  HeaderProps,
  AnimationSpeed,
  FooterVariant,
  FooterBehavior,
  FooterPosition,
  FooterProps,
  FooterItemProps,
  SafeAreaEdge,
  SafeAreaProps,
  ContentProps,
  AppShellProps,
  AppShellContextValue,
  ScrollDirection,
  SidebarSide,
  SidebarVariant,
  SidebarBreakpoint,
  SidebarProps,
  SidebarOverlayProps,
  SidebarDockedProps,
  NavGroupProps,
  NavItemProps,
  HeaderNavProps,
  HeaderNavItemProps,
  ScrollNavProps,
  ScrollNavItemProps,
  SearchFieldVariant,
  SearchFieldProps,
} from "./types";

export type { MotionAdapter } from "./motion";
