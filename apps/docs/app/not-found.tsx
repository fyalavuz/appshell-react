import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page scrolled away
        </h1>
        <p className="mt-3 text-muted-foreground">
          The link may be outdated, or the page moved when the docs were reorganized.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            <ArrowLeft className="size-4" />
            Back home
          </Link>
          <Link href="/docs" className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium">
            Read the docs
          </Link>
          <Link href="/examples" className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium">
            Browse examples
          </Link>
        </div>
      </main>
    </>
  );
}
