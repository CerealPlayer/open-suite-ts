export type ProseMirrorMarkJSON = {
  type: string
  attrs?: Record<string, unknown>
}

export type ProseMirrorNodeJSON = {
  type: string
  attrs?: Record<string, unknown>
  marks?: ProseMirrorMarkJSON[]
  text?: string
  content?: ProseMirrorNodeJSON[]
}

export type DocumentDetailsApiRecord = {
  document: {
    id: string
    path: string
    file_name: string
    size: number
    created_at: string
    updated_at: string
    deleted_at: string | null
  }
  content: ProseMirrorNodeJSON
}

export type DocumentDetailsRecord = {
  document: {
    id: string
    path: string
    fileName: string
    size: number
    createdAt: string
    updatedAt: string
    deletedAt: string | null
  }
  content: ProseMirrorNodeJSON
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}

export function parseDocumentDetailsPayload(payload: unknown): DocumentDetailsApiRecord {
  if (!isRecord(payload)) {
    throw new Error('Document details payload is invalid: expected an object.')
  }

  const documentValue = payload.document
  const contentValue = payload.content

  if (!isRecord(documentValue)) {
    throw new Error('Document details payload is invalid: missing document metadata.')
  }

  if (!isRecord(contentValue) || typeof contentValue.type !== 'string') {
    throw new Error('Document details payload is invalid: missing content document.')
  }

  if (
    typeof documentValue.id !== 'string' ||
    typeof documentValue.path !== 'string' ||
    typeof documentValue.file_name !== 'string' ||
    typeof documentValue.size !== 'number' ||
    typeof documentValue.created_at !== 'string' ||
    typeof documentValue.updated_at !== 'string' ||
    !(typeof documentValue.deleted_at === 'string' || documentValue.deleted_at === null)
  ) {
    throw new Error('Document details payload is invalid: document metadata fields are malformed.')
  }

  return {
    document: {
      id: documentValue.id,
      path: documentValue.path,
      file_name: documentValue.file_name,
      size: documentValue.size,
      created_at: documentValue.created_at,
      updated_at: documentValue.updated_at,
      deleted_at: documentValue.deleted_at,
    },
    content: contentValue as ProseMirrorNodeJSON,
  }
}

export function mapDocumentDetails(record: DocumentDetailsApiRecord): DocumentDetailsRecord {
  return {
    document: {
      id: record.document.id,
      path: record.document.path,
      fileName: record.document.file_name,
      size: record.document.size,
      createdAt: record.document.created_at,
      updatedAt: record.document.updated_at,
      deletedAt: record.document.deleted_at,
    },
    content: record.content,
  }
}
