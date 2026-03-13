import { Link } from 'react-router-dom'
import { useDashboardStore } from '../../store/useDashboardStore'
import { routes } from '../../router'

export function HomePage() {
  const lastSelectedDocxName = useDashboardStore((state) => state.lastSelectedDocxName)

  return (
    <section className="space-y-8">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-2xl font-semibold text-slate-900">Welcome</h2>
        <p className="mt-2 text-slate-600">
          Use this dashboard to upload DOCX files and browse documents available in
          the service.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to={routes.upload}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-indigo-300 hover:shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900">Upload a document</h3>
          <p className="mt-1 text-slate-600">
            Select and validate a `.docx` file before submitting it to the service.
          </p>
        </Link>

        <Link
          to={routes.documents}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-indigo-300 hover:shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900">View documents</h3>
          <p className="mt-1 text-slate-600">
            Explore the current document list and open details for each record.
          </p>
        </Link>
      </div>

      {lastSelectedDocxName ? (
        <p className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
          Last selected DOCX: <strong>{lastSelectedDocxName}</strong>
        </p>
      ) : null}
    </section>
  )
}
