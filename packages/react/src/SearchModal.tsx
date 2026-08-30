"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./cn";
import { useFocusTrap } from "./focus-trap";
import { useMotion } from "./motion";
import type { SearchModalProps } from "./types";

const subscribeNever = () => () => {};

const SearchIcon = () => (
  <svg
    className="size-4 shrink-0 opacity-60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

/**
 * A full search experience in an overlay: sheet-style on phones, a centered
 * command-palette panel on larger screens. Owns its input; the results area
 * is yours via children (a node, or a render function of the live query).
 *
 * Pair it with SearchField as the trigger:
 *
 *   <SearchField value={q} onChange={setQ} onClick={() => setOpen(true)} />
 *   <SearchModal open={open} onClose={() => setOpen(false)} defaultQuery={q}>
 *     {(query) => <Results query={query} />}
 *   </SearchModal>
 *
 * Standalone by design — no Header or AppShell required.
 */
export function SearchModal({
  open,
  onClose,
  query: controlledQuery,
  defaultQuery = "",
  onQueryChange,
  onSubmit,
  placeholder = "Search",
  children,
  closeLabel = "Cancel",
  className,
  overlayClassName,
  "aria-label": ariaLabel,
}: SearchModalProps) {
  const { motion, AnimatePresence } = useMotion();
  const [internalQuery, setInternalQuery] = useState(defaultQuery);

  // Re-seed the input on every open transition — the sanctioned
  // adjust-state-during-render pattern, no effect involved.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setInternalQuery(defaultQuery);
  }

  const query = controlledQuery ?? internalQuery;

  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const trapId = useId();

  // Tab stays inside the dialog; the modal's own effect restores focus.
  useFocusTrap(open, trapId, { restoreFocus: false });

  // Portals need a document — render nothing during SSR and hydrate in.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );

  // On every open: remember the opener, focus the input; restore on close.
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    // After the portal paints.
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!mounted) return null;

  const setQuery = (value: string) => {
    if (controlledQuery === undefined) setInternalQuery(value);
    onQueryChange?.(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit?.(e.currentTarget.value);
  };

  const results = typeof children === "function" ? children(query) : children;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm",
              overlayClassName
            )}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — full-screen sheet on phones, centered palette on sm+ */}
          <motion.div
            key="search-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel ?? placeholder}
            data-search-modal
            data-focus-trap-id={trapId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed z-[81] flex flex-col overflow-hidden bg-background",
              "inset-0",
              "sm:inset-x-0 sm:top-[10vh] sm:bottom-auto sm:mx-auto sm:max-h-[70vh] sm:w-full sm:max-w-xl sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl",
              className
            )}
          >
            {/* Sheet mode only: keep the input row clear of the status bar */}
            <div
              aria-hidden
              className="shrink-0 sm:hidden"
              style={{
                height:
                  "var(--appshell-safe-area-inset-top, env(safe-area-inset-top, 0px))",
              }}
            />
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <label className="flex min-w-0 flex-1 cursor-text items-center gap-2.5 text-foreground">
                <SearchIcon />
                <input
                  ref={inputRef}
                  type="search"
                  role="searchbox"
                  aria-label={ariaLabel ?? placeholder}
                  placeholder={placeholder}
                  value={query}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className={cn(
                    "w-full bg-transparent text-base outline-none sm:text-sm",
                    "placeholder:text-muted-foreground",
                    "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                  )}
                />
              </label>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {closeLabel}
              </button>
            </div>

            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
              style={{
                paddingBottom:
                  "var(--appshell-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))",
              }}
            >
              {results}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

SearchModal.displayName = "SearchModal";
