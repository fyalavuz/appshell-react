"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";
import { PhoneMockup } from "./phone-mockup";
import { ExternalLink, Smartphone, Monitor } from "lucide-react";

interface ComponentPreviewProps {
  name: string;
  description?: string;
  code: string;
  highlightedCode?: string;
  previewUrl?: string;
  className?: string;
  align?: "start" | "center" | "end";
  isMobile?: boolean;
}

export function ComponentPreview({
  name,
  description,
  code,
  highlightedCode,
  previewUrl,
  className,
  align = "center",
  isMobile = true,
}: ComponentPreviewProps) {
  const [view, setView] = React.useState<"mobile" | "desktop">("mobile");

  return (
    <div className={cn("group relative my-4", className)}>
      <Tabs defaultValue="preview" className="relative w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-auto">
            <TabsTrigger value="preview" className="text-xs">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs">
              Code
            </TabsTrigger>
          </TabsList>

          {previewUrl && (
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

        <TabsContent value="preview" className="relative rounded-lg border">
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
        </TabsContent>

        <TabsContent value="code">
          <CodeBlock
            code={code}
            highlightedCode={highlightedCode}
            language="tsx"
            collapsible
            defaultCollapsed={false}
          />
        </TabsContent>
      </Tabs>

      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
