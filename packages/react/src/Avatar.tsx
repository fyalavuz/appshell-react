"use client";

import { memo, useState } from "react";
import { cn } from "./cn";
import type { AvatarProps } from "./types";

/**
 * A round identity mark: an image when one loads, initials otherwise.
 * Standalone — use it in headers, sidebars, comment lists, anywhere.
 */
export const Avatar = memo(function Avatar({
  src,
  alt,
  initials,
  size = "2rem",
  className,
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;

  return (
    <span
      data-avatar
      style={{ width: size, height: size }}
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground",
        className
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? initials ?? "Avatar"}
          onError={() => setImageFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <span aria-hidden className="text-[0.6875em] font-semibold uppercase leading-none">
          {initials}
        </span>
      )}
    </span>
  );
});

Avatar.displayName = "Avatar";
