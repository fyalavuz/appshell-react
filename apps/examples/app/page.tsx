import Link from "next/link";
import {
  PanelTop,
  ChevronRight,
  Smartphone,
  Palette,
  Zap,
  Shield,
  Accessibility,
  Sparkles,
  Github,
} from "lucide-react";
import { categories } from "./_components/example-data";

const features = [
  {
    icon: Zap,
    title: "Scroll-aware",
    description: "Headers reveal, hide, and stick based on scroll direction.",
  },
  {
    icon: Shield,
    title: "Zero Dependencies",
    description: "Pure React with optional Framer Motion adapter.",
  },
  {
    icon: Palette,
    title: "Dark Mode",
    description: "Full shadcn token system with OKLch color space.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description: "Touch-optimized with safe area and viewport support.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description: "Semantic HTML, keyboard navigation, ARIA labels.",
  },
  {
    icon: Sparkles,
    title: "Framer Motion",
    description: "Optional motion adapter for smooth animations.",
  },
];

const featured = ["fixed-header", "tab-bar", "sidebar"];

export default function ExamplesPage() {
  const allExamples = categories.flatMap((c) => c.examples);
  const featuredExamples = allExamples.filter((e) =>
    featured.includes(e.slug)
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <div className="size-6 rounded bg-primary flex items-center justify-center">
              <PanelTop className="size-4 text-primary-foreground" />
            </div>
            <span>AppShell</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/preview/fixed-header"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Examples
            </Link>
            <a
              href="https://github.com/fyalavuz/react-appshell"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-5" />
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="container mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Mobile-first App Shell
              <br />
              <span className="text-muted-foreground">for React</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Scroll-aware headers, auto-hiding footers, sidebars, and tab bars.
              Built with shadcn-compatible tokens, zero dependencies, and
              optional Framer Motion.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/preview/fixed-header"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Browse Examples
                <ChevronRight className="size-4" />
              </Link>
              <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2.5 font-mono text-sm text-muted-foreground">
                <span className="text-primary">$</span> npm install
                react-appshell
              </div>
            </div>
          </div>
        </section>

        {/* Featured previews */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <h2 className="mb-10 text-center text-2xl font-bold tracking-tight">
              Interactive Previews
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {featuredExamples.map((example) => (
                <Link
                  key={example.slug}
                  href={`/preview/${example.slug}`}
                  className="group flex flex-col items-center gap-4"
                >
                  {/* Mini phone frame */}
                  <div
                    className="relative mx-auto overflow-hidden rounded-[1.5rem] border-[5px] border-foreground/80 bg-foreground/80 shadow-lg transition-transform group-hover:scale-[1.02]"
                    style={{ width: 180, height: 368 }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-4 w-[72px] rounded-b-xl bg-foreground/80" />
                    <div className="h-full w-full overflow-hidden rounded-[1.2rem] bg-background">
                      <iframe
                        src={`/${example.slug}`}
                        title={example.title}
                        className="h-full w-full border-0 pointer-events-none"
                        tabIndex={-1}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {example.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {example.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="mb-10 text-2xl font-bold tracking-tight">
            All Components
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.examples[0].icon;
              return (
                <Link
                  key={category.id}
                  href={`/preview/${category.examples[0].slug}`}
                  className="group rounded-xl border bg-card p-6 transition-all hover:bg-accent/50 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {category.examples.length} examples
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold tracking-tight group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {category.examples.map((e) => e.title).join(", ")}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <h2 className="mb-10 text-2xl font-bold tracking-tight">
              Built for Production
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border bg-card p-6"
                  >
                    <Icon className="size-5 text-primary" />
                    <h3 className="mt-3 font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 react-appshell. MIT Licensed.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/fyalavuz/react-appshell"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/react-appshell"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                NPM
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
