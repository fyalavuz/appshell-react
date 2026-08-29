"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Header,
  MotionProvider,
  type HeaderTheme,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Palette, Check } from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

const themes: {
  id: HeaderTheme;
  name: string;
  blurb: string;
  swatch: string;
}[] = [
  {
    id: "light",
    name: "Light",
    blurb: "Background surface with a hairline border. The default.",
    swatch: "bg-background border",
  },
  {
    id: "primary",
    name: "Primary",
    blurb: "Your primary color as the bar — foreground flips automatically.",
    swatch: "bg-primary",
  },
  {
    id: "dark",
    name: "Dark",
    blurb: "Always-dark bar, independent of the page theme.",
    swatch: "bg-zinc-900",
  },
  {
    id: "none",
    name: "None",
    blurb: "Zero styling. Bring your own classes via className.",
    swatch:
      "bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,var(--border)_4px,var(--border)_5px)] border",
  },
];

export default function HeaderThemesPage() {
  const [theme, setTheme] = useState<HeaderTheme>("light");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme={theme}
          className={
            theme === "none"
              ? "border-b border-dashed border-fuchsia-400 bg-fuchsia-50 text-fuchsia-950 dark:bg-fuchsia-950 dark:text-fuchsia-50"
              : undefined
          }
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Palette className="size-5" />
              Chroma
            </span>
          }
          title={`theme="${theme}"`}
          subtitle={themes.find((t) => t.id === theme)?.blurb}
        />

        <Content className="mx-auto w-full max-w-2xl pb-16">
          <DemoHint>
            Pick a theme below — the header re-styles itself live. The
            &ldquo;none&rdquo; theme is styled from scratch with className.
          </DemoHint>

          <div className="space-y-3 px-4 pt-2">
            {themes.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                    active ? "border-foreground/40 bg-muted/50" : "hover:bg-muted/30"
                  }`}
                >
                  <span
                    className={`size-10 shrink-0 rounded-lg ${t.swatch}`}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      {t.name}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-normal text-muted-foreground">
                        theme=&quot;{t.id}&quot;
                      </code>
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      {t.blurb}
                    </span>
                  </span>
                  {active && <Check className="size-4 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-3 border-t px-4 pt-6">
            <h2 className="text-sm font-semibold">How it works</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Each theme maps to a small set of token-driven classes on the
              header rows. Nested components read the active theme through
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                useHeaderTheme()
              </code>
              so custom actions and nav items can adapt their own colors.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The <span className="font-medium text-foreground">primary</span>{" "}
              and <span className="font-medium text-foreground">dark</span>{" "}
              themes flip text and border colors automatically —no extra
              classes needed on your logo, actions, or nav links.
            </p>
            <div className="h-40" aria-hidden />
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
