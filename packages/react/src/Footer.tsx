"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "./cn";
import { useLabel } from "./I18nContext";
import { useMotion, premiumSpring } from "./motion";
import { useScrollDirection } from "./hooks/use-scroll-direction";
import { useKeyboardInset } from "./hooks/use-keyboard-inset";
import { useLinkComponent } from "./LinkContext";
import type { FooterProps, FooterItemProps, AnimationSpeed } from "./types";

const speedMap: Record<AnimationSpeed, number> = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
};

/**
 * Publishes the footer's height as --appshell-footer-height so Content (and
 * anything else pinned to the bottom) can reserve exactly the right space
 * instead of guessing a padding value.
 *
 * The value survives an auto-hide: the element unmounts while it is hidden,
 * and reflowing the page every time the bar slides away would be worse than
 * holding the space open.
 */
function useFooterHeightVar() {
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(
    () => () => {
      observerRef.current?.disconnect();
      document.documentElement.style.removeProperty("--appshell-footer-height");
    },
    []
  );

  return useCallback((el: HTMLElement | null) => {
    observerRef.current?.disconnect();
    if (!el) return;
    const sync = () =>
      document.documentElement.style.setProperty(
        "--appshell-footer-height",
        `${el.offsetHeight}px`
      );
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    observerRef.current = ro;
  }, []);
}

export const FooterItem = memo(function FooterItem({
  icon,
  label,
  active = false,
  badge,
  href,
  onClick,
  className,
}: FooterItemProps) {
  const overflowLabel = useLabel("badgeOverflow", { max: 99 });
  const { motion } = useMotion();
  const LinkComp = useLinkComponent();

  // A tab that navigates is a link, and the current one is the current page —
  // that is what a screen reader announces. Without href it stays a button,
  // but still says which one is current.
  const Element = href ? LinkComp : "button";

  return (
    // eslint-disable-next-line react-hooks/static-components -- stable component from context, not created during render
    <Element
      {...(href ? { href } : { type: "button" as const })}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors relative",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <span className="relative">
        {icon}
        {badge != null && badge > 0 && (
          <span className="absolute -top-1.5 -end-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
            {badge > 99 ? overflowLabel : badge}
          </span>
        )}
      </span>
      <span className="text-[10px] font-medium leading-tight">{label}</span>
      {active && (
        <motion.div
          layoutId="footer-active-indicator"
          className="absolute -bottom-0.5 h-0.5 w-4 rounded-full bg-primary"
          transition={premiumSpring}
        />
      )}
    </Element>
  );
});

export const Footer = memo(function Footer({
  variant = "tab-bar",
  behavior = "static",
  hideOnKeyboard = false,
  position = "center",
  speed = "normal",
  className,
  children,
}: FooterProps) {
  const { motion, AnimatePresence } = useMotion();
  const scrollDirection = useScrollDirection();
  // Subscribing only when asked keeps the visualViewport listeners off pages
  // that do not need them.
  const keyboardInset = useKeyboardInset();
  const shouldHide =
    (behavior === "auto-hide" && scrollDirection === "down") ||
    (hideOnKeyboard && keyboardInset > 0);
  const measureRef = useFooterHeightVar();
  const duration = speedMap[speed];

  if (variant === "floating") {
    const positionClass = {
      center: "justify-center",
      left: "justify-start ps-4",
      right: "justify-end pe-4",
    }[position];

    return (
      <div
        ref={measureRef}
        data-footer-floating
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex pointer-events-none",
          positionClass,
          className
        )}
        style={{ paddingBottom: "var(--appshell-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))" }}
      >
        <AnimatePresence>
          {!shouldHide && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: duration, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "mini") {
    return (
      <AnimatePresence>
        {!shouldHide && (
          <motion.footer
            ref={measureRef}
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            exit={{ y: 48 }}
            transition={{ duration: duration, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 min-h-12 border-t bg-background/95 backdrop-blur-xl",
              className
            )}
            style={{ paddingBottom: "var(--appshell-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))" }}
          >
            <div className="mx-auto flex h-12 max-w-7xl items-center px-4">
              {children}
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    );
  }

  // tab-bar (default)
  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.footer
          ref={measureRef}
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: duration, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-xl",
            className
          )}
          style={{ paddingBottom: "var(--appshell-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="mx-auto flex max-w-lg items-stretch">
            {children}
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
});
