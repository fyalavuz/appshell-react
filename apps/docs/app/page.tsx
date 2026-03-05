import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { PhoneMockup } from "@/components/docs/phone-mockup";
import { CodeBlock } from "@/components/docs/code-block";
import { categories } from "@/lib/registry";
import {
  ArrowRight,
  Layers,
  Smartphone,
  Paintbrush,
  Zap,
  Moon,
  Accessibility,
  Github,
  Terminal,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First",
    description:
      "Built for mobile from the ground up with safe areas, gesture support, and native-like interactions.",
  },
  {
    icon: Layers,
    title: "Composable",
    description:
      "Flexible composition patterns let you build any layout from headers to sidebars to tab bars.",
  },
  {
    icon: Paintbrush,
    title: "Themeable",
    description:
      "Uses shadcn/ui design tokens out of the box. Dark mode works automatically with CSS variables.",
  },
  {
    icon: Zap,
    title: "Lightweight",
    description:
      "Zero dependencies by default. Optional Framer Motion adapter for smooth animations.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Built-in support for light and dark themes using semantic color tokens.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description:
      "Keyboard navigation, focus management, and proper ARIA attributes throughout.",
  },
];

const usageCode = `import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header 
        behavior="fixed" 
        logo={<span className="font-bold">My App</span>}
        title="Welcome"
      />
      <Content className="p-4">
        <h1>Hello World</h1>
      </Content>
      <Footer variant="tab-bar">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
      </Footer>
    </AppShell>
  );
}`;

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container px-4 py-16 md:px-6 md:py-24 lg:py-32">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col items-start">
                <div className="mb-4 inline-flex items-center rounded-lg border bg-muted px-3 py-1 text-sm">
                  <span className="text-muted-foreground">
                    Now with Tailwind CSS v4 support
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                  Mobile-first app shells for{" "}
                  <span className="text-primary">React</span>
                </h1>
                <p className="mt-4 max-w-[600px] text-lg text-muted-foreground md:text-xl text-pretty">
                  A complete set of responsive layout components with safe
                  areas, headers, footers, sidebars, and smooth animations.
                  Built for modern React with zero required dependencies.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/docs"
                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Get Started
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                  <a
                    href="https://github.com/fyalavuz/appshell-react"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <Github className="mr-2 size-4" />
                    GitHub
                  </a>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Terminal className="size-4" />
                  <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                    npm install appshell-react
                  </code>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <PhoneMockup src="/examples/preview/tab-bar" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Build production-ready mobile apps with a complete set of layout
                primitives.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-xl border bg-card p-6 transition-colors hover:bg-accent/50"
                >
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="border-b py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Simple API, powerful results
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Get started in minutes with our intuitive component API.
                </p>
              </div>
              <div className="mt-12">
                <CodeBlock
                  code={usageCode}
                  language="tsx"
                  filename="app.tsx"
                  showLineNumbers
                />
              </div>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Examples
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Explore our collection of ready-to-use examples and patterns.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-5xl">
              {categories.slice(0, 3).map((category) => (
                <div key={category.id} className="mb-12 last:mb-0">
                  <h3 className="mb-4 text-lg font-semibold">
                    {category.title}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {category.examples.map((example) => (
                      <Link
                        key={example.slug}
                        href={`/examples/${example.slug}`}
                        className="group flex flex-col rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                      >
                        <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <example.icon className="size-4" />
                        </div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {example.title}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {example.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-8 text-center">
                <Link
                  href="/examples"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View all examples
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://github.com/fyalavuz"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              fyalavuz
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/fyalavuz/appshell-react"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
