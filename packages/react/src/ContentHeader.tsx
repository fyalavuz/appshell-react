"use client";

import { Children, Fragment, memo } from "react";
import { cn } from "./cn";
import { useLabel } from "./I18nContext";
import { useLinkComponent } from "./LinkContext";
import type {
  BreadcrumbItemProps,
  BreadcrumbsProps,
  ContentHeaderProps,
} from "./types";

const Chevron = () => (
  <svg
    className="size-3.5 shrink-0 text-muted-foreground/50"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/**
 * A breadcrumb trail. Separators are inserted automatically; items with
 * an href render through the LinkProvider component, so trails navigate
 * client-side in routed apps.
 */
export const Breadcrumbs = memo(function Breadcrumbs({
  className,
  children,
  "aria-label": ariaLabel,
}: BreadcrumbsProps) {
  const items = Children.toArray(children);
  const label = useLabel("breadcrumb", undefined, ariaLabel);

  return (
    <nav aria-label={label} className={cn("min-w-0", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <li aria-hidden className="flex items-center">
                <Chevron />
              </li>
            )}
            <li className="flex min-w-0 items-center">{item}</li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
});

Breadcrumbs.displayName = "Breadcrumbs";

export const BreadcrumbItem = memo(function BreadcrumbItem({
  label,
  href,
  current = false,
  onClick,
  className,
}: BreadcrumbItemProps) {
  const LinkComp = useLinkComponent();

  if (current) {
    return (
      <span
        aria-current="page"
        className={cn("truncate font-medium text-foreground", className)}
      >
        {label}
      </span>
    );
  }

  const classes = cn(
    "truncate text-muted-foreground outline-none transition-colors hover:text-foreground",
    "focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring",
    className
  );

  if (href) {
    return (
      // eslint-disable-next-line react-hooks/static-components -- stable component from context, not created during render
      <LinkComp href={href} onClick={onClick} className={classes}>
        {label}
      </LinkComp>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {label}
      </button>
    );
  }

  return <span className={cn("truncate text-muted-foreground", className)}>{label}</span>;
});

BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * The heading block of a screen: an optional breadcrumb trail, a title
 * with supporting line, and right-aligned actions — the "content header"
 * industrial design systems place at the top of every workspace page.
 */
export const ContentHeader = memo(function ContentHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}: ContentHeaderProps) {
  return (
    <header data-content-header className={cn("px-4 pb-4 pt-5", className)}>
      {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  );
});

ContentHeader.displayName = "ContentHeader";
