"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// iPhone 15 Pro logical dimensions
const DEVICE_W = 393;
const DEVICE_H = 852;
// Safe area insets (Dynamic Island top + home indicator bottom)
const SA_TOP = 59;
const SA_BOTTOM = 34;
// Display size
const FRAME_W = 280;
const SCALE = FRAME_W / DEVICE_W;
const FRAME_H = Math.round(DEVICE_H * SCALE);

interface PhoneMockupProps {
  src: string;
  className?: string;
}

export function PhoneMockup({ src, className }: PhoneMockupProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = React.useState(false);

  const handleLoad = React.useCallback(() => {
    setLoaded(true);
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      const style = doc.createElement("style");
      style.textContent = `:root{--sa-top:${SA_TOP}px;--sa-bottom:${SA_BOTTOM}px;--sa-left:0px;--sa-right:0px}`;
      doc.head.appendChild(style);
    } catch {
      // cross-origin - ignored in production
    }
  }, []);

  return (
    <div
      className={cn("relative mx-auto select-none", className)}
      style={{ width: FRAME_W + 16, height: FRAME_H + 16 }}
    >
      {/* Phone body */}
      <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-700 shadow-2xl shadow-black/40">
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[80px] h-7 w-[3px] rounded-l-sm bg-zinc-600" />
        <div className="absolute -left-[2px] top-[118px] h-12 w-[3px] rounded-l-sm bg-zinc-600" />
        <div className="absolute -left-[2px] top-[160px] h-12 w-[3px] rounded-l-sm bg-zinc-600" />
        <div className="absolute -right-[2px] top-[115px] h-14 w-[3px] rounded-r-sm bg-zinc-600" />

        {/* Screen area */}
        <div className="absolute inset-[8px] rounded-[2.2rem] overflow-hidden bg-black">
          {/* Iframe at native resolution, scaled down */}
          <div
            className="origin-top-left"
            style={{
              width: DEVICE_W,
              height: DEVICE_H,
              transform: `scale(${SCALE})`,
            }}
          >
            {!loaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white dark:bg-zinc-950">
                <div className="size-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={src}
              title="Example preview"
              className={cn(
                "h-full w-full border-0 transition-opacity duration-300",
                loaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleLoad}
            />
          </div>

          {/* Status bar overlay */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-end justify-between px-6 pb-0.5 text-white"
            style={{ height: Math.round(SA_TOP * SCALE) }}
          >
            <span className="text-[11px] font-semibold leading-none">9:41</span>
            <div className="absolute left-1/2 top-[3px] -translate-x-1/2 h-[22px] w-[90px] rounded-full bg-black" />
            <div className="flex items-center gap-[4px]">
              <svg width="14" height="10" viewBox="0 0 17 12" fill="white">
                <rect x="0" y="9" width="3" height="3" rx="0.5" opacity="0.4" />
                <rect
                  x="4.5"
                  y="6"
                  width="3"
                  height="6"
                  rx="0.5"
                  opacity="0.6"
                />
                <rect
                  x="9"
                  y="3"
                  width="3"
                  height="9"
                  rx="0.5"
                  opacity="0.8"
                />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
              </svg>
              <svg width="13" height="10" viewBox="0 0 16 12" fill="white">
                <path d="M8 11.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
                <path
                  d="M4.75 7.75a4.5 4.5 0 016.5 0"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M2 4.75a8 8 0 0112 0"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <svg width="22" height="10" viewBox="0 0 27 12" fill="none">
                <rect
                  x="0.5"
                  y="0.5"
                  width="22"
                  height="11"
                  rx="2.5"
                  stroke="white"
                  strokeOpacity="0.35"
                />
                <rect x="2" y="2" width="19" height="8" rx="1.5" fill="white" />
                <path
                  d="M24 4v4a2 2 0 000-4z"
                  fill="white"
                  fillOpacity="0.4"
                />
              </svg>
            </div>
          </div>

          {/* Home indicator */}
          <div className="pointer-events-none absolute bottom-[4px] left-1/2 -translate-x-1/2 z-20 h-[4px] w-[100px] rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
}
