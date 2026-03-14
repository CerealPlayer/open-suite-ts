import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchDocuments } from '../api/fetchDocuments'
import { useDocumentsStore } from '../stores/useDocumentsStore'
import { filterDocuments } from '../utils/filterDocuments'

type UseDocumentsListOptions = {
  toDocumentDetails: (documentId: string) => string
}

export function useDocumentsList({ toDocumentDetails }: UseDocumentsListOptions) {
  const navigate = useNavigate()
  const documentFilter = useDocumentsStore((state) => state.documentFilter)
  const setDocumentFilter = useDocumentsStore((state) => state.setDocumentFilter)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
  })

  const documents = useMemo(
    () => filterDocuments(data ?? [], documentFilter),
    [data, documentFilter],
  )

  const errorMessage = error instanceof Error ? error.message : 'Unknown error'

  const openDocument = (documentId: string) => {
    navigate(toDocumentDetails(documentId))
  }

  return {
    documentFilter,
    setDocumentFilter,
    documents,
    isLoading,
    isError,
    errorMessage,
    openDocument,
  }
}
