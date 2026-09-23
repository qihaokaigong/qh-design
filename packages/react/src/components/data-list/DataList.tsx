import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./DataList.module.css";
import type {
  DataListItemProps,
  DataListLabelProps,
  DataListProps,
  DataListValueProps,
} from "./DataList.types";

const DataListRoot = forwardRef<HTMLDListElement, DataListProps>(
  function DataListRoot({ className, layout = "responsive", ...props }, ref) {
    return (
      <dl
        {...props}
        ref={ref}
        className={clsx(styles.root, styles[layout], className)}
        data-layout={layout}
      />
    );
  },
);

const DataListItem = forwardRef<HTMLDivElement, DataListItemProps>(
  function DataListItem({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={clsx(styles.item, className)} />
    );
  },
);

const DataListLabel = forwardRef<HTMLElement, DataListLabelProps>(
  function DataListLabel({ className, ...props }, ref) {
    return (
      <dt {...props} ref={ref} className={clsx(styles.label, className)} />
    );
  },
);

const DataListValue = forwardRef<HTMLElement, DataListValueProps>(
  function DataListValue({ className, ...props }, ref) {
    return (
      <dd {...props} ref={ref} className={clsx(styles.value, className)} />
    );
  },
);

export const DataList = Object.assign(DataListRoot, {
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
});
