import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Alert.module.css";
import type { AlertProps } from "./Alert.types";

const icons = {
  danger: CircleX,
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { action, children, className, role, title, tone = "info", ...props },
  ref,
) {
  const Icon = icons[tone];

  return (
    <div
      {...props}
      ref={ref}
      className={clsx(styles.root, styles[tone], className)}
      role={role ?? (tone === "danger" ? "alert" : "status")}
    >
      <Icon className={styles.icon} aria-hidden="true" />
      <div className={styles.body}>
        {title ? <div className={styles.title}>{title}</div> : null}
        <div className={styles.content}>{children}</div>
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </div>
  );
});
