export type DocumentRecord = {
  id: string
  title: string
  created_at: string
  edited_at: string
  size: number
}

export type DocumentApiRecord = {
  id: string
  file_name: string
  size: number
  created_at: string
  updated_at: string
}

export function mapDocumentRecord(record: DocumentApiRecord): DocumentRecord {
  return {
    id: record.id,
    title: record.file_name,
    created_at: record.created_at,
    edited_at: record.updated_at,
    size: record.size,
  }
}
