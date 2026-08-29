"use client";

import {
  memo,
  Children,
  isValidElement,
  cloneElement,
  type CSSProperties,
  type ReactNode,
  type ReactElement,
} from "react";
import { cn } from "./cn";
import { AppShellProvider } from "./context";
import { SafeArea } from "./SafeArea";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import type { AppShellProps, HeaderProps } from "./types";

function AppShellInner({ safeArea = false, className, children }: AppShellProps) {
  let header: ReactNode = null;
  let headerBehavior: string = "fixed";
  const dockedSidebars: ReactNode[] = [];
  const otherChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const childType = child.type as { displayName?: string; name?: string };
      const isHeader =
        child.type === Header ||
        childType.displayName === "Header" ||
        childType.name === "Header";
      const isSidebar =
        child.type === Sidebar ||
        childType.displayName === "Sidebar" ||
        childType.name === "Sidebar";
      const isDocked =
        isSidebar && (child.props as { variant?: string }).variant === "docked";

      if (isDocked) {
        dockedSidebars.push(child);
      } else if (isHeader) {
        header = child;
        headerBehavior = (child.props as HeaderProps).behavior || "fixed";
      } else {
        otherChildren.push(child);
      }
    }
  });

  const hasDocked = dockedSidebars.length > 0;

  if (!safeArea && !hasDocked) {
    return (
      <div className={cn("flex min-h-dvh flex-col relative", className)}>
        {children}
      </div>
    );
  }

  const isStatic = headerBehavior === "static";
  const isPinnedHeader =
    header != null && (headerBehavior === "fixed" || headerBehavior === "sticky");

  // A docked sidebar sticks below a pinned header. When the header scrolls
  // away (static / reveal-*) or there is no header, it sticks to the top.
  const rowStyle: CSSProperties | undefined =
    hasDocked && !isPinnedHeader
      ? ({ "--appshell-sidebar-top": "0px" } as CSSProperties)
      : undefined;

  const withDockedRow = (contentColumn: ReactNode) =>
    hasDocked ? (
      <div className="flex min-w-0 flex-1 flex-row" style={rowStyle}>
        {dockedSidebars}
        {contentColumn}
      </div>
    ) : (
      contentColumn
    );

  if (!safeArea) {
    return (
      <div className={cn("flex min-h-dvh flex-col relative", className)}>
        {header}
        {withDockedRow(
          <div className="flex min-w-0 flex-1 flex-col">{otherChildren}</div>
        )}
      </div>
    );
  }

  // For static behavior, the header MUST be part of the same scroll container
  // as the content to scroll away.
  if (isStatic) {
    return (
      <SafeArea edges={["top", "bottom"]} className={cn("flex min-h-dvh flex-col relative", className)}>
        {header}
        {withDockedRow(
          <div className="flex flex-col flex-1 min-w-0">
            {otherChildren}
          </div>
        )}
      </SafeArea>
    );
  }

  // For fixed/sticky/reveal behaviors, the header handles its own top safe area
  // and stays pinned or manages its own animation.
  return (
    <div className={cn("flex min-h-dvh flex-col relative", className)}>
      {header && isValidElement(header)
        ? cloneElement(header as ReactElement<HeaderProps>, { forceSafeAreaTop: true })
        : header}
      {withDockedRow(
        <SafeArea edges={["bottom"]} className="flex flex-col flex-1 min-w-0">
          {otherChildren}
        </SafeArea>
      )}
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
