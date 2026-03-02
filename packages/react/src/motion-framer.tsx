/**
 * Framer Motion adapter for appshell-react.
 *
 * Import this from "appshell-react/motion-framer" and pass it
 * to <MotionProvider> for spring-based animations.
 *
 * @example
 * import { MotionProvider } from "appshell-react";
 * import { framerMotionAdapter } from "appshell-react/motion-framer";
 *
 * <MotionProvider adapter={framerMotionAdapter}>
 *   <AppShell>…</AppShell>
 * </MotionProvider>
 */
import { motion, AnimatePresence } from "framer-motion";
import type { MotionAdapter } from "./motion";

export const framerMotionAdapter: MotionAdapter = {
  AnimatePresence,
  motion: {
    div: motion.div,
    footer: motion.footer,
    nav: motion.nav,
  },
};
