"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  defaultLabels,
  interpolate,
  type AppShellLabelKey,
  type AppShellLabels,
  type AppShellLabelsInput,
  type LabelVariables,
} from "./labels";

export type Direction = "ltr" | "rtl";

interface I18nContextValue {
  labels: AppShellLabels;
  t?: (
    key: AppShellLabelKey,
    defaultValue: string,
    vars?: LabelVariables
  ) => string;
  dir: Direction;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export interface I18nProviderProps {
  children: ReactNode;
  /**
   * Override any subset of the library's own strings. Unspecified keys keep
   * their English default, so this composes with an existing app.
   */
  labels?: AppShellLabelsInput;
  /**
   * Escape hatch for an i18n library that owns the catalogue. Called with the
   * key, the English default, and any interpolation variables — so it works
   * before the keys exist in your catalogue:
   *
   *   t={(key, defaultValue, vars) =>
   *     i18n.t(`appshell.${key}`, { defaultValue, ...vars })}
   *
   * Takes precedence over `labels`; a component's own prop still wins over
   * both.
   */
  t?: (
    key: AppShellLabelKey,
    defaultValue: string,
    vars?: LabelVariables
  ) => string;
  /**
   * Writing direction for the shell. Deliberately explicit rather than
   * inferred from a locale, and threaded through context rather than the DOM:
   * the overlays render through portals, which do not inherit `dir` from the
   * React parent.
   */
  dir?: Direction;
}

/**
 * Localizes the strings the library renders itself, and sets the writing
 * direction. Ships no translations and pulls in no dependency — it is the
 * seam your i18n library plugs into.
 */
export function I18nProvider({
  children,
  labels,
  t,
  dir = "ltr",
}: I18nProviderProps) {
  const value = useMemo<I18nContextValue>(
    () => ({ labels: { ...defaultLabels, ...labels }, t, dir }),
    [labels, t, dir]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Resolves one of the library's strings: a component's own prop wins, then
 * the provider's `t`, then its `labels`, then the English default.
 */
export function useLabel(
  key: AppShellLabelKey,
  vars?: LabelVariables,
  override?: string
): string {
  const ctx = useContext(I18nContext);
  if (override != null) return override;

  const fallback = defaultLabels[key];
  if (!ctx) return interpolate(fallback, vars);
  if (ctx.t) return ctx.t(key, fallback, vars);
  return interpolate(ctx.labels[key] ?? fallback, vars);
}

/** The shell's writing direction — "ltr" with no provider. */
export function useDirection(): Direction {
  return useContext(I18nContext)?.dir ?? "ltr";
}
