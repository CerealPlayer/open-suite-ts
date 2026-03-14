import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchDocuments } from '../../lib/api'
import { useDashboardStore } from '../../store/useDashboardStore'

function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate))
}

function formatSize(sizeInBytes: number): string {
  const sizeInKb = sizeInBytes / 1024
  return `${sizeInKb.toFixed(1)} KB`
}

export function DocumentsPage() {
  const navigate = useNavigate()
  const documentFilter = useDashboardStore((state) => state.documentFilter)
  const setDocumentFilter = useDashboardStore((state) => state.setDocumentFilter)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
  })
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'

  const filteredDocuments = useMemo(() => {
    if (!data) {
      return []
    }

    if (!documentFilter.trim()) {
      return data
    }

    const normalizedFilter = documentFilter.toLowerCase()
    return data.filter((document) =>
      document.title.toLowerCase().includes(normalizedFilter),
    )
  }, [data, documentFilter])

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Documents</h2>
          <p className="mt-1 text-slate-600">
            Click a row to open the document details route.
          </p>
        </div>
        <div className="w-full sm:max-w-xs">
          <label
            htmlFor="document-filter"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Filter by title
          </label>
          <input
            id="document-filter"
            value={documentFilter}
            onChange={(event) => setDocumentFilter(event.target.value)}
            placeholder="Search documents..."
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-600">Loading documents...</p>
      ) : isError ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Failed to fetch documents: {errorMessage}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Created at</th>
                <th className="px-4 py-3 font-semibold">Edited at</th>
                <th className="px-4 py-3 font-semibold">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredDocuments.map((document) => (
                <tr
                  key={document.id}
                  tabIndex={0}
                  onClick={() => navigate(`/documents/${document.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      navigate(`/documents/${document.id}`)
                    }
                  }}
                  className="cursor-pointer transition hover:bg-slate-50 focus:bg-slate-100 focus:outline-none"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">{document.title}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {formatDate(document.created_at)}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {formatDate(document.edited_at)}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{formatSize(document.size)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDocuments.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-600">No documents found.</p>
          ) : null}
        </div>
      )}
    </section>
  )
}
