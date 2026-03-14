import { useMutation } from "@tanstack/react-query";
import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { uploadDocument } from "../api/uploadDocument";
import { useUploadStore } from "../stores/useUploadStore";
import { formatFileSize } from "../utils/formatFileSize";
import { isDocxFile } from "../utils/isDocxFile";

export function useUploadDocument() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const setLastSelectedDocxName = useUploadStore(
    (state) => state.setLastSelectedDocxName,
  );
  const uploadMutation = useMutation({
    mutationFn: uploadDocument,
  });

  const fileSize = useMemo(() => {
    if (!selectedFile) {
      return null;
    }

    return formatFileSize(selectedFile.size);
  }, [selectedFile]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setLastSelectedDocxName(null);
      setStatusMessage("Please choose a DOCX file.");
      return;
    }

    if (!isDocxFile(file)) {
      setSelectedFile(null);
      setLastSelectedDocxName(null);
      setStatusMessage("Only .docx files are allowed.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setLastSelectedDocxName(file.name);
    setStatusMessage(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setStatusMessage("Select a DOCX file before uploading.");
      return;
    }

    try {
      await uploadMutation.mutateAsync(selectedFile);
      setStatusMessage("Document uploaded successfully.");
      setSelectedFile(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed unexpectedly.";
      setStatusMessage(`Upload failed: ${errorMessage}`);
    }
  };

  return {
    selectedFileName: selectedFile?.name ?? null,
    fileSize,
    statusMessage,
    isUploading: uploadMutation.isPending,
    onFileChange,
    onSubmit,
  };
}
