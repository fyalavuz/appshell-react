"use client";

import { useEffect, useRef } from "react";
import type { SearchShortcutOptions } from "../types";

const isEditable = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target.isContentEditable
  );
};

/**
 * Binds the desktop search shortcut — ⌘K on macOS, Ctrl+K elsewhere — to a
 * handler, typically `() => setSearchOpen(true)` for a SearchModal.
 *
 * Pass { slash: true } to also open on a bare "/" pressed outside inputs
 * (the ⌘K combination fires even from inside one, palette-style). SSR-safe:
 * the listener only exists on the client.
 */
export function useSearchShortcut(
  onTrigger: () => void,
  { key = "k", slash = false, enabled = true }: SearchShortcutOptions = {}
): void {
  const onTriggerRef = useRef(onTrigger);
  useEffect(() => {
    onTriggerRef.current = onTrigger;
  });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const combo =
        (e.metaKey || e.ctrlKey) &&
        !e.altKey &&
        !e.shiftKey &&
        e.key.toLowerCase() === key;
      const bareSlash =
        slash &&
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !isEditable(e.target);

      if (combo || bareSlash) {
        e.preventDefault();
        onTriggerRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, slash, enabled]);
}
