import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { MiniScreen } from "@/components/examples/mini-screen";
import { categories, getAllExamples } from "@/lib/registry";

export const metadata = {
  title: "Examples",
  description:
    "Fullscreen demos covering every AppShell variant — header behaviors, footer variants, drawers, safe areas, and theming.",
};

export default function ExamplesPage() {
  const total = getAllExamples().length;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          {/* Page header */}
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">{total} fullscreen demos</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Examples
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every variant the shell supports, each one a small believable
              app. Hover a card to preview the behavior; open it to scroll the
              real thing.
            </p>
          </div>

          {/* Playground banner */}
          <Link
            href="/playground"
            className="group mt-10 flex flex-col gap-6 rounded-2xl border bg-card p-6 transition-colors hover:border-brand/40 sm:flex-row sm:items-center md:p-8"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <SlidersHorizontal className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                Playground
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Mix all 10 header behaviors, 4 themes, 3 speeds, and 3 footer
                variants live on one phone — then copy the exact code.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 md:flex" aria-hidden>
              {["reveal-all", "primary", "auto-hide"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border bg-muted/50 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Link>

          {/* Category sections */}
          <div className="mt-16 space-y-16">
            {categories.map((category, ci) => (
              <section key={category.id} id={category.id}>
                <div className="flex items-baseline gap-3">
                  <span className="eyebrow text-muted-foreground/60">
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {category.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.examples.map((example) => (
                    <Link
                      key={example.slug}
                      href={`/examples/${example.slug}`}
                      className="group flex flex-col rounded-xl border bg-card p-4 transition-all hover:border-brand/40 hover:shadow-md hover:shadow-brand/5"
                    >
                      <MiniScreen slug={example.slug} />
                      <h3 className="mt-4 font-semibold tracking-tight">
                        {example.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {example.description}
                      </p>
                      <code className="mt-3 self-start rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
                        {example.props}
                      </code>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
