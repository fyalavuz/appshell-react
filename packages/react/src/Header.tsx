"use client";

import {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { cn } from "./cn";
import { useMotion } from "./motion";
import { useScrollDirection } from "./hooks/use-scroll-direction";
import type { HeaderProps, AnimationSpeed } from "./types";
import { HeaderProvider } from "./HeaderContext";

const themeStyles = {
  light: {
    wrapper: "bg-background text-foreground",
    nav: "bg-background/95 border-border",
    context: "bg-background/95 border-border",
    search: "bg-background/95 border-border",
    mobile: "bg-background text-foreground border-border",
  },
  primary: {
    wrapper: "bg-primary text-primary-foreground",
    nav: "bg-primary border-primary/80",
    context: "bg-primary border-primary/80",
    search: "bg-primary border-primary/80",
    mobile: "bg-primary text-primary-foreground border-primary/80",
  },
  dark: {
    wrapper: "bg-zinc-950 text-slate-50",
    nav: "bg-zinc-950 border-zinc-800",
    context: "bg-zinc-950 border-zinc-800",
    search: "bg-zinc-950 border-zinc-800",
    mobile: "bg-zinc-950 text-slate-50 border-zinc-800",
  },
  none: {
    wrapper: "",
    nav: "",
    context: "",
    search: "",
    mobile: "",
  },
} as const;

const speedMap: Record<AnimationSpeed, number> = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
};

export const Header = memo(function Header({
  logo,
  actions,
  nav,
  title,
  subtitle,
  searchContent,
  theme = "light",
  behavior = "fixed",
  speed = "normal",
  mobileMenu,
  onVisibilityChange,
  className,
}: HeaderProps) {
  const { motion, AnimatePresence } = useMotion();
  const scrollDirection = useScrollDirection();
  const t = themeStyles[theme];
  const [mobileOpen, setMobileOpen] = useState(false);
  const duration = speedMap[speed];

  const ghostRef = useRef<HTMLElement>(null);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    const el = ghostRef.current;
    if (!el || behavior === "static" || behavior === "fixed") return;

    const measure = () => {
      const navEl = el.querySelector("[data-header-nav]");
      const ctxEl = el.querySelector("[data-header-context]");
      const navH = navEl ? (navEl as HTMLElement).offsetHeight : 0;
      const ctxH = ctxEl ? (ctxEl as HTMLElement).offsetHeight : 0;

      if (behavior === "reveal-all" || behavior === "reveal-nav") {
        setThreshold(0);
      } else if (behavior === "reveal-context" || behavior === "reveal-nav-context") {
        setThreshold(navH);
      } else if (behavior === "reveal-search" || behavior === "reveal-nav-search") {
        setThreshold(navH + ctxH);
      } else if (behavior === "reveal-context-search") {
        setThreshold(navH);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [behavior]);

  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    if (behavior === "static" || behavior === "fixed") return;

    const onScroll = () => {
      setIsPastThreshold(window.scrollY > threshold + 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [behavior, threshold]);

  const hasRevealEffect = behavior.startsWith("reveal-");
  const isOverlayVisible =
    hasRevealEffect && scrollDirection === "up" && isPastThreshold;

  useEffect(() => {
    onVisibilityChange?.(behavior === "fixed" || !hasRevealEffect || isOverlayVisible);
  }, [isOverlayVisible, behavior, hasRevealEffect, onVisibilityChange]);

  const shouldShowInOverlay = useCallback(
    (row: "nav" | "context" | "search") => {
      if (behavior === "reveal-all") return true;
      if (behavior === "reveal-nav" && row === "nav") return true;
      if (behavior === "reveal-context" && row === "context") return true;
      if (behavior === "reveal-search" && row === "search") return true;
      if (behavior === "reveal-nav-context" && (row === "nav" || row === "context")) return true;
      if (behavior === "reveal-nav-search" && (row === "nav" || row === "search")) return true;
      if (behavior === "reveal-context-search" && (row === "context" || row === "search")) return true;
      return false;
    },
    [behavior]
  );

  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  const menuIcon = (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );

  const closeIcon = (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const renderNavRow = (isSticky = false) => (
    <nav
      data-header-nav
      className={cn(
        "w-full border-b backdrop-blur-xl transition-colors",
        t.nav,
        isSticky && "sticky top-0 z-40"
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center px-4 sm:px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-3">
            {mobileMenu && (
              <button
                type="button"
                className="p-1 rounded-md hover:bg-accent/50 md:hidden transition-colors"
                onClick={toggleMobile}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? closeIcon : menuIcon}
              </button>
            )}
            {logo}
          </div>
          {nav && <div className="hidden md:flex items-center ml-4">{nav}</div>}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </nav>
  );

  const renderContextRow = () =>
    title || subtitle ? (
      <div
        data-header-context
        className={cn(
          "w-full border-b backdrop-blur-xl transition-colors relative z-30",
          t.context
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 flex flex-col justify-center py-4">
          {title && (
            <h1 className="text-base md:text-2xl font-bold leading-tight text-balance">
              {title}
            </h1>
          )}
          {subtitle && <p className="mt-1 text-sm opacity-80">{subtitle}</p>}
        </div>
      </div>
    ) : null;

  const renderSearchRow = () =>
    searchContent ? (
      <div
        data-header-search
        className={cn(
          "w-full border-b backdrop-blur-sm transition-colors relative z-20",
          t.search
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-2">
          {searchContent}
        </div>
      </div>
    ) : null;

  const renderMobileMenuPanel = () => (
    <AnimatePresence>
      {mobileMenu && mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: duration, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "md:hidden overflow-hidden border-t w-full",
            t.mobile
          )}
        >
          <div className="px-4 pb-4 pt-2">{mobileMenu}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderContent = () => (
    <HeaderProvider value={{ theme }}>
      {renderNavRow(behavior !== "static" && behavior !== "fixed")}
      {renderContextRow()}
      {renderSearchRow()}
      {renderMobileMenuPanel()}
    </HeaderProvider>
  );

  const isFixed = behavior === "fixed" || behavior === "sticky";

  if (isFixed) {
    return (
      <header
        className={cn(
          "w-full sticky top-0 z-50 transition-colors duration-300",
          t.wrapper,
          className
        )}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <HeaderProvider value={{ theme }}>
          {renderNavRow()}
          {renderContextRow()}
          {renderSearchRow()}
          {renderMobileMenuPanel()}
        </HeaderProvider>
      </header>
    );
  }

  return (
    <>
      <header
        ref={ghostRef}
        className={cn(
          "w-full relative z-50 transition-colors duration-300",
          t.wrapper,
          className
        )}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        {renderContent()}
      </header>

      {hasRevealEffect && (
        <AnimatePresence>
          {isOverlayVisible && (
            <motion.div
              key="header-overlay"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: duration, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
              className={cn(
                "fixed top-0 left-0 right-0 z-[60] shadow-lg",
                t.wrapper
              )}
              style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
            >
              <HeaderProvider value={{ theme }}>
                {shouldShowInOverlay("nav") && renderNavRow()}
                {shouldShowInOverlay("context") && renderContextRow()}
                {shouldShowInOverlay("search") && renderSearchRow()}
              </HeaderProvider>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
});
Header.displayName = "Header";
