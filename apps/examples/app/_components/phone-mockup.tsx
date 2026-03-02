"use client";

import { useRef, useState } from "react";
import { cn } from "appshell-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface PhoneMockupProps {
  src: string;
  className?: string;
}

export function PhoneMockup({ src, className }: PhoneMockupProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  const fullSrc = `${basePath}${src}`;

  return (
    <div
      className={cn("relative mx-auto select-none", className)}
      style={{ width: 300, height: 612 }}
    >
      {/* Phone body — titanium finish */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[#2a2a2e] via-[#1d1d1f] to-[#2a2a2e] shadow-2xl shadow-black/40">
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[100px] h-8 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -left-[2px] top-[145px] h-14 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -left-[2px] top-[195px] h-14 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -right-[2px] top-[140px] h-16 w-[3px] rounded-r-sm bg-[#3a3a3c]" />

        {/* Screen bezel */}
        <div className="absolute inset-[6px] rounded-[2.5rem] overflow-hidden bg-black">
          {/* Status bar */}
          <div className="relative z-20 flex h-[52px] items-end justify-between px-7 pb-1 text-white">
            {/* Time */}
            <span className="text-[15px] font-semibold leading-none">9:41</span>
            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-[10px] -translate-x-1/2 h-[30px] w-[120px] rounded-full bg-black z-30" />
            {/* Status icons */}
            <div className="flex items-center gap-[5px]">
              {/* Signal */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                <rect x="0" y="9" width="3" height="3" rx="0.5" opacity="0.4"/>
                <rect x="4.5" y="6" width="3" height="6" rx="0.5" opacity="0.6"/>
                <rect x="9" y="3" width="3" height="9" rx="0.5" opacity="0.8"/>
                <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
              </svg>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                <path d="M8 11.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
                <path d="M4.75 7.75a4.5 4.5 0 016.5 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M2 4.75a8 8 0 0112 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
              {/* Battery */}
              <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
                <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="white" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="19" height="8" rx="1.5" fill="white"/>
                <path d="M24 4v4a2 2 0 000-4z" fill="white" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Iframe screen content */}
          <div className="absolute inset-0 top-0">
            {!loaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
                <div className="size-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={fullSrc}
              title="Example preview"
              className={cn(
                "h-full w-full border-0 transition-opacity duration-300",
                loaded ? "opacity-100" : "opacity-0"
              )}
              style={{ pointerEvents: "auto" }}
              onLoad={() => setLoaded(true)}
            />
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 z-20 h-[5px] w-[130px] rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
}
