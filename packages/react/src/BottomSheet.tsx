"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./cn";
import { useDirection, useLabel } from "./I18nContext";
import { useFocusTrap } from "./focus-trap";
import { useOverlayLayer } from "./overlay-stack";
import type { BottomSheetProps } from "./types";

const subscribeNever = () => () => {};

const EXIT_MS = 260;

/**
 * A draggable bottom sheet with snap points — the mobile pattern for
 * content layered over a map, a player, or a feed. Pure CSS transforms
 * drive the motion, so dragging stays 60fps with no motion adapter.
 *
 * - `snapPoints` are viewport fractions; drag the grabber to move between
 *   them, drag well below the lowest to dismiss.
 * - `modal` (default) dims and locks the page; `modal={false}` keeps the
 *   page behind interactive.
 * - The panel is portaled and renders nothing during SSR.
 */
export function BottomSheet({
  open,
  onClose,
  snapPoints = [0.45, 0.9],
  defaultSnap = 0,
  onSnapChange,
  modal = true,
  className,
  "aria-label": ariaLabel,
  children,
}: BottomSheetProps) {
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );

  const maxFrac = snapPoints[snapPoints.length - 1] ?? 0.9;
  const trapId = useId();

  // Modal sheets trap Tab and hand focus back on close.
  useFocusTrap(open && modal, trapId);

  const [snapIndex, setSnapIndex] = useState(defaultSnap);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Presence handles the exit transition: keep rendering briefly after
  // `open` flips false so the slide-down can play.
  const [present, setPresent] = useState(open);
  const [shown, setShown] = useState(false);

  // Adjust-state-during-render: sync presence and re-seed the snap index
  // on every open transition without effect-driven setState.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setPresent(true);
      setSnapIndex(Math.min(defaultSnap, snapPoints.length - 1));
      setDragOffset(0);
    } else {
      setShown(false);
    }
  }

  // Slide in on the frame after the portal mounts; unmount after the
  // exit transition. setState inside raf/timeout callbacks is async.
  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const timer = setTimeout(() => setPresent(false), EXIT_MS);
    return () => clearTimeout(timer);
  }, [open]);

  // A modal sheet joins the stack as a scroll-locking, Escape-answering
  // layer; a non-modal one only takes a stacking slot, so it sits above
  // whatever was opened before it and leaves the page alone.
  const { zIndex } = useOverlayLayer({ open, onClose, modal });
  const sheetLabel = useLabel("sheet", undefined, ariaLabel);
  const dir = useDirection();

  const dragState = useRef<{ startY: number; startOffset: number } | null>(
    null
  );

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = { startY: e.clientY, startOffset: dragOffset };
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state) return;
    const vh = window.innerHeight || 1;
    const restingOffset = (maxFrac - (snapPoints[snapIndex] ?? maxFrac)) * vh;
    const raw = e.clientY - state.startY + state.startOffset;
    // Can't drag above the tallest snap; below, the release handler decides.
    setDragOffset(Math.max(raw, -restingOffset));
  };

  const handlePointerUp = () => {
    const state = dragState.current;
    dragState.current = null;
    setDragging(false);
    if (!state) return;

    const vh = window.innerHeight || 1;
    const currentFrac = snapPoints[snapIndex] ?? maxFrac;
    const visibleFrac = currentFrac - dragOffset / vh;

    // Dragged well below the lowest snap → dismiss.
    if (visibleFrac < (snapPoints[0] ?? 0.2) / 2) {
      setDragOffset(0);
      onClose();
      return;
    }

    let nearest = 0;
    for (let i = 1; i < snapPoints.length; i++) {
      if (
        Math.abs(snapPoints[i] - visibleFrac) <
        Math.abs(snapPoints[nearest] - visibleFrac)
      ) {
        nearest = i;
      }
    }
    setDragOffset(0);
    if (nearest !== snapIndex) {
      setSnapIndex(nearest);
      onSnapChange?.(nearest);
    }
  };

  if (!mounted || !present) return null;

  const currentFrac = snapPoints[snapIndex] ?? maxFrac;
  const panelStyle: CSSProperties = {
    height: `${maxFrac * 100}dvh`,
    transform: shown
      ? `translateY(calc(${(maxFrac - currentFrac) * 100}dvh + ${dragOffset}px))`
      : "translateY(100%)",
    transitionDuration: dragging ? "0s" : undefined,
  };

  return createPortal(
    <div
      dir={dir}
      data-bottom-sheet-root
      className={cn("fixed inset-0", !modal && "pointer-events-none")}
      style={{ zIndex }}
    >
      {modal && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-200",
            shown ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      <div
        role="dialog"
        aria-modal={modal || undefined}
        aria-label={sheetLabel}
        data-bottom-sheet
        data-focus-trap-id={trapId}
        style={panelStyle}
        className={cn(
          "pointer-events-auto absolute inset-x-0 bottom-0 flex flex-col overflow-hidden",
          "rounded-t-2xl border border-b-0 border-border bg-background shadow-2xl",
          "transition-transform duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          "sm:mx-auto sm:max-w-lg",
          className
        )}
      >
        {/* Grabber — the drag surface. touch-action:none so touch drags
            move the sheet instead of scrolling the page. */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex shrink-0 cursor-grab touch-none justify-center py-3 active:cursor-grabbing"
        >
          <span
            aria-hidden
            className="h-1.5 w-10 rounded-full bg-muted-foreground/30"
          />
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          style={{
            paddingBottom:
              "var(--appshell-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))",
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

BottomSheet.displayName = "BottomSheet";
