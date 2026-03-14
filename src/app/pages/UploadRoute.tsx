import { UploadDocumentSection, useUploadDocument } from '../../features/upload'

export function UploadRoute() {
  const {
    uploadEndpoint,
    selectedFileName,
    fileSize,
    statusMessage,
    isUploading,
    onFileChange,
    onSubmit,
  } = useUploadDocument()

  return (
    <UploadDocumentSection
      uploadEndpoint={uploadEndpoint}
      selectedFileName={selectedFileName}
      fileSize={fileSize}
      statusMessage={statusMessage}
      isUploading={isUploading}
      onFileChange={onFileChange}
      onSubmit={onSubmit}
    />
  )
}
