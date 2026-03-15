import { Notice, Panel } from '@/components'
import { DocumentEditor, useDocumentDetails } from '@/features/document-editor'
import { Link, useParams } from 'react-router-dom'
import { appRoutes } from '../routes'

function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate))
}

function formatSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`
  }

  if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`
  }

  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
}

export function DocumentDetailsRoute() {
  const { documentId } = useParams()
  const { documentDetails, isLoading, isError, errorMessage } = useDocumentDetails(documentId)

  return (
    <Panel as="section" className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Document details</h2>
      {!documentId ? (
        <Notice variant="error">Document ID is missing from the route.</Notice>
      ) : null}
      {isLoading ? <p className="text-sm text-slate-600">Loading document...</p> : null}
      {isError ? <Notice variant="error">Failed to fetch document: {errorMessage}</Notice> : null}
      {documentDetails ? (
        <div className="space-y-4">
          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="text-lg font-semibold text-slate-900">{documentDetails.document.fileName}</h3>
            <dl className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-slate-900">Document ID</dt>
                <dd className="break-all">{documentDetails.document.id}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Path</dt>
                <dd className="break-all">{documentDetails.document.path}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Size</dt>
                <dd>{formatSize(documentDetails.document.size)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Created</dt>
                <dd>{formatDate(documentDetails.document.createdAt)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Updated</dt>
                <dd>{formatDate(documentDetails.document.updatedAt)}</dd>
              </div>
            </dl>
          </section>

          <DocumentEditor content={documentDetails.content} />
        </div>
      ) : null}
      <Link
        to={appRoutes.documents}
        className="inline-flex rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
      >
        Back to documents
      </Link>
    </Panel>
  )
}
