"use client";

/**
 * Every user-facing string the library renders on its own — the ones you
 * cannot pass as children. Each is optional to override; unspecified keys
 * keep their English default.
 *
 * Values are plain strings rather than functions so a dictionary can be
 * built in a server component (next-intl's `getTranslations()`, Paraglide's
 * compiled messages) and handed to the client provider. Interpolation uses
 * `{token}` placeholders, substituted at render.
 */
export interface AppShellLabels {
  /** Sidebar drawer landmark. */
  navigationMenu: string;
  expandSidebar: string;
  collapseSidebar: string;
  /** Header's mobile menu toggle, closed and open. */
  openMenu: string;
  closeMenu: string;
  userMenu: string;
  notifications: string;
  /** Accessible name of the bell. Tokens: {count}. */
  notificationsUnread: string;
  breadcrumb: string;
  /** Accessible name of the Header's own navigation. */
  mainNavigation: string;
  /** The skip link AppShell renders above everything else. */
  skipToContent: string;
  search: string;
  cancel: string;
  tabs: string;
  sheet: string;
  avatar: string;
  /** Badge count past the cap. Tokens: {max}. */
  badgeOverflow: string;
}

export const defaultLabels: AppShellLabels = {
  navigationMenu: "Navigation menu",
  expandSidebar: "Expand sidebar",
  collapseSidebar: "Collapse sidebar",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  userMenu: "User menu",
  notifications: "Notifications",
  notificationsUnread: "Notifications ({count} unread)",
  breadcrumb: "Breadcrumb",
  mainNavigation: "Main",
  skipToContent: "Skip to content",
  search: "Search",
  cancel: "Cancel",
  tabs: "Tabs",
  sheet: "Sheet",
  avatar: "Avatar",
  badgeOverflow: "{max}+",
};

export type AppShellLabelKey = keyof AppShellLabels;

/** What a consumer passes: any subset. */
export type AppShellLabelsInput = Partial<AppShellLabels>;

export type LabelVariables = Record<string, string | number>;

/** Replaces every {token} that has a matching variable. */
export function interpolate(template: string, vars?: LabelVariables): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  );
}
