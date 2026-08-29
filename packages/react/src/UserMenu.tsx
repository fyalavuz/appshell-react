"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./cn";
import { Avatar } from "./Avatar";
import { useHeaderTheme } from "./HeaderContext";
import type { UserMenuItemProps, UserMenuProps } from "./types";

const subscribeNever = () => () => {};

/**
 * The signed-in user's menu: an avatar trigger opening a dropdown with the
 * user's identity and account actions — the pattern industrial design
 * systems put in the top-right corner of every application header.
 *
 * The panel renders through a portal positioned against the trigger, so it
 * can never be painted under sibling header rows or clipped by overflow.
 *
 * Standalone and replaceable by design: it needs no Header (the trigger
 * adapts when one is around), the trigger can be swapped via `trigger`,
 * and the panel content is plain children.
 */
export const UserMenu = memo(function UserMenu({
  username,
  detail,
  src,
  initials,
  trigger,
  open: controlledOpen,
  onOpenChange,
  align = "end",
  children,
  className,
  triggerClassName,
  "aria-label": ariaLabel,
}: UserMenuProps) {
  const theme = useHeaderTheme();
  const onDark = theme === "primary" || theme === "dark";

  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Portals need a document — skip the panel during SSR.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  // Anchor the fixed panel to the trigger, imperatively — the panel is a
  // portal, so React state isn't needed and no re-render happens on scroll.
  const placePanel = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    const el = panelRef.current;
    if (!rect || !el) return;
    el.style.top = `${rect.bottom + 8}px`;
    if (align === "end") {
      el.style.right = `${Math.max(8, window.innerWidth - rect.right)}px`;
      el.style.left = "auto";
    } else {
      el.style.left = `${Math.max(8, rect.left)}px`;
      el.style.right = "auto";
    }
  }, [align]);

  const panelCallbackRef = useCallback(
    (el: HTMLDivElement | null) => {
      panelRef.current = el;
      if (el) placePanel();
    },
    [placePanel]
  );

  // Follow the trigger on resize and scroll while open.
  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", placePanel);
    window.addEventListener("scroll", placePanel, true);
    return () => {
      window.removeEventListener("resize", placePanel);
      window.removeEventListener("scroll", placePanel, true);
    };
  }, [open, placePanel]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Close on outside click — outside both the trigger and the panel.
  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // A click on any menu item closes the menu — including custom items,
  // as long as they carry role="menuitem".
  const handlePanelClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[role="menuitem"]')) {
      setOpen(false);
    }
  };

  const defaultTrigger = (
    <Avatar src={src} initials={initials} className="pointer-events-none" />
  );

  const panel = open && mounted && (
    <div
      ref={panelCallbackRef}
      role="menu"
      aria-label={ariaLabel ?? "User menu"}
      onClick={handlePanelClick}
      className={cn(
        "fixed z-[75] min-w-56 rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        "animate-in fade-in zoom-in-95 duration-200",
        className
      )}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        <Avatar src={src} initials={initials} size="2.25rem" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{username}</p>
          {detail && (
            <p className="truncate text-xs text-muted-foreground">{detail}</p>
          )}
        </div>
      </div>
      <div role="none" className="mx-1 my-1 h-px bg-border" />
      {children}
    </div>
  );

  return (
    <div data-user-menu className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel ?? "User menu"}
        className={cn(
          "flex items-center justify-center rounded-full outline-none transition-shadow",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          onDark
            ? "focus-visible:ring-offset-transparent hover:ring-2 hover:ring-white/30"
            : "hover:ring-2 hover:ring-border",
          triggerClassName
        )}
      >
        {trigger ?? defaultTrigger}
      </button>

      {panel && createPortal(panel, document.body)}
    </div>
  );
});

UserMenu.displayName = "UserMenu";

export const UserMenuItem = memo(function UserMenuItem({
  icon,
  label,
  href,
  onClick,
  destructive = false,
  className,
}: UserMenuItemProps) {
  const classes = cn(
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors",
    destructive
      ? "text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10"
      : "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent",
    className
  );

  const content: ReactNode = (
    <>
      {icon && (
        <span aria-hidden className="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
          {icon}
        </span>
      )}
      <span className="truncate">{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} role="menuitem" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" role="menuitem" onClick={onClick} className={classes}>
      {content}
    </button>
  );
});

UserMenuItem.displayName = "UserMenuItem";
