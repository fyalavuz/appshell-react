"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, SlidersHorizontal } from "lucide-react";
import { MotionProvider, Sidebar } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { categories } from "@/lib/registry";
import { cn } from "@/lib/utils";

function ExamplesNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="py-6 pr-4 lg:py-8">
      <Link
        href="/playground"
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <SlidersHorizontal className="size-4 text-brand" />
        Playground
      </Link>
      {categories.map((category) => (
        <div key={category.id} className="mt-6">
          <p className="eyebrow mb-2 px-2 text-muted-foreground/70">
            {category.title}
          </p>
          <ul className="space-y-0.5 text-sm">
            {category.examples.map((example) => {
              const href = `/examples/${example.slug}`;
              const active = pathname === href || pathname === `${href}/`;
              return (
                <li key={example.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "block truncate rounded-md px-2 py-1.5 transition-colors",
                      active
                        ? "bg-brand/10 font-medium text-brand"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {example.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** Cross-example navigation — the library's docked Sidebar, dogfooded. */
export function ExamplesSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div
        className="contents"
        style={{ "--appshell-sidebar-top": "3.5rem" } as React.CSSProperties}
      >
        <MotionProvider adapter={framerMotionAdapter}>
        <Sidebar
          variant="docked"
          breakpoint="lg"
          width="14rem"
          open={open}
          onClose={() => setOpen(false)}
          className="bg-background"
        >
          <ExamplesNav onNavigate={() => setOpen(false)} />
        </Sidebar>
        </MotionProvider>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border bg-background/95 py-2.5 pl-4 pr-5 text-sm font-medium shadow-lg backdrop-blur transition-colors hover:border-brand/40 lg:hidden"
      >
        <LayoutGrid className="size-4" />
        All examples
      </button>
    </>
  );
}
