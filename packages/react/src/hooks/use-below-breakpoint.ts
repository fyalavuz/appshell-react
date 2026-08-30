"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { SidebarBreakpoint } from "../types";

const BP_PX: Record<Exclude<SidebarBreakpoint, "none">, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
};

const noopSubscribe = () => () => {};

/**
 * True when the viewport is narrower than the given Tailwind breakpoint.
 *
 * The docked Sidebar uses it to decide whether the overlay drawer is the
 * active presentation, so modal side effects (body scroll lock,
 * Escape-to-close) only engage below the breakpoint — and it is exported so
 * your own code can ask the same question and get the same answer, rather
 * than re-deriving it and disagreeing. Rendering is gated by
 * pure CSS (`hidden md:flex` / `md:hidden`), never by this hook, so there is
 * no hydration mismatch. Pass `null` to disable entirely (overlay variant).
 */
export function useBelowBreakpoint(bp: SidebarBreakpoint | null): boolean {
  const query =
    bp && bp !== "none" ? `(max-width: ${BP_PX[bp] - 1}px)` : null;

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (
        !query ||
        typeof window === "undefined" ||
        typeof window.matchMedia !== "function"
      ) {
        return noopSubscribe();
      }
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (
      !query ||
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return false;
    }
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
