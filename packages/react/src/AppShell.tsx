"use client";

import { memo, Children, isValidElement, type ReactNode } from "react";
import { cn } from "./cn";
import { AppShellProvider } from "./context";
import { SafeArea } from "./SafeArea";
import { Header } from "./Header";
import type { AppShellProps } from "./types";

function AppShellInner({ safeArea = false, className, children }: AppShellProps) {
  if (!safeArea) {
    return (
      <div className={cn("flex min-h-dvh flex-col relative", className)}>
        {children}
      </div>
    );
  }

  // When safeArea is true, we want to ensure the Header can be sticky correctly.
  // Sticky elements don't work well when their parent has padding-top.
  // So we split Header from other children.
  let header: ReactNode = null;
  const otherChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      // Check for Header component by type or displayName
      const isHeader = child.type === Header || 
                      (child.type as any).displayName === "Header" ||
                      (child.type as any).name === "Header";
      
      if (isHeader) {
        header = child;
      } else {
        otherChildren.push(child);
      }
    }
  });

  return (
    <div 
      className={cn("flex min-h-dvh flex-col relative", className)}
      style={{ paddingTop: "var(--header-height, 0px)" }}
    >
      {header}
      <SafeArea edges={["bottom"]} className="flex flex-col flex-1">
        {otherChildren}
      </SafeArea>
    </div>
  );
}

export const AppShell = memo(function AppShell(props: AppShellProps) {
  return (
    <AppShellProvider>
      <AppShellInner {...props} />
    </AppShellProvider>
  );
});

AppShell.displayName = "AppShell";
