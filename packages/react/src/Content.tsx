import { memo } from "react";
import type { ContentProps } from "./types";
import { cn } from "./cn";

export const Content = memo(function Content({ className, children }: ContentProps) {
  return (
    <main
      className={cn("flex-1", className)}
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
