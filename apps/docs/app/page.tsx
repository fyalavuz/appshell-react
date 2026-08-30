import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Feather,
  Layers,
  MoveVertical,
  Palette,
  Smartphone,
  SlidersHorizontal,
  Type,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { PhoneMockup } from "@/components/docs/phone-mockup";
import { CodePanel } from "@/components/docs/code-panel";
import { MiniScreen } from "@/components/examples/mini-screen";
import { getExampleBySlug } from "@/lib/registry";
import { highlight } from "@/lib/highlight";
import { withBasePath } from "@/lib/base-path";

const codeExample = `import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, Bell, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-all"
        logo={<Logo />}
        title="Home"
        subtitle="Catch up on today"
      />
      <Content className="pb-24">
        {/* Your content */}
      </Content>
      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<Bell />} label="Alerts" badge={3} />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}`;

const stats = [
  { value: "10", label: "header behaviors" },
  { value: "3", label: "footer variants" },
  { value: "22", label: "live demos" },
  { value: "0", label: "required deps" },
];

const features = [
  {
    icon: MoveVertical,
    title: "Scroll-aware",
    description:
      "Headers and footers that hide, reveal, and dock in response to scroll direction — per row, not all-or-nothing.",
  },
  {
    icon: Smartphone,
    title: "Safe areas, handled",
    description:
      "Notches, Dynamic Islands, and home indicators are padded automatically, with CSS-variable overrides for testing.",
  },
  {
    icon: Layers,
    title: "Composable rows",
    description:
      "Logo, nav, title, and search are independent header rows. Use one or stack all four.",
  },
  {
    icon: Feather,
    title: "Zero-dependency core",
    description:
      "CSS transitions out of the box. Add the optional Framer Motion adapter when you want springs.",
  },
  {
    icon: Palette,
    title: "Token-driven theming",
    description:
      "Styled with standard shadcn/ui custom properties — your existing theme just works, dark mode included.",
  },
  {
    icon: Type,
    title: "Typed end to end",
    description:
      "Every variant is a string union: your editor autocompletes behaviors, themes, speeds, and positions.",
  },
];

const featuredSlugs = ["reveal-all", "floating-footer", "sidebar"];

export default async function HomePage() {
  const highlighted = await highlight(codeExample);
  const featured = featuredSlugs
    .map((slug) => getExampleBySlug(slug))
    .filter((e) => e !== undefined);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_60%,transparent_100%)]"
          />
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
              <div className="space-y-8">
                <p className="eyebrow text-brand">
                  React 19 · Tailwind v4 · MIT
                </p>
                <div className="space-y-5">
                  <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
                    The app shell your mobile web app deserves
                  </h1>
                  <p className="max-w-lg text-lg leading-relaxed text-muted-foreground text-balance">
                    Scroll-aware headers, tab bars, drawers, and safe areas —
                    composable React components that make a web app feel
                    native, without you writing a single scroll listener.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Get started
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                  <Link
                    href="/playground"
                    className="inline-flex items-center justify-center rounded-lg border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    <SlidersHorizontal className="mr-2 size-4" />
                    Open the playground
                  </Link>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-4 border-t pt-6">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-bold tracking-tight">
                        {stat.value}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <p className="eyebrow absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-muted-foreground/60">
                    live demo — scroll it
                  </p>
                  <PhoneMockup src={withBasePath("/examples/preview/reveal-combined/")} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand">Why AppShell</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                The tricky 10% of mobile UI, solved once
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Scroll choreography, safe-area math, and header coordination
                are the parts every mobile web app rewrites. AppShell ships
                them as composable primitives.
              </p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="bg-background p-6 md:p-8">
                  <feature.icon className="size-5 text-brand" />
                  <h3 className="mt-4 font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code */}
        <section className="border-b bg-muted/30 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <p className="eyebrow text-brand">Declarative API</p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  One component tree, all the choreography
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Declare what each bar should do — the shell coordinates
                  visibility, heights, and safe areas between them.
                </p>
                <ul className="space-y-3">
                  {[
                    "10 header behaviors, from fixed to per-row reveal",
                    "Tab bars, floating pills, and mini bars that auto-hide",
                    "Sticky sub-navigation via the --header-height variable",
                    "Sidebars: modal drawers, and docked panels with icon rails",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/docs/components/app-shell"
                  className="inline-flex items-center text-sm font-medium text-brand hover:underline"
                >
                  Component reference
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </div>
              <CodePanel html={highlighted} code={codeExample} />
            </div>
          </div>
        </section>

        {/* Featured examples */}
        <section className="border-b py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-brand">Examples</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  20 small apps, every variant
                </h2>
              </div>
              <Link
                href="/examples"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Browse all examples
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {featured.map((example) => (
                <Link
                  key={example.slug}
                  href={`/examples/${example.slug}`}
                  className="group flex flex-col rounded-xl border bg-card p-4 transition-all hover:border-brand/40 hover:shadow-md hover:shadow-brand/5"
                >
                  <MiniScreen slug={example.slug} />
                  <h3 className="mt-4 font-semibold tracking-tight">
                    {example.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {example.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-2xl border bg-card p-8 text-center md:p-14">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 [mask-image:radial-gradient(ellipse_70%_90%_at_50%_100%,#000_40%,transparent_100%)]"
              />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ship a native-feeling shell today
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Install the package, pick a pattern from the examples, and
                  your layout is done before lunch.
                </p>
                <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-lg border bg-background px-4 py-2.5 font-mono text-sm">
                  <span className="select-none text-muted-foreground">$</span>
                  pnpm add appshell-react
                </div>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/docs/installation"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Read the docs
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                  <a
                    href="https://github.com/fyalavuz/appshell-react"
                    className="inline-flex items-center justify-center rounded-lg border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    Star on GitHub
                  </a>
                </div>
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
              <span className="flex size-6 items-center justify-center rounded-md bg-brand">
                <Layers className="size-3 text-brand-foreground" />
              </span>
              <span className="text-sm font-semibold">AppShell</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a
                href="https://github.com/fyalavuz"
                className="underline underline-offset-4 transition-colors hover:text-foreground"
              >
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
