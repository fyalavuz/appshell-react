"use client";

import { memo } from "react";
import { cn } from "./cn";
import { useLinkComponent } from "./LinkContext";
import type { NavItemProps } from "./types";

export const NavItem = memo(function NavItem({
  href,
  icon,
  label,
  active = false,
  badge,
  onClick,
  className,
}: NavItemProps) {
  const LinkComp = useLinkComponent();
  const classes = cn(
    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    "group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:px-2",
    active
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    className
  );

  const content = (
    <>
      {icon && <span className="shrink-0 opacity-70 group-data-[active=true]:opacity-100 transition-opacity">{icon}</span>}
      <span className="flex-1 truncate text-left group-data-[collapsed=true]/sidebar:hidden">{label}</span>
      {badge && <span className="shrink-0 ml-auto group-data-[collapsed=true]/sidebar:hidden">{badge}</span>}
    </>
  );

  const commonProps = {
    className: classes,
    onClick,
    title: label,
    "data-active": active || undefined,
  };

  if (href) {
    return (
      <LinkComp href={href} {...commonProps}>
        {content}
      </LinkComp>
    );
  }

  return (
    <button type="button" {...commonProps}>
      {content}
    </button>
  );
});
