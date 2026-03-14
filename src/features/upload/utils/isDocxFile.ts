const DOCX_MIME_TYPE =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export function isDocxFile(file: File): boolean {
  return file.name.toLowerCase().endsWith('.docx') || file.type === DOCX_MIME_TYPE
}
