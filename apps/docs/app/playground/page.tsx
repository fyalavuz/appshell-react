"use client";

import * as React from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { PhoneMockup } from "@/components/docs/phone-mockup";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";
import {
  animationSpeeds,
  defaultConfig,
  generateCode,
  headerBehaviors,
  headerThemes,
  type PlaygroundConfig,
} from "./config";

function ControlGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="eyebrow text-muted-foreground/70">{label}</legend>
      <div className="mt-2.5 flex flex-wrap gap-1.5">{children}</div>
    </fieldset>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-lg border px-2.5 py-1.5 font-mono text-xs transition-colors",
        active
          ? "border-brand/50 bg-brand/10 text-brand"
          : "text-muted-foreground hover:border-foreground/25 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-sm"
    >
      <span
        className={cn(
          "flex h-5 w-9 items-center rounded-full p-0.5 transition-colors",
          checked ? "bg-brand" : "bg-muted-foreground/30"
        )}
      >
        <span
          className={cn(
            "size-4 rounded-full bg-white shadow-sm transition-transform",
            checked && "translate-x-4"
          )}
        />
      </span>
      <span className="text-muted-foreground">{label}</span>
    </button>
  );
}

export default function PlaygroundPage() {
  const [config, setConfig] = React.useState<PlaygroundConfig>(defaultConfig);
  const [copied, setCopied] = React.useState(false);
  const iframeEl = React.useRef<HTMLIFrameElement | null>(null);

  const set = <K extends keyof PlaygroundConfig>(
    key: K,
    value: PlaygroundConfig[K]
  ) => setConfig((c) => ({ ...c, [key]: value }));

  const send = React.useCallback((cfg: PlaygroundConfig) => {
    iframeEl.current?.contentWindow?.postMessage(
      { type: "playground:config", config: cfg },
      window.location.origin
    );
  }, []);

  // Push config on every change.
  React.useEffect(() => {
    send(config);
  }, [config, send]);

  // Answer the preview's ready handshake.
  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "playground:ready") send(config);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send, config]);

  const code = generateCode(config);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const footerOptions: PlaygroundConfig["footer"][] = [
    "none",
    "tab-bar",
    "floating",
    "mini",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="eyebrow text-brand">Every variant, one phone</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight">
                Playground
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Scroll the phone while you switch props. The code below always
                matches what you&rsquo;re looking at.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setConfig(defaultConfig)}
              className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
            {/* Phone */}
            <div className="mx-auto lg:sticky lg:top-24 lg:mx-0 lg:self-start">
              <PhoneMockup
                src={withBasePath("/playground/preview/")}
                onIframeLoad={(el) => {
                  iframeEl.current = el;
                  send(config);
                }}
              />
            </div>

            {/* Controls + code */}
            <div className="min-w-0 space-y-8">
              <ControlGroup label="Header · behavior">
                {headerBehaviors.map((b) => (
                  <Chip
                    key={b}
                    active={config.behavior === b}
                    onClick={() => set("behavior", b)}
                  >
                    {b}
                  </Chip>
                ))}
              </ControlGroup>

              <div className="grid gap-8 sm:grid-cols-2">
                <ControlGroup label="Header · theme">
                  {headerThemes.map((t) => (
                    <Chip
                      key={t}
                      active={config.theme === t}
                      onClick={() => set("theme", t)}
                    >
                      {t}
                    </Chip>
                  ))}
                </ControlGroup>

                <ControlGroup label="Animation · speed">
                  {animationSpeeds.map((s) => (
                    <Chip
                      key={s}
                      active={config.speed === s}
                      onClick={() => set("speed", s)}
                    >
                      {s}
                    </Chip>
                  ))}
                </ControlGroup>
              </div>

              <div>
                <p className="eyebrow text-muted-foreground/70">Header · rows</p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                  <Toggle
                    label="Nav links"
                    checked={config.showNav}
                    onChange={(v) => set("showNav", v)}
                  />
                  <Toggle
                    label="Title row"
                    checked={config.showContext}
                    onChange={(v) => set("showContext", v)}
                  />
                  <Toggle
                    label="Search row"
                    checked={config.showSearch}
                    onChange={(v) => set("showSearch", v)}
                  />
                  <Toggle
                    label="Safe area"
                    checked={config.safeArea}
                    onChange={(v) => set("safeArea", v)}
                  />
                </div>
              </div>

              <ControlGroup label="Footer · variant">
                {footerOptions.map((f) => (
                  <Chip
                    key={f}
                    active={config.footer === f}
                    onClick={() => set("footer", f)}
                  >
                    {f}
                  </Chip>
                ))}
              </ControlGroup>

              {config.footer !== "none" && (
                <div className="grid gap-8 sm:grid-cols-2">
                  <ControlGroup label="Footer · behavior">
                    {(["static", "auto-hide"] as const).map((b) => (
                      <Chip
                        key={b}
                        active={config.footerBehavior === b}
                        onClick={() => set("footerBehavior", b)}
                      >
                        {b}
                      </Chip>
                    ))}
                  </ControlGroup>

                  {config.footer === "floating" && (
                    <ControlGroup label="Footer · position">
                      {(["left", "center", "right"] as const).map((p) => (
                        <Chip
                          key={p}
                          active={config.footerPosition === p}
                          onClick={() => set("footerPosition", p)}
                        >
                          {p}
                        </Chip>
                      ))}
                    </ControlGroup>
                  )}
                </div>
              )}

              {/* Generated code */}
              <div className="code-panel overflow-hidden rounded-xl border border-white/10 bg-[#101010]">
                <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
                  <span className="font-mono text-xs text-zinc-500">
                    app.tsx — generated
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-zinc-300">
                  <code>{code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
