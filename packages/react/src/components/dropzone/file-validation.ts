import type {
  FileRejection,
  FileRejectionReason,
  FileSelectionResult,
} from "./Dropzone.types";

interface FileValidationOptions {
  acceptedFileTypes?: readonly string[];
  maxFiles?: number;
  maxFileSize?: number;
}

export function fileIdentity(file: File): string {
  return [file.name, file.size, file.type, file.lastModified].join(":");
}

function matchesAcceptedType(
  file: File,
  acceptedFileTypes: readonly string[],
): boolean {
  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();

  return acceptedFileTypes.some((rawType) => {
    const acceptedType = rawType.trim().toLowerCase();
    if (!acceptedType) return false;
    if (acceptedType.startsWith(".")) return fileName.endsWith(acceptedType);
    if (acceptedType.endsWith("/*")) {
      return mimeType.startsWith(acceptedType.slice(0, -1));
    }
    return mimeType === acceptedType;
  });
}

export function validateFiles(
  files: readonly File[],
  {
    acceptedFileTypes,
    maxFiles = Number.POSITIVE_INFINITY,
    maxFileSize = Number.POSITIVE_INFINITY,
  }: FileValidationOptions,
): FileSelectionResult {
  const acceptedFiles: File[] = [];
  const rejectedFiles: FileRejection[] = [];

  files.forEach((file, index) => {
    const reasons: FileRejectionReason[] = [];
    if (index >= Math.max(0, maxFiles)) reasons.push("too-many-files");
    if (
      acceptedFileTypes?.length &&
      !matchesAcceptedType(file, acceptedFileTypes)
    ) {
      reasons.push("file-type");
    }
    if (file.size > maxFileSize) reasons.push("file-size");

    if (reasons.length) rejectedFiles.push({ file, reasons });
    else acceptedFiles.push(file);
  });

  return { acceptedFiles, rejectedFiles };
}
