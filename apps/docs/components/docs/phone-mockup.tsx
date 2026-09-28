"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// iPhone 15 Pro logical dimensions
const DEVICE_W = 393;
const DEVICE_H = 852;
// Safe area insets (Dynamic Island top + home indicator bottom)
const SA_TOP = 59;
const SA_BOTTOM = 34;
// Dynamic Island, in points: 126 × 37, 11 from the top edge. The status
// items sit centered on it, in the two "ears" either side.
const ISLAND_W = 126;
const ISLAND_H = 37;
const ISLAND_TOP = 11;
// Display size
const FRAME_W = 280;
const SCALE = FRAME_W / DEVICE_W;
const FRAME_H = Math.round(DEVICE_H * SCALE);

interface PhoneMockupProps {
  src: string;
  className?: string;
  /** Called once the inner iframe has loaded — for postMessage coordination. */
  onIframeLoad?: (iframe: HTMLIFrameElement) => void;
}

export function PhoneMockup({ src, className, onIframeLoad }: PhoneMockupProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = React.useState(false);

  const handleLoad = React.useCallback(() => {
    setLoaded(true);
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc) {
        const style = doc.createElement("style");
        style.textContent = `:root{--appshell-safe-area-inset-top:${SA_TOP}px;--appshell-safe-area-inset-bottom:${SA_BOTTOM}px;--appshell-safe-area-inset-left:0px;--appshell-safe-area-inset-right:0px}`;
        doc.head.appendChild(style);
      }
    } catch {
      // cross-origin - ignored in production
    }
    if (iframeRef.current) {
      onIframeLoad?.(iframeRef.current);
    }
  }, [onIframeLoad]);

  // With static export the iframe can finish loading before hydration,
  // in which case React's onLoad never fires — detect that case on mount.
  React.useEffect(() => {
    if (loaded) return;
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc && doc.readyState === "complete" && doc.URL !== "about:blank") {
        handleLoad();
      }
    } catch {
      // cross-origin — the load event is the only signal we get
    }
  }, [loaded, handleLoad]);

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

          {/* Dynamic Island — outside the blended layer so it stays black */}
          <div
            className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 rounded-full bg-black"
            style={{
              top: ISLAND_TOP * SCALE,
              width: ISLAND_W * SCALE,
              height: ISLAND_H * SCALE,
            }}
          />

          {/* Status bar overlay, vertically centered on the island */}
          <div
            className="pointer-events-none absolute inset-x-0 z-20 grid items-center text-white mix-blend-difference"
            style={{
              top: ISLAND_TOP * SCALE,
              height: ISLAND_H * SCALE,
              gridTemplateColumns: `1fr ${ISLAND_W * SCALE}px 1fr`,
            }}
          >
            <span className="justify-self-center ps-2 text-[12px] font-semibold leading-none tracking-tight">
              9:41
            </span>
            <span />
            <div className="flex items-center gap-[4px] justify-self-center pe-2">
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
