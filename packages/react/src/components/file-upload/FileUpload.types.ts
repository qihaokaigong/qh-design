import type { AriaAttributes } from "react";

import type { FileRejection } from "../dropzone";

export interface FileUploadProps
  extends Pick<
    AriaAttributes,
    "aria-describedby" | "aria-label" | "aria-labelledby"
  > {
  /** MIME types, MIME wildcards, or file extensions accepted by the picker. */
  acceptedFileTypes?: readonly string[];
  /** Visible label for the file-picker button. Defaults to 选择文件. */
  browseLabel?: string;
  /** Additional class applied to the component root. */
  className?: string;
  /** Initial selected files for an uncontrolled component. */
  defaultFiles?: readonly File[];
  /** Prevents selection, drop, and removal. Inherits from Field when omitted. */
  disabled?: boolean;
  /** Visible instruction inside the dropzone. Defaults to 将文件拖放到这里. */
  dropLabel?: string;
  /** Accessible name for the drop interaction. Defaults to 文件拖放区域. */
  dropzoneLabel?: string;
  /** Controlled selected files. */
  files?: readonly File[];
  /** Id applied to the native file input and connected to Field.Label. */
  id?: string;
  /** Marks the control as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Maximum total number of selected files. */
  maxFiles?: number;
  /** Maximum size of each file in bytes. */
  maxFileSize?: number;
  /** Allows more than one selected file. */
  multiple?: boolean;
  /** Called when selected files change. */
  onFilesChange?: (files: File[]) => void;
  /** Called when files fail type, size, count, or duplicate validation. */
  onFilesRejected?: (rejections: FileRejection[]) => void;
  /** Returns the accessible label for a file removal action. */
  removeFileLabel?: (file: File) => string;
  /** Marks a selection as required for assistive technology. Inherits from Field when omitted. */
  required?: boolean;
}
