"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Shared building blocks for the fullscreen example demos.
 * Keep these deliberately small — each demo should feel like its own app,
 * not a template.
 */

/** One-line instruction chip pinned near the top of a demo's content. */
export function DemoHint({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-4 my-3 flex items-center gap-2 rounded-lg border border-dashed px-3 py-2",
        "text-xs text-muted-foreground",
        className
      )}
    >
      <svg
        className="size-3.5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
      <span>{children}</span>
    </div>
  );
}

/** Initials avatar with a per-app tint. */
export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full",
        "bg-muted text-xs font-semibold text-muted-foreground",
        className
      )}
    >
      {initials}
    </div>
  );
}

/** Flat tonal media placeholder — no photo soup, just calm surfaces. */
export function MediaBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-xl bg-muted",
        className
      )}
    >
      {children}
    </div>
  );
}
