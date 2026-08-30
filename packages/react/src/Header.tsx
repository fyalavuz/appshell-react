"use client";

import {
  Fragment,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { cn } from "./cn";
import { useLabel } from "./I18nContext";
import { useMotion, premiumSpring } from "./motion";
import { useScrollDirection } from "./hooks/use-scroll-direction";
import type { HeaderProps, HeaderRow, AnimationSpeed } from "./types";
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
  rowOrder = ["context", "search"],
  theme = "light",
  behavior = "fixed",
  speed = "normal",
  mobileMenu,
  onVisibilityChange,
  forceSafeAreaTop = false,
  className,
}: HeaderProps) {
  const { motion, AnimatePresence } = useMotion();
  const scrollDirection = useScrollDirection();
  const t = themeStyles[theme];
  const [mobileOpen, setMobileOpen] = useState(false);
  const duration = speedMap[speed];

  const ghostRef = useRef<HTMLElement>(null);
  const rowOrderKey = rowOrder.join(",");
  const rows = useMemo(
    // filter(Boolean): an empty rowOrder joins to "" and would split back
    // into [""], rendering a row nobody asked for.
    () => rowOrderKey.split(",").filter(Boolean) as HeaderRow[],
    [rowOrderKey]
  );

  const [threshold, setThreshold] = useState(0);
  const menuToggleLabel = useLabel(mobileOpen ? "closeMenu" : "openMenu");

  // Sync header height to CSS variable for sticky siblings
  useEffect(() => {
    const el = ghostRef.current;
    if (!el) return;

    const syncHeight = () => {
      const height = el.offsetHeight;
      document.documentElement.style.setProperty("--header-height", `${height}px`);
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = ghostRef.current;
    if (!el || behavior === "static" || behavior === "fixed" || behavior === "sticky") return;

    const measure = () => {
      const heightOf = (selector: string) => {
        const node = el.querySelector(selector);
        return node ? (node as HTMLElement).offsetHeight : 0;
      };
      const navH = heightOf("[data-header-nav]");
      const rowHeight: Record<HeaderRow, number> = {
        context: heightOf("[data-header-context]"),
        search: heightOf("[data-header-search]"),
      };

      // A row starts hiding once everything stacked above it has scrolled
      // past — which depends on the order the rows are in.
      const spaceAbove = (row: HeaderRow) => {
        const index = rows.indexOf(row);
        // A row that was ordered away has nothing above it but the nav row —
        // slice(0, -1) would otherwise count every row except the last.
        if (index < 0) return navH;
        return rows
          .slice(0, index)
          .reduce((total, above) => total + rowHeight[above], navH);
      };

      if (behavior === "reveal-all" || behavior === "reveal-nav") {
        setThreshold(0);
      } else if (behavior === "reveal-context" || behavior === "reveal-nav-context") {
        setThreshold(spaceAbove("context"));
      } else if (behavior === "reveal-search" || behavior === "reveal-nav-search") {
        setThreshold(spaceAbove("search"));
      } else if (behavior === "reveal-context-search") {
        setThreshold(navH);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [behavior, rows]);

  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    if (behavior === "static" || behavior === "fixed" || behavior === "sticky") return;

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
    onVisibilityChange?.(behavior === "fixed" || behavior === "sticky" || !hasRevealEffect || isOverlayVisible);
  }, [isOverlayVisible, behavior, hasRevealEffect, onVisibilityChange]);

  // While the overlay copy stands in for it, the original is off screen with
  // the same controls inside. inert takes it out of the tab order and the
  // accessibility tree together, so the two are never both offered. Set on
  // the node rather than as a prop: React 18 and 19 disagree about how
  // `inert` is typed and serialised, and the attribute is all either writes.
  useEffect(() => {
    const el = ghostRef.current;
    if (!el) return;
    if (isOverlayVisible) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
    return () => el.removeAttribute("inert");
  }, [isOverlayVisible]);

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
    <motion.nav
      layout
      data-header-nav
      className={cn(
        "w-full border-b backdrop-blur-xl transition-colors",
        t.nav,
        isSticky && "sticky top-0 z-40"
      )}
      transition={premiumSpring}
    >
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center px-4 sm:px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-3">
            {mobileMenu && (
              <button
                type="button"
                className="p-1 rounded-md hover:bg-accent/50 md:hidden transition-colors"
                onClick={toggleMobile}
                aria-label={menuToggleLabel}
              >
                {mobileOpen ? closeIcon : menuIcon}
              </button>
            )}
            {logo}
          </div>
          {nav && <div className="hidden md:flex items-center ms-4">{nav}</div>}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </motion.nav>
  );

  const renderContextRow = () =>
    title || subtitle ? (
      <motion.div
        layout
        data-header-context
        className={cn(
          "w-full border-b backdrop-blur-xl transition-colors relative z-30",
          t.context
        )}
        transition={premiumSpring}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 flex flex-col justify-center py-4">
          {title && (
            <motion.h1 
              layout="position"
              className="text-base md:text-2xl font-bold leading-tight text-balance"
            >
              {title}
            </motion.h1>
          )}
          {subtitle && (
            <motion.p 
              layout="position"
              className="mt-1 text-sm opacity-80"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </motion.div>
    ) : null;

  const renderSearchRow = () =>
    searchContent ? (
      <motion.div
        layout
        data-header-search
        className={cn(
          "w-full border-b backdrop-blur-sm transition-colors relative z-20",
          t.search
        )}
        transition={premiumSpring}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-2">
          {searchContent}
        </div>
      </motion.div>
    ) : null;

  const renderLowerRows = (include?: (row: HeaderRow) => boolean) =>
    rows.map((row) => {
      if (include && !include(row)) return null;
      return (
        <Fragment key={row}>
          {row === "context" ? renderContextRow() : renderSearchRow()}
        </Fragment>
      );
    });

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
      {renderNavRow(behavior !== "static" && behavior !== "fixed" && behavior !== "sticky")}
      {renderLowerRows()}
      {renderMobileMenuPanel()}
    </HeaderProvider>
  );

  const isFixed = behavior === "fixed" || behavior === "sticky";

  if (isFixed) {
    return (
      <motion.header
        layout
        ref={ghostRef}
        className={cn(
          "w-full sticky top-0 z-50 transition-colors duration-300",
          t.wrapper,
          className
        )}
        style={{ paddingTop: "var(--appshell-safe-area-inset-top, env(safe-area-inset-top, 0px))" }}
        transition={premiumSpring}
      >
        <HeaderProvider value={{ theme }}>
          {renderNavRow()}
          {renderLowerRows()}
          {renderMobileMenuPanel()}
        </HeaderProvider>
      </motion.header>
    );
  }

  return (
    <>
      <motion.header
        layout
        ref={ghostRef}
        className={cn(
          "w-full relative z-50 transition-colors duration-300",
          t.wrapper,
          className
        )}
        style={{ paddingTop: forceSafeAreaTop ? "var(--appshell-safe-area-inset-top, env(safe-area-inset-top, 0px))" : undefined }}
        transition={premiumSpring}
      >
        {renderContent()}
      </motion.header>

      {hasRevealEffect && (
        <AnimatePresence>
          {isOverlayVisible && (
            <motion.div
              key="header-overlay"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: duration, ease: [0.16, 1, 0.3, 1] }}
              // Not aria-hidden: while this is on screen it *is* the header,
              // and marking it hidden while it holds the only visible menu
              // button put focusable controls inside a hidden subtree. The
              // scrolled-away original is inert instead, so the two copies
              // never both answer to the keyboard.
              data-header-overlay
              className={cn(
                "fixed top-0 left-0 right-0 z-[60] shadow-lg",
                t.wrapper
              )}
              style={{ paddingTop: "var(--appshell-safe-area-inset-top, env(safe-area-inset-top, 0px))" }}
            >
              <HeaderProvider value={{ theme }}>
                {shouldShowInOverlay("nav") && renderNavRow()}
                {renderLowerRows(shouldShowInOverlay)}
              </HeaderProvider>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
});
Header.displayName = "Header";
