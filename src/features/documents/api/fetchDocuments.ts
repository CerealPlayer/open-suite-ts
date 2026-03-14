import { API_BASE_URL } from '../../../config/env'
import {
  mapDocumentRecord,
  type DocumentApiRecord,
  type DocumentRecord,
} from '../types/document'

const DOCUMENTS_ENDPOINT = '/documents'

async function ensureSuccess(response: Response): Promise<Response> {
  if (response.ok) {
    return response
  }

  const details = await response.text()
  throw new Error(details || `Request failed with status ${response.status}`)
}

export async function fetchDocuments(): Promise<DocumentRecord[]> {
  const response = await fetch(`${API_BASE_URL}${DOCUMENTS_ENDPOINT}`)
  await ensureSuccess(response)
  const payload = (await response.json()) as DocumentApiRecord[]
  return payload.map(mapDocumentRecord)
}
