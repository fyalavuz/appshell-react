"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

const subscribeNever = () => () => {};

// Every open anchored menu registers a close callback here, so opening one
// menu (UserMenu, NotificationsMenu, …) closes the others instead of
// stacking panels on top of each other.
const openPanels = new Set<() => void>();

export interface AnchoredPanelOptions {
  open: boolean;
  onClose: () => void;
  /** Horizontal alignment of the panel relative to the trigger. */
  align: "start" | "end";
}

/**
 * Shared plumbing for trigger-anchored dropdown panels rendered through a
 * portal: viewport-aware placement (opens upward when the trigger sits near
 * the bottom, e.g. in a Sidebar's bottom slot), close on Escape and outside
 * click, and mutual exclusion between all anchored menus.
 */
export function useAnchoredPanel({ open, onClose, align }: AnchoredPanelOptions) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Portals need a document — the caller skips the panel during SSR.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );

  // Anchor the fixed panel to the trigger, imperatively — the panel is a
  // portal, so React state isn't needed and no re-render happens on scroll.
  const placePanel = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    const el = panelRef.current;
    if (!rect || !el) return;

    const spaceBelow = window.innerHeight - rect.bottom;
    if (spaceBelow < el.offsetHeight + 16 && rect.top > spaceBelow) {
      el.style.top = "auto";
      el.style.bottom = `${Math.max(8, window.innerHeight - rect.top + 8)}px`;
    } else {
      el.style.bottom = "auto";
      el.style.top = `${rect.bottom + 8}px`;
    }
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

  // Close on Escape and on any press outside both the trigger and the panel.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        onCloseRef.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [open]);

  // Mutual exclusion: opening this menu closes every other open one.
  useEffect(() => {
    if (!open) return;
    const close = () => onCloseRef.current();
    for (const other of openPanels) other();
    openPanels.add(close);
    return () => {
      openPanels.delete(close);
    };
  }, [open]);

  return { mounted, triggerRef, panelRef, panelCallbackRef };
}
