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
  ArrowRight,
  Monitor,
  Layout,
  Layers,
  Touchpad,
} from "lucide-react";
import { categories } from "./_components/example-data";
import { cn } from "appshell-react";

const features = [
  {
    icon: Zap,
    title: "Scroll-aware",
    description: "Headers reveal, hide, and stick based on scroll direction with zero-lag performance.",
    color: "text-amber-500"
  },
  {
    icon: Sparkles,
    title: "Premium Motion",
    description: "Optional Framer Motion adapter for high-end spring-based animations and layout transitions.",
    color: "text-purple-500"
  },
  {
    icon: Smartphone,
    title: "Native Feel",
    description: "Built-in safe area support for iOS/Android notches and home indicators.",
    color: "text-emerald-500"
  },
  {
    icon: Shield,
    title: "Typesafe & Small",
    description: "Written in TypeScript with zero production dependencies. < 5KB gzipped.",
    color: "text-blue-500"
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Full control over themes, speeds, and behaviors via a simple declarative API.",
    color: "text-rose-500"
  },
  {
    icon: Accessibility,
    title: "Enterprise Ready",
    description: "Fully accessible with ARIA labels, keyboard support, and semantic HTML.",
    color: "text-cyan-500"
  },
];

export default function ExamplesPage() {
  const showcase = categories.find(c => c.id === "showcase")?.examples[0];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10 font-sans">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
          <div className="flex items-center gap-2.5 font-bold tracking-tight text-lg">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <PanelTop className="size-5 text-primary-foreground" />
            </div>
            <span>AppShell <span className="text-muted-foreground font-medium">React</span></span>
          </div>
          <nav className="ml-auto flex items-center gap-1 sm:gap-6">
            <Link
              href="#examples"
              className="hidden sm:block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Components
            </Link>
            <a
              href="https://github.com/fyalavuz/appshell-react"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <Github className="size-5" />
            </a>
            <Link
              href="/kitchen-sink"
              className="ml-2 inline-flex h-9 items-center justify-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Pro Demo
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 animate-in fade-in slide-in-from-bottom-3 duration-1000">
                  <Sparkles className="size-3" />
                  Now with Framer Motion support
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 text-balance">
                  The <span className="text-primary">Pro</span> App Shell for React
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 text-balance">
                  Build native-feeling web apps with scroll-aware headers, auto-hiding footers, and smooth sidebars. Zero-JS deps by default.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <Link
                    href="/kitchen-sink"
                    className="h-14 inline-flex items-center gap-2 rounded-2xl bg-primary px-8 text-base font-bold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20"
                  >
                    View Pro Showcase
                    <ArrowRight className="size-5" />
                  </Link>
                  <div className="h-14 inline-flex items-center gap-3 rounded-2xl bg-muted px-6 font-mono text-sm border shadow-sm">
                    <span className="text-primary font-bold">npm</span> install appshell-react
                  </div>
                </div>
              </div>

              {/* Visual Preview */}
              <div className="flex-1 relative w-full max-w-[500px]">
                <div className="relative z-10 animate-in fade-in zoom-in duration-1000 delay-300">
                  <div className="relative mx-auto w-[280px] h-[580px] rounded-[3rem] border-[8px] border-foreground/90 bg-foreground/90 shadow-2xl overflow-hidden ring-4 ring-primary/10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 h-6 w-[120px] rounded-b-2xl bg-foreground/90" />
                    <div className="h-full w-full overflow-hidden rounded-[2.5rem] bg-background">
                      <iframe
                        src="/kitchen-sink"
                        title="Pro Showcase"
                        className="h-full w-full border-0 pointer-events-none"
                        tabIndex={-1}
                      />
                    </div>
                  </div>
                  {/* Floating badges */}
                  <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-card border shadow-xl animate-bounce duration-[3000ms]">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <Smartphone className="size-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Safe Area</div>
                        <div className="text-[10px] text-muted-foreground">iPhone 16 Support</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -left-12 p-4 rounded-2xl bg-card border shadow-xl animate-pulse duration-[4000ms]">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Zap className="size-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">60 FPS</div>
                        <div className="text-[10px] text-muted-foreground">Zero-lag Reveal</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-primary/20 rounded-full blur-[100px] -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 border-y bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need for mobile web</h2>
              <p className="text-muted-foreground text-lg">Built with modern React patterns and the highest performance standards.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group relative rounded-3xl border bg-card p-8 transition-all hover:bg-accent/30 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className={cn("size-12 rounded-2xl bg-background border flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform", feature.color)}>
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Components Library */}
        <section id="examples" className="py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-balance">Components Library</h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Explore all building blocks and interaction patterns available in the library.
                </p>
              </div>
            </div>

            <div className="space-y-16">
              {categories.filter(c => c.id !== "showcase").map((category) => (
                <div key={category.id}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-border" />
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground px-4">
                      {category.title}
                    </h3>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {category.examples.map((example) => (
                      <Link
                        key={example.slug}
                        href={`/preview/${example.slug}`}
                        className="group flex flex-col rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="aspect-[4/3] bg-muted relative overflow-hidden flex items-center justify-center group-hover:bg-accent/50 transition-colors">
                          <example.icon className="size-12 text-muted-foreground/30 group-hover:scale-110 group-hover:text-primary/40 transition-all duration-500" />
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                              <ArrowRight className="size-4" />
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{example.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {example.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2.5 font-bold tracking-tight mb-8">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <PanelTop className="size-4 text-primary-foreground" />
            </div>
            <span>AppShell</span>
          </div>
          <p className="text-muted-foreground mb-8">
            The standard library for mobile-first web applications in React.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-medium">
            <a href="https://github.com/fyalavuz/appshell-react" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/package/appshell-react" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">NPM</a>
            <Link href="/kitchen-sink" className="hover:text-primary transition-colors">Showcase</Link>
          </div>
          <div className="mt-12 text-xs text-muted-foreground border-t pt-8">
            &copy; 2026 appshell-react. MIT Licensed. Crafted for performance.
          </div>
        </div>
      </footer>
    </div>
  );
}
