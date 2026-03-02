"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@appshell/react";
import { Menu, X, ChevronLeft } from "lucide-react";
import { categories } from "./example-data";

/** Floating sidebar that appears on example pages for quick navigation. */
export function FloatingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide on landing page — it has its own nav
  const isLanding = pathname === "/";
  // Hide on preview pages — they already have a built-in sidebar
  const isPreview = pathname.startsWith("/preview");

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isLanding || isPreview) return null;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed top-4 left-4 z-[9999] flex items-center gap-1.5 rounded-full border bg-background/95 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur transition-all hover:shadow-xl",
          open && "bg-accent"
        )}
      >
        {open ? (
          <X className="size-4" />
        ) : (
          <Menu className="size-4" />
        )}
        <span className="hidden sm:inline">Examples</span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <nav
        className={cn(
          "fixed top-0 left-0 z-[9999] h-full w-72 border-r bg-background p-6 pt-16 overflow-y-auto shadow-2xl transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Link
          href="/"
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-3.5" />
          Back to Home
        </Link>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id}>
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                {category.title}
              </h4>
              <div className="space-y-0.5">
                {category.examples.map((example) => {
                  const isActive = pathname === `/${example.slug}`;
                  return (
                    <Link
                      key={example.slug}
                      href={`/${example.slug}`}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <example.icon className="size-4 shrink-0" />
                      {example.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-4">
          <Link
            href={`/preview${pathname}`}
            className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View in Preview Mode →
          </Link>
        </div>
      </nav>
    </>
  );
}
