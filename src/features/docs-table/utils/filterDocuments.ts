import type { DocumentRecord } from '../types/document'

export function filterDocuments(
  documents: DocumentRecord[],
  documentFilter: string,
): DocumentRecord[] {
  if (!documentFilter.trim()) {
    return documents
  }

  const normalizedFilter = documentFilter.toLowerCase()
  return documents.filter((document) =>
    document.title.toLowerCase().includes(normalizedFilter),
  )
}
