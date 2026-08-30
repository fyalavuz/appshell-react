"use client";

import { memo, useState } from "react";
import { cn } from "./cn";
import type { NavGroupProps } from "./types";

const ChevronIcon = () => (
  <svg
    className="size-4"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export const NavGroup = memo(function NavGroup({
  title,
  icon,
  defaultOpen = false,
  className,
  children,
}: NavGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors group-data-[collapsed=true]/sidebar:hidden"
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1 text-start">{title}</span>
        <span
          className={cn(
            "shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        >
          <ChevronIcon />
        </span>
      </button>

      <div
        className={cn(
          "transition-[max-height] duration-200 ease-out overflow-hidden",
          "group-data-[collapsed=true]/sidebar:max-h-none group-data-[collapsed=true]/sidebar:overflow-visible",
          open ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div className="ps-4 py-1 group-data-[collapsed=true]/sidebar:ps-0">{children}</div>
      </div>
    </div>
  );
});
