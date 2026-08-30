"use client";

import { createContext, useContext, type ElementType, type ReactNode } from "react";

/**
 * Router integration point — the piece that keeps the library modular
 * instead of hard-coding a routing solution.
 *
 * Every component that renders an `href` (NavItem, HeaderNavItem,
 * UserMenuItem) asks this context for the link component to render and
 * falls back to a plain <a>. Wrap your app once and all of them do
 * client-side navigation:
 *
 *   import Link from "next/link";
 *
 *   <LinkProvider component={Link}>
 *     <AppShell>…</AppShell>
 *   </LinkProvider>
 *
 * Any component accepting { href, className, children, onClick } works.
 * Routers whose link takes a different prop (React Router's `to`) plug in
 * through a one-line adapter:
 *
 *   const RouterLink = ({ href, ...rest }) => <Link to={href} {...rest} />;
 */
const LinkContext = createContext<ElementType>("a");

export interface LinkProviderProps {
  /** The component to render for href-based items, e.g. Next.js Link. */
  component: ElementType;
  children: ReactNode;
}

export function LinkProvider({ component, children }: LinkProviderProps) {
  return (
    <LinkContext.Provider value={component}>{children}</LinkContext.Provider>
  );
}

/** The active link component — a plain "a" unless a LinkProvider is above. */
export function useLinkComponent(): ElementType {
  return useContext(LinkContext);
}
