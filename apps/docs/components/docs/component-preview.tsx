"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PhoneMockup } from "./phone-mockup";
import { ExternalLink, Smartphone, Monitor, Copy, Check } from "lucide-react";

interface ComponentPreviewProps {
  name: string;
  description?: string;
  code: string;
  previewUrl?: string;
  className?: string;
  align?: "start" | "center" | "end";
  isMobile?: boolean;
}

export function ComponentPreview({
  name,
  description,
  code,
  previewUrl,
  className,
  align = "center",
  isMobile = true,
}: ComponentPreviewProps) {
  const [view, setView] = React.useState<"mobile" | "desktop">("mobile");
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group relative my-4", className)}>
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center border rounded-md p-0.5 bg-muted">
          <button
            onClick={() => setTab("preview")}
            className={cn(
              "px-3 py-1.5 rounded text-xs font-medium transition-colors",
              tab === "preview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={cn(
              "px-3 py-1.5 rounded text-xs font-medium transition-colors",
              tab === "code"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Code
          </button>
        </div>

        {previewUrl && tab === "preview" && (
          <div className="flex items-center gap-2">
            {isMobile && (
              <div className="flex items-center border rounded-md p-0.5 bg-muted">
                <button
                  onClick={() => setView("mobile")}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    view === "mobile"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Smartphone className="size-4" />
                </button>
                <button
                  onClick={() => setView("desktop")}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    view === "desktop"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Monitor className="size-4" />
                </button>
              </div>
            )}
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="size-3.5" />
              Fullscreen
            </a>
          </div>
        )}
      </div>

      {tab === "preview" && (
        <div className="relative rounded-lg border">
          <div
            className={cn(
              "flex min-h-[450px] w-full items-center p-6 md:p-10",
              {
                "justify-start": align === "start",
                "justify-center": align === "center",
                "justify-end": align === "end",
              },
              "bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30"
            )}
          >
            {previewUrl ? (
              view === "mobile" && isMobile ? (
                <PhoneMockup src={previewUrl} />
              ) : (
                <div className="w-full max-w-4xl rounded-lg border bg-background shadow-lg overflow-hidden">
                  <div className="flex items-center gap-1.5 border-b px-3 py-2 bg-muted/30">
                    <div className="size-2.5 rounded-full bg-red-400" />
                    <div className="size-2.5 rounded-full bg-yellow-400" />
                    <div className="size-2.5 rounded-full bg-green-400" />
                    <span className="ml-2 text-[10px] text-muted-foreground truncate">
                      {previewUrl}
                    </span>
                  </div>
                  <iframe
                    src={previewUrl}
                    title={`${name} preview`}
                    className="h-[500px] w-full border-0"
                  />
                </div>
              )
            ) : (
              <div className="flex items-center justify-center text-muted-foreground">
                No preview available
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "code" && (
        <div className="relative rounded-lg border bg-zinc-950 overflow-hidden">
          <button
            onClick={copyCode}
            className="absolute right-3 top-3 z-10 p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
          <pre className="overflow-x-auto p-4 text-sm">
            <code className="text-zinc-300 whitespace-pre">{code}</code>
          </pre>
        </div>
      )}

      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
