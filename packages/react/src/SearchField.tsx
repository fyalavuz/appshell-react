"use client";

import { memo, type ChangeEvent } from "react";
import { cn } from "./cn";
import { useHeaderTheme } from "./HeaderContext";
import type { SearchFieldProps } from "./types";

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
  placeholder = "Search",
  value,
  defaultValue,
  onChange,
  onSubmit,
  onFocus,
  onClick,
  className,
  inputClassName,
  "aria-label": ariaLabel,
}: SearchFieldProps) {
  const theme = useHeaderTheme();
  const onDark = theme === "primary" || theme === "dark";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange?.(e.target.value);

  const input = (
    <input
      type="search"
      role="searchbox"
      aria-label={ariaLabel ?? placeholder}
      placeholder={placeholder}
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
      </label>
    );
  }

  return (
    <div className="w-full px-4 pb-3">
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
      </label>
    </div>
  );
});

SearchField.displayName = "SearchField";
