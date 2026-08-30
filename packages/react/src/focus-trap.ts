"use client";

import { useEffect } from "react";

// Active traps, oldest first. Only the last one handles Tab; the ones below
// stay registered but idle until it goes away.
const scopes: string[] = [];

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab / Shift+Tab cycling inside the element carrying
 * data-focus-trap-id={id} while active, pulling focus in on the first
 * Tab if it is elsewhere. On deactivation, optionally restores focus to
 * the element that had it when the trap engaged.
 *
 * Looked up by attribute instead of a ref so it works on panels rendered
 * through the motion adapter (which may not forward refs).
 *
 * Traps nest: activating one suspends the trap below it rather than competing
 * with it, so Tab stays inside the frontmost overlay instead of the two
 * handlers pulling focus back and forth on every keypress.
 */
export function useFocusTrap(
  active: boolean,
  id: string,
  { restoreFocus = true }: { restoreFocus?: boolean } = {}
) {
  useEffect(() => {
    if (!active) return;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    scopes.push(id);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (scopes[scopes.length - 1] !== id) return;
      const container = document.querySelector<HTMLElement>(
        `[data-focus-trap-id="${id}"]`
      );
      if (!container) return;
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (!(current instanceof HTMLElement) || !container.contains(current)) {
        first.focus();
        e.preventDefault();
        return;
      }
      if (e.shiftKey && current === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && current === last) {
        first.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      const index = scopes.lastIndexOf(id);
      if (index !== -1) scopes.splice(index, 1);
      // A trap nested inside another one snapshots a trigger belonging to the
      // outer overlay. If that overlay is gone too, the node is detached and
      // focusing it would silently drop focus to <body>.
      if (restoreFocus && previous?.isConnected) previous.focus();
    };
  }, [active, id, restoreFocus]);
}
