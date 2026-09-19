import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Card.module.css";
import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "./Card.types";

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  { className, variant = "outlined", ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(styles.root, styles[variant], className)}
    />
  );
});

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={clsx(styles.header, className)} />
    );
  },
);

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ children, className, ...props }, ref) {
    return (
      <h3 {...props} ref={ref} className={clsx(styles.title, className)}>
        {children}
      </h3>
    );
  },
);

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <p {...props} ref={ref} className={clsx(styles.description, className)} />
    );
  },
);

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={clsx(styles.content, className)} />
    );
  },
);

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={clsx(styles.footer, className)} />
    );
  },
);

export const Card = Object.assign(CardRoot, {
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Title: CardTitle,
});
