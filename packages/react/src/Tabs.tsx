"use client";

import {
  Children,
  createContext,
  Fragment,
  isValidElement,
  memo,
  useContext,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "./cn";
import type { TabProps, TabsProps } from "./types";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function firstTabValue(children: ReactNode): string {
  let found = "";
  const visit = (nodes: ReactNode) => {
    Children.forEach(nodes, (child) => {
      if (found || !isValidElement(child)) return;
      const props = child.props as { value?: unknown; children?: ReactNode };
      if (child.type === Fragment) {
        visit(props.children);
        return;
      }
      if (typeof props.value === "string") found = props.value;
    });
  };
  visit(children);
  return found;
}

/**
 * A tab row that docks itself below a pinned Header through the
 * --header-height variable the Header publishes — the sticky
 * sub-navigation pattern, solved once.
 *
 * Semantics: role="tablist"/"tab", ArrowLeft/ArrowRight roving focus,
 * controlled (value/onValueChange) or uncontrolled (defaultValue).
 * Render the matching panel yourself from the current value.
 */
export const Tabs = memo(function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  sticky = true,
  className,
  "aria-label": ariaLabel,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(
    () => defaultValue ?? firstTabValue(children)
  );
  const value = controlledValue ?? internalValue;
  const listRef = useRef<HTMLDivElement>(null);

  const setValue = (next: string) => {
    if (controlledValue === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  // Roving focus: arrows move between tabs and select as they go.
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []
    );
    if (tabs.length === 0) return;
    const current = tabs.findIndex((t) => t === document.activeElement);
    const start = current === -1 ? 0 : current;
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(start + delta + tabs.length) % tabs.length];
    next.focus();
    next.click();
    e.preventDefault();
  };

  return (
    <div
      data-tabs
      className={cn(
        "z-40 border-b border-border bg-background/95 backdrop-blur",
        sticky && "sticky",
        className
      )}
      style={sticky ? { top: "var(--header-height, 0px)" } : undefined}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-label={ariaLabel ?? "Tabs"}
        onKeyDown={handleKeyDown}
        className="mx-auto flex w-full max-w-2xl"
      >
        <TabsContext.Provider value={{ value, setValue }}>
          {children}
        </TabsContext.Provider>
      </div>
    </div>
  );
});

Tabs.displayName = "Tabs";

export const Tab = memo(function Tab({
  value,
  label,
  badge,
  className,
}: TabProps) {
  const ctx = useContext(TabsContext);
  const selected = ctx?.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onClick={() => ctx?.setValue(value)}
      className={cn(
        "relative flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        selected
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {label}
      {badge != null && <span className="shrink-0">{badge}</span>}
      {selected && (
        <span
          aria-hidden
          className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-primary"
        />
      )}
    </button>
  );
});

Tab.displayName = "Tab";
