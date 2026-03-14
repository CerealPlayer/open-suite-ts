export function formatFileSize(sizeInBytes: number): string {
  const sizeInKb = sizeInBytes / 1024
  return `${sizeInKb.toFixed(1)} KB`
}
