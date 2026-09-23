"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import {
  DropZone as AriaDropZone,
  type DropZoneProps as AriaDropZoneProps,
} from "react-aria-components/DropZone";

import styles from "./Dropzone.module.css";
import type { DropzoneProps } from "./Dropzone.types";
import { validateFiles } from "./file-validation";

type DropEvent = Parameters<NonNullable<AriaDropZoneProps["onDrop"]>>[0];

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  function Dropzone(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel = "文件拖放区域",
      "aria-labelledby": ariaLabelledBy,
      acceptedFileTypes,
      children,
      className,
      disabled = false,
      invalid = false,
      maxFiles,
      maxFileSize,
      onFilesDrop,
    },
    ref,
  ) {
    const getDropOperation: AriaDropZoneProps["getDropOperation"] = (types) => {
      if (disabled) return "cancel";
      if (!acceptedFileTypes?.length) {
        return types.has("*/*") ? "copy" : "cancel";
      }

      const mimeTypes = acceptedFileTypes.filter(
        (type) => !type.trim().startsWith("."),
      );
      const acceptsExtension = acceptedFileTypes.some((type) =>
        type.trim().startsWith("."),
      );
      return types.has(mimeTypes) || (acceptsExtension && types.has("*/*"))
        ? "copy"
        : "cancel";
    };

    const handleDrop = async (event: DropEvent) => {
      const files = await Promise.all(
        event.items
          .filter((item) => item.kind === "file")
          .map((item) => item.getFile()),
      );
      onFilesDrop?.(
        validateFiles(files, { acceptedFileTypes, maxFiles, maxFileSize }),
      );
    };

    return (
      <AriaDropZone
        ref={ref}
        className={clsx(styles.root, className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-invalid={invalid || undefined}
        isDisabled={disabled}
        getDropOperation={getDropOperation}
        onDrop={handleDrop}
      >
        {children}
      </AriaDropZone>
    );
  },
);
