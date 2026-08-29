"use client";

import * as React from "react";
import { ArrowUpRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { PhoneMockup } from "./phone-mockup";
import { cn } from "@/lib/utils";

export type PreviewDevice = "mobile" | "tablet" | "desktop";
type Device = PreviewDevice;

// iPad Mini portrait logical resolution
const TABLET_W = 768;
const TABLET_H = 1024;
const TABLET_SA_TOP = 24;
const TABLET_SA_BOTTOM = 20;
// Desktop logical resolution
const DESKTOP_W = 1440;
const DESKTOP_H = 900;

function useContainerWidth<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

function ScaledFrame({
  src,
  title,
  logicalWidth,
  logicalHeight,
  maxWidth,
  saTop = 0,
  saBottom = 0,
  frameClassName,
  chrome,
  onIframeLoad,
}: {
  src: string;
  title: string;
  logicalWidth: number;
  logicalHeight: number;
  maxWidth: number;
  saTop?: number;
  saBottom?: number;
  frameClassName?: string;
  chrome?: React.ReactNode;
  onIframeLoad?: (iframe: HTMLIFrameElement) => void;
}) {
  const { ref, width } = useContainerWidth<HTMLDivElement>();
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const frameWidth = Math.min(width, maxWidth);
  const scale = frameWidth > 0 ? frameWidth / logicalWidth : 0;

  const injectInsets = React.useCallback(() => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc) {
        const style = doc.createElement("style");
        style.textContent = `:root{--appshell-safe-area-inset-top:${saTop}px;--appshell-safe-area-inset-bottom:${saBottom}px;--appshell-safe-area-inset-left:0px;--appshell-safe-area-inset-right:0px}`;
        doc.head.appendChild(style);
      }
    } catch {
      // cross-origin — ignored
    }
    if (iframeRef.current) onIframeLoad?.(iframeRef.current);
  }, [saTop, saBottom, onIframeLoad]);

  return (
    <div ref={ref} className="w-full">
      {frameWidth > 0 && (
        <div
          className={cn("mx-auto overflow-hidden", frameClassName)}
          style={{ width: frameWidth }}
        >
          {chrome}
          <div
            className="relative overflow-hidden"
            style={{ height: Math.round(logicalHeight * scale) }}
          >
            <iframe
              ref={iframeRef}
              src={src}
              title={title}
              onLoad={injectInsets}
              className="origin-top-left border-0 bg-background"
              style={{
                width: logicalWidth,
                height: logicalHeight,
                transform: `scale(${scale})`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const devices: { id: Device; label: string; icon: typeof Smartphone }[] = [
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "desktop", label: "Desktop", icon: Monitor },
];

interface DevicePreviewProps {
  src: string;
  title: string;
  /** Controlled device selection (uncontrolled when omitted). */
  device?: Device;
  onDeviceChange?: (device: Device) => void;
  /** Called whenever the active frame's iframe finishes loading. */
  onIframeLoad?: (iframe: HTMLIFrameElement) => void;
  /** Frame size caps — smaller values suit side-column layouts. */
  tabletMaxWidth?: number;
  desktopMaxWidth?: number;
}

/**
 * Example preview with a mobile / tablet / desktop switcher.
 * Mobile renders the phone mockup; tablet and desktop render the demo at
 * real logical resolutions, scaled to fit.
 */
export function DevicePreview({
  src,
  title,
  device: controlledDevice,
  onDeviceChange,
  onIframeLoad,
  tabletMaxWidth = 460,
  desktopMaxWidth = 1024,
}: DevicePreviewProps) {
  const [internalDevice, setInternalDevice] = React.useState<Device>("mobile");
  const device = controlledDevice ?? internalDevice;
  const setDevice = (d: Device) => {
    if (controlledDevice === undefined) setInternalDevice(d);
    onDeviceChange?.(d);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center rounded-lg border bg-muted/50 p-0.5">
          {devices.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setDevice(id)}
              aria-pressed={device === id}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                device === id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
        >
          Open fullscreen
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      <div className="mt-6">
        {device === "mobile" && (
          <div className="flex justify-center">
            <PhoneMockup src={src} onIframeLoad={onIframeLoad} />
          </div>
        )}

        {device === "tablet" && (
          <ScaledFrame
            src={src}
            title={`${title} — tablet preview`}
            logicalWidth={TABLET_W}
            logicalHeight={TABLET_H}
            maxWidth={tabletMaxWidth}
            saTop={TABLET_SA_TOP}
            saBottom={TABLET_SA_BOTTOM}
            frameClassName="rounded-[1.75rem] border-[10px] border-zinc-800 bg-black shadow-2xl shadow-black/30 dark:border-zinc-700"
            onIframeLoad={onIframeLoad}
          />
        )}

        {device === "desktop" && (
          <ScaledFrame
            src={src}
            title={`${title} — desktop preview`}
            logicalWidth={DESKTOP_W}
            logicalHeight={DESKTOP_H}
            maxWidth={desktopMaxWidth}
            onIframeLoad={onIframeLoad}
            frameClassName="rounded-xl border bg-background shadow-xl shadow-black/10"
            chrome={
              <div className="flex items-center gap-1.5 border-b bg-muted/40 px-3 py-2">
                <span className="size-2.5 rounded-full bg-red-400/80" />
                <span className="size-2.5 rounded-full bg-amber-400/80" />
                <span className="size-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">
                  {src}
                </span>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
