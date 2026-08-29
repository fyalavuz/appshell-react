"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MotionProvider, Sidebar } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { docsNavigation } from "@/lib/registry";
import { cn } from "@/lib/utils";

function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="py-6 pr-4 md:py-8">
      {docsNavigation.map((section, index) => (
        <div key={section.title} className={cn(index > 0 && "mt-7")}>
          <p className="eyebrow mb-2 px-2 text-muted-foreground/70">
            {section.title}
          </p>
          <ul className="space-y-0.5 text-sm">
            {section.items.map((item) => {
              const active =
                pathname === item.href || pathname === `${item.href}/`;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-md px-2 py-1.5 transition-colors",
                      active
                        ? "bg-brand/10 font-medium text-brand"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.title}
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

/**
 * The docs navigation — dogfooding the library's own docked Sidebar.
 * Docked below the site header on md+, the same nav opens as an overlay
 * drawer from the mobile toggle bar below md.
 */
export function DocsSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* --appshell-sidebar-top clears the sticky site header (h-14). */}
      <div
        className="contents"
        style={{ "--appshell-sidebar-top": "3.5rem" } as React.CSSProperties}
      >
        <MotionProvider adapter={framerMotionAdapter}>
        <Sidebar
          variant="docked"
          breakpoint="md"
          width="14rem"
          open={open}
          onClose={() => setOpen(false)}
          className="bg-background"
        >
          <DocsNav onNavigate={() => setOpen(false)} />
        </Sidebar>
        </MotionProvider>
      </div>

      {/* Mobile: slim bar with the drawer trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border bg-background/95 py-2.5 pl-4 pr-5 text-sm font-medium shadow-lg backdrop-blur transition-colors hover:border-brand/40 md:hidden"
      >
        <Menu className="size-4" />
        Docs menu
      </button>
    </>
  );
}
