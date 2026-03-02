import Link from "next/link";
import {
  ChevronRight,
  PanelTop,
  Palette,
  Rows3,
  Rows2,
  Orbit,
  Minus,
  PanelLeft,
  Navigation,
  GripHorizontal,
  Smartphone,
  Layout,
  PanelBottom,
  Square,
  ArrowUp,
  Layers,
  MousePointer2,
  Columns,
  Box,
  StickyNote,
} from "lucide-react";

const categories = [
  {
    title: "Header Behaviors",
    description: "Fixed, static, and scroll-aware reveal patterns",
    examples: [
      {
        slug: "fixed-header",
        title: "Fixed Header",
        desc: "Stays pinned at the top",
        props: 'behavior="fixed"',
        icon: PanelTop,
      },
      {
        slug: "static-header",
        title: "Static Header",
        desc: "Scrolls naturally with content",
        props: 'behavior="static"',
        icon: Minus,
      },
      {
        slug: "reveal-top",
        title: "Reveal Nav",
        desc: "Shows top row on scroll up",
        props: 'behavior="reveal-nav"',
        icon: Rows3,
      },
      {
        slug: "reveal-all",
        title: "Reveal All",
        desc: "Reveals all rows on scroll up",
        props: 'behavior="reveal-all"',
        icon: Layers,
      },
      {
        slug: "reveal-combined",
        title: "Reveal Combined",
        desc: "Combined Reveal Header + Auto-hide Footer",
        props: "Hybrid interaction",
        icon: Layout,
      },
      {
        slug: "sticky-tabs",
        title: "Sticky Tabs",
        desc: "Secondary tabs that stick after header",
        props: "Sub-navigation pattern",
        icon: StickyNote,
      },
    ],
  },
  {
    title: "Footer Variants",
    description: "Tab bars, floating buttons, and mini toolbars",
    examples: [
      {
        slug: "tab-bar",
        title: "Tab Bar",
        desc: "Standard mobile navigation",
        props: 'variant="tab-bar"',
        icon: Navigation,
      },
      {
        slug: "floating-footer",
        title: "Floating Action",
        desc: "Elevated FAB button",
        props: 'variant="floating"',
        icon: MousePointer2,
      },
      {
        slug: "mini-footer",
        title: "Contextual Bar",
        desc: "Compact toolbar or input",
        props: 'variant="mini"',
        icon: GripHorizontal,
      },
    ],
  },
  {
    title: "Layout Patterns",
    description: "Complete page structures and combinations",
    examples: [
      {
        slug: "sidebar",
        title: "Sidebar Menu",
        desc: "Responsive slide-out drawer",
        props: "Mobile-first side nav",
        icon: PanelLeft,
      },
      {
        slug: "desktop-nav",
        title: "Desktop Optimized",
        desc: "Horizontal nav with dropdowns",
        props: "Adapts to larger screens",
        icon: Columns,
      },
      {
        slug: "responsive",
        title: "Fully Responsive",
        desc: "Adaptive shell across viewports",
        props: "Auto-switching layout",
        icon: Smartphone,
      },
      {
        slug: "scroll-nav",
        title: "Scroll Navigation",
        desc: "Pill-style scrollable tabs",
        props: "Perfect for categories",
        icon: Box,
      },
    ],
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <div className="size-6 rounded bg-primary flex items-center justify-center">
              <PanelTop className="size-4 text-primary-foreground" />
            </div>
            <span>AppShell Examples</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Documentation
            </Link>
            <a
              href="https://github.com/fyalavuz/react-appshell"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-16 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Live Previews
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore various mobile-first app shell patterns built with shadcn-compatible components.
            Every example is fully responsive and interactive.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2.5 font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> npm install @appshell/react
          </div>
        </div>

        <div className="space-y-20">
          {categories.map((category) => (
            <section key={category.title}>
              <div className="mb-8 border-b pb-4">
                <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.examples.map((example) => (
                  <Link
                    key={example.slug}
                    href={`/${example.slug}`}
                    className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:bg-accent/50 hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <example.icon className="size-6" />
                      </div>
                      <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <div className="mt-6">
                      <h3 className="font-bold tracking-tight transition-colors group-hover:text-primary">
                        {example.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {example.desc}
                      </p>
                    </div>
                    <div className="mt-4 inline-flex items-center rounded-md bg-muted px-2 py-1 font-mono text-[10px] font-medium text-muted-foreground">
                      {example.props}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="mt-20 border-t bg-muted/30 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 @appshell/react. MIT Licensed.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://github.com/fyalavuz/react-appshell" target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-primary">GitHub</a>
              <a href="https://www.npmjs.com/package/@appshell/react" target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-primary">NPM</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
