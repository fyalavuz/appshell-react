"use client";

import { memo, useRef, useEffect } from "react";
import type { SafeAreaProps, SafeAreaEdge } from "./types";
import { cn } from "./cn";

const cssMap: Record<SafeAreaEdge, string> = {
  top: "padding-top: var(--sa-top, env(safe-area-inset-top, 0px))",
  bottom: "padding-bottom: var(--sa-bottom, env(safe-area-inset-bottom, 0px))",
  left: "padding-left: var(--sa-left, env(safe-area-inset-left, 0px))",
  right: "padding-right: var(--sa-right, env(safe-area-inset-right, 0px))",
};

export const SafeArea = memo(function SafeArea({
  edges = ["top", "bottom", "left", "right"],
  className,
  children,
}: SafeAreaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const css = edges.map((edge) => cssMap[edge]).join("; ");
    ref.current.setAttribute("style", css);
  }, [edges]);

  return (
    <div ref={ref} className={cn("flex-1", className)} data-safe-area-edges={edges.join(",")}>
      {children}
    </div>
  );
});
