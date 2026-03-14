import { DocumentDetailsSection, useDocumentDetails } from '../../features/documents'
import { appRoutes } from '../routes'

export function DocumentDetailsRoute() {
  const { documentId } = useDocumentDetails()

  return (
    <DocumentDetailsSection
      documentId={documentId}
      documentsPath={appRoutes.documents}
    />
  )
}
