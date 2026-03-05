import Link from "next/link";
import { Layers, PanelTop, PanelBottom, Square, Menu } from "lucide-react";

export const metadata = {
  title: "Components",
  description: "All AppShell components for building mobile-first layouts.",
};

const components = [
  {
    name: "AppShell",
    description: "Root layout component with safe area support",
    href: "/docs/components/app-shell",
    icon: Layers,
  },
  {
    name: "Header",
    description: "Scroll-aware header with 6 behavior modes",
    href: "/docs/components/header",
    icon: PanelTop,
  },
  {
    name: "Footer",
    description: "Tab bars, floating buttons, and mini bars",
    href: "/docs/components/footer",
    icon: PanelBottom,
  },
  {
    name: "Content",
    description: "Main scrollable content area",
    href: "/docs/components/content",
    icon: Square,
  },
  {
    name: "Sidebar",
    description: "Slide-out drawer with backdrop",
    href: "/docs/components/sidebar",
    icon: Menu,
  },
];

export default function ComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Components
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          Explore all the components available in AppShell for building mobile-first layouts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="group relative rounded-xl border bg-card p-6 transition-colors hover:bg-accent/50"
          >
            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <component.icon className="size-5 text-primary" />
            </div>
            <h3 className="font-semibold">{component.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{component.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
