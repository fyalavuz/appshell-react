"use client";

import React, { type ReactNode } from "react";
import type { MotionAdapter } from "./motion";

/**
 * CSS-only AnimatePresence. Renders children directly — exit animations
 * are handled via CSS transitions on data-* attributes.
 */
function CSSAnimatePresence({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/**
 * Creates a motion component that strips framer-motion-specific props
 * and renders the underlying HTML element with a data-motion="css" marker.
 */
function createCSSMotionComponent(tag: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.forwardRef<HTMLElement, any>(function CSSMotion(props, ref) {
    const {
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      layoutId: _layoutId,
      whileHover: _whileHover,
      whileTap: _whileTap,
      ...rest
    } = props;

    return React.createElement(tag, { ...rest, ref, "data-motion": "css" });
  });
}

/** CSS-only motion adapter — the default when no MotionProvider is present. */
export const cssMotionAdapter: MotionAdapter = {
  AnimatePresence: CSSAnimatePresence,
  motion: {
    div: createCSSMotionComponent("div"),
    footer: createCSSMotionComponent("footer"),
    nav: createCSSMotionComponent("nav"),
    header: createCSSMotionComponent("header"),
    section: createCSSMotionComponent("section"),
    main: createCSSMotionComponent("main"),
    span: createCSSMotionComponent("span"),
    button: createCSSMotionComponent("button"),
    h1: createCSSMotionComponent("h1"),
    p: createCSSMotionComponent("p"),
  },
};
