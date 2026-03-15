import { useQuery } from '@tanstack/react-query'
import { fetchDocumentDetails } from '../api/fetchDocumentDetails'

export function useDocumentDetails(documentId: string | undefined) {
  const hasDocumentId = typeof documentId === 'string' && documentId.trim().length > 0

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => fetchDocumentDetails(documentId ?? ''),
    enabled: hasDocumentId,
  })

  const errorMessage = error instanceof Error ? error.message : 'Unknown error'

  return {
    documentDetails: data,
    isLoading,
    isError,
    errorMessage,
  }
}
