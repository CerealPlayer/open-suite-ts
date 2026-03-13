import { Link, useParams } from 'react-router-dom'
import { routes } from '../../router'

export function DocumentDetailsPage() {
  const { documentId } = useParams()

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
      <h2 className="text-2xl font-semibold text-slate-900">Document details</h2>
      <p className="text-slate-700">
        Placeholder page for document: <strong>{documentId ?? 'unknown'}</strong>
      </p>
      <p className="text-slate-600">
        This route is ready. Full details content will be added in a future iteration.
      </p>
      <Link
        to={routes.documents}
        className="inline-flex rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
      >
        Back to documents
      </Link>
    </section>
  )
}
