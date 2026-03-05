import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { categories } from "@/lib/registry";

export const metadata = {
  title: "Examples",
  description: "Explore AppShell examples and patterns for building mobile-first applications.",
};

export default function ExamplesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Examples
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Explore our collection of ready-to-use examples and patterns. Each example includes live preview and source code.
              </p>
            </div>

            <div className="space-y-12">
              {categories.map((category) => (
                <section key={category.id}>
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {category.examples.map((example) => (
                      <Link
                        key={example.slug}
                        href={`/examples/${example.slug}`}
                        className="group relative flex flex-col rounded-xl border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
                      >
                        <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <example.icon className="size-5" />
                        </div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {example.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                          {example.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {example.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
