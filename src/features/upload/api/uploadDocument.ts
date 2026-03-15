import { API_BASE_URL } from '../../../config/env'

const DOCUMENT_UPLOAD_ENDPOINT = '/documents/upload'
type UploadDocumentResponse = {
  id: string
}

async function ensureSuccess(response: Response): Promise<Response> {
  if (response.ok) {
    return response
  }

  const details = await response.text()
  throw new Error(details || `Request failed with status ${response.status}`)
}

export function getUploadEndpoint(): string {
  return `${API_BASE_URL}${DOCUMENT_UPLOAD_ENDPOINT}`
}

export async function uploadDocument(file: File): Promise<UploadDocumentResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(getUploadEndpoint(), {
    method: 'POST',
    body: formData,
  })

  const successfulResponse = await ensureSuccess(response)
  const payload: unknown = await successfulResponse.json()

  if (
    payload === null ||
    typeof payload !== 'object' ||
    !('id' in payload) ||
    typeof payload.id !== 'string'
  ) {
    throw new Error('Upload succeeded but response payload is invalid.')
  }

  return {
    id: payload.id,
  }
}
