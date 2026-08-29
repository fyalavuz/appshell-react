"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";
import { DevicePreview } from "./device-preview";
import { withBasePath } from "@/lib/base-path";

interface ComponentPreviewProps {
  name: string;
  description?: string;
  code: string;
  highlightedCode?: string;
  previewUrl?: string;
  className?: string;
  /** @deprecated kept for compatibility; the device switcher replaced these */
  align?: "start" | "center" | "end";
  /** @deprecated kept for compatibility; the device switcher replaced these */
  isMobile?: boolean;
}

export function ComponentPreview({
  name,
  description,
  code,
  highlightedCode,
  previewUrl,
  className,
}: ComponentPreviewProps) {
  const resolvedUrl = previewUrl ? withBasePath(previewUrl) : undefined;

  return (
    <div className={cn("group relative my-4", className)}>
      <Tabs defaultValue="preview" className="relative w-full">
        <TabsList className="w-auto">
          <TabsTrigger value="preview" className="text-xs">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="text-xs">
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="preview"
          className="relative mt-3 rounded-xl border bg-muted/20 p-4 md:p-6"
        >
          {resolvedUrl ? (
            <DevicePreview src={resolvedUrl} title={name} />
          ) : (
            <div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
              No preview available
            </div>
          )}
        </TabsContent>

        <TabsContent value="code" className="mt-3">
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
