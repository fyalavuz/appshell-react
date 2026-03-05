"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightedCode?: string;
  className?: string;
  showLineNumbers?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  highlightedCode,
  className,
  showLineNumbers = true,
  collapsible = false,
  defaultCollapsed = true,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");
  const shouldCollapse = collapsible && lines.length > 15;
  const displayLines = shouldCollapse && collapsed ? lines.slice(0, 10) : lines;

  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-zinc-950 text-zinc-50 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          {filename && (
            <span className="text-xs font-medium text-zinc-300">{filename}</span>
          )}
          {!filename && (
            <span className="text-xs text-zinc-500 font-mono">{language}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {shouldCollapse && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              {collapsed ? (
                <>
                  <ChevronDown className="size-3.5" />
                  Expand
                </>
              ) : (
                <>
                  <ChevronUp className="size-3.5" />
                  Collapse
                </>
              )}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="size-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto">
        {highlightedCode ? (
          <div
            className="p-4 text-sm leading-relaxed [&>pre]:!bg-transparent [&>pre]:!p-0 [&_code]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <pre className="p-4 text-sm leading-relaxed overflow-x-auto">
            <code className="font-mono">
              {displayLines.map((line, i) => (
                <div key={i} className="flex">
                  {showLineNumbers && (
                    <span className="inline-block w-8 pr-4 text-right text-zinc-600 select-none">
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1">{line || " "}</span>
                </div>
              ))}
            </code>
          </pre>
        )}

        {/* Collapsed overlay */}
        {shouldCollapse && collapsed && (
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent flex items-end justify-center pb-2">
            <button
              onClick={() => setCollapsed(false)}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Show more ({lines.length - 10} more lines)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {children}
    </code>
  );
}
