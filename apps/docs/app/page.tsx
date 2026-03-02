import Link from 'next/link';

const features = [
  {
    title: 'Header',
    description:
      '6 scroll behaviors including static, fixed, reveal-all, reveal-nav, reveal-context, and reveal-search. 3 themes with mobile menu support.',
    icon: '~',
  },
  {
    title: 'Footer',
    description:
      '3 variants: tab-bar for navigation, floating for actions, mini for contextual bars. Auto-hide on scroll.',
    icon: '_',
  },
  {
    title: 'SafeArea',
    description:
      'Automatic env(safe-area-inset-*) padding for notched devices. Configure per-edge with the edges prop.',
    icon: '#',
  },
  {
    title: 'Context',
    description:
      'Shared state via AppShellProvider. Access header/footer visibility and scroll direction from any child.',
    icon: '*',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          AppShell
        </h1>
        <p className="mt-4 max-w-xl text-lg text-fd-muted-foreground">
          Mobile-first app shell components for React. Build native-feeling
          mobile web apps with scroll-aware headers, footers, and safe areas.
        </p>

        <div className="mt-6 rounded-lg border bg-fd-card px-4 py-3 font-mono text-sm">
          pnpm add appshell-react
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-fd-primary px-6 py-2.5 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            Documentation
          </Link>
          <Link
            href="/examples"
            className="rounded-lg border bg-fd-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            Live Examples
          </Link>
          <a
            href="https://github.com/fyalavuz/appshell-react"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border bg-fd-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-4xl gap-4 px-4 pb-24 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border bg-fd-card p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-fd-accent font-mono text-lg font-bold">
              {feature.icon}
            </div>
            <h2 className="text-lg font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm text-fd-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
