"use client";

import { clsx } from "clsx";
import { FileText, Upload, X } from "lucide-react";
import { forwardRef, useRef, useState } from "react";

import { Button } from "../button";
import {
  Dropzone,
  type FileRejection,
  type FileSelectionResult,
} from "../dropzone";
import { fileIdentity, validateFiles } from "../dropzone/file-validation";
import { useFieldControl } from "../field/useFieldControl";
import { IconButton } from "../icon-button";
import styles from "./FileUpload.module.css";
import type { FileUploadProps } from "./FileUpload.types";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      acceptedFileTypes,
      browseLabel = "选择文件",
      className,
      defaultFiles = [],
      disabled,
      dropLabel = "将文件拖放到这里",
      dropzoneLabel = "文件拖放区域",
      files,
      id,
      invalid,
      maxFiles,
      maxFileSize,
      multiple = false,
      onFilesChange,
      onFilesRejected,
      removeFileLabel = (file) => `移除 ${file.name}`,
      required,
    },
    ref,
  ) {
    const field = useFieldControl({
      describedBy: ariaDescribedBy,
      disabled,
      id,
      invalid,
      required,
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const [uncontrolledFiles, setUncontrolledFiles] = useState<File[]>(() => [
      ...defaultFiles,
    ]);
    const selectedFiles = files ? [...files] : uncontrolledFiles;
    const isControlled = files !== undefined;
    const effectiveMaxFiles = multiple ? maxFiles : 1;

    const commitFiles = (nextFiles: File[]) => {
      if (!isControlled) setUncontrolledFiles(nextFiles);
      onFilesChange?.(nextFiles);
    };

    const addValidatedFiles = ({
      acceptedFiles,
      rejectedFiles,
    }: FileSelectionResult) => {
      const existingKeys = new Set(selectedFiles.map(fileIdentity));
      const uniqueFiles: File[] = [];
      const duplicateRejections: FileRejection[] = [];

      acceptedFiles.forEach((file) => {
        const key = fileIdentity(file);
        if (multiple && existingKeys.has(key)) {
          duplicateRejections.push({ file, reasons: ["duplicate-file"] });
        } else {
          existingKeys.add(key);
          uniqueFiles.push(file);
        }
      });

      const availableSlots = multiple
        ? effectiveMaxFiles === undefined
          ? undefined
          : Math.max(0, effectiveMaxFiles - selectedFiles.length)
        : 1;
      const countResult = validateFiles(uniqueFiles, {
        maxFiles: availableSlots,
      });
      const allRejections = [
        ...rejectedFiles,
        ...duplicateRejections,
        ...countResult.rejectedFiles,
      ];

      if (countResult.acceptedFiles.length) {
        commitFiles(
          multiple
            ? [...selectedFiles, ...countResult.acceptedFiles]
            : [countResult.acceptedFiles[0]],
        );
      }
      if (allRejections.length) onFilesRejected?.(allRejections);
    };

    const validateAndAddFiles = (nextFiles: readonly File[]) => {
      addValidatedFiles(
        validateFiles(nextFiles, { acceptedFileTypes, maxFileSize }),
      );
    };

    const removeFile = (file: File) => {
      commitFiles(
        selectedFiles.filter(
          (candidate) => fileIdentity(candidate) !== fileIdentity(file),
        ),
      );
    };

    const inputLabelledBy = ariaLabelledBy ?? field.labelId;
    const inputLabel = inputLabelledBy ? undefined : (ariaLabel ?? browseLabel);

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-disabled={field.disabled || undefined}
        data-invalid={field.invalid || undefined}
      >
        <Dropzone
          acceptedFileTypes={acceptedFileTypes}
          aria-label={dropzoneLabel}
          aria-describedby={field.describedBy}
          disabled={field.disabled}
          invalid={field.invalid}
          maxFileSize={maxFileSize}
          onFilesDrop={addValidatedFiles}
        >
          <div className={styles.prompt}>
            <Upload className={styles.uploadIcon} aria-hidden="true" />
            <span className={styles.dropLabel}>{dropLabel}</span>
            <span className={styles.orLabel}>或</span>
            <Button
              variant="secondary"
              disabled={field.disabled}
              onClick={() => inputRef.current?.click()}
            >
              {browseLabel}
            </Button>
          </div>
        </Dropzone>

        <input
          ref={inputRef}
          id={field.id}
          className={styles.input}
          type="file"
          accept={acceptedFileTypes?.join(",")}
          multiple={multiple}
          disabled={field.disabled}
          aria-label={inputLabel}
          aria-labelledby={inputLabelledBy}
          aria-describedby={field.describedBy}
          aria-invalid={field.invalid || undefined}
          aria-required={field.required || undefined}
          onChange={(event) => {
            validateAndAddFiles(Array.from(event.currentTarget.files ?? []));
            event.currentTarget.value = "";
          }}
        />

        {selectedFiles.length ? (
          <ul className={styles.fileList} aria-label="已选择的文件">
            {selectedFiles.map((file) => (
              <li className={styles.fileItem} key={fileIdentity(file)}>
                <FileText className={styles.fileIcon} aria-hidden="true" />
                <span className={styles.fileCopy}>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>
                    {formatFileSize(file.size)}
                  </span>
                </span>
                <IconButton
                  aria-label={removeFileLabel(file)}
                  variant="ghost"
                  disabled={field.disabled}
                  onClick={() => removeFile(file)}
                >
                  <X />
                </IconButton>
              </li>
            ))}
          </ul>
        ) : null}

        <span className={styles.status} aria-live="polite">
          {selectedFiles.length
            ? `已选择 ${selectedFiles.length} 个文件`
            : "尚未选择文件"}
        </span>
      </div>
    );
  },
);
