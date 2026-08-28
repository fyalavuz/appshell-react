"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePanelProps {
  /** Shiki-highlighted HTML (trusted, generated at build time). */
  html: string;
  /** Raw code for the copy button. */
  code: string;
  filename?: string;
  className?: string;
}

export function CodePanel({ html, code, filename = "app.tsx", className }: CodePanelProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "code-panel overflow-hidden rounded-xl border border-white/10 bg-[#101010] text-zinc-100",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-500">{filename}</span>
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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
