"use client";

import { useSyncExternalStore } from "react";

/**
 * Below this, the shrinking viewport is browser chrome — a URL bar sliding
 * back in — not a keyboard. Hiding a tab bar for that would be a bug.
 */
const KEYBOARD_MIN_PX = 80;

const CSS_VAR = "--appshell-keyboard-inset-bottom";

const listeners = new Set<() => void>();
let inset = 0;
let frame = 0;
let attached = false;

function read(): number {
  const viewport = window.visualViewport;
  if (!viewport) return 0;
  // What the keyboard covers: the layout viewport minus the visual one,
  // minus however far the visual viewport has been scrolled down inside it.
  const covered = window.innerHeight - viewport.height - viewport.offsetTop;
  const rounded = Math.round(Math.max(0, covered));
  return rounded >= KEYBOARD_MIN_PX ? rounded : 0;
}

function measure() {
  frame = 0;
  const next = read();
  if (next === inset) return;
  inset = next;
  document.documentElement.style.setProperty(CSS_VAR, `${inset}px`);
  for (const listener of listeners) listener();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(measure);
}

function attach() {
  const viewport = window.visualViewport;
  if (!viewport || attached) return;
  attached = true;
  viewport.addEventListener("resize", schedule);
  viewport.addEventListener("scroll", schedule);
  measure();
}

function detach() {
  const viewport = window.visualViewport;
  attached = false;
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
  viewport?.removeEventListener("resize", schedule);
  viewport?.removeEventListener("scroll", schedule);
  inset = 0;
  document.documentElement.style.removeProperty(CSS_VAR);
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (listeners.size === 1) attach();
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) detach();
  };
}

const getSnapshot = () => inset;
const getServerSnapshot = () => 0;

/**
 * How many pixels of the viewport the on-screen keyboard currently covers,
 * and — while anything is subscribed — the same value published as
 * `--appshell-keyboard-inset-bottom` for CSS to use.
 *
 * Measured through `visualViewport`, which is the only mechanism that works
 * on every mobile browser: the `VirtualKeyboard` API is Chromium-only and
 * `interactive-widget` is ignored by iOS Safari. Returns 0 with no keyboard,
 * during SSR, and in browsers without `visualViewport`.
 *
 * The shell already uses it — a modal BottomSheet and the SearchModal keep
 * their content clear of the keyboard, and `<Footer hideOnKeyboard>` steps
 * out of the way — so reach for the hook when your own content needs it.
 */
export function useKeyboardInset(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
