export const appRoutes = {
  home: '/',
  upload: '/upload',
  documents: '/documents',
  documentDetails: '/documents/:documentId',
} as const

export function getDocumentDetailsRoute(documentId: string): string {
  return `/documents/${documentId}`
}
