"use client";

import {
  Children,
  memo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./cn";
import { useHeaderTheme } from "./HeaderContext";
import { useAnchoredPanel } from "./menu-popover";
import type { NotificationItemProps, NotificationsMenuProps } from "./types";

const BellIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

/**
 * The app's notification center: a bell trigger with an unread badge that
 * opens a dropdown of recent notifications — the companion to UserMenu in
 * the header's actions corner.
 *
 * Standalone like UserMenu, and built to coexist with it: each keeps its
 * own trigger, the shared anchoring keeps the panel on-screen (it opens
 * upward from a Sidebar's bottom slot), and opening one menu closes the
 * other instead of stacking panels.
 */
export const NotificationsMenu = memo(function NotificationsMenu({
  unreadCount = 0,
  trigger,
  open: controlledOpen,
  onOpenChange,
  align = "end",
  title = "Notifications",
  action,
  footer,
  emptyState,
  children,
  className,
  triggerClassName,
  "aria-label": ariaLabel,
}: NotificationsMenuProps) {
  const theme = useHeaderTheme();
  const onDark = theme === "primary" || theme === "dark";

  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const { mounted, triggerRef, panelCallbackRef, zIndex } = useAnchoredPanel({
    open,
    onClose: () => setOpen(false),
    align,
  });

  // Clicking a notification closes the menu; header/footer actions without
  // role="menuitem" (mark all read, filters) keep it open.
  const handlePanelClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[role="menuitem"]')) {
      setOpen(false);
    }
  };

  const label =
    ariaLabel ??
    (unreadCount > 0
      ? `Notifications (${unreadCount} unread)`
      : "Notifications");

  const hasItems = Children.count(children) > 0;

  const defaultTrigger = (
    <span className="relative flex size-9 items-center justify-center">
      <BellIcon className="size-5" />
      {unreadCount > 0 && (
        <span
          aria-hidden
          className="absolute end-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </span>
  );

  const panel = open && mounted && (
    <div
      ref={panelCallbackRef}
      role="menu"
      aria-label={label}
      onClick={handlePanelClick}
      className={cn(
        "fixed flex w-80 max-w-[calc(100vw-1rem)] flex-col rounded-xl border border-border bg-popover text-popover-foreground shadow-lg",
        "animate-in fade-in zoom-in-95 duration-200",
        className
      )}
      style={{ zIndex }}
    >
      <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-3">
        <p className="text-sm font-semibold">{title}</p>
        {action}
      </div>
      <div role="none" className="mx-1 h-px bg-border" />
      <div className="max-h-80 min-h-0 overflow-y-auto p-1">
        {hasItems
          ? children
          : (emptyState ?? (
              <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                <BellIcon className="size-5 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  You&rsquo;re all caught up.
                </p>
              </div>
            ))}
      </div>
      {footer && (
        <div className="border-t border-border p-1">{footer}</div>
      )}
    </div>
  );

  return (
    <div data-notifications-menu className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
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

NotificationsMenu.displayName = "NotificationsMenu";

export const NotificationItem = memo(function NotificationItem({
  icon,
  title,
  description,
  time,
  unread = false,
  href,
  onClick,
  className,
}: NotificationItemProps) {
  const classes = cn(
    "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-start outline-none transition-colors",
    "hover:bg-accent focus-visible:bg-accent",
    className
  );

  const content: ReactNode = (
    <>
      {icon && (
        <span
          aria-hidden
          className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-4"
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-sm text-foreground",
            unread ? "font-semibold" : "font-medium"
          )}
        >
          {title}
        </span>
        {description && (
          <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
        {time && (
          <span className="whitespace-nowrap text-[11px] text-muted-foreground">
            {time}
          </span>
        )}
        {unread && (
          <span
            data-unread-dot
            aria-hidden
            className="size-2 rounded-full bg-primary"
          />
        )}
      </span>
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

NotificationItem.displayName = "NotificationItem";
