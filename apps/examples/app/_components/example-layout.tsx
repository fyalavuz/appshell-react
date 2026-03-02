"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "react-appshell";
import { PanelTop, Github, Menu, X, ExternalLink } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";
import { PhoneMockup } from "./phone-mockup";
import { CodeBlock } from "./code-block";

interface ExampleLayoutProps {
  slug: string;
  title: string;
  description: string;
  code: string;
}

export function ExampleLayout({ slug, title, description, code }: ExampleLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 sm:px-6">
          <button
            className="mr-3 rounded-md p-1.5 hover:bg-accent lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 font-bold tracking-tight"
          >
            <div className="size-6 rounded bg-primary flex items-center justify-center">
              <PanelTop className="size-4 text-primary-foreground" />
            </div>
            <span>AppShell</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <a
              href="https://github.com/fyalavuz/react-appshell"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-5" />
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 top-14 z-40 w-64 border-r bg-background p-4 overflow-y-auto transition-transform lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarNav />
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-14 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-8 lg:px-12 lg:py-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                {title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center gap-6 rounded-xl border bg-muted/30 p-8">
              <PhoneMockup src={`/${slug}`} />
              <div className="flex items-center gap-3">
                <Link
                  href={`/${slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
                >
                  <ExternalLink className="size-3.5" />
                  Open Fullpage
                </Link>
              </div>
            </div>

            {/* Code */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold">Usage</h2>
              <CodeBlock code={code} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
