"use client";

import { memo, type CSSProperties } from "react";
import type { SafeAreaProps, SafeAreaEdge } from "./types";
import { cn } from "./cn";

/**
 * Safe-area padding is driven by the platform standard: the CSS
 * env(safe-area-inset-*) variables that iOS Safari/WebKit and Android
 * Chrome/WebView populate when the page opts into edge-to-edge rendering
 * with <meta name="viewport" content="... viewport-fit=cover">.
 *
 * The --appshell-safe-area-inset-* custom properties are NOT a parallel
 * system — env() is the source of truth. They exist only so previews,
 * mockups and tests can simulate device insets where real env() values
 * are zero (a desktop browser, an iframe).
 */
const paddingFor: Record<SafeAreaEdge, CSSProperties> = {
  top: {
    paddingTop:
      "var(--appshell-safe-area-inset-top, env(safe-area-inset-top, 0px))",
  },
  bottom: {
    paddingBottom:
      "var(--appshell-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))",
  },
  left: {
    paddingLeft:
      "var(--appshell-safe-area-inset-left, env(safe-area-inset-left, 0px))",
  },
  right: {
    paddingRight:
      "var(--appshell-safe-area-inset-right, env(safe-area-inset-right, 0px))",
  },
};

export const SafeArea = memo(function SafeArea({
  edges = ["top", "bottom", "left", "right"],
  className,
  children,
}: SafeAreaProps) {
  const style = edges.reduce<CSSProperties>(
    (acc, edge) => Object.assign(acc, paddingFor[edge]),
    {}
  );

  return (
    <div
      style={style}
      className={cn("flex-1", className)}
      data-safe-area-edges={edges.join(",")}
    >
      {children}
    </div>
  );
});
