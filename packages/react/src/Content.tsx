import { memo } from "react";
import type { ContentProps } from "./types";
import { cn } from "./cn";

/**
 * Where <AppShell skipToContent> sends focus. Content carries it by default
 * so the two ends of the skip link never have to be wired up by hand.
 */
export const CONTENT_ID = "appshell-content";

export const Content = memo(function Content({
  id = CONTENT_ID,
  className,
  children,
}: ContentProps) {
  return (
    <main
      id={id}
      // Focusable only as a skip-link target: -1 keeps it out of the tab
      // order but lets focus land here.
      tabIndex={-1}
      className={cn("flex-1 outline-none", className)}
      // A Footer is fixed to the bottom of the viewport, so the last thing on
      // the page would sit underneath it. Reserve exactly its height — the
      // Footer publishes it — instead of leaving every screen to guess a
      // padding value. Margin rather than padding so a className of your own
      // (pb-*) still composes; resolves to 0px when there is no Footer.
      style={{ marginBottom: "var(--appshell-footer-height, 0px)" }}
    >
      {children}
    </main>
  );
});
