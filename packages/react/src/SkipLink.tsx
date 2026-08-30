"use client";

import { memo } from "react";
import { cn } from "./cn";
import { CONTENT_ID } from "./Content";
import { useLabel } from "./I18nContext";

export interface SkipLinkProps {
  /** Element to jump to. Defaults to Content's id. */
  targetId?: string;
  /** Overrides the `skipToContent` label. */
  children?: string;
  className?: string;
}

/**
 * The first focusable thing on the page: one Tab from a cold load, and a
 * keyboard user is past the header, the navigation and the search row.
 * Invisible until it takes focus.
 *
 * `<AppShell skipToContent>` renders it for you; use it directly only if you
 * are not using AppShell.
 */
export const SkipLink = memo(function SkipLink({
  targetId = CONTENT_ID,
  children,
  className,
}: SkipLinkProps) {
  const label = useLabel("skipToContent", undefined, children);

  return (
    <a
      href={`#${targetId}`}
      data-skip-link
      onClick={(e) => {
        // Moving focus explicitly: the hash alone scrolls without focusing in
        // several browsers, which leaves the keyboard where it started.
        const target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        target.focus();
        target.scrollIntoView({ block: "start" });
      }}
      className={cn(
        "sr-only z-[100] rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg outline-none ring-2 ring-ring",
        "focus-visible:not-sr-only focus-visible:fixed focus-visible:start-4 focus-visible:top-4",
        className
      )}
      style={{
        // Clear of the status bar when it lands on a notched phone.
        marginTop: "var(--appshell-safe-area-inset-top, env(safe-area-inset-top, 0px))",
      }}
    >
      {label}
    </a>
  );
});

SkipLink.displayName = "SkipLink";
