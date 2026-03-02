"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@appshell/react";
import { categories } from "./example-data";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {categories.map((category) => (
        <div key={category.id}>
          <h4 className="mb-2 px-2 text-sm font-semibold tracking-tight text-foreground">
            {category.title}
          </h4>
          <div className="space-y-0.5">
            {category.examples.map((example) => {
              const isActive =
                pathname === `/${example.slug}` ||
                pathname === `/preview/${example.slug}`;
              return (
                <Link
                  key={example.slug}
                  href={`/preview/${example.slug}`}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
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
    </nav>
  );
}
