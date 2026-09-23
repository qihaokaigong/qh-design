import type { Avatar as AvatarPrimitive } from "radix-ui";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarShape = "circle" | "square";

export interface AvatarProps
  extends Omit<
    ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    "asChild" | "children"
  > {
  /** Accessible name for the person or entity and source for generated initials. */
  name: string;
  /** Image URL. The fallback is shown while unavailable. */
  src?: string;
  /** Accessible image description. Defaults to name. Use an empty string when nearby text already names the person. */
  alt?: string;
  /** Custom fallback content. Defaults to initials derived from name. */
  fallback?: ReactNode;
  /** Delay before displaying the fallback, in milliseconds. Defaults to 0. */
  fallbackDelayMs?: number;
  /** Visual size. Defaults to md. */
  size?: AvatarSize;
  /** Visual shape. Defaults to circle. */
  shape?: AvatarShape;
}
