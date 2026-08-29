"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { useScrollDirection } from "./hooks/use-scroll-direction";
import type { AppShellContextValue } from "./types";

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(true);
  const scrollDirection = useScrollDirection();

  const value = useMemo<AppShellContextValue>(
    () => ({
      headerVisible,
      footerVisible,
      scrollDirection,
      setHeaderVisible,
      setFooterVisible,
    }),
    [headerVisible, footerVisible, scrollDirection]
  );

  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  );
}

export function useAppShell(): AppShellContextValue {
  const ctx = useContext(AppShellContext);
  if (!ctx) {
    throw new Error("useAppShell must be used within an <AppShellProvider>");
  }
  return ctx;
}
