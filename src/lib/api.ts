import { API_BASE_URL, DOCUMENTS_ENDPOINT, DOCUMENT_UPLOAD_ENDPOINT } from './constants'
import type { DocumentApiRecord, DocumentRecord } from '../types/document'

function buildUrl(path: string): string {
  return `${API_BASE_URL}${path}`
}

async function ensureSuccess(response: Response): Promise<Response> {
  if (response.ok) {
    return response
  }

  const details = await response.text()
  throw new Error(details || `Request failed with status ${response.status}`)
}

function mapDocumentRecord(record: DocumentApiRecord): DocumentRecord {
  return {
    id: record.id,
    title: record.file_name,
    created_at: record.created_at,
    edited_at: record.updated_at,
    size: record.size,
  }
}

export async function fetchDocuments(): Promise<DocumentRecord[]> {
  const response = await fetch(buildUrl(DOCUMENTS_ENDPOINT))
  await ensureSuccess(response)
  const payload = (await response.json()) as DocumentApiRecord[]
  return payload.map(mapDocumentRecord)
}

export async function uploadDocument(file: File): Promise<void> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(buildUrl(DOCUMENT_UPLOAD_ENDPOINT), {
    method: 'POST',
    body: formData,
  })

  await ensureSuccess(response)
}
