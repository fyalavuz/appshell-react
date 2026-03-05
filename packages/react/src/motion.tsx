"use client";

import React, {
  createContext,
  useContext,
  type ReactNode,
  type ForwardRefExoticComponent,
} from "react";
import { cssMotionAdapter } from "./motion-css";

/** Shape that both framer-motion and CSS fallback adapters satisfy. */
export interface MotionAdapter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: React.ComponentType<any>;
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ForwardRefExoticComponent<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    footer: ForwardRefExoticComponent<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nav: ForwardRefExoticComponent<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header: ForwardRefExoticComponent<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    section: ForwardRefExoticComponent<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    main: ForwardRefExoticComponent<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    span: ForwardRefExoticComponent<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ForwardRefExoticComponent<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: ForwardRefExoticComponent<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p: ForwardRefExoticComponent<any>;
  };
}

/** 
 * Standard "Premium" spring transition for appshell-react.
 * Optimized for layout and entrance animations.
 */
export const premiumSpring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 1,
} as const;

const MotionContext = createContext<MotionAdapter | null>(null);

/**
 * Provide a MotionAdapter to enable richer animations.
 *
 * Without this provider, all components use CSS transitions (zero JS animation deps).
 *
 * @example
 * import { framerMotionAdapter } from "appshell-react/motion-framer";
 * <MotionProvider adapter={framerMotionAdapter}>
 *   <AppShell>…</AppShell>
 * </MotionProvider>
 */
export function MotionProvider({
  adapter,
  children,
}: {
  adapter: MotionAdapter;
  children: ReactNode;
}) {
  return (
    <MotionContext.Provider value={adapter}>{children}</MotionContext.Provider>
  );
}

/** Returns the active motion adapter (framer-motion or CSS fallback). */
export function useMotion(): MotionAdapter {
  return useContext(MotionContext) ?? cssMotionAdapter;
}
