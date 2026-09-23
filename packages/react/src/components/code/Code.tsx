import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Code.module.css";
import type { CodeBlockProps, CodeProps } from "./Code.types";

const CodeInline = forwardRef<HTMLElement, CodeProps>(function CodeInline(
  { className, ...props },
  ref,
) {
  return (
    <code {...props} ref={ref} className={clsx(styles.inline, className)} />
  );
});

const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(function CodeBlock(
  { children, className, label = "代码片段", wrap = false, ...props },
  ref,
) {
  return (
    <pre
      {...props}
      ref={ref}
      className={clsx(styles.block, className)}
      role="region"
      aria-label={label}
      tabIndex={0}
      data-wrap={wrap || undefined}
    >
      <code>{children}</code>
    </pre>
  );
});

export const Code = Object.assign(CodeInline, { Block: CodeBlock });
