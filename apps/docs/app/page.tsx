import Link from "next/link";
import {
  ArrowRight,
  Smartphone,
  Layers,
  Zap,
  Code2,
  Palette,
  Sparkles,
  Github,
  ChevronRight,
  Menu,
  Home,
  Search,
  Bell,
  User,
} from "lucide-react";

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[280px] md:w-[320px]">
      {/* Phone frame */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground p-2 shadow-2xl ring-1 ring-border/50">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-4 z-20 h-6 w-20 -translate-x-1/2 rounded-full bg-foreground" />
        {/* Screen */}
        <div className="relative h-[540px] overflow-hidden rounded-[2rem] bg-background">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-3 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-muted-foreground/30" />
      </div>
    </div>
  );
}

function DemoScreen() {
  return (
    <div className="relative flex h-full flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary" />
          <span className="font-semibold text-sm">MyApp</span>
        </div>
        <button className="p-2">
          <Menu className="size-5 text-muted-foreground" />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 pb-24">
        <div className="space-y-4">
          <div className="h-32 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-4">
            <p className="text-xs text-muted-foreground">Welcome back</p>
            <p className="text-lg font-semibold">Dashboard</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-lg border bg-card p-3">
              <div className="size-6 rounded-md bg-primary/10" />
              <p className="mt-2 text-xs font-medium">Projects</p>
            </div>
            <div className="h-24 rounded-lg border bg-card p-3">
              <div className="size-6 rounded-md bg-primary/10" />
              <p className="mt-2 text-xs font-medium">Tasks</p>
            </div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="size-10 rounded-full bg-muted" />
                <div className="flex-1">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="mt-1.5 h-2 w-16 rounded bg-muted/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <nav className="absolute bottom-0 inset-x-0 flex items-center justify-around border-t bg-background/95 backdrop-blur px-2 pb-6 pt-2">
        <button className="flex flex-col items-center gap-1 text-primary">
          <Home className="size-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
          <Search className="size-5" />
          <span className="text-[10px]">Search</span>
        </button>
        <button className="relative flex flex-col items-center gap-1 text-muted-foreground">
          <Bell className="size-5" />
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">3</span>
          <span className="text-[10px]">Alerts</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
          <User className="size-5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </div>
  );
}

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First",
    description: "Built for touch interfaces with safe area support and responsive layouts.",
  },
  {
    icon: Layers,
    title: "Composable",
    description: "Mix and match components to create any layout pattern you need.",
  },
  {
    icon: Zap,
    title: "Zero Config",
    description: "Works out of the box with sensible defaults and optional animations.",
  },
  {
    icon: Code2,
    title: "TypeScript",
    description: "Full type safety with comprehensive TypeScript definitions.",
  },
  {
    icon: Palette,
    title: "Themeable",
    description: "Uses CSS custom properties, compatible with shadcn/ui themes.",
  },
  {
    icon: Sparkles,
    title: "Animated",
    description: "Optional Framer Motion adapter for smooth, spring-based animations.",
  },
];

const codeExample = `import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, Bell, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header 
        behavior="reveal-all" 
        logo={<Logo />}
        title="Dashboard"
      />
      <Content className="p-4">
        {/* Your content */}
      </Content>
      <Footer variant="tab-bar">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<Bell />} label="Alerts" badge={3} />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}`;

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-foreground">
              <Layers className="size-4 text-background" />
            </div>
            <span className="font-bold">AppShell</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </Link>
            <Link
              href="https://github.com/fyalavuz/appshell-react"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/fyalavuz/appshell-react"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Github className="size-5" />
            </Link>
            <Link
              href="/docs"
              className="hidden sm:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm">
                  <span className="text-muted-foreground">v0.4.0 — Now Available</span>
                  <ChevronRight className="ml-1 size-4 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
                    Build Mobile-First{" "}
                    <span className="text-primary">React Apps</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-lg text-balance">
                    A composable layout system with scroll-aware headers, tab bars, sidebars,
                    and safe area handling. Built for React, styled with Tailwind.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                  <Link
                    href="/examples"
                    className="inline-flex items-center justify-center rounded-md border bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    View Examples
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-green-500" />
                    <span>MIT Licensed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-blue-500" />
                    <span>TypeScript</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-amber-500" />
                    <span>Tailwind CSS</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <PhoneMockup>
                  <DemoScreen />
                </PhoneMockup>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need for mobile layouts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                AppShell handles the tricky parts of mobile UI: scroll behavior, safe areas,
                and component coordination, so you can focus on building features.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative rounded-xl border bg-card p-6 transition-colors hover:bg-accent/50"
                >
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="border-b py-20 md:py-28 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Simple, declarative API
                </h2>
                <p className="text-lg text-muted-foreground text-balance">
                  Build complex mobile layouts with just a few components. AppShell handles
                  the coordination between header, content, and footer automatically.
                </p>
                <ul className="space-y-3">
                  {[
                    "Scroll-aware headers with 6 behavior modes",
                    "Tab bars, floating buttons, and mini bars",
                    "Slide-out sidebars with backdrop",
                    "Automatic safe area handling",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary">
                        <ChevronRight className="size-3 text-primary-foreground" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/docs/components/app-shell"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View all components
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-xl border bg-zinc-950 shadow-2xl">
                  <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                    <div className="size-3 rounded-full bg-zinc-700" />
                    <div className="size-3 rounded-full bg-zinc-700" />
                    <div className="size-3 rounded-full bg-zinc-700" />
                    <span className="ml-2 text-xs text-zinc-500">app.tsx</span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                    <code className="text-zinc-300">
                      {codeExample.split("\n").map((line, i) => (
                        <div key={i} className="whitespace-pre">
                          <span className="mr-4 inline-block w-6 text-right text-zinc-600">{i + 1}</span>
                          {highlightSyntax(line)}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-2xl border bg-card p-8 text-center md:p-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to build?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto text-balance">
                Get started with AppShell in minutes. Install the package, copy the examples,
                and start building beautiful mobile-first React applications.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/docs/installation"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                  Read the docs
                  <ArrowRight className="ml-2 size-4" />
                </Link>
                <Link
                  href="https://github.com/fyalavuz/appshell-react"
                  className="inline-flex items-center justify-center rounded-md border bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Github className="mr-2 size-4" />
                  Star on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-foreground">
                <Layers className="size-3 text-background" />
              </div>
              <span className="text-sm font-medium">AppShell</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a href="https://github.com/fyalavuz" className="underline underline-offset-4 hover:text-foreground">
                Furkan Yalavuz
              </a>
              . Open source under MIT license.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function highlightSyntax(line: string): React.ReactNode {
  // Simple syntax highlighting
  return line
    .replace(/(import|from|export|default|function|return|const)/g, '<kw>$1</kw>')
    .replace(/(".*?"|'.*?'|`.*?`)/g, '<str>$1</str>')
    .replace(/(\{|\}|\(|\)|<|>|\/)/g, '<punc>$1</punc>')
    .replace(/<kw>(.*?)<\/kw>/g, (_, m) => `<span class="text-pink-400">${m}</span>`)
    .replace(/<str>(.*?)<\/str>/g, (_, m) => `<span class="text-green-400">${m}</span>`)
    .replace(/<punc>(.*?)<\/punc>/g, (_, m) => `<span class="text-zinc-500">${m}</span>`)
    .split(/(<span.*?<\/span>)/)
    .map((part, i) => {
      if (part.startsWith("<span")) {
        return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
      }
      return part;
    });
}
