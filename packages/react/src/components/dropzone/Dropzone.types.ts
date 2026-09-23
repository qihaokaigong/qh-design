import type { AriaAttributes, ReactNode } from "react";

export type FileRejectionReason =
  | "file-type"
  | "file-size"
  | "too-many-files"
  | "duplicate-file";

export interface FileRejection {
  file: File;
  reasons: FileRejectionReason[];
}

export interface FileSelectionResult {
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
}

export interface DropzoneProps
  extends Pick<
    AriaAttributes,
    "aria-describedby" | "aria-label" | "aria-labelledby"
  > {
  /** MIME types, MIME wildcards, or file extensions accepted by the dropzone. */
  acceptedFileTypes?: readonly string[];
  /** Content rendered inside the drop target. */
  children: ReactNode;
  /** Additional class applied to the dropzone root. */
  className?: string;
  /** Prevents drop, paste, and keyboard drop interactions. */
  disabled?: boolean;
  /** Marks the dropzone as invalid. */
  invalid?: boolean;
  /** Maximum number of files accepted in one drop. */
  maxFiles?: number;
  /** Maximum size of each file in bytes. */
  maxFileSize?: number;
  /** Called after dropped files have been read and validated. */
  onFilesDrop?: (result: FileSelectionResult) => void;
}
