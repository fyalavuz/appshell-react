import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, MousePointer2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { PhoneMockup } from "@/components/docs/phone-mockup";
import { CodePanel } from "@/components/docs/code-panel";
import { getExampleBySlug, getAllExamples, getCategoryById } from "@/lib/registry";
import { demoCode } from "@/lib/demo-code";
import { highlight } from "@/lib/highlight";
import { withBasePath } from "@/lib/base-path";

interface ExamplePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllExamples().map((example) => ({ slug: example.slug }));
}

export async function generateMetadata({ params }: ExamplePageProps) {
  const { slug } = await params;
  const example = getExampleBySlug(slug);
  if (!example) return { title: "Example Not Found" };
  return { title: example.title, description: example.description };
}

export default async function ExamplePage({ params }: ExamplePageProps) {
  const { slug } = await params;
  const example = getExampleBySlug(slug);
  if (!example) notFound();

  const category = getCategoryById(example.category);
  const allExamples = getAllExamples();
  const currentIndex = allExamples.findIndex((e) => e.slug === slug);
  const prevExample = currentIndex > 0 ? allExamples[currentIndex - 1] : null;
  const nextExample =
    currentIndex < allExamples.length - 1 ? allExamples[currentIndex + 1] : null;

  const code = demoCode[slug] ?? `// Example code for ${example.title}`;
  const highlighted = await highlight(code);
  const previewPath = `/examples/preview/${slug}/`;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link
              href="/examples"
              className="transition-colors hover:text-foreground"
            >
              Examples
            </Link>
            <span aria-hidden>/</span>
            {category && (
              <>
                <Link
                  href={`/examples#${category.id}`}
                  className="transition-colors hover:text-foreground"
                >
                  {category.title}
                </Link>
                <span aria-hidden>/</span>
              </>
            )}
            <span className="text-foreground">{example.title}</span>
          </nav>

          {/* Header */}
          <div className="mt-6 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {example.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              {example.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">
                {example.props}
              </code>
              {example.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border px-2 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Preview + sidebar */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
            <div className="mx-auto lg:mx-0">
              <PhoneMockup src={withBasePath(previewPath)} />
            </div>

            <div className="min-w-0 space-y-8">
              <div>
                <p className="eyebrow text-muted-foreground/70">In this demo</p>
                <p className="mt-2 text-xl font-semibold tracking-tight">
                  {example.appName}
                </p>
              </div>

              <div>
                <p className="eyebrow text-muted-foreground/70">What to try</p>
                <ul className="mt-3 space-y-2.5">
                  {example.tryHints.map((hint) => (
                    <li key={hint} className="flex items-start gap-2.5 text-sm">
                      <MousePointer2 className="mt-0.5 size-3.5 shrink-0 text-brand" />
                      <span className="text-muted-foreground">{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={withBasePath(previewPath)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-brand/40 hover:text-brand"
              >
                Open fullscreen
                <ArrowUpRight className="size-4" />
              </a>

              <div className="hidden lg:block">
                <p className="eyebrow mb-3 text-muted-foreground/70">Code</p>
                <CodePanel html={highlighted} code={code} />
              </div>
            </div>
          </div>

          {/* Code (mobile / tablet) */}
          <div className="mt-10 lg:hidden">
            <p className="eyebrow mb-3 text-muted-foreground/70">Code</p>
            <CodePanel html={highlighted} code={code} />
          </div>

          {/* Prev / next */}
          <div className="mt-14 flex items-center justify-between border-t pt-6">
            {prevExample ? (
              <Link
                href={`/examples/${prevExample.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                <span>{prevExample.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextExample ? (
              <Link
                href={`/examples/${nextExample.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{nextExample.title}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
