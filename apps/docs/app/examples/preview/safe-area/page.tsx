"use client";

import { useState, type ElementType, type ReactNode } from "react";
import {
  AppShell,
  Content,
  Footer,
  FooterItem,
  Header,
  MotionProvider,
  SafeArea,
  useSafeArea,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Frame,
  House,
  Layers,
  MoveHorizontal,
  PanelsTopLeft,
  Ruler,
  Settings,
  Smartphone,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

function ConceptCard({
  icon: Icon,
  title,
  code,
  children,
}: {
  icon: ElementType;
  title: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
          <Icon className="size-4" />
        </span>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-muted px-3 py-2 font-mono text-[11px] text-foreground/80">
        {code}
      </pre>
    </div>
  );
}

export default function SafeAreaPage() {
  const [showInsets, setShowInsets] = useState(false);
  // Dogfooding: the library's own hook resolves env(safe-area-inset-*),
  // including any simulated override this mockup injects.
  const insets = useSafeArea();

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Frame className="size-5 text-orange-600 dark:text-orange-400" />
              Inset
            </span>
          }
          title="Safe areas, visualized"
          subtitle="How the shell avoids notches and home indicators"
        />

        <Content className="mx-auto w-full max-w-2xl pb-28">
          <DemoHint>
            Toggle the overlays below to highlight the top and bottom insets —
            then notice the header and tab bar already keep clear of them.
          </DemoHint>

          {/* Toggle */}
          <div className="mx-4 flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
            <div>
              <p className="text-sm font-semibold">Show insets</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Paint the safe areas orange so you can see exactly what the
                shell is padding.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showInsets}
              aria-label="Show insets"
              onClick={() => setShowInsets((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                showInsets ? "bg-orange-500" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform dark:bg-zinc-200 ${
                  showInsets ? "translate-x-[22px]" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="space-y-4 px-4 pt-4">
            <ConceptCard
              icon={Smartphone}
              title="AppShell pads the whole shell"
              code={"<AppShell safeArea>"}
            >
              <p>
                One prop, and every fixed element respects the device. The
                header grows by the top inset so the status bar never sits on
                your logo; the tab bar grows by the bottom inset so the home
                indicator never covers a button.
              </p>
              <p>
                This demo runs with <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">safeArea</code>{" "}
                on — that&rsquo;s the extra breathing room you can see above
                the logo right now.
              </p>
            </ConceptCard>

            <ConceptCard
              icon={PanelsTopLeft}
              title="Keep the top inset on a static header"
              code={"<Header behavior=\"static\" forceSafeAreaTop />"}
            >
              <p>
                A static header scrolls away with the page, so it normally
                gives its safe-area padding back too. Set{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">forceSafeAreaTop</code>{" "}
                to keep the top inset applied while the header is at rest — no
                content jump when the page settles at the top.
              </p>
            </ConceptCard>

            <ConceptCard
              icon={MoveHorizontal}
              title="SafeArea pads any region"
              code={'<SafeArea edges={["left", "right"]}>'}
            >
              <p>
                For full-bleed regions — maps, carousels, video — wrap just
                that region and pick the edges it should respect. The live box
                below is wrapped in a{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">SafeArea</code>{" "}
                with left and right edges:
              </p>
              <SafeArea
                edges={["left", "right"]}
                className="rounded-lg border border-dashed border-orange-400 bg-orange-50/60 dark:border-orange-800 dark:bg-orange-950/20"
              >
                <div className="rounded-md bg-background px-3 py-4 text-center text-xs text-muted-foreground">
                  This box is padded by{" "}
                  <span className="font-mono">env(safe-area-inset-left)</span>{" "}
                  and <span className="font-mono">env(safe-area-inset-right)</span>
                </div>
              </SafeArea>
              <p className="text-xs">
                In portrait this phone reports 0px on the sides, so the dashed
                frame hugs the box. Rotate a real device to landscape and the
                box pulls in from the notch.
              </p>
            </ConceptCard>

            <ConceptCard
              icon={Ruler}
              title="Where the numbers come from"
              code={"env(safe-area-inset-top) /* viewport-fit=cover */"}
            >
              <p>
                The platform standard, on iOS and Android alike: the browser
                exposes the notch and home-indicator geometry through{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">env(safe-area-inset-*)</code>{" "}
                once the page opts in with{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">viewport-fit=cover</code>
                . The shell reads those values directly — this docs mockup
                merely simulates an iPhone&rsquo;s numbers inside the frame,
                since a desktop browser reports 0.
              </p>
              <div className="divide-y rounded-lg border font-mono text-xs">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-muted-foreground">
                    env(safe-area-inset-top)
                  </span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {insets.top}px
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-muted-foreground">
                    env(safe-area-inset-bottom)
                  </span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {insets.bottom}px
                  </span>
                </div>
              </div>
            </ConceptCard>
          </div>

          <p className="px-4 pt-8 text-center text-xs text-muted-foreground">
            The static tab bar below sits on the bottom inset — toggle the
            overlay to see the 34px it reserves.
          </p>
        </Content>

        {/* Inset overlays — above every shell layer while visible */}
        {showInsets && (
          <>
            <div
              aria-hidden
              style={{ height: insets.top }}
              className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex items-center justify-center border-b border-dashed border-orange-500/70 bg-orange-500/25"
            >
              <code className="rounded bg-orange-600 px-1.5 py-0.5 font-mono text-[10px] font-medium text-white">
                safe-area-inset-top
              </code>
            </div>
            <div
              aria-hidden
              style={{ height: insets.bottom }}
              className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex items-center justify-center border-t border-dashed border-orange-500/70 bg-orange-500/25"
            >
              <code className="rounded bg-orange-600 px-1.5 py-0.5 font-mono text-[10px] font-medium text-white">
                safe-area-inset-bottom
              </code>
            </div>
          </>
        )}

        <Footer variant="tab-bar" behavior="static">
          <FooterItem icon={<House className="size-5" />} label="Home" active />
          <FooterItem icon={<Layers className="size-5" />} label="Layers" />
          <FooterItem icon={<Settings className="size-5" />} label="Settings" />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
