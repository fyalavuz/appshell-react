"use client";

import { useEffect, useState } from "react";
import type { SafeAreaEdge } from "../types";

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Measure real env(safe-area-inset-*) values with a probe element —
 * env() cannot be read through getPropertyValue, only resolved by layout.
 */
function measureEnvInsets(): SafeAreaInsets {
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;visibility:hidden;pointer-events:none;" +
    "padding-top:env(safe-area-inset-top,0px);" +
    "padding-bottom:env(safe-area-inset-bottom,0px);" +
    "padding-left:env(safe-area-inset-left,0px);" +
    "padding-right:env(safe-area-inset-right,0px)";
  document.body.appendChild(probe);
  const style = getComputedStyle(probe);
  const insets = {
    top: parseFloat(style.paddingTop) || 0,
    bottom: parseFloat(style.paddingBottom) || 0,
    left: parseFloat(style.paddingLeft) || 0,
    right: parseFloat(style.paddingRight) || 0,
  };
  probe.remove();
  return insets;
}

export function useSafeArea(edges: SafeAreaEdge[] = ["top", "bottom", "left", "right"]): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const measure = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      const env = measureEnvInsets();
      // --sa-* overrides (injected by mockups/tests) win over env() values.
      const read = (prop: string, envValue: number) =>
        parseFloat(rootStyle.getPropertyValue(prop) || "") || envValue;

      setInsets({
        top: edges.includes("top") ? read("--sa-top", env.top) : 0,
        bottom: edges.includes("bottom") ? read("--sa-bottom", env.bottom) : 0,
        left: edges.includes("left") ? read("--sa-left", env.left) : 0,
        right: edges.includes("right") ? read("--sa-right", env.right) : 0,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges.join(",")]);

  return insets;
}
