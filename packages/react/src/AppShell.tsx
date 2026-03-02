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

  let header: ReactNode = null;
  let headerBehavior: string = "fixed";
  const otherChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const isHeader = child.type === Header || 
                      (child.type as any).displayName === "Header" ||
                      (child.type as any).name === "Header";
      
      if (isHeader) {
        header = child;
        headerBehavior = (child.props as any).behavior || "fixed";
      } else {
        otherChildren.push(child);
      }
    }
  });

  const isStatic = headerBehavior === "static";

  // For static behavior, the header MUST be part of the same scroll container 
  // as the content to scroll away.
  if (isStatic) {
    return (
      <SafeArea edges={["top", "bottom"]} className={cn("flex min-h-dvh flex-col relative", className)}>
        {header}
        <div className="flex flex-col flex-1">
          {otherChildren}
        </div>
      </SafeArea>
    );
  }

  // For fixed/sticky/reveal behaviors, the header handles its own top safe area 
  // and stays pinned or manages its own animation.
  return (
    <div className={cn("flex min-h-dvh flex-col relative", className)}>
      {header && isValidElement(header) 
        ? Object.assign({}, header, { props: { ...header.props, forceSafeAreaTop: true } }) 
        : header}
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
