import { useParams } from 'react-router-dom'

export function useDocumentDetails() {
  const { documentId } = useParams()

  return {
    documentId: documentId ?? 'unknown',
  }
}
