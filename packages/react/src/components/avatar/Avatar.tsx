"use client";

import { clsx } from "clsx";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { forwardRef } from "react";
import type { ComponentRef } from "react";

import styles from "./Avatar.module.css";
import type { AvatarProps } from "./Avatar.types";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => Array.from(part)[0])
    .slice(0, 2)
    .join("")
    .toLocaleUpperCase();
}

export const Avatar = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(function Avatar(
  {
    alt,
    className,
    fallback,
    fallbackDelayMs = 0,
    name,
    shape = "circle",
    size = "md",
    src,
    ...props
  },
  ref,
) {
  const accessibleName = alt ?? name;

  return (
    <AvatarPrimitive.Root
      {...props}
      ref={ref}
      className={clsx(styles.root, styles[size], styles[shape], className)}
      role={accessibleName ? "img" : undefined}
      aria-label={accessibleName || undefined}
      data-size={size}
      data-shape={shape}
    >
      {src ? (
        <AvatarPrimitive.Image className={styles.image} src={src} alt="" />
      ) : null}
      <AvatarPrimitive.Fallback
        className={styles.fallback}
        delayMs={fallbackDelayMs}
        aria-hidden="true"
      >
        {fallback ?? getInitials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
});
