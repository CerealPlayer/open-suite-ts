import { DocumentsSection, useDocumentsList } from '../../features/documents'
import { getDocumentDetailsRoute } from '../routes'

export function DocumentsRoute() {
  const {
    documentFilter,
    setDocumentFilter,
    documents,
    isLoading,
    isError,
    errorMessage,
    openDocument,
  } = useDocumentsList({
    toDocumentDetails: getDocumentDetailsRoute,
  })

  return (
    <DocumentsSection
      documentFilter={documentFilter}
      onDocumentFilterChange={(event) => setDocumentFilter(event.target.value)}
      documents={documents}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      onOpenDocument={openDocument}
    />
  )
}
