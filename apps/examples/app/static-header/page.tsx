"use client";

import { AppShell, Header, Content, HeaderNav, HeaderNavItem, MotionProvider } from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Github, Moon, BookOpen, Code2, Layers, Zap, Shield, Palette, Terminal, Puzzle } from "lucide-react";

const sections = [
  {
    icon: <BookOpen className="size-5" />,
    title: "Getting Started",
    content:
      "Install the package using your preferred package manager. AppShell provides a composable set of layout primitives designed for modern React applications.",
    code: "pnpm add @appshell/react",
  },
  {
    icon: <Layers className="size-5" />,
    title: "Layout Composition",
    content:
      "The AppShell component is the root container that orchestrates Header, Content, Footer, and Sidebar. It manages shared scroll state and safe-area insets.",
    code: "<AppShell safeArea>\n  <Header behavior=\"fixed\" />\n  <Content>...</Content>\n</AppShell>",
  },
  {
    icon: <Zap className="size-5" />,
    title: "Header Behaviors",
    content:
      "Supports static, fixed, and multiple reveal patterns. Each behavior is designed for specific mobile and desktop UX requirements.",
    code: '<Header behavior="reveal-nav" />',
  },
  {
    icon: <Palette className="size-5" />,
    title: "Shadcn Compatible",
    content:
      "Built to work seamlessly with your existing shadcn/ui setup. Uses standard CSS variables for colors, borders, and rounded corners.",
    code: "/* Uses your theme tokens */\n--background: oklch(1 0 0);",
  },
];

export default function StaticHeaderPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="static"
          theme="primary"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-6 rounded bg-primary-foreground/20 flex items-center justify-center">
                <Layers className="size-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">AppShell</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Documentation" href="#" />
              <HeaderNavItem label="Components" href="#" />
              <HeaderNavItem label="Themes" href="#" />
              <HeaderNavItem label="GitHub" href="#" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-md p-2 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground transition-colors"
              >
                <Github className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-md p-2 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground transition-colors"
              >
                <Moon className="size-5" />
              </button>
            </div>
          }
        />
        <Content className="pb-16 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-12">
            <div className="mb-12 text-center sm:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight">
                Static Header Pattern
              </h1>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl leading-relaxed">
                A non-sticky header that scrolls with the content. This pattern is ideal
                for long-form reading experiences where screen real estate is at a premium.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {sections.map((section, i) => (
                <section
                  key={i}
                  className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                      {section.icon}
                    </div>
                    <h2 className="text-lg font-bold tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {section.content}
                  </p>
                  <div className="rounded-lg bg-zinc-950 p-4 overflow-x-auto">
                    <pre className="text-[12px] font-mono text-zinc-400">
                      <code>{section.code}</code>
                    </pre>
                  </div>
                </section>
              ))}
            </div>

            {/* Extra content to enable scrolling */}
            <div className="mt-12 space-y-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl border border-dashed border-border bg-background flex items-center justify-center text-muted-foreground font-medium italic">
                  Content Section {i + 5}
                </div>
              ))}
            </div>
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
