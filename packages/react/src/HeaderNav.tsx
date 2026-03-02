"use client";

import { memo, useState, useRef, useEffect, useCallback } from "react";
import { cn } from "./cn";
import { useHeaderTheme } from "./HeaderContext";
import type { HeaderNavProps, HeaderNavItemProps } from "./types";

export const HeaderNav = memo(function HeaderNav({
  className,
  children,
}: HeaderNavProps) {
  return (
    <nav className={cn("flex items-center gap-1", className)}>{children}</nav>
  );
});

export const HeaderNavItem = memo(function HeaderNavItem({
  label,
  href,
  active = false,
  className,
  children,
}: HeaderNavItemProps) {
  const theme = useHeaderTheme();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasDropdown = children != null;

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!hasDropdown) return;
    clearCloseTimer();
    setOpen(true);
  }, [hasDropdown, clearCloseTimer]);

  const handleMouseLeave = useCallback(() => {
    if (!hasDropdown) return;
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  }, [hasDropdown]);

  const handleClick = useCallback(() => {
    if (!hasDropdown) return;
    setOpen((prev) => !prev);
  }, [hasDropdown]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  const isActive = active || open;

  const getThemeClasses = () => {
    if (theme === "primary") {
      return isActive
        ? "bg-primary-foreground/20 text-primary-foreground"
        : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground";
    }
    if (theme === "dark") {
      return isActive
        ? "bg-primary-foreground/10 text-primary-foreground"
        : "text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground";
    }
    // light (default)
    return isActive
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground";
  };

  const baseClasses = cn(
    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    getThemeClasses(),
    className
  );

  const commonProps = {
    className: baseClasses,
    "aria-current": active ? ("page" as const) : undefined,
    "data-active": active || undefined,
    "data-state": open ? ("open" as const) : ("closed" as const),
  };

  // Simple item without dropdown
  if (!hasDropdown) {
    if (href) {
      return (
        <a href={href} {...commonProps}>
          {label}
        </a>
      );
    }

    return (
      <button type="button" {...commonProps}>
        {label}
      </button>
    );
  }

  // Item with dropdown
  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        {...commonProps}
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180"
          )}
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
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 mt-1 min-w-48 rounded-lg border border-border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95 duration-200"
        >
          {children}
        </div>
      )}
    </div>
  );
});
