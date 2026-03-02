"use client";

import { cn } from "appshell-react";

interface PhoneMockupProps {
  src: string;
  className?: string;
}

export function PhoneMockup({ src, className }: PhoneMockupProps) {
  return (
    <div
      className={cn("relative mx-auto", className)}
      style={{ width: 280, height: 572 }}
    >
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[2.5rem] border-[8px] border-foreground/90 bg-foreground/90 shadow-xl shadow-black/20 overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-7 w-[120px] rounded-b-2xl bg-foreground/90" />
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-background">
          <iframe
            src={src}
            title="Example preview"
            className="h-full w-full border-0"
            style={{ pointerEvents: "auto" }}
          />
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 h-1 w-[100px] rounded-full bg-background/60" />
      </div>
    </div>
  );
}
