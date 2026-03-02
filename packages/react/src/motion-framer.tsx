/**
 * Framer Motion adapter for react-appshell.
 *
 * Import this from "react-appshell/motion-framer" and pass it
 * to <MotionProvider> for spring-based animations.
 *
 * @example
 * import { MotionProvider } from "react-appshell";
 * import { framerMotionAdapter } from "react-appshell/motion-framer";
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
