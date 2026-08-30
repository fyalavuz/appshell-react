"use client";

import { memo, type ChangeEvent, type ReactNode } from "react";
import { cn } from "./cn";
import { useLabel } from "./I18nContext";
import { useHeaderTheme } from "./HeaderContext";
import type { SearchFieldProps } from "./types";

const ShortcutHint = ({ hint, onDark }: { hint: ReactNode; onDark: boolean }) => (
  <kbd
    aria-hidden
    className={cn(
      "pointer-events-none hidden h-5 shrink-0 select-none items-center rounded border px-1.5 font-sans text-[11px] font-medium sm:inline-flex",
      onDark ? "border-white/25 text-current/70" : "border-border text-muted-foreground"
    )}
  >
    {hint}
  </kbd>
);

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
 * A ready-made search input for the Header's search row (usable anywhere).
 *
 * - variant="pill": rounded, inset field — the classic mobile search bar.
 * - variant="full": edge-to-edge flat field spanning the entire row.
 *
 * Adapts its surface colors to the active Header theme via useHeaderTheme().
 */
export const SearchField = memo(function SearchField({
  variant = "pill",
  placeholder,
  value,
  defaultValue,
  onChange,
  onSubmit,
  onFocus,
  onClick,
  shortcutHint,
  inset = true,
  className,
  inputClassName,
  "aria-label": ariaLabel,
}: SearchFieldProps) {
  const theme = useHeaderTheme();
  const placeholderText = useLabel("search", undefined, placeholder);
  const onDark = theme === "primary" || theme === "dark";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange?.(e.target.value);

  const input = (
    <input
      type="search"
      role="searchbox"
      aria-label={ariaLabel ?? placeholderText}
      placeholder={placeholderText}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      onFocus={onFocus}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSubmit?.(e.currentTarget.value);
      }}
      className={cn(
        "w-full bg-transparent text-sm outline-none",
        "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
        onDark
          ? "text-current placeholder:text-current/60"
          : "text-foreground placeholder:text-muted-foreground",
        inputClassName
      )}
    />
  );

  if (variant === "full") {
    return (
      <label
        data-search-field="full"
        className={cn(
          "flex w-full cursor-text items-center gap-2.5 px-4 py-2.5",
          "transition-colors focus-within:ring-2 focus-within:ring-inset focus-within:ring-ring",
          onDark ? "bg-white/10" : "border-y border-border/60 bg-muted/60",
          className
        )}
      >
        <SearchIcon />
        {input}
        {shortcutHint && <ShortcutHint hint={shortcutHint} onDark={onDark} />}
      </label>
    );
  }

  const pill = (
    <label
      data-search-field="pill"
      className={cn(
        "flex cursor-text items-center gap-2.5 rounded-full px-3.5 py-2",
        "transition-colors focus-within:ring-2 focus-within:ring-ring",
        onDark ? "bg-white/15" : "bg-muted",
        className
      )}
    >
      <SearchIcon />
      {input}
      {shortcutHint && <ShortcutHint hint={shortcutHint} onDark={onDark} />}
    </label>
  );

  if (!inset) return pill;

  return (
    // Centered with a sane max width on large screens — a phone-width pill
    // stretched across a desktop header reads as a bug, not a search bar.
    <div className="w-full px-4 pb-3 sm:mx-auto sm:max-w-xl">{pill}</div>
  );
});

SearchField.displayName = "SearchField";
