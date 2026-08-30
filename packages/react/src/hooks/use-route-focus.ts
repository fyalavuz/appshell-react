"use client";

import { useEffect, useRef } from "react";

/**
 * Moves focus to the top of the new screen when the route changes.
 *
 * In a single-page app nothing tells a screen reader that the page changed,
 * and the keyboard stays wherever the link the user activated used to be —
 * usually deep in a navigation list. Native shells solve this by focusing the
 * new screen; a web shell is the only component in a position to do the same,
 * because it is what owns the heading and the main region.
 *
 * "heading" targets the Header's title and falls back to Content when the
 * screen has no heading. Nothing happens on first render — only on a change,
 * so a fresh page load is left alone.
 */
export function useRouteFocus(
  routeKey: string | undefined,
  target: "heading" | "content" | false
) {
  const previous = useRef(routeKey);

  useEffect(() => {
    if (routeKey === undefined || target === false) return;
    if (previous.current === routeKey) return;
    previous.current = routeKey;

    const content = document.getElementById("appshell-content");
    const heading =
      target === "heading"
        ? document.querySelector<HTMLElement>("[data-header-context] h1")
        : null;
    const element = heading ?? content;
    if (!element) return;

    // A heading is not focusable on its own; make it so for this one move and
    // hand it back afterwards, so it never lands in the tab order.
    const hadTabIndex = element.hasAttribute("tabindex");
    if (!hadTabIndex) element.setAttribute("tabindex", "-1");
    element.focus({ preventScroll: true });
    if (!hadTabIndex) {
      const drop = () => element.removeAttribute("tabindex");
      element.addEventListener("blur", drop, { once: true });
    }
  }, [routeKey, target]);
}
