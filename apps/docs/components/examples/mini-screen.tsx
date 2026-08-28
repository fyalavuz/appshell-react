import { cn } from "@/lib/utils";

/**
 * Miniature animated wireframe of what each example does.
 * Pure CSS — the parent card's hover starts the loop (see .ms-anim in globals).
 * The highlighted element (brand tint) is the part the example is about.
 */

function Row({ className }: { className?: string }) {
  return <div className={cn("rounded-[3px] bg-foreground/12", className)} />;
}

function Lines({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-1.5 px-2.5", className)}>
      <Row className="h-1.5 w-3/4" />
      <Row className="h-1.5 w-full" />
      <Row className="h-1.5 w-5/6" />
      <Row className="h-6 w-full bg-foreground/6" />
      <Row className="h-1.5 w-2/3" />
      <Row className="h-1.5 w-full" />
      <Row className="h-6 w-full bg-foreground/6" />
      <Row className="h-1.5 w-3/4" />
    </div>
  );
}

function HeaderBlock({
  rows = 1,
  highlightRows,
}: {
  rows?: number;
  highlightRows?: number[];
}) {
  return (
    <div className="absolute inset-x-0 top-0 z-10 space-y-px">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-1.5 px-2.5",
            i === 0 ? "h-6" : "h-4",
            highlightRows?.includes(i)
              ? "bg-brand/20"
              : "bg-muted"
          )}
        >
          <span
            className={cn(
              "rounded-full",
              i === 0 ? "size-2" : "h-1 w-6",
              highlightRows?.includes(i) ? "bg-brand" : "bg-foreground/25"
            )}
          />
          {i === 0 && (
            <>
              <span className="h-1 w-8 rounded-full bg-foreground/25" />
              <span className="ml-auto size-1.5 rounded-full bg-foreground/25" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

/** Animated wrapper helper — sets the keyframe name on a positioned layer. */
function Anim({
  name,
  className,
  children,
  delay,
}: {
  name: string;
  className?: string;
  children?: React.ReactNode;
  delay?: string;
}) {
  return (
    <div
      className={cn("ms-anim", className)}
      style={{ animationName: name, animationDelay: delay }}
    >
      {children}
    </div>
  );
}

function TabBarBlock({ highlight = true }: { highlight?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-6 items-center justify-around border-t px-2",
        highlight ? "border-brand/30 bg-brand/15" : "border-border bg-muted"
      )}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "size-1.5 rounded-full",
            i === 0 && highlight ? "bg-brand" : "bg-foreground/25"
          )}
        />
      ))}
    </div>
  );
}

export function MiniScreen({ slug }: { slug: string }) {
  return (
    <div
      aria-hidden
      className="relative aspect-[5/4] overflow-hidden rounded-lg border bg-background shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]"
    >
      {renderMotif(slug)}
    </div>
  );
}

