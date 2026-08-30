"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";

/**
 * The overlay layer stack.
 *
 * Every overlay presentation in the library (the Sidebar drawer, SearchModal,
 * a modal BottomSheet, the anchored menus) registers here while it is open.
 * Three things that must be decided once, globally, are decided here instead
 * of in each component:
 *
 * 1. **Close requests.** One document listener, delivered to the topmost
 *    dismissable layer only. Five components each listening for Escape meant
 *    one keypress closed all of them — a menu inside a drawer took the drawer
 *    down with it.
 * 2. **Scroll lock.** One refcounted owner. Save-and-restore per component
 *    left the page scrollable behind an open overlay, or locked forever with
 *    nothing open, depending on the order they closed in.
 * 3. **Stacking.** z-index follows open order, not component identity, so a
 *    sheet opened from a drawer lands above it rather than underneath.
 *
 * The refcount and the stack key off `open`, not mount, so a layer that is
 * closing but still mounted for its exit animation has already let go.
 */

interface Layer {
  id: string;
  /** Modal layers hold the scroll lock. */
  modal: boolean;
  /** Whether this layer answers close requests (Escape). */
  dismissable: boolean;
  close: () => void;
}

/** First z-index handed to an overlay layer — above every docked chrome row. */
const BASE_Z_INDEX = 70;
/** Room between layers so each can put a panel above its own backdrop. */
const Z_INDEX_STEP = 10;

const layers: Layer[] = [];
const subscribers = new Set<() => void>();

// A version counter rather than a snapshot object: useSyncExternalStore
// compares snapshots by identity, and a fresh object every read would loop.
let version = 0;

const subscribe = (onStoreChange: () => void) => {
  subscribers.add(onStoreChange);
  return () => {
    subscribers.delete(onStoreChange);
  };
};

const getVersion = () => version;
const getServerVersion = () => 0;

function emit() {
  version += 1;
  for (const subscriber of subscribers) subscriber();
}

// --- Scroll lock -----------------------------------------------------------

let lockCount = 0;
let originalOverflow = "";
let originalPaddingRight = "";

/** Width the classic scrollbar occupies, or 0 where it overlays content. */
function scrollbarGap(): number {
  const viewport = document.documentElement.clientWidth;
  // No layout (SSR shims, jsdom) reports 0 — treat it as no scrollbar rather
  // than as a viewport-wide gap.
  if (!viewport) return 0;
  return Math.max(0, window.innerWidth - viewport);
}

function acquireScrollLock() {
  lockCount += 1;
  if (lockCount > 1) return;

  const body = document.body;
  originalOverflow = body.style.overflow;
  originalPaddingRight = body.style.paddingRight;

  // Hiding the scrollbar hands its width back to the viewport, so the page
  // jumps sideways under the overlay unless the space is held open. Fixed
  // chrome reads the same value through the variable.
  const gap = scrollbarGap();
  body.style.overflow = "hidden";
  if (gap > 0) {
    const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${current + gap}px`;
    document.documentElement.style.setProperty(
      "--appshell-scrollbar-gap",
      `${gap}px`
    );
  }
}

function releaseScrollLock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;
  document.body.style.overflow = originalOverflow;
  document.body.style.paddingRight = originalPaddingRight;
  document.documentElement.style.removeProperty("--appshell-scrollbar-gap");
  originalOverflow = "";
  originalPaddingRight = "";
}

// --- Close requests --------------------------------------------------------

function topmostDismissable(): Layer | undefined {
  for (let i = layers.length - 1; i >= 0; i--) {
    if (layers[i].dismissable) return layers[i];
  }
  return undefined;
}

/**
 * One close-request owner for the whole stack.
 *
 * Where the platform has CloseWatcher, use it: it defines a "close request"
 * as whatever the device means by it — Escape on a keyboard, the back
 * gesture or button on Android, the TalkBack back gesture — so the drawer
 * closes on Android back instead of the page navigating away. Its stack
 * semantics are the same as ours (only the most recently constructed watcher
 * is called), and we only ever hold one.
 *
 * Everywhere else, a single keydown listener does the Escape half. The two
 * are alternatives, never both: CloseWatcher already answers Escape, and
 * listening as well would close two layers per press.
 */
interface CloseWatcherLike {
  destroy: () => void;
  onclose: (() => void) | null;
}

let keyListener: ((e: KeyboardEvent) => void) | null = null;
let closeWatcher: CloseWatcherLike | null = null;

function createCloseWatcher(): CloseWatcherLike | null {
  const Ctor = (
    globalThis as unknown as {
      CloseWatcher?: new () => CloseWatcherLike;
    }
  ).CloseWatcher;
  if (!Ctor) return null;

  const watcher = new Ctor();
  watcher.onclose = () => {
    // The platform destroys a watcher once it fires, so take a fresh one for
    // whatever is still open underneath.
    closeWatcher = null;
    topmostDismissable()?.close();
    syncCloseRequestListener();
  };
  return watcher;
}

function syncCloseRequestListener() {
  const wanted = layers.some((layer) => layer.dismissable);

  if (wanted) {
    if (closeWatcher || keyListener) return;
    closeWatcher = createCloseWatcher();
    if (closeWatcher) return;

    keyListener = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      topmostDismissable()?.close();
    };
    document.addEventListener("keydown", keyListener);
    return;
  }

  closeWatcher?.destroy();
  closeWatcher = null;
  if (keyListener) {
    document.removeEventListener("keydown", keyListener);
    keyListener = null;
  }
}

// --- Registration ----------------------------------------------------------

function register(layer: Layer) {
  layers.push(layer);
  if (layer.modal) acquireScrollLock();
  syncCloseRequestListener();
  emit();
}

function unregister(id: string) {
  const index = layers.findIndex((layer) => layer.id === id);
  if (index === -1) return;
  const [layer] = layers.splice(index, 1);
  if (layer.modal) releaseScrollLock();
  syncCloseRequestListener();
  emit();
}

export interface OverlayLayerOptions {
  /** Whether this presentation is currently on screen. */
  open: boolean;
  /** Called for a close request aimed at this layer. */
  onClose?: () => void;
  /** Takes the scroll lock and renders a backdrop. Default true. */
  modal?: boolean;
  /** Answers close requests. Defaults to `modal`. */
  dismissable?: boolean;
}

export interface OverlayLayer {
  /** Stacking level for this layer's backdrop; put its panel one above. */
  zIndex: number;
  /** Whether this layer is the frontmost one — the one Escape addresses. */
  isTopmost: boolean;
}

/**
 * Joins the overlay stack while `open`, and reports back where this layer
 * landed. Everything else (scroll lock, Escape ownership) is handled for you.
 */
export function useOverlayLayer({
  open,
  onClose,
  modal = true,
  dismissable = modal,
}: OverlayLayerOptions): OverlayLayer {
  const id = useId();

  // Read through the store so a layer re-renders when the stack shifts
  // underneath it (something opened above, or the layer above closed).
  useSyncExternalStore(subscribe, getVersion, getServerVersion);

  // The close callback is read at request time, so a changing handler
  // identity never re-registers the layer.
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    register({
      id,
      modal,
      dismissable,
      close: () => closeRef.current?.(),
    });
    return () => unregister(id);
  }, [open, id, modal, dismissable]);

  const index = layers.findIndex((layer) => layer.id === id);
  return {
    zIndex: BASE_Z_INDEX + Math.max(0, index) * Z_INDEX_STEP,
    isTopmost: index === layers.length - 1,
  };
}
