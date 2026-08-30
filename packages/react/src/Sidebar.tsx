"use client";

import { memo, useId, useState, type CSSProperties } from "react";
import { cn } from "./cn";
import { useLabel } from "./I18nContext";
import { useFocusTrap } from "./focus-trap";
import { useOverlayLayer } from "./overlay-stack";
import { useMotion } from "./motion";
import { useBelowBreakpoint } from "./hooks/use-below-breakpoint";
import type { SidebarBreakpoint, SidebarProps } from "./types";

// Static class maps so Tailwind's scanner sees every literal.
const dockedDisplay: Record<SidebarBreakpoint, string> = {
  sm: "hidden sm:flex",
  md: "hidden md:flex",
  lg: "hidden lg:flex",
  none: "flex",
};

const overlayGate: Record<Exclude<SidebarBreakpoint, "none">, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
};

// Safe-area chains: the --appshell-* var is a simulation/override hook,
// the env() value is the platform truth (iOS notch, Android edge-to-edge).
const SAFE_TOP =
  "var(--appshell-safe-area-inset-top, env(safe-area-inset-top, 0px))";
const SAFE_BOTTOM =
  "var(--appshell-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))";
const SAFE_LEFT =
  "var(--appshell-safe-area-inset-left, env(safe-area-inset-left, 0px))";
const SAFE_RIGHT =
  "var(--appshell-safe-area-inset-right, env(safe-area-inset-right, 0px))";

const CollapseChevrons = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m11 17-5-5 5-5" />
    <path d="m18 17-5-5 5-5" />
  </svg>
);

export const Sidebar = memo(function Sidebar(props: SidebarProps) {
  const { motion, AnimatePresence } = useMotion();
  const { side = "left", topContent, bottomContent, className, children } = props;

  const isDocked = props.variant === "docked";
  const open = props.open ?? false;
  const onClose = props.onClose;
  const breakpoint: SidebarBreakpoint = isDocked
    ? (props.breakpoint ?? "md")
    : "md";

  // Whether the overlay drawer is the active presentation right now.
  // Overlay variant: always. Docked: only below the breakpoint.
  const belowBp = useBelowBreakpoint(isDocked ? breakpoint : null);
  const overlayActive = !isDocked || belowBp;

  const [internalCollapsed, setInternalCollapsed] = useState(
    isDocked ? (props.defaultCollapsed ?? false) : false
  );
  const collapsed = isDocked ? (props.collapsed ?? internalCollapsed) : false;
  const panelId = useId();
  const navLabel = useLabel("navigationMenu", undefined, props["aria-label"]);
  const collapseLabel = useLabel(collapsed ? "expandSidebar" : "collapseSidebar");

  // Keep Tab inside the open drawer and hand focus back on close.
  useFocusTrap(open && overlayActive, panelId);

  // The stack owns Escape and the scroll lock, so a menu opened inside the
  // drawer closes on its own instead of taking the drawer down with it.
  const { zIndex } = useOverlayLayer({
    open: open && overlayActive,
    onClose,
  });

  const isLeft = side === "left";

  const drawer = (gate: string) => (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm", gate)}
            style={{ zIndex }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="sidebar-panel"
            role="dialog"
            aria-modal="true"
            aria-label={navLabel}
            data-focus-trap-id={panelId}
            initial={{ x: isLeft ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isLeft ? "-100%" : "100%" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed top-0 flex h-full w-80 max-w-[85vw] flex-col bg-background shadow-2xl",
              isLeft ? "left-0" : "right-0",
              gate,
              className
            )}
            style={{
              zIndex: zIndex + 1,
              // The panel itself clears the status bar / notch, whether or
              // not a topContent slot is rendered.
              paddingTop: SAFE_TOP,
              ...(isLeft
                ? { paddingLeft: SAFE_LEFT }
                : { paddingRight: SAFE_RIGHT }),
            }}
          >
            {topContent && (
              <div data-sidebar-top className="shrink-0 border-b border-border">
                {topContent}
              </div>
            )}
            <div
              className="min-h-0 flex-1 overflow-y-auto"
              // Without a pinned bottom section the scroll area owns the
              // bottom inset — content scrolls through it and the last item
              // rests above the home indicator.
              style={bottomContent ? undefined : { paddingBottom: SAFE_BOTTOM }}
            >
              {children}
            </div>
            {bottomContent && (
              <div
                data-sidebar-bottom
                className="shrink-0 border-t border-border"
                style={{ paddingBottom: SAFE_BOTTOM }}
              >
                {bottomContent}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!isDocked) {
    return drawer("");
  }

  const width = props.width ?? "16rem";
  const railWidth = props.railWidth ?? "3.25rem";

  const toggleCollapsed = () => {
    const next = !collapsed;
    if (props.collapsed === undefined) setInternalCollapsed(next);
    props.onCollapsedChange?.(next);
  };

  const asideStyle: CSSProperties = {
    width: collapsed ? railWidth : width,
    top: "var(--appshell-sidebar-top, var(--header-height, 0px))",
    height:
      "calc(100dvh - var(--appshell-sidebar-top, var(--header-height, 0px)))",
    paddingBottom: SAFE_BOTTOM,
    ...(isLeft ? { paddingLeft: SAFE_LEFT } : { paddingRight: SAFE_RIGHT }),
  };

  return (
    <>
      <aside
        aria-label={navLabel}
        data-sidebar="docked"
        data-collapsed={collapsed ? "true" : "false"}
        className={cn(
          dockedDisplay[breakpoint],
          "group/sidebar sticky z-40 shrink-0 flex-col overflow-hidden bg-background",
          "transition-[width] duration-200 ease-out motion-reduce:transition-none",
          isLeft ? "border-r border-border" : "order-last border-l border-border",
          className
        )}
        style={asideStyle}
      >
        {topContent && (
          <div data-sidebar-top className="shrink-0 border-b border-border">
            {topContent}
          </div>
        )}
        <div
          id={panelId}
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
        >
          {children}
        </div>
        {bottomContent && (
          <div
            data-sidebar-bottom
            className="shrink-0 border-t border-border"
          >
            {bottomContent}
          </div>
        )}
        {props.collapsible && (
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-expanded={!collapsed}
            aria-controls={panelId}
            aria-label={collapseLabel}
            className="mt-auto flex h-10 w-full shrink-0 items-center justify-center border-t border-border text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <CollapseChevrons
              className={cn(
                "size-4 transition-transform duration-200",
                collapsed === isLeft && "rotate-180"
              )}
            />
          </button>
        )}
      </aside>
      {breakpoint !== "none" && drawer(overlayGate[breakpoint])}
    </>
  );
});

Sidebar.displayName = "Sidebar";