function renderMotif(slug: string) {
  switch (slug) {
    case "fixed-header":
    case "sticky-header":
      return (
        <>
          <div className="absolute inset-x-0 top-0 z-10 flex h-6 items-center gap-1.5 bg-brand/20 px-2.5">
            <span className="size-2 rounded-full bg-brand" />
            <span className="h-1 w-8 rounded-full bg-foreground/25" />
          </div>
          <Anim name="ms-drift" className="absolute inset-x-0 top-8">
            <Lines />
          </Anim>
        </>
      );

    case "static-header":
      return (
        <Anim name="ms-drift" className="absolute inset-x-0 top-0">
          <div className="mb-2 flex h-6 items-center gap-1.5 bg-brand/20 px-2.5">
            <span className="size-2 rounded-full bg-brand" />
            <span className="h-1 w-8 rounded-full bg-foreground/25" />
          </div>
          <Lines />
        </Anim>
      );

    case "reveal-all":
      return (
        <>
          <Anim name="ms-peek-up" className="absolute inset-x-0 top-0 z-10">
            <div className="flex h-6 items-center gap-1.5 bg-brand/20 px-2.5">
              <span className="size-2 rounded-full bg-brand" />
              <span className="h-1 w-8 rounded-full bg-foreground/25" />
            </div>
            <div className="flex h-4 items-center bg-brand/15 px-2.5">
              <span className="h-1 w-12 rounded-full bg-brand/70" />
            </div>
            <div className="flex h-4 items-center bg-brand/10 px-2.5">
              <span className="h-1.5 w-full rounded-full bg-foreground/12" />
            </div>
          </Anim>
          <div className="absolute inset-x-0 top-[3.75rem]">
            <Lines />
          </div>
        </>
      );

    case "reveal-nav":
      return (
        <>
          <Anim name="ms-peek-up" className="absolute inset-x-0 top-0 z-10">
            <div className="flex h-6 items-center gap-1.5 bg-brand/20 px-2.5">
              <span className="size-2 rounded-full bg-brand" />
              <span className="ml-auto flex gap-1">
                <span className="h-1 w-4 rounded-full bg-brand" />
                <span className="h-1 w-4 rounded-full bg-foreground/20" />
                <span className="h-1 w-4 rounded-full bg-foreground/20" />
              </span>
            </div>
          </Anim>
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
        </>
      );

    case "reveal-search":
      return (
        <>
          <Anim name="ms-peek-up" className="absolute inset-x-0 top-0 z-10">
            <div className="flex h-6 items-center gap-1.5 bg-muted px-2.5">
              <span className="size-2 rounded-full bg-foreground/25" />
              <span className="h-1 w-8 rounded-full bg-foreground/25" />
            </div>
            <div className="flex h-5 items-center bg-brand/15 px-2.5">
              <span className="h-2.5 w-full rounded-full border border-brand/50 bg-background" />
            </div>
          </Anim>
          <div className="absolute inset-x-0 top-[3.25rem]">
            <Lines />
          </div>
        </>
      );

    case "sticky-tabs":
      return (
        <>
          <div className="absolute inset-x-0 top-0 z-10">
            <div className="flex h-6 items-center gap-1.5 bg-muted px-2.5">
              <span className="size-2 rounded-full bg-foreground/25" />
              <span className="h-1 w-8 rounded-full bg-foreground/25" />
            </div>
            <div className="flex h-4 items-center gap-2 bg-brand/15 px-2.5">
              <span className="h-1 w-6 rounded-full bg-brand" />
              <span className="h-1 w-6 rounded-full bg-foreground/20" />
              <span className="h-1 w-6 rounded-full bg-foreground/20" />
            </div>
          </div>
          <Anim name="ms-drift" className="absolute inset-x-0 top-12">
            <Lines />
          </Anim>
        </>
      );

    case "tab-bar":
      return (
        <>
          <HeaderBlock rows={1} />
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
          <Anim name="ms-peek-down" className="absolute inset-x-0 bottom-0 z-10">
            <TabBarBlock />
          </Anim>
        </>
      );

    case "floating-footer":
      return (
        <>
          <HeaderBlock rows={1} />
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
          <Anim
            name="ms-bob"
            className="absolute inset-x-0 bottom-2 z-10 flex justify-center"
          >
            <span className="h-4 w-14 rounded-full bg-brand shadow-md" />
          </Anim>
        </>
      );

    case "mini-footer":
      return (
        <>
          <HeaderBlock rows={1} />
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
          <Anim name="ms-rise" delay="-1.4s" className="absolute inset-x-0 bottom-0 z-10">
            <div className="flex h-5 items-center gap-1.5 border-t border-brand/30 bg-brand/15 px-2.5">
              <span className="size-2 rounded-sm bg-brand" />
              <span className="h-1 w-10 rounded-full bg-foreground/25" />
              <span className="ml-auto size-1.5 rounded-full bg-brand" />
            </div>
          </Anim>
        </>
      );

    case "sidebar":
      return (
        <>
          <HeaderBlock rows={1} />
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
          <Anim
            name="ms-drawer-in"
            delay="-1.3s"
            className="absolute bottom-0 left-0 top-0 z-20 w-2/5 border-r border-brand/30 bg-background shadow-lg"
          >
            <div className="space-y-1.5 p-2">
              <span className="block h-1.5 w-3/4 rounded-full bg-brand" />
              <span className="block h-1.5 w-full rounded-full bg-foreground/15" />
              <span className="block h-1.5 w-5/6 rounded-full bg-foreground/15" />
              <span className="block h-1.5 w-2/3 rounded-full bg-foreground/15" />
            </div>
          </Anim>
        </>
      );

    case "scroll-nav":
      return (
        <>
          <HeaderBlock rows={1} />
          <div className="absolute inset-x-0 top-7 z-10 overflow-hidden">
            <Anim name="ms-slide-x" className="flex w-[150%] gap-1.5 px-2.5 py-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-3 w-9 shrink-0 rounded-full",
                    i === 0 ? "bg-brand" : "bg-muted"
                  )}
                />
              ))}
            </Anim>
          </div>
          <div className="absolute inset-x-0 top-14 grid grid-cols-2 gap-1.5 px-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="h-8 rounded-md bg-foreground/6" />
            ))}
          </div>
        </>
      );

    case "in-page-nav":
      return (
        <>
          <HeaderBlock rows={1} />
          <div className="absolute inset-x-0 top-7 z-10 flex gap-1.5 px-2.5 py-1">
            <Anim
              name="ms-pulse"
              className="h-3 w-9 rounded-full bg-brand/80"
            />
            <span className="h-3 w-9 rounded-full bg-muted" />
            <span className="h-3 w-9 rounded-full bg-muted" />
          </div>
          <Anim name="ms-drift" className="absolute inset-x-0 top-14">
            <Lines />
          </Anim>
        </>
      );

    case "desktop-nav":
      return (
        <>
          <div className="absolute inset-x-0 top-0 z-10 flex h-6 items-center gap-1.5 bg-muted px-2.5">
            <span className="size-2 rounded-full bg-brand" />
            <span className="ml-2 flex gap-1.5">
              <span className="h-1 w-5 rounded-full bg-brand" />
              <span className="h-1 w-5 rounded-full bg-foreground/20" />
              <span className="h-1 w-5 rounded-full bg-foreground/20" />
            </span>
            <span className="ml-auto h-2.5 w-7 rounded-sm bg-brand" />
          </div>
          <Anim
            name="ms-invert"
            delay="-1.7s"
            className="absolute left-8 top-6 z-20 w-1/2 rounded-md border border-brand/30 bg-background p-1.5 shadow-lg"
          >
            <div className="space-y-1">
              <span className="block h-1.5 w-3/4 rounded-full bg-foreground/20" />
              <span className="block h-1.5 w-full rounded-full bg-foreground/12" />
              <span className="block h-1.5 w-2/3 rounded-full bg-foreground/12" />
            </div>
          </Anim>
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
        </>
      );

    case "safe-area":
      return (
        <>
          <Anim
            name="ms-pulse"
            className="absolute inset-x-0 top-0 z-20 h-4 bg-brand/30"
          />
          <Anim
            name="ms-pulse"
            delay="0.4s"
            className="absolute inset-x-0 bottom-0 z-20 h-3 bg-brand/30"
          />
          <HeaderBlock rows={1} />
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
        </>
      );

    case "reveal-combined":
      return (
        <>
          <Anim name="ms-peek-up" className="absolute inset-x-0 top-0 z-10">
            <div className="flex h-6 items-center gap-1.5 bg-brand/20 px-2.5">
              <span className="size-2 rounded-full bg-brand" />
              <span className="h-1 w-8 rounded-full bg-foreground/25" />
            </div>
          </Anim>
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
          <Anim name="ms-peek-down" className="absolute inset-x-0 bottom-0 z-10">
            <TabBarBlock />
          </Anim>
        </>
      );

    case "header-themes":
      return (
        <>
          <div className="absolute inset-x-0 top-0 z-10 h-6 bg-muted">
            <Anim name="ms-invert" delay="-1.7s" className="absolute inset-0 bg-brand/70" />
            <div className="relative flex h-full items-center gap-1.5 px-2.5">
              <span className="size-2 rounded-full bg-foreground/40" />
              <span className="h-1 w-8 rounded-full bg-foreground/30" />
            </div>
          </div>
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
        </>
      );

    case "dark-mode":
      return (
        <>
          <Anim name="ms-invert" delay="-1.7s" className="absolute inset-0 z-20 bg-foreground/85">
            <div className="flex h-6 items-center gap-1.5 px-2.5">
              <span className="size-2 rounded-full bg-brand" />
              <span className="h-1 w-8 rounded-full bg-background/40" />
            </div>
            <div className="mt-2 space-y-1.5 px-2.5">
              <span className="block h-1.5 w-3/4 rounded-full bg-background/30" />
              <span className="block h-1.5 w-full rounded-full bg-background/20" />
              <span className="block h-6 w-full rounded-[3px] bg-background/10" />
            </div>
          </Anim>
          <HeaderBlock rows={1} />
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
        </>
      );

    default:
      return (
        <>
          <HeaderBlock rows={1} />
          <div className="absolute inset-x-0 top-8">
            <Lines />
          </div>
        </>
      );
  }
}
